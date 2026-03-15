# ADR-0002: Structure the Manifesto as Individual Policy Files

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-03-15 |
| Deciders | Founding National Convention |
| Affected components | `/docs/policy/`, CI/CD pipeline, proposal workflow |

---

## Context

A political party's platform or manifesto can be organized in two broad ways:

**Monolithic:** A single document containing all policy positions, published
as one file (or one PDF). Changes to any position require editing the whole
document, and the entire platform is released or withheld as a unit.

**Modular:** Each policy area is a separate, independently versioned file.
Changes to one area do not touch others. Positions can be proposed, reviewed,
amended, and ratified on independent timelines.

The PPPC's governance-as-code architecture (ADR-0001) creates a natural
pressure toward modularity: version control, pull requests, and automated
validation all work better on focused, bounded files than on large monolithic
documents. However, modularity introduces its own challenges: cross-cutting
consistency, discoverability, and the risk that individual policies drift into
contradiction.

The question is whether the advantages of modular policy files outweigh these
coordination costs for a party that is explicitly designed around open,
continuous policy development.

---

## Decision

We will organize the PPPC platform as a collection of individual policy
documents, one per policy domain, located in `/docs/policy/`. Each file:

1. Covers one defined policy domain (e.g., `agriculture.md`,
   `fiscal-policy.md`, `indigenous-relations.md`).
2. Carries its own version number, status, and last-updated metadata.
3. Can be proposed, amended, and ratified independently of other policy files.
4. References, but does not duplicate, content from related policy files using
   cross-reference links.

A `_index.md` file in `/docs/policy/` serves as the navigable table of
contents and provides a summary of the current status of each domain.

Consistency across files is enforced by:

- lint rules that detect inter-file contradictions (see ADR-0003)
- a required cross-reference check in the constitutional review stage
- a policy synthesis report generated at each National Convention

---

## Consequences

### Positive

- Changes to one policy area do not require a full platform review or
  block unrelated policy work.
- Reviewers can apply domain expertise to the specific file in scope without
  reading the entire platform.
- The history of any single policy position is fully traceable in its file's
  commit log, independently of changes to other areas.
- AI agents can be assigned to specific policy domains without context
  overload (see ADR-0004).
- Members with interest in one issue area can contribute meaningfully without
  mastering the entire platform.

### Negative

- Cross-cutting policies (e.g., climate provisions that appear in energy,
  agriculture, and trade) must be actively maintained for consistency.
  Divergence is possible if the review pipeline does not catch it.
- There is no single document that represents the party's complete platform
  at a given moment. Generating a unified view requires a build step.
- Versioning becomes more complex: the platform has no single version number,
  only a collection of per-file versions. A release tag on the repository is
  the practical substitute.

### Neutral / Watch Items

- The build step that produces a unified platform document (e.g., PDF, web
  page) should be part of the CI/CD pipeline, not a manual process.
- Policy domain boundaries will require definition and occasional revision as
  the platform grows. The initial domain list is provisional.

---

## Alternatives Considered

### Alternative 1: Single Monolithic Platform Document

Description: Maintain one `platform.md` file containing all policy positions,
amended in place over time.

Reason rejected: Any change to any policy position requires a review of the
entire document for side effects. Concurrent work on multiple policy areas
creates merge conflicts. The document grows to an unmanageable size. The
commit history becomes noisy — a change to fisheries policy appears in the
same commits as changes to tax policy, making either harder to trace.

### Alternative 2: Separate Repository per Policy Domain

Description: Each policy domain lives in its own repository with its own
CI/CD pipeline and governance.

Reason rejected: Introduces excessive coordination overhead for cross-cutting
policies. Constitutional consistency checks require access to all policy files
simultaneously; a multi-repo architecture complicates this. Inter-repository
pull request dependencies are operationally cumbersome and poorly supported
by standard tooling.

### Alternative 3: Database-Backed Policy Management

Description: Store policy positions in a structured database, with a web
interface for authoring and a rendering layer for output.

Reason rejected: Adds significant infrastructure complexity without adding
capability beyond what Git and Markdown provide for this use case. Moves the
canonical record out of the version-controlled repository, weakening the
audit trail established by ADR-0001. Requires a running service to access
governance documents — a hard dependency for core constitutional records.

---

## Future Revisions

This ADR should be revisited if:

- The number of policy files grows to a scale (>200) where the single-repo
  flat structure becomes navigable only with tooling, suggesting a sub-domain
  hierarchy or directory restructuring.
- Automated cross-file consistency checking proves insufficient to prevent
  material policy contradictions from persisting undetected.
- A convention adopts a policy area that does not map cleanly to a single file
  and requires a structural solution beyond what the current model supports.
