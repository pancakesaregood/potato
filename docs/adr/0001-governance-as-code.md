# ADR-0001: Treat Governance as Software Infrastructure

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-03-15 |
| Deciders | Founding National Convention |
| Affected components | All — this is a foundational architectural decision |

---

## Context

Political parties typically manage their governing documents — constitutions,
bylaws, policy platforms — as static PDFs, Word documents, or physical binders.
These formats share several structural failure modes:

- **No version history.** It is difficult or impossible to audit what changed,
  when, and why. Governance drift goes undocumented.
- **Opaque process.** Members cannot observe the state of a proposed change or
  its review history.
- **No automated validation.** Nothing prevents a proposed amendment from
  contradicting an existing provision until a human catches it — usually too late.
- **Single points of failure.** Documents live on a shared drive, a secretary's
  laptop, or a filing cabinet. Loss is irreversible.
- **Informal precedent.** Interpretive decisions accumulate outside the
  canonical document, creating a shadow constitution legible only to insiders.

These are not political problems. They are information architecture problems
with well-understood solutions in software engineering.

The question is whether those solutions — version control, structured review
pipelines, automated validation, open contribution models — can be applied to
a political party's governing structure without distorting the democratic
character of the institution.

---

## Decision

We will manage all PPP constitutional, governance, bylaw, and policy
documents as version-controlled plain text files in a public Git repository,
subject to a structured CI/CD review pipeline before any change is merged.

Specifically:

1. All governance documents are authored in Markdown and stored in `/docs/`.
2. Changes are proposed as pull requests against the `main` branch.
3. `main` is a protected branch. Direct pushes are prohibited. All changes
   require automated validation checks to pass and appropriate human review
   to complete before merge.
4. The commit history is the canonical audit log. No change is made without
   a corresponding, cryptographically signed commit.
5. Releases (ratified conventions, adopted amendments) are tagged with
   semantic version numbers and recorded in `CHANGELOG.md`.

This architecture applies to both substantive governance changes (amendments)
and system design changes (ADRs, pipeline configuration). The same
infrastructure governs both.

---

## Consequences

### Positive

- Complete, immutable, human-readable history of every governance change.
- Proposed changes are publicly observable at any point in their review
  lifecycle, not just at the moment they are voted on.
- Automated validation catches structural errors (constitutional conflicts,
  undefined roles, voting threshold anomalies) before human review time is
  spent.
- Contributors — including AI agents — can work asynchronously without
  coordination overhead.
- The repository is self-hosting: the governance system documents itself.

### Negative

- Git and Markdown are not universally familiar. Members who are not
  technically comfortable with these tools may be effectively excluded from
  direct participation unless accessible interfaces are built on top of the
  repository.
- Plain text does not enforce legal formality. Documents require additional
  processes (signing, notarization where applicable) to function as legal
  instruments under Canadian law.
- CI/CD pipeline infrastructure requires ongoing maintenance. If the pipeline
  breaks, governance changes are blocked until it is repaired.

### Neutral / Watch Items

- The governance-as-code metaphor is useful for system design but should not
  be over-extended into party communications. Members should interact with
  governance through accessible interfaces; the repository is the canonical
  backend, not the primary user interface.
- Relationship between repository governance and Elections Canada registration
  requirements must be maintained as a separate compliance stream.

---

## Alternatives Considered

### Alternative 1: Traditional Document Management (Google Drive / SharePoint)

Description: Store governance documents in a shared cloud drive. Track
versions manually with filename suffixes (`constitution_v3_FINAL_2.docx`).
Circulate changes by email for review.

Reason rejected: Provides no structural audit trail, no automated validation,
and no observable review process. Reproduces all the failure modes identified
in the context. Additionally, access control in shared drives tends to drift
toward informal hierarchy rather than constitutional authority.

### Alternative 2: Dedicated Governance Software (e.g., Loomio, pol.is)

Description: Use purpose-built civic participation software for document
management, proposal workflows, and voting.

Reason rejected: Purpose-built tools impose their own data models, which may
not match the party's constitutional requirements. They create vendor lock-in
for core governance infrastructure. They typically do not support automated
validation pipelines. The governance-as-code model can integrate with such
tools as a front-end while keeping the canonical record in version control.

### Alternative 3: Blockchain-based Immutable Ledger

Description: Record governance decisions on a public blockchain for
immutability and auditability.

Reason rejected: Git commit history with cryptographic signing provides
equivalent immutability for this use case without the operational complexity,
energy cost, or technical barrier of blockchain infrastructure. The added
complexity does not solve a real problem the simpler approach fails to address.

---

## Future Revisions

This ADR should be revisited if:

- Canadian law changes in a way that requires governance documents to be
  maintained in a specific format or through a specific process.
- The technical barrier of Git-based contribution demonstrably excludes a
  significant proportion of the membership in practice, and no accessible
  interface adequately bridges the gap.
- A purpose-built governance platform emerges that provides equivalent
  auditability, automated validation, and open contribution with lower
  technical overhead.
