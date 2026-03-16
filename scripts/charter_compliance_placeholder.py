"""
charter_compliance_placeholder.py

Enforces process requirements for rights and constitutional review.
This script does NOT provide legal clearance — it checks that required
review sections are present and flags proposals that reference sensitive
rights-related terms for human attention.

Scans:
  instances/*/proposals/**/*.md   (proposals — checked for Constitutional Review content)
  instances/*/manifesto/*.md      (manifesto articles — flagged if sensitive terms present)
"""
from pathlib import Path
import re
import sys


# Terms whose presence in a proposal or manifesto article should trigger
# an advisory for human rights and constitutional review.
SENSITIVE_KEYWORDS = [
    "assembly",
    "citizenship",
    "detention",
    "equality",
    "expression",
    "prison",
    "religion",
    "search",
    "seizure",
    "speech",
    "surveillance",
    "vote",
]


def extract_section(content: str, heading: str) -> str:
    pattern = rf"{re.escape(heading)}\n(.*?)(?=\n## |\Z)"
    match = re.search(pattern, content, flags=re.DOTALL)
    return match.group(1).strip() if match else ""


def collect_proposal_files() -> list[Path]:
    files: list[Path] = []
    instances_dir = Path("instances")
    if instances_dir.exists():
        for path in sorted(instances_dir.glob("*/proposals/**/*.md")):
            if path.name.lower() != "readme.md":
                files.append(path)
    root_proposals = Path("proposals")
    if root_proposals.exists():
        for path in sorted(root_proposals.glob("*.md")):
            if path.name.lower() != "readme.md":
                files.append(path)
    return files


def collect_manifesto_files() -> list[Path]:
    instances_dir = Path("instances")
    if not instances_dir.exists():
        return []
    return sorted(instances_dir.glob("*/manifesto/*.md"))


def main() -> int:
    print("Rights and constitutional compliance placeholder check.")
    print("This check enforces process requirements. It does not provide legal clearance.\n")

    proposal_files = collect_proposal_files()
    manifesto_files = collect_manifesto_files()

    failures: list[str] = []
    advisories: list[str] = []

    # Proposals: require non-empty Constitutional Review section
    for proposal_file in proposal_files:
        content = proposal_file.read_text(encoding="utf-8")
        review_text = extract_section(content, "## Constitutional Review")
        if not review_text:
            failures.append(
                f"{proposal_file.as_posix()} — ## Constitutional Review section is empty. "
                "Add a review note or write 'unknown — requires legal review'."
            )
            continue

        lowered = content.lower()
        matched = sorted(set(kw for kw in SENSITIVE_KEYWORDS if kw in lowered))
        if matched:
            advisories.append(
                f"{proposal_file.as_posix()} references rights-sensitive terms "
                f"({', '.join(matched)}) — verify Constitutional Review covers these."
            )

    # Manifesto articles: flag sensitive terms for awareness
    for manifesto_file in manifesto_files:
        lowered = manifesto_file.read_text(encoding="utf-8").lower()
        matched = sorted(set(kw for kw in SENSITIVE_KEYWORDS if kw in lowered))
        if matched:
            advisories.append(
                f"{manifesto_file.as_posix()} — rights-sensitive terms present "
                f"({', '.join(matched)}). Ensure any proposals amending this article "
                "include a Constitutional Review."
            )

    for advisory in advisories:
        print(f"ADVISORY: {advisory}")

    if advisories:
        print()

    if failures:
        print("Rights and constitutional compliance check FAILED:")
        for failure in failures:
            print(f"  - {failure}")
        return 1

    checked = len(proposal_files) + len(manifesto_files)
    print(f"charter_compliance_placeholder: {checked} file(s) checked, process requirements met.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
