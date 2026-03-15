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


def main() -> int:
    proposals_dir = Path("proposals")
    proposal_files = sorted(
        path
        for path in proposals_dir.glob("*.md")
        if path.name.lower() != "readme.md"
    )

    if not proposal_files:
        print("No proposal files found in proposals/. Template validation passed.")
        return 0

    failures = []

    for proposal_file in proposal_files:
        content = proposal_file.read_text(encoding="utf-8")
        missing = [heading for heading in REQUIRED_HEADINGS if heading not in content]
        if missing:
            failures.append((proposal_file.as_posix(), missing))

    if failures:
        print("Proposal template validation failed:")
        for filename, missing in failures:
            print(f"- {filename}")
            for heading in missing:
                print(f"  missing heading: {heading}")
        return 1

    print("All proposals include the required template headings.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
