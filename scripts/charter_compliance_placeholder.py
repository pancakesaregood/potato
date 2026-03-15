from pathlib import Path
import re
import sys


SENSITIVE_KEYWORDS = [
    "detention",
    "surveillance",
    "search",
    "seizure",
    "speech",
    "assembly",
    "religion",
    "equality",
    "prison",
    "citizenship",
    "vote",
]


def extract_section(content: str, heading: str) -> str:
    pattern = rf"{re.escape(heading)}\n(.*?)(?=\n## |\Z)"
    match = re.search(pattern, content, flags=re.DOTALL)
    return match.group(1).strip() if match else ""


def main() -> int:
    print("Charter compliance placeholder check")
    print("This check enforces process, not legal clearance.")

    proposal_files = sorted(
        path
        for path in Path("proposals").glob("*.md")
        if path.name.lower() != "readme.md"
    )

    failures = []
    advisories = []

    for proposal_file in proposal_files:
        content = proposal_file.read_text(encoding="utf-8")
        review_text = extract_section(content, "## Constitutional Review")
        if not review_text:
            failures.append(
                f"{proposal_file.as_posix()} is missing content under "
                "## Constitutional Review."
            )
            continue

        lowered = content.lower()
        matched = [keyword for keyword in SENSITIVE_KEYWORDS if keyword in lowered]
        if matched:
            advisories.append(
                f"{proposal_file.as_posix()} references sensitive terms: "
                + ", ".join(matched)
            )

    for manifesto_file in sorted(Path("manifesto").glob("*.md")):
        lowered = manifesto_file.read_text(encoding="utf-8").lower()
        matched = [keyword for keyword in SENSITIVE_KEYWORDS if keyword in lowered]
        if matched:
            advisories.append(
                f"{manifesto_file.as_posix()} may need focused legal review: "
                + ", ".join(sorted(set(matched)))
            )

    for advisory in advisories:
        print(f"ADVISORY: {advisory}")

    if failures:
        print("Charter compliance placeholder failed:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("Charter compliance placeholder passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
