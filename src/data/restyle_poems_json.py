#!/usr/bin/env python3
"""
Restyle existing poems JSON content to make titles stand out.

Input:
  - JSON with {"poemsData":[{id,name,content,kinpoems,...}, ...]}

What it does:
  - Finds <pre class="poemtext">...</pre> in each poem["content"]
  - Extracts the title (first non-empty line inside the <pre>)
  - Rewrites content as:
      <pre class="poemtext">\n\n<span class="poemtitle">TITLE</span>\n\nBODY</pre>

It does NOT:
  - recompute kinpoems
  - change poem text words
  - change ids or names
"""

from __future__ import annotations

import argparse
import json
import os
import re
from typing import Tuple


PRE_RE = re.compile(
    r'(?is)^\s*<pre\s+class="poemtext">\s*(.*?)\s*</pre>\s*$'
)

def normalize_newlines(s: str) -> str:
    return s.replace("\r\n", "\n").replace("\r", "\n")


def split_title_body(pre_inner_text: str) -> Tuple[str, str]:
    """
    Given inner text from <pre>...</pre>, return (title, body) where:
      - title is the first non-empty line
      - body is everything after title line, preserving newlines
    """
    pre_inner_text = normalize_newlines(pre_inner_text)

    # Keep as lines to preserve structure
    lines = pre_inner_text.split("\n")

    # Find first non-empty line as title
    title_idx = None
    for i, line in enumerate(lines):
        if line.strip() != "":
            title_idx = i
            break
    if title_idx is None:
        return "", pre_inner_text.strip("\n")

    title = lines[title_idx].strip()

    body_lines = lines[title_idx + 1 :]

    # Strip leading blank lines from body so we control spacing:
    while body_lines and body_lines[0] == "":
        body_lines.pop(0)

    body = "\n".join(body_lines).rstrip("\n")
    return title, body


def escape_html_min(s: str) -> str:
    """
    Minimal HTML escaping. Keeps quotes unchanged (safe inside span text).
    """
    return (
        s.replace("&", "&amp;")
         .replace("<", "&lt;")
         .replace(">", "&gt;")
    )


def restyle_content(content: str, fallback_title: str) -> str:
    """
    If content matches <pre class="poemtext">...</pre>, rewrite it with span title.
    Otherwise return original unchanged.
    """
    content = normalize_newlines(content or "")
    m = PRE_RE.match(content)
    if not m:
        return content

    inner = m.group(1)

    # If the inner already contains a poemtitle span, do nothing (idempotent)
    if re.search(r'(?is)<span\s+class="poemtitle">', inner):
        return content

    title, body = split_title_body(inner)
    if not title:
        title = fallback_title.strip()

    title_html = escape_html_min(title)
    body_html = escape_html_min(body)

    return (
        '<pre class="poemtext">'
        f'\n\n<span class="poemtitle">{title_html}</span>\n\n'
        f'{body_html}'
        '</pre>'
    )


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--in", dest="infile", required=True, help="Input poems JSON")
    ap.add_argument("--out", dest="outfile", required=True, help="Output poems JSON")
    args = ap.parse_args()

    infile = os.path.abspath(args.infile)
    outfile = os.path.abspath(args.outfile)

    with open(infile, "r", encoding="utf-8") as f:
        root = json.load(f)

    poems = root.get("poemsData")
    if not isinstance(poems, list):
        raise SystemExit("Expected JSON to contain a list at root['poemsData'].")

    changed = 0
    for p in poems:
        if not isinstance(p, dict):
            continue
        old = p.get("content", "")
        name = p.get("name", "")
        new = restyle_content(old, fallback_title=name)
        if new != old:
            p["content"] = new
            changed += 1

    with open(outfile, "w", encoding="utf-8") as f:
        json.dump(root, f, ensure_ascii=False, indent=2)

    print("DONE")
    print("Input :", infile)
    print("Output:", outfile)
    print("Poems restyled:", changed, "/", len(poems))


if __name__ == "__main__":
    main()
