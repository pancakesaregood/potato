# ADR-0015: Complete CI Linting and Structure Validation

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-03-15 |
| Deciders | Repository maintainers |
| Affected components | `scripts/validate_proposals.py`, `scripts/charter_compliance_placeholder.py`, `scripts/policy_consistency_check.py`, `scripts/validate_structure.py` (new), `.github/workflows/policy-lint.yml` |
| Implemented in | commit `febd625` |

---

## Context

After ADR-0012 restructured the repository from a single-namespace layout
into a `core/` and `instances/` two-layer architecture, the three existing
lint scripts broke silently.

**The failure mode was silent, not loud.** Scripts that failed to find files
reported success (no findings) rather than errors. A CI run that passed was
indistinguishable from a CI run that passed because all checks were working
versus one that passed because the scripts quietly found nothing to check.

The root cause was hardcoded path references. Before ADR-0012, all manifesto
articles lived at `manifesto/article_*.md`. After ADR-0012, they lived at
`instances/canada/manifesto/article_*.md`. The scripts had not been updated.

Specific failures:

- `validate_proposals.py` scanned `proposals/*.md` at the repository root.
  After ADR-0012, proposals live at `instances/canada/proposals/`. The
  script found nothing and reported success.
- `charter_compliance_placeholder.py` contained a hardcoded `MANIFESTO_FILES`
  list of paths. Every path in the list was stale. The script scanned zero
  files and reported no issues.
- `policy_consistency_check.py` contained both a hardcoded `MANIFESTO_FILES`
  list and a hardcoded `TECH_FILES` list. Both were stale. The script also
  had a `REQUIRED_FILES` check that did not include any of the new files
  added since ADR-0009 (`GOVERNANCE.md`, `CONTRIBUTING.md`, `INSTANCE_GUIDE.md`,
  `core/governance_kernel.md`).

A fourth gap existed independently of the path failures: there was no script
that validated the repository structure itself — that required directories
existed, that ADRs had required fields, that instances had their minimum
required layout, and that Python scripts did not contain stale hardcoded paths.

---

## Decision

Rewrite all three existing lint scripts to use dynamic path discovery and
create a new `validate_structure.py` script. Update the CI workflow to include
the new script.

### `validate_proposals.py` — dynamic instance scanning

The hardcoded `proposals/*.md` path is replaced with:

```python
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
```

This discovers all proposal files across all instances without requiring
manual path updates when new instances are added.

### `charter_compliance_placeholder.py` — dynamic manifesto scanning

The hardcoded `MANIFESTO_FILES` list is replaced with a glob over
`instances/*/proposals/**/*.md` and `instances/*/manifesto/*.md`. The
script is renamed to reflect that it checks rights and constitutional
compliance (not only the Canadian Charter), consistent with the country-
agnostic framework of ADR-0012. The keyword list is expanded to include
`expression` as a rights-relevant term.

### `policy_consistency_check.py` — dynamic manifesto and civic infrastructure scanning

The hardcoded file lists are replaced with:
- `instances/*/manifesto/*.md` for manifesto files
- `civic_infrastructure/*.md` for civic infrastructure files

A new `KERNEL_SECTIONS` validation is added to verify that
`core/governance_kernel.md` contains all required section headings.

The `REQUIRED_FILES` list is updated to include all files added since
ADR-0009: `GOVERNANCE.md`, `CONTRIBUTING.md`, `INSTANCE_GUIDE.md`, and
`core/governance_kernel.md`.

### `validate_structure.py` — new structural validation script

A new script with five check functions:

**`check_core_structure`**: Verifies that required paths in `core/` and at
the repository root exist (`core/governance_kernel.md`, `GOVERNANCE.md`,
`CONTRIBUTING.md`, `INSTANCE_GUIDE.md`, `CODE_OF_CONDUCT.md`).

**`check_instance_structure`**: For each directory under `instances/`, verifies
that `README.md` and `manifesto/` exist. Instances missing either are reported
as structural errors.

**`check_adr_format`**: For each ADR file in `docs/adr/` matching the pattern
`NNNN-*.md`, verifies that the file contains the required table fields
(`| Status |`, `| Date |`, `| Deciders |`). ADRs missing required fields are
reported.

**`check_experiments_dir`**: Verifies that `docs/experiments/` exists (the
consolidated location after ADR-0016).

