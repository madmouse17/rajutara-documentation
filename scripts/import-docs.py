#!/usr/bin/env python3
"""Turn two documents of the Rajutara repository into pages of this site: the glossary and the parity checklist.

Both are long tables that change with the code, so they are converted instead of retyped. The conversion keeps
the words and changes only the form: a front matter block for Starlight, status icons spelled out (Yes, Partial,
No) so no meaning rests on a symbol, repository-relative links turned into links to the repository on GitHub,
and the glossary's "term, meaning, Avoid" blocks turned into one table.

    python3 scripts/import-docs.py ../rajutara            # the checkout of the application repository

Run it again after the glossary or the checklist changes, and commit the result.
"""

import posixpath
import re
import sys
from pathlib import Path

REPO_BLOB = "https://github.com/madmouse17/rajutara/blob/main/"
OUT = Path(__file__).resolve().parent.parent / "src/content/docs/docs"

STATUS = {"✅": "Yes", "⚠️": "Partial", "❌": "No"}


def rename(text: str) -> str:
    """The project is called Rajutara; its crates, binary and paths follow."""
    text = re.sub(r"\boptirust-", "rajutara-", text)
    text = re.sub(r"\bOptirust\b", "Rajutara", text)
    return re.sub(r"\boptirust\b", "Rajutara", text)


def repo_links(text: str, here: str) -> str:
    """Links to files of the repository become absolute links on GitHub. `here` is the file's folder."""

    def fix(match: re.Match) -> str:
        label, target = match.group(1), match.group(2)
        if re.match(r"(https?:|#|mailto:)", target):
            return match.group(0)
        path, _, anchor = target.partition("#")
        resolved = posixpath.normpath(posixpath.join(here, path))
        return f"[{label}]({REPO_BLOB}{resolved}{'#' + anchor if anchor else ''})"

    return re.sub(r"\[([^\]]+)\]\(([^)]+)\)", fix, text)


def parity(source: Path) -> str:
    text = source.read_text()
    text = re.sub(r"\A# .*\n+", "", text)  # the title moves to the front matter
    for icon, word in STATUS.items():
        text = text.replace(icon, word)
    text = repo_links(text, "docs")
    body = rename(text).strip()
    return (
        "---\n"
        "title: Parity checklist\n"
        "description: What an Operator trained on Optitex 15 finds in Rajutara 1.1.0, module by module.\n"
        "---\n\n"
        f"{body}\n"
    )


def glossary(source: Path) -> str:
    text = source.read_text()
    rows = []
    for block in re.split(r"\n\n(?=\*\*)", text):
        m = re.match(r"\*\*(.+?)\*\*:\n(.+?)\n_Avoid_: (.+)\Z", block.strip(), re.S)
        if m:
            term, meaning, avoid = (s.strip().replace("\n", " ").replace("|", "\\|") for s in m.groups())
            rows.append(f"| **{term}** | {meaning} | {avoid} |")
    table = "| Term | Meaning | Avoid |\n|---|---|---|\n" + "\n".join(rows)
    intro = (
        "The words of Rajutara. They are also the names of its types and modules, so a term here is the term in "
        "the code, the menus and these pages. The third column lists words that mean something else in this "
        "project or are easy to confuse with the term.\n"
    )
    return (
        "---\n"
        "title: Glossary\n"
        'description: "The vocabulary of Rajutara: style, piece, contour, grade rule, marker, lay and the rest."\n'
        "---\n\n"
        f"{rename(intro)}\n{rename(repo_links(table, '.'))}\n"
    )


def changelog(source: Path) -> str:
    text = re.sub(r"\A# .*\n+", "", source.read_text())
    text = repo_links(text, ".")
    return (
        "---\n"
        "title: Changelog\n"
        "description: What changed in each Rajutara release.\n"
        "---\n\n"
        f"{rename(text).strip()}\n"
    )


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    repo = Path(sys.argv[1])
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "parity-checklist.md").write_text(parity(repo / "docs/parity-checklist.md"))
    (OUT / "glossary.md").write_text(glossary(repo / "GLOSSARY.md"))
    (OUT / "changelog.md").write_text(changelog(repo / "CHANGELOG.md"))
    print(f"wrote parity-checklist, glossary and changelog under {OUT}")


if __name__ == "__main__":
    main()
