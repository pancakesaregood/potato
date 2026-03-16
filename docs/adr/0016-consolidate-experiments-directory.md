# ADR-0016: Consolidate Experiments Directory

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-03-15 |
| Deciders | Repository maintainers |
| Affected components | `docs/experiments/` (consolidated target), `experiments/` (removed), `README.md`, `ARCHITECTURE.md`, `ROADMAP.md`, `CHANGELOG.md`, `docs/how_to_participate.md`, `docs/adr/0010`, `docs/adr/0012`, `instances/canada/README.md` |
| Implemented in | commit `7f8d68a` |

---

## Context

After ADR-0010 (Participation Layer) and ADR-0012 (Country-Agnostic Framework),
the repository had two separate `experiments/` directories:

- `experiments/` at the repository root, containing the three files created
  in ADR-0010: `digital_referendums.md`, `housing_policy_experiment.md`,
  `energy_strategy_experiment.md`.
- `docs/experiments/` referenced in `ARCHITECTURE.md` and cross-reference
  documentation as the expected location for experiment files.

The divergence was a consequence of ADR-0010 creating files at the root
before ADR-0012 established the `docs/` convention for framework-level
documentation. After ADR-0012, the root `experiments/` directory was an
inconsistency: framework and participation documentation had moved to
`docs/`, but the experiment files had not followed.

This created two practical problems:

**Contributor confusion.** A contributor looking for experiments would find
references to `docs/experiments/` in ARCHITECTURE.md but the actual files
at `experiments/`. A contributor creating a new experiment might place it
in either location, depending on which reference they encountered first.

**CI path references.** The lint scripts — prior to their ADR-0015 rewrite —
referenced `docs/experiments/` as the expected path. With files at the root,
any automated check that depended on experiments being in `docs/experiments/`
would silently pass for the wrong reason.

A new experiment (`swipe_governance_experiment.md`, documenting a sentiment
signal collection approach for governance proposals) was being added in the
same work session. Adding it to the root `experiments/` directory would
perpetuate the inconsistency; adding it to `docs/experiments/` would create
a second split. The consolidation was the correct action before adding
new content.

---

## Decision

Move all experiment files from `experiments/` at the repository root to
`docs/experiments/`, and delete the root `experiments/` directory.

Update all cross-references to `experiments/` in:
- `README.md`
- `ARCHITECTURE.md`
- `ROADMAP.md`
- `CHANGELOG.md`
- `docs/how_to_participate.md`
- `docs/adr/0010-add-participation-layer.md`
- `docs/adr/0012-country-agnostic-governance-framework.md`
- `instances/canada/README.md`

Add `swipe_governance_experiment.md` to `docs/experiments/` as the fourth
experiment document.

### Swipe Governance Experiment

The swipe experiment document covers a sentiment signal collection mechanism
for governance proposals — a mobile-optimised interface where participants
swipe or tap to express quick support or opposition. The document explicitly
clarifies that this is a sentiment tool, not a voting system.

Key design principles documented:
- The mechanism produces signals, not decisions. No swipe outcome changes
  the state of a Proposal in the governance kernel's state machine.
- Metrics collected: `support_count`, `oppose_count`, `support_ratio`,
  `engagement_count`, `tap_through_rate`.
- Explicit risk documentation: oversimplification of complex proposals,
  popularity bias, bot manipulation, observer effect.
- Integration with the Review Process: sentiment data is surfaced to
  Reviewers as context, not as a decision input.

---

## Consequences

### Positive

- There is now one canonical location for experiment documents (`docs/experiments/`),
  consistent with the `docs/` convention for framework-level documentation
  established after ADR-0010.
- All cross-references in the repository now point to the correct location.
  Contributors will not encounter a mismatch between documentation and file
  locations.
- The swipe experiment document establishes a clear precedent for how to
  document an experimental governance mechanism: explicit scope (sentiment,
  not voting), defined metrics, documented risks, and integration notes for
  how signals relate to the kernel's formal processes.
- `validate_structure.py` (ADR-0015) checks for `docs/experiments/` as a
  required path. With the consolidation complete, this check passes on a
  clean repository.

### Negative

- The root `experiments/` directory's removal breaks any external links or
  bookmarks pointing to files in that location. File history is preserved
  (the move is a `git mv` equivalent), but the path changes.
- The three ADR-0010 experiment files are Canada-instance-specific content
  (`housing_policy_experiment.md`, `energy_strategy_experiment.md`) living
  in a framework-level directory (`docs/experiments/`). This inconsistency
  was noted in ADR-0012 as a future migration concern. The consolidation
  resolves the two-directory problem but does not resolve the instance-
  versus-framework classification. If experiment volume grows, a migration
  of Canada-specific experiments to `instances/canada/experiments/` should
  be revisited.

### Neutral / Watch Items

- The swipe governance experiment is explicitly experimental and carries
  documented risks. It should be reviewed at each governance cycle for
  whether it is worth pursuing to implementation or should be archived.
- `docs/experiments/` is currently treated as a framework-level directory.
  As the distinction between framework experiments and instance experiments
  becomes clearer with more instances, the directory structure may need
  to reflect that distinction.

---

## Alternatives Considered

### Alternative 1: Keep experiments at the repository root; update references

Description: Keep `experiments/` at the root and update all cross-references
in `ARCHITECTURE.md` and other documents to point to the root location.

Reason rejected: The `docs/` directory is the established location for
framework-level non-code documentation. Keeping experiments at the root
maintains an inconsistency with the documentation convention. The root of
the repository should contain only top-level configuration and entry-point
files — `README.md`, `CHANGELOG.md`, `ARCHITECTURE.md`, etc. A substantive
content directory at root level is out of place after ADR-0012.

### Alternative 2: Move experiments inside the Canada instance

Description: Move all experiment files to `instances/canada/experiments/`
on the grounds that the existing three experiments are Canada-specific content.

Reason rejected: The swipe governance experiment is framework-level content —
it is a general mechanism applicable to any governance instance, not specific
to Canada. Placing it in `instances/canada/` would imply it is Canada-specific.
The consolidation into `docs/experiments/` is the correct immediate action.
Migrating Canada-specific experiments later (if warranted) is a separate
decision that should be made when there is more content to distinguish.

### Alternative 3: Create both `docs/experiments/` and `instances/canada/experiments/`

Description: Establish both directories now — framework-level experiments in
`docs/experiments/`, Canada-specific experiments in `instances/canada/experiments/` —
and migrate existing files to the appropriate location.

Reason rejected: Classifying the existing three experiments (digital referendums,
housing policy, energy strategy) as framework-level versus Canada-specific requires
a judgement call that is not clearly motivated by current content. The housing
and energy experiments are Canada-specific in their examples but general in their
experimental methodology. Creating two directories now forces a premature
classification decision. The simpler consolidation (one directory) is correct
for current scale.

---

## Future Revisions

This ADR should be revisited if:

- A second instance is added and that instance creates experiment files, at
  which point the distinction between `docs/experiments/` (framework) and
  `instances/<name>/experiments/` (instance-specific) should be formalised.
- The Canada-specific experiments (`housing_policy_experiment.md`,
  `energy_strategy_experiment.md`) are migrated to `instances/canada/experiments/`
  as part of completing the Canada instance encapsulation noted in ADR-0012.
- The swipe governance experiment progresses to implementation or is archived,
  either of which warrants a note in this ADR and a CHANGELOG entry.
