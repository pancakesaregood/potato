# ADR-0009: Rename `tech_governance/` to `civic_infrastructure/`

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-03-15 |
| Deciders | Repository maintainers |
| Affected components | `civic_infrastructure/`, `AGENTS.md`, `CONTRIBUTING.md`, `ARCHITECTURE.md`, `README.md` |
| Implemented in | commit `78a66e7` |

---

## Context

The directory originally named `tech_governance/` contained addendums on
digital systems relevant to the project: governance protocols, decision
workflows, cryptography, interoperability, civic income models, and smart
contracts.

The name `tech_governance/` was problematic for two reasons:

**Scope ambiguity.** "Tech governance" is a widely-used term meaning the
governance *of* technology (data regulation, platform accountability, AI
policy). The directory's actual purpose is the opposite: it describes
technology *for* governance. A reader encountering `tech_governance/` for
the first time would reasonably expect to find policy positions on the
technology sector, not implementation addendums for civic participation
systems.

**Crypto governance association.** When the project still contained
tokenomics and distributed ledger documents (removed in ADR-0008), the
`tech_governance/` name plausibly described blockchain-based governance
mechanisms. After that removal, the name carried a residual association with
that direction even though the content no longer supported it.

The directory's actual scope — infrastructure that enables civic participation,
democratic transparency, and open governance processes — is better described
by a name that reflects civic purpose rather than technical subject matter.

---

## Decision

We will rename `tech_governance/` to `civic_infrastructure/`.

All cross-references to `tech_governance/` in `AGENTS.md`, `CONTRIBUTING.md`,
`ARCHITECTURE.md`, `README.md`, and any other repository documents will be
updated to `civic_infrastructure/` at the same time.

The rename will be executed as a git rename to preserve file history.

---

## Consequences

### Positive

- The directory name accurately describes its purpose: infrastructure that
  supports civic governance, not governance of technology sectors.
- New contributors reading the repository structure for the first time will
  correctly understand what the directory contains before opening any file.
- The crypto governance association carried by the old name is removed.

### Negative

- Any external links, bookmarks, or cached references to `tech_governance/`
  paths will break. This is acceptable given the project's early stage and
  the absence of stable external API consumers.
- Cross-references in multiple documents must be updated in a coordinated
  pass. A partial rename would leave broken links.

### Neutral / Watch Items

- The rename does not change the content or structure of any file within
  the directory. It is a pure path change.
- Future additions to `civic_infrastructure/` should continue to follow
  the established headings: `## Summary`, `## Design Principles`,
  `## Technical Mechanisms`, `## Validation Targets`.

---

## Alternatives Considered

### Alternative 1: `digital_governance/`

Description: Rename to `digital_governance/` to emphasise the digital nature
of the addendums.

Reason rejected: "Digital governance" has the same ambiguity as "tech
governance" — it can mean governance of digital systems rather than digital
tools for governance.

### Alternative 2: `platform/`

Description: Use a short, neutral name that does not carry subject-matter
implications.

Reason rejected: Too generic. `platform/` gives no information about what
the directory contains. A contributor would need to open files before
understanding the scope.

### Alternative 3: Keep `tech_governance/`

Description: Accept the ambiguity and rely on the README to clarify scope.

Reason rejected: Directory names are the first navigation signal a contributor
encounters. Relying on documentation to correct a misleading name is a
weaker signal architecture than simply choosing a better name.

---

## Future Revisions

This ADR should be revisited if:

- The directory's scope expands significantly to include policy positions
  on technology sectors, at which point a more differentiated structure
  (separate directories for civic infrastructure and technology policy)
  would be appropriate.
