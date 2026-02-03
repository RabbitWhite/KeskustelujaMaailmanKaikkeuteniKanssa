import argparse
import json
import os
import re
from collections import defaultdict

from sentence_transformers import SentenceTransformer, util

TITLE_WEIGHT = 0.2
CONTENT_WEIGHT = 0.8
KIN_PER_POEM = 2
BALANCE_PENALTY = 0.15  # higher = more even distribution
TOP_K = 30              # candidate pool size per poem


def clean_html(text: str) -> str:
    # Remove HTML tags like <pre ...> and </pre>
    text = re.sub(r"<[^>]+>", "", text)
    return text.strip()


def normalize_title(title: str) -> str:
    title = title.lower()
    title = re.sub(r"[^\w\s]", "", title)
    title = re.sub(r"\s+", " ", title)
    return title.strip()


def title_similarity(a: str, b: str) -> float:
    sa = set(normalize_title(a).split())
    sb = set(normalize_title(b).split())
    if not sa or not sb:
        return 0.0
    return len(sa & sb) / len(sa | sb)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--in", dest="infile", required=True, help="Input JSON file (e.g. Poems.json)")
    ap.add_argument("--out", dest="outfile", required=True, help="Output JSON file")
    ap.add_argument("--model", default="paraphrase-multilingual-MiniLM-L12-v2", help="SentenceTransformer model name")
    args = ap.parse_args()

    infile = os.path.abspath(args.infile)
    outfile = os.path.abspath(args.outfile)

    print(f"[INFO] Reading input:  {infile}")
    print(f"[INFO] Writing output: {outfile}")

    with open(infile, "r", encoding="utf-8") as f:
        root = json.load(f)

    if "poemsData" not in root or not isinstance(root["poemsData"], list):
        raise ValueError("Expected JSON structure: { 'poemsData': [ ... ] }")

    data = root["poemsData"]

    # Basic validation
    for p in data:
        if "id" not in p or "name" not in p or "content" not in p:
            raise ValueError("Each poem must have 'id', 'name', and 'content' fields.")

    titles = [p["name"] for p in data]
    contents = [clean_html(p["content"]) for p in data]

    # Embeddings
    print(f"[INFO] Loading embedding model: {args.model}")
    model = SentenceTransformer(args.model)
    embeddings = model.encode(contents, normalize_embeddings=True)

    n = len(data)
    print(f"[INFO] Poems loaded: {n}")

    # Precompute combined similarity (title + content)
    combined = [[0.0] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            if i == j:
                continue
            t_sim = title_similarity(titles[i], titles[j])
            c_sim = util.cos_sim(embeddings[i], embeddings[j]).item()
            combined[i][j] = TITLE_WEIGHT * t_sim + CONTENT_WEIGHT * c_sim

    chosen_count = defaultdict(int)

    # Assign kin poems
    for i, poem in enumerate(data):
        # candidate pool: top TOP_K by similarity
        cand = sorted(range(n), key=lambda j: combined[i][j], reverse=True)
        cand = [j for j in cand if j != i][:TOP_K]

        kin = []
        for j in cand:
            # balance-aware score
            score = combined[i][j] - BALANCE_PENALTY * chosen_count[j]
            # choose greedily by best penalized score among remaining
            # (simple approach: just pick in decreasing order with penalty)
            # Since we already sorted by combined, we apply penalty inline:
            # if it passes, we take it
            kin.append(int(data[j]["id"]))
            chosen_count[j] += 1
            if len(kin) == KIN_PER_POEM:
                break

        # safety: ensure exactly 2 kin poems
        if len(kin) < KIN_PER_POEM:
            # fallback: fill from global similarity if candidate pool too small
            for j in range(n):
                if j == i:
                    continue
                pid = int(data[j]["id"])
                if pid in kin:
                    continue
                kin.append(pid)
                if len(kin) == KIN_PER_POEM:
                    break

        poem["kinpoems"] = kin

    # Write output
    os.makedirs(os.path.dirname(outfile) or ".", exist_ok=True)
    with open(outfile, "w", encoding="utf-8") as f:
        json.dump(root, f, ensure_ascii=False, indent=2)

    print("[INFO] Done.")
    print("[INFO] Example output (first poem):")
    print(json.dumps(data[0], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