**`check_stale_script_paths`**: Scans Python files in `scripts/` for hardcoded
paths that reflect the pre-ADR-0012 structure. Checks for references to the
old `manifesto/` root path (not under `instances/`) in `.py` files only.

The stale path check is explicitly limited to Python scripts. Markdown files
legitimately reference paths for documentation purposes (tree diagrams,
INSTANCE_GUIDE.md explanations, template examples), and a regex check over
markdown produces too many false positives. Python scripts, by contrast,
use path references to find actual files at runtime — a stale path in a Python
script causes a silent failure, which is the problem being solved.

### CI workflow update

`validate_structure.py` is added as a step in `.github/workflows/policy-lint.yml`.
Markdownlint is updated to ignore `node_modules/**` and `proposals/README.md`
to reduce false positives from dependency content and template files.

---

## Consequences

### Positive

- CI failures are now loud. If a path that the lint scripts depend on stops
  existing (because a refactor moved it), the structure check fails visibly
  rather than the content check passing silently.
- Dynamic path discovery makes the scripts forward-compatible. Adding a new
  instance does not require updating any hardcoded list. A new manifesto
  article is automatically picked up by all three content-checking scripts.
- The `validate_structure.py` script closes a governance gap: previously,
  ADR files could be merged without required fields and no automated check
  would catch the omission. Now the ADR format check enforces the minimum
  metadata requirements.
- The stale path check in Python scripts provides a specific, low-false-
  positive guardrail against future refactors leaving silent failures.

### Negative

- Dynamic scanning means that the scripts scan everything under `instances/`
  and `civic_infrastructure/`. As the repository grows, scan time increases.
  For the current scale this is negligible, but it is a consideration if
  the framework is used for large instances with hundreds of manifesto articles.
- The `charter_compliance_placeholder.py` rename changes its filename, which
  may affect any external references to the old name in CI documentation
  or contributor guides.
- The stale path check covers `.py` files only. A markdown file that
  generates or references stale paths (e.g., a script output template)
  would not be caught. This is an accepted limitation — the false positive
  cost of scanning markdown exceeded the benefit.

### Neutral / Watch Items

- The `REQUIRED_FILES` list in `policy_consistency_check.py` is manually
  maintained. It will require updating when new required files are added to
  the framework. A future refactor could derive this list from a single
  authoritative source (e.g., the kernel specification) rather than maintaining
  it in the script.
- The `check_stale_script_paths` function checks for a specific set of stale
  path patterns. New patterns may need to be added after future refactors.
  The patterns should be reviewed at each governance cycle.

---

## Alternatives Considered

### Alternative 1: Update hardcoded paths to reflect ADR-0012 structure

Description: Rather than switching to dynamic discovery, update the hardcoded
paths in all three scripts to reflect the new `instances/canada/` layout.

Reason rejected: Hardcoded paths will become stale again at the next
structural refactor. Dynamic discovery is the correct architecture for scripts
that need to find files across a repository that may change structure over time.
The fix that prevents the problem recurring is better than the fix that restores
the current broken state.

### Alternative 2: Stale path detection across all file types

Description: Check for stale path references in all files — markdown,
YAML, Python — not just Python scripts.

Reason rejected: Markdown files legitimately reference old path structures
in documentation contexts (tree diagrams, how-to guides, historical
explanations). The regex patterns that detect stale paths in Python code
produce a high false positive rate in markdown. The cost of investigating
false positives on every CI run exceeds the benefit of catching the rare
case where a markdown file contains a genuinely broken path reference.
Limiting the check to Python scripts — where stale paths cause runtime
failures — provides the most value with the least noise.

### Alternative 3: Use an existing repository structure validation tool

Description: Replace the custom `validate_structure.py` with an off-the-
shelf tool for validating repository layout.

Reason rejected: The structural validation requirements for this repository
are specific to its governance model — ADR format fields, instance directory
layout, kernel section headings. General-purpose tools do not cover these
requirements without significant configuration, and the configuration itself
would need maintenance. A small purpose-built script is simpler and more
transparent.

---

## Future Revisions

This ADR should be revisited if:

- A second instance is added, at which point the structural validation
  checks should be tested against the new instance to confirm they
  generalise correctly.
- The `REQUIRED_FILES` list grows to the point where it should be
  derived from a single source rather than maintained inline in the script.
- Scan time becomes a CI performance concern, at which point selective
  scanning (checking only changed files) should be considered.
- The stale path patterns in `check_stale_script_paths` are found to
  miss categories of stale paths introduced by future refactors.
