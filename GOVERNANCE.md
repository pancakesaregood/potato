# Governance

This document explains how the Potato governance framework repository is
governed — how decisions are made, who makes them, and how the framework
itself changes over time.

This repository is an open governance laboratory. It explores
governance-as-code: the practice of managing democratic processes through
version-controlled text, open contribution workflows, and automated
validation. The repository applies those same principles to its own
development. How the framework evolves is governed by the framework.

---

## Roles

Five roles are defined in this repository. They describe what someone is
currently doing, not a title or a permanent status.

```
Visitor → Contributor → Policy Author → Governance Reviewer → Maintainer
```

| Role | What they do |
| --- | --- |
| **Visitor** | Reads the repository. No contribution required. |
| **Contributor** | Opens issues, comments on PRs, submits proposals and documentation. |
| **Policy Author** | Sustained track record of substantive proposals and reviews. |
| **Governance Reviewer** | Provides constitutional and structural review. Can block a PR. |
| **Maintainer** | Merge authority. Responsible for repository health and direction. |

Full role definitions, advancement criteria, conduct standards, and the
role change process are in [`docs/governance_roles.md`](docs/governance_roles.md).

AI agents may contribute as Contributors under the terms in
[`AGENTS.md`](AGENTS.md). Agents may not merge PRs and must label their
contributions clearly.

---

## Contribution Process

No prior approval is required to open an issue or submit a pull request.
The standard flow is:

```
Idea
 ↓
Issue opened (using a template in .github/ISSUE_TEMPLATE/)
 ↓
Discussion
 ↓
Draft proposal or document update
 ↓
Pull Request
 ↓
Automated CI checks
 ↓
Maintainer review
 ↓
Merge or revision
```

Discussion before structural changes is expected, not optional. A PR that
arrives without a preceding issue or discussion is harder to review and
slower to merge.

The full contribution guide is in
[`docs/how_to_participate.md`](docs/how_to_participate.md).

---

## Proposal Lifecycle

Policy proposals and governance changes move through a defined lifecycle.
The minimum required states are:

```
Draft → Submitted → Under Review → Decided → [Adopted | Archived]
```

Proposals that do not pass are archived with the outcome recorded, not
deleted. The full history of every proposal — including those that failed
— is part of the permanent governance record.

The proposal system, template, and lifecycle rules are in
[`core/proposal_system/`](core/proposal_system/).

---

## Governance Kernel Stability

The governance kernel is in [`core/governance_kernel.md`](core/governance_kernel.md).

It defines the minimal primitives and rules that all governance activity
depends on: Member, Proposal, Public Discussion, Review Process, Decision
Mechanism, Governance Cycle, Transparency Log, and Personal Data. It also
defines the data governance agreement and universal minimum rules for
review thresholds and transparency.

The kernel is intended to be **small and stable**. It changes rarely and
only with strong justification. A change to the kernel affects every
instance built on the framework — it is the highest-consequence change
category in this repository.

Changes to the kernel require:

- A preceding Governance Discussion issue making the case for the change
- A pull request that documents the reasoning explicitly
- Review by at least two Governance Reviewers or Maintainers
- An Architecture Decision Record if the change is structural (see
  [`docs/adr/`](docs/adr/))

Instances built on the framework may extend the kernel. They may not
relax the minimum rules it defines. See Section 7 of the kernel document
for the full extensibility model.

---

## Architecture Decision Records

Significant structural decisions are documented as Architecture Decision
Records (ADRs) in [`docs/adr/`](docs/adr/).

An ADR records: what was decided, why, what alternatives were considered,
and what consequences follow. ADRs are not reopened — if a decision needs
to change, a new ADR supersedes the old one.

When to write an ADR:

- Any change to the governance kernel
- Any change to the repository's directory structure
- Any change to the CI/CD pipeline that affects how proposals are validated
- Any decision that future contributors will need to understand to make
  good decisions themselves

The ADR template and index are in [`docs/adr/README.md`](docs/adr/README.md).

---

## Experiments

Governance experiments are documented in
[`docs/experiments/`](docs/experiments/).

An experiment is a structured space for exploring a governance question or
interaction model that is not yet ready for adoption into the kernel or a
policy article. Experiments:

- document a contested question and its genuine tradeoffs
- do not change the governance kernel or any instance's policy
- are not proposals — they precede proposals
- may be adopted into the framework through the normal proposal process
  if they produce findings that warrant it

Adding an experiment does not require the same review threshold as a
kernel or policy change. The bar is: is the question well-framed, are the
tradeoffs honest, and does it add something not already covered?

---

## Decision Model

The default decision model is **maintainer consensus after open discussion**.

| Decision type | Process |
| --- | --- |
| Minor (docs fix, clarification) | Any Maintainer may merge after CI passes |
| Moderate (new template, workflow change) | Open discussion issue + at least one other Maintainer review |
| Major (kernel change, ADR, constitutional) | Governance Discussion issue + minimum two Governance Reviewer or Maintainer reviews + ADR |
| Repository governance (this document) | Same as Major |

Consensus means no Maintainer with standing has an unresolved objection.
It does not require unanimous enthusiasm. A Maintainer who disagrees but
does not object after a reasonable discussion window is not blocking.

If consensus cannot be reached, the question remains open. There is no
tie-breaking mechanism by design — unresolved disagreement is information
about the proposal, not a process failure.

---

## Transparency

All governance activity in this repository is visible and traceable:

- **Git history** — every change to every file is permanently recorded
  with author, timestamp, and commit message.
- **Issues** — all discussion preceding a change is linked from the PR
  or recorded in the issue thread.
- **Pull requests** — review comments, CI results, and merge decisions
  are public.
- **ADRs** — structural decisions are documented with reasoning and
  alternatives considered.
- **CHANGELOG.md** — significant merges, role changes, and governance
  events are recorded in [`CHANGELOG.md`](CHANGELOG.md).

No governance decision in this repository should be untraceable. If a
rule is currently in force but its origin cannot be found in the commit
history, ADRs, or issue threads, that is a gap in the governance record
and should be corrected.

---

## Evolution

The governance of this repository may change. The process for changing it
is the same as for any other structural change: open a Governance Discussion
issue, make the case, allow for review, and document the reasoning.

This document is itself subject to that process. If something here is
wrong, incomplete, or no longer reflects how the repository works, open a
Governance Discussion issue referencing this file.

The current governance model is version-controlled at this path:
[`GOVERNANCE.md`](GOVERNANCE.md). Its full change history is in the git log.
