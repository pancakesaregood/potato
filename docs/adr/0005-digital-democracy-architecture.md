# ADR-0005: Build a Digital Civic Participation Layer

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-03-15 |
| Deciders | Founding National Convention |
| Affected components | Member-facing interfaces, voting infrastructure, `/governance/digital-democracy/` |

---

## Context

The governance-as-code architecture (ADR-0001) stores all governance
documents in a Git repository and routes changes through a CI/CD pipeline.
This is operationally correct but creates a usability problem: direct
participation requires Git familiarity, Markdown authorship, and comfort
with a developer-oriented workflow.

This is an access problem. A party that builds its governance on infrastructure
that only technically literate contributors can navigate directly is not
meaningfully member-driven — it is developer-driven with a member-ratification
step at the end.

The solution is not to simplify the infrastructure (which would sacrifice the
audit, validation, and version-control properties that justify the
governance-as-code model) but to build an accessible participation layer on
top of it. The repository is the backend; members interact through interfaces
designed for non-technical users.

The secondary problem is voting. The party requires a mechanism for membership
votes that is:

- verifiable by individual members (I can confirm my vote was recorded)
- secret (no one else can determine how I voted)
- resistant to manipulation or stuffing
- accessible (no specialized hardware or software required)
- audit-trailable at the aggregate level

These requirements are in tension. No existing off-the-shelf solution fully
satisfies all of them. The architectural question is which tradeoffs to accept
and which to treat as hard requirements.

---

## Decision

We will build a digital participation layer consisting of three components:

### Component 1: Proposal Web Interface

A web application that allows any member to:

- browse current and historical proposals
- read full pipeline outputs for each proposal (lint reports, AI analyses,
  threat models, committee recommendations)
- submit new proposals through a structured form (which generates a
  correctly formatted pull request to the repository)
- comment on proposals during the deliberation period
- track the status of proposals they have submitted or endorsed

The web interface is a thin client over the Git repository. The canonical
record is always the repository; the interface renders it. It does not
maintain its own database of governance state.

### Component 2: Secure Remote Voting System

Membership votes will use an end-to-end verifiable (E2E-V) voting protocol.
Each member receives a unique, single-use voting credential. After voting,
members can verify that their ballot was recorded as cast and that the
final tally is consistent with all recorded ballots, without revealing
how individual members voted.

Vote records are published in `/proposals/PPP-PROP-YYYY-NNN/vote_record.json`
after the voting period closes. The Electoral Officer administers voting
and independently verifies the tally.

In-person voting at conventions uses the same credential system, with
provisions for members who need paper ballots or accessibility accommodations.

### Component 3: Governance Health Dashboard

A public dashboard (auto-generated from repository data by the CI/CD pipeline)
displaying:

- current constitutional compliance metrics
- proposal processing times vs. constitutional requirements
- vacancy rates for mandatory offices
- term limit compliance status
- complaint filing and resolution rates

The dashboard is read-only and generated from the append-only audit data in
`/audit_reports/`. It cannot be edited manually.

---

## Consequences

### Positive

- Members without Git or Markdown skills can participate fully in proposal
  submission, review, and voting through the web interface.
- The E2E-V voting system provides stronger verifiability guarantees than
  a simple online ballot.
- The health dashboard makes governance compliance continuously visible
  to all members, not just officers — a structural deterrent to institutional
  decay.

### Negative

- The web interface and voting system are additional infrastructure to build,
  host, secure, and maintain. They introduce attack surfaces that the
  repository-only architecture does not have.
- E2E-V voting protocols are technically complex to implement correctly.
  An incorrect implementation is worse than a simpler, better-understood
  system: it provides false assurance of verifiability.
- Remote-only voting excludes members who lack internet access or digital
  literacy. Paper ballot provisions must be operationally reliable, not
  just nominally present.

### Neutral / Watch Items

- The web interface must not become a shadow governance system. Any action
  taken through the interface (proposal submission, endorsement, comment)
  must have a corresponding, verifiable record in the repository.
- Accessibility requirements (WCAG 2.1 AA minimum, official languages support,
  screen reader compatibility) apply to all member-facing interfaces. These
  are non-negotiable requirements, not nice-to-haves.
- The voting infrastructure vendor or hosting arrangement must be disclosed
  to members and subject to periodic audit.

---

## Alternatives Considered

### Alternative 1: Repository-Only Participation (No Web Layer)

Description: Members participate directly through Git. Proposals are pull
requests. Votes are managed through GitHub Discussions or Issues. No
separate web interface.

Reason rejected: This would effectively restrict active participation to
technically literate contributors. A party with a Git-only participation
model is not member-driven. The governance-as-code architecture is the
infrastructure layer; it requires an accessible participation layer to
fulfill the party's democratic mandate.

### Alternative 2: Third-Party Voting Platform (Helios, OpaVote, etc.)

Description: Delegate all membership voting to a third-party online voting
service. Import results back into the repository after each vote.

Reason rejected: Third-party services control the canonical vote record,
which is incompatible with the principle that the repository is the
authoritative source of governance state. They also introduce a single
point of failure and vendor dependency for a core democratic function.
Third-party services may not provide the level of verifiability the party
requires. Using them for convenience while importing results creates a
split record that complicates audit.

### Alternative 3: In-Person Voting Only

Description: All binding membership votes take place at physical conventions.
No remote participation.

Reason rejected: In-person-only voting structurally excludes members in
remote regions, members with disabilities, and members who cannot afford
convention travel. For a party committed to regional inclusion and
accessibility, this is constitutionally inconsistent.

---

## Future Revisions

This ADR should be revisited if:

- The E2E-V voting protocol implementation is found to have a security flaw
  that cannot be remediated, requiring a different cryptographic approach.
- A well-audited, open-source voting infrastructure emerges that the party
  can self-host and that meets all requirements, replacing the current
  implementation.
- Membership grows to a scale where the current voting infrastructure has
  demonstrated capacity or performance issues.
- Canadian federal or provincial law imposes requirements on electronic
  voting by registered political parties.
