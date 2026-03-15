# ADR-0010: Add Participation Layer and Community Activation Infrastructure

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-03-15 |
| Deciders | Repository maintainers |
| Affected components | `docs/`, `experiments/`, `.github/ISSUE_TEMPLATE/`, `ROADMAP.md`, `README.md` |
| Implemented in | commit `8dda53d` |

---

## Context

After the initial architecture phase (ADRs 0001–0008), the repository
contained a complete governance infrastructure: constitution, bylaws,
manifesto articles, CI pipeline, ADRs, and technical addendums.

What it lacked was a participation surface. The repository was navigable
by contributors who already understood its architecture, but provided no
clear entry point for someone arriving with a policy idea and no prior
knowledge of the system. Specifically:

- There was no plain-language explanation of how to submit a proposal,
  open a discussion, or contribute a manifesto edit.
- There were no starter activities — lower-stakes entry points for
  first-time contributors who want to try the workflow before proposing
  a substantive change.
- GitHub Issue templates existed for governance amendments and policy
  resolutions, but not for the more common cases: raising a policy question
  or discussing the governance system itself.
- There was no definition of contributor roles — no answer to the question
  "how does someone go from first commit to trusted maintainer?"
- There was no published roadmap showing where the project was going.

A repository that only insiders can navigate has failed its stated purpose
of open governance. Closing this gap was a prerequisite for any community
activation.

---

## Decision

We will add the following participation infrastructure in a single commit:

**Documentation:**
- `docs/how_to_participate.md` — plain-language guide to all four
  contribution paths (issue, proposal, PR, review), step-by-step proposal
  workflow, CI check explanations, and a list of common mistakes to avoid.
- `docs/governance_roles.md` — five-level role ladder (Visitor → Contributor
  → Policy Author → Governance Reviewer → Maintainer) with specific,
  checkable advancement criteria and AI agent terms.
- `ROADMAP.md` — four-phase development roadmap with Phase 1 marked
  complete and Phase 2 (community activation) as the active phase.

**Starter experiments:**
- `experiments/digital_referendums.md`
- `experiments/housing_policy_experiment.md`
- `experiments/energy_strategy_experiment.md`

Experiments are structured debate spaces: they define a contested policy
question, present the genuine tradeoffs without taking a position, and
provide specific prompts for contributors. They are lower-stakes than
amending a manifesto article and designed as the recommended entry point
for first-time contributors.

**Issue templates:**
- `.github/ISSUE_TEMPLATE/policy_proposal.yml` — structured proposal intake
  with policy area dropdown, tradeoffs field, Charter notes, and readiness
  checkboxes.
- `.github/ISSUE_TEMPLATE/policy_question.yml` — low-friction
  debate-opening template that requires no pre-formed answer.
- `.github/ISSUE_TEMPLATE/governance_discussion.yml` — meta-discussion
  template for process and system design questions, distinct from policy
  content.

**Updated files:**
- `README.md` rewritten around a ten-second comprehension target with a
  flow diagram, jump table, and experiments highlighted as the entry point.
- `ARCHITECTURE.md` extended with three new Mermaid diagrams.

---

## Consequences

### Positive

- First-time contributors have a clear, documented path from idea to merged
  proposal that does not require prior knowledge of the system.
- The role ladder creates a legible progression that answers "how do I
  become a maintainer?" with specific criteria rather than vague merit.
- Experiments provide a contribution surface with immediate value: they
  can receive substantive policy debate before any manifesto articles are
  amended.
- Structured issue templates produce better-quality issues, reducing the
  effort required from maintainers to extract the information needed for
  review.

### Negative

- The governance roles document creates expectations. If the project does
  not follow through on the advancement criteria — if role changes do not
  happen through the documented process — the document becomes misleading.
- Experiments require maintenance. An experiment that sits with no
  contributions becomes a signal that the project is inactive.
- A detailed participation guide creates an obligation to keep it accurate
  as the workflow evolves. Outdated onboarding documentation is worse than
  no documentation, because it misleads rather than just failing to inform.

### Neutral / Watch Items

- The ROADMAP's Phase 2 completion criteria ("the project can sustain
  contribution activity without founding contributors actively involved in
  every interaction") is deliberately qualitative. A quantitative version
  should be agreed before Phase 2 is declared complete.
- The three experiment topics (referendums, housing, energy) are
  Canada-specific. After the framework refactor (ADR-0012), experiments
  should be placed within instance directories. The existing files should
  migrate to `instances/canada/experiments/` in a future commit.

---

## Alternatives Considered

### Alternative 1: Participation-first architecture (documentation before infrastructure)

Description: Build the participation layer before the governance
infrastructure, so the first thing contributors encounter is the
contribution workflow rather than constitutional documents.

Reason rejected: Participation infrastructure without a governance substrate
is a discussion forum without structure. The constitutional and bylaw layer
established in the first phase defines what proposals are changing, what
review means, and what "adopted" means. Building participation on top of
that foundation is the correct order.

### Alternative 2: Single onboarding document covering all roles

Description: Merge `how_to_participate.md` and `governance_roles.md` into
one document.

Reason rejected: The two documents serve different functions. One explains
the workflow for any contributor right now; the other explains the long-term
role structure. Combining them produces a document that is either too long
for first-time contributors or too thin on role detail to be actionable.

### Alternative 3: Experiments as proposal PRs rather than permanent files

Description: Run experiments as open GitHub Discussions or Issues rather
than committed files with debate prompts.

Reason rejected: Files in the repository are versioned, linkable, and
visible to contributors who are not yet participants. Issues and Discussions
disappear below the fold quickly. The experiment files also serve as
structural examples of how a well-framed policy debate looks, which is
useful for contributors drafting their own proposals.

---

## Future Revisions

This ADR should be revisited if:

- Participation metrics after the first contribution cycle show that the
  onboarding path is not working — that contributors arrive but do not
  successfully complete a first contribution.
- The governance roles framework proves unworkable in practice (role
  advancement requests are ignored, criteria are disputed, or the process
  creates conflict rather than clarity).
- The experiment files are not migrated to `instances/canada/experiments/`
  after the framework refactor, at which point the inconsistency should be
  resolved.
