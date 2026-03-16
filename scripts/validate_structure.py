"""
validate_structure.py

Checks that the repository's directory structure is internally consistent:

  - Each instance under instances/ has required files and a manifesto/ directory
  - All ADRs include required metadata fields
  - core/ contains required modules
  - docs/experiments/ directory exists
  - No stale path references to renamed directories (tech_governance/, manifesto/)
"""
from pathlib import Path
import re
import sys


REQUIRED_CORE_PATHS = [
    Path("core/governance_kernel.md"),
    Path("core/manifesto_template/README.md"),
    Path("core/manifesto_template/article_template.md"),
    Path("core/governance_protocol/README.md"),
    Path("core/proposal_system/README.md"),
    Path("core/proposal_system/proposal_template.md"),
    Path("core/governance_cycles/README.md"),
]

# Metadata fields every numbered ADR must contain
ADR_REQUIRED_FIELDS = [
    "| Status |",
    "| Date |",
    "| Deciders |",
]

# Hardcoded path strings that should no longer appear in Python scripts.
# Checked only in .py files where stale paths cause runtime failures.
# Each entry is (pattern, replacement_hint).
STALE_SCRIPT_PATHS: list[tuple[str, str]] = [
    (r'Path\(["\']tech_governance', 'Path("civic_infrastructure")'),
    (r'Path\(["\']manifesto["\']', 'Path("instances/<name>/manifesto")'),
    (r'glob\(["\']manifesto/', 'glob("instances/*/manifesto/'),
]


def check_core_structure(issues: list[str]) -> None:
    for path in REQUIRED_CORE_PATHS:
        if not path.exists():
            issues.append(f"Missing core file: {path.as_posix()}")


def check_instance_structure(issues: list[str]) -> None:
    instances_dir = Path("instances")
    if not instances_dir.exists():
        issues.append("Missing directory: instances/")
        return

    instance_dirs = sorted(
        d for d in instances_dir.iterdir()
        if d.is_dir() and not d.name.startswith(".")
    )
    if not instance_dirs:
        issues.append("No instance directories found under instances/")
        return

    for instance_dir in instance_dirs:
        readme = instance_dir / "README.md"
        if not readme.exists():
            issues.append(
                f"Instance '{instance_dir.name}' missing README.md "
                f"({readme.as_posix()})"
            )

        manifesto = instance_dir / "manifesto"
        if not manifesto.exists():
            issues.append(
                f"Instance '{instance_dir.name}' missing manifesto/ directory "
                f"({manifesto.as_posix()})"
            )
        elif not any(manifesto.glob("*.md")):
            issues.append(
                f"Instance '{instance_dir.name}' manifesto/ contains no .md files"
            )


def check_adr_format(issues: list[str]) -> None:
    adr_dir = Path("docs/adr")
    if not adr_dir.exists():
        issues.append("Missing directory: docs/adr/")
        return

    # Only validate numbered ADRs (0001-...), not the template or README
    for adr_file in sorted(adr_dir.glob("[0-9][0-9][0-9][0-9]-*.md")):
        content = adr_file.read_text(encoding="utf-8")
        for field in ADR_REQUIRED_FIELDS:
            if field not in content:
                issues.append(
                    f"{adr_file.as_posix()} — missing ADR metadata field: {field}"
                )


def check_experiments_dir(issues: list[str]) -> None:
    experiments_dir = Path("docs/experiments")
    if not experiments_dir.exists():
        issues.append("Missing directory: docs/experiments/")


def check_stale_script_paths(issues: list[str]) -> None:
    """Flag Python scripts that still contain hardcoded paths to renamed directories.
    Stale hardcoded paths in scripts cause silent runtime failures."""
    for py_file in sorted(Path("scripts").glob("*.py")):
        content = py_file.read_text(encoding="utf-8")
        for pattern, replacement in STALE_SCRIPT_PATHS:
            if re.search(pattern, content):
                issues.append(
                    f"{py_file.as_posix()} — hardcoded stale path "
                    f"matching '{pattern}'. Update to '{replacement}'."
                )


def main() -> int:
    issues: list[str] = []

    check_core_structure(issues)
    check_instance_structure(issues)
    check_adr_format(issues)
    check_experiments_dir(issues)
    check_stale_script_paths(issues)

    if issues:
        print("Repository structure check FAILED:")
        for issue in issues:
            print(f"  - {issue}")
        return 1

    print("validate_structure: all repository structure checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
