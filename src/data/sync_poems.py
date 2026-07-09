#!/usr/bin/env python3
"""
Sync Poems.json (the editing source) into the derived data files:

  1. Propagate content/name by poem id into PoemsKins.json.
     kinpoems and id are never touched here.
  2. Regenerate PoemsKinsStyled.json using restyle_poems_json.py's own
     restyling logic (imported, not reimplemented).

Refuses to run (nonzero exit, no writes) if the id sets of Poems.json,
PoemsKins.json, and PoemsKinsStyled.json ever disagree -- that means a
poem was added or removed, which this script does not handle.

assign_kin_poems.py is never invoked here; kin reassignment is a
separate, deliberate step.
"""

import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from restyle_poems_json import restyle_content  # noqa: E402

POEMS_PATH = os.path.join(HERE, "Poems.json")
KINS_PATH = os.path.join(HERE, "PoemsKins.json")
STYLED_PATH = os.path.join(HERE, "PoemsKinsStyled.json")


def load(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save(path, root):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(root, f, ensure_ascii=False, indent=2)


def check_id_sets(poems_root, kins_root, styled_root):
    poems_ids = {p["id"] for p in poems_root["poemsData"]}
    kins_ids = {p["id"] for p in kins_root["poemsData"]}
    styled_ids = {p["id"] for p in styled_root["poemsData"]}

    if poems_ids == kins_ids == styled_ids:
        return

    all_ids = poems_ids | kins_ids | styled_ids
    mismatched = sorted(
        (pid for pid in all_ids
         if not (pid in poems_ids and pid in kins_ids and pid in styled_ids)),
        key=int,
    )

    print("ERROR: id sets disagree between Poems.json, PoemsKins.json, "
          "and PoemsKinsStyled.json.", file=sys.stderr)
    print("This means a poem was added or removed -- sync_poems.py does "
          "not handle that case and must not guess. Fix the id sets "
          "manually first.", file=sys.stderr)
    for pid in mismatched:
        present_in = [
            name for name, ids in (
                ("Poems.json", poems_ids),
                ("PoemsKins.json", kins_ids),
                ("PoemsKinsStyled.json", styled_ids),
            ) if pid in ids
        ]
        print(f"  id {pid}: present in {present_in}", file=sys.stderr)
    sys.exit(1)


def main():
    poems_root = load(POEMS_PATH)
    kins_root = load(KINS_PATH)
    styled_root = load(STYLED_PATH)

    check_id_sets(poems_root, kins_root, styled_root)

    poems_by_id = {p["id"]: p for p in poems_root["poemsData"]}

    content_changed_ids = []
    name_changed_ids = []

    for poem in kins_root["poemsData"]:
        source = poems_by_id[poem["id"]]
        if source["content"] != poem["content"]:
            poem["content"] = source["content"]
            content_changed_ids.append(poem["id"])
        if source["name"] != poem["name"]:
            poem["name"] = source["name"]
            name_changed_ids.append(poem["id"])

    save(KINS_PATH, kins_root)

    kins_by_id = {p["id"]: p for p in kins_root["poemsData"]}

    restyled_count = 0
    for poem in styled_root["poemsData"]:
        source = kins_by_id[poem["id"]]
        old = poem.get("content", "")
        new = restyle_content(source["content"], fallback_title=source.get("name", ""))
        poem["name"] = source["name"]
        if new != old:
            poem["content"] = new
            restyled_count += 1

    save(STYLED_PATH, styled_root)

    print("Content changes:", len(content_changed_ids))
    print("Content changed ids:", sorted(content_changed_ids, key=int))
    print("Name changes:", len(name_changed_ids))
    print("Name changed ids:", sorted(name_changed_ids, key=int))
    print("Poems restyled:", restyled_count, "/", len(styled_root["poemsData"]))


if __name__ == "__main__":
    main()
