"""
validate_proposals.py

Checks that all proposal documents across every governance instance include
the required template headings defined in core/proposal_system/proposal_template.md.

Scans:
  instances/*/proposals/*.md          (active proposals)
  instances/*/proposals/archive/*.md  (archived proposals)
  proposals/*.md                      (root-level proposals, legacy location)
"""
from pathlib import Path
import sys


REQUIRED_HEADINGS = [
    "## Proposal Title",
    "## Problem Statement",
    "## Policy Mechanism",
    "## Constitutional Review",
    "## Economic Impact",
    "## Environmental Impact",
    "## Citizen Feedback",
    "## Implementation Plan",
]


def collect_proposal_files() -> list[Path]:
    files: list[Path] = []

    # Instance proposals (active and archived)
    instances_dir = Path("instances")
    if instances_dir.exists():
        for path in sorted(instances_dir.glob("*/proposals/**/*.md")):
            if path.name.lower() != "readme.md":
                files.append(path)

    # Root proposals (legacy location — retained for backwards compatibility)
    root_proposals = Path("proposals")
    if root_proposals.exists():
        for path in sorted(root_proposals.glob("*.md")):
            if path.name.lower() != "readme.md":
                files.append(path)

    return files


def main() -> int:
    proposal_files = collect_proposal_files()

    if not proposal_files:
        print("No proposal files found. Template validation passed.")
        return 0

    failures: list[tuple[str, list[str]]] = []

    for proposal_file in proposal_files:
        content = proposal_file.read_text(encoding="utf-8")
        missing = [h for h in REQUIRED_HEADINGS if h not in content]
        if missing:
            failures.append((proposal_file.as_posix(), missing))

    if failures:
        print("Proposal template validation FAILED:")
        for filename, missing_headings in failures:
            print(f"  {filename}")
            for heading in missing_headings:
                print(f"    missing: {heading}")
        return 1

    print(f"validate_proposals: {len(proposal_files)} proposal(s) passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
