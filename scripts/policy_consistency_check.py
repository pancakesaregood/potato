from pathlib import Path
import sys


MANIFESTO_FILES = [
    "article_01_foundational_principles.md",
    "article_02_digital_democracy.md",
    "article_03_equality_and_rights.md",
    "article_04_justice_and_prison_reform.md",
    "article_05_housing_and_homelessness.md",
    "article_06_environmental_responsibility.md",
    "article_07_drug_epidemic_response.md",
    "article_08_governance_and_accountability.md",
    "article_09_financial_responsibility.md",
    "article_10_climate_change.md",
    "article_11_freelander_citizenship.md",
    "article_12_truth_and_reconciliation.md",
    "article_13_symbolism_of_brown.md",
    "article_14_ten_year_vision.md",
    "article_15_child_support_smart_contracts.md",
    "article_16_world_hunger.md",
    "article_17_resource_nationalization.md",
]

TECH_FILES = [
    "consensus_mechanism.md",
    "cryptography.md",
    "smart_contracts.md",
    "interoperability.md",
    "tokenomics.md",
    "distributed_ledger.md",
    "governance_protocol.md",
    "civic_income.md",
    "harmonized_healthcare.md",
    "youth_vanguard.md",
    "green_architecture.md",
]

MANIFESTO_HEADINGS = [
    "## Summary",
    "## Principles",
    "## Policy Mechanisms",
    "## Measurable Outcomes",
]

TECH_HEADINGS = [
    "## Summary",
    "## Design Principles",
    "## Technical Mechanisms",
    "## Validation Targets",
]


def validate_directory(base: Path, expected_files: list[str], headings: list[str]) -> list[str]:
    issues = []

    for filename in expected_files:
        file_path = base / filename
        if not file_path.exists():
            issues.append(f"Missing file: {file_path.as_posix()}")
            continue

        content = file_path.read_text(encoding="utf-8")
        for heading in headings:
            if heading not in content:
                issues.append(
                    f"{file_path.as_posix()} is missing required heading: {heading}"
                )

    existing_files = sorted(path.name for path in base.glob("*.md"))
    unexpected = sorted(set(existing_files) - set(expected_files))
    for filename in unexpected:
        issues.append(f"Unexpected file in {base.as_posix()}: {filename}")

    return issues


def main() -> int:
    issues = []

    issues.extend(
        validate_directory(Path("manifesto"), MANIFESTO_FILES, MANIFESTO_HEADINGS)
    )
    issues.extend(
        validate_directory(Path("tech_governance"), TECH_FILES, TECH_HEADINGS)
    )

    required_root_files = [
        Path("README.md"),
        Path("ARCHITECTURE.md"),
        Path("AGENTS.md"),
        Path("templates/proposal_template.md"),
        Path("docs/governance/constitution.md"),
    ]

    for file_path in required_root_files:
        if not file_path.exists():
            issues.append(f"Missing required repository file: {file_path.as_posix()}")

    if issues:
        print("Policy consistency check failed:")
        for issue in issues:
            print(f"- {issue}")
        return 1

    print("Policy consistency check passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
