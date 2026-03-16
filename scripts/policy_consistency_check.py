"""
policy_consistency_check.py

Checks that all governance documents maintain their required structural
headings and that required repository files are present.

Validates:
  instances/*/manifesto/*.md        required manifesto headings
  civic_infrastructure/*.md         required civic infrastructure headings
  core/governance_kernel.md         required kernel sections
  required root and framework files
"""
from pathlib import Path
import sys


MANIFESTO_HEADINGS = [
    "## Summary",
    "## Principles",
    "## Policy Mechanisms",
    "## Measurable Outcomes",
]

CIVIC_INFRA_HEADINGS = [
    "## Summary",
    "## Design Principles",
    "## Technical Mechanisms",
    "## Validation Targets",
]

KERNEL_SECTIONS = [
    "## 1. Purpose",
    "## 2. Core Governance Primitives",
    "## 3. Proposal State Machine",
    "## 4. Governance Cycles",
    "## 5. Review and Decision Rules",
    "## 6. Transparency and Auditability",
    "## 7. Extensibility",
    "## 8. Data Governance Agreement",
]

REQUIRED_FILES = [
    Path("README.md"),
    Path("ARCHITECTURE.md"),
    Path("AGENTS.md"),
    Path("CONTRIBUTING.md"),
    Path("GOVERNANCE.md"),
    Path("INSTANCE_GUIDE.md"),
    Path("ROADMAP.md"),
    Path("templates/proposal_template.md"),
    Path("docs/governance/constitution.md"),
    Path("core/governance_kernel.md"),
    Path("core/proposal_system/proposal_template.md"),
    Path("core/governance_protocol/README.md"),
    Path("core/governance_cycles/README.md"),
    Path("core/manifesto_template/README.md"),
]


def check_headings(file_path: Path, required: list[str]) -> list[str]:
    content = file_path.read_text(encoding="utf-8")
    return [h for h in required if h not in content]


def main() -> int:
    issues: list[str] = []

    # --- Manifesto articles (all instances) ---
    instances_dir = Path("instances")
    if not instances_dir.exists():
        issues.append("Missing directory: instances/")
    else:
        manifesto_dirs = sorted(instances_dir.glob("*/manifesto"))
        if not manifesto_dirs:
            issues.append("No manifesto directories found under instances/*/manifesto/")
        for manifesto_dir in manifesto_dirs:
            articles = sorted(manifesto_dir.glob("*.md"))
            for article in articles:
                missing = check_headings(article, MANIFESTO_HEADINGS)
                for heading in missing:
                    issues.append(
                        f"{article.as_posix()} — missing required heading: {heading}"
                    )

    # --- Civic infrastructure addendums ---
    civic_dir = Path("civic_infrastructure")
    if not civic_dir.exists():
        issues.append("Missing directory: civic_infrastructure/")
    else:
        for ci_file in sorted(civic_dir.glob("*.md")):
            missing = check_headings(ci_file, CIVIC_INFRA_HEADINGS)
            for heading in missing:
                issues.append(
                    f"{ci_file.as_posix()} — missing required heading: {heading}"
                )

    # --- Governance kernel sections ---
    kernel_file = Path("core/governance_kernel.md")
    if not kernel_file.exists():
        issues.append("Missing required file: core/governance_kernel.md")
    else:
        missing = check_headings(kernel_file, KERNEL_SECTIONS)
        for heading in missing:
            issues.append(
                f"core/governance_kernel.md — missing required section: {heading}"
            )

    # --- Required repository files ---
    for file_path in REQUIRED_FILES:
        if not file_path.exists():
            issues.append(f"Missing required repository file: {file_path.as_posix()}")

    if issues:
        print("Policy consistency check FAILED:")
        for issue in issues:
            print(f"  - {issue}")
        return 1

    print("policy_consistency_check: all structural checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
