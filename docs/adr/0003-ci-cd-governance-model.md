# ADR-0003: Enforce Governance Changes Through a CI/CD Pipeline

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-03-15 |
| Deciders | Founding National Convention |
| Affected components | `.github/workflows/`, `lint_rules/`, all governance documents |

---

## Context

In traditional party governance, the quality of a proposed change depends
entirely on the attention of the humans reviewing it. There is no systematic
check for:

- internal contradictions with existing rules
- undefined terms or roles
- voting thresholds below constitutional minimums
- provisions that would concentrate power in ways the constitution prohibits
- language ambiguous enough to support contradictory interpretations

By the time a problematic amendment reaches a convention floor, the review
window is narrow and the political pressure to vote is high. Structural
defects get adopted.

Software projects face an analogous problem: human reviewers miss bugs, style
violations, and regressions. The solution is a structured pipeline that runs
automated checks before human review time is spent. The same logic applies
to governance documents.

The question is how to design a pipeline that enforces structural quality
without blocking legitimate governance work or creating a technical barrier
that only specialists can navigate.

---

## Decision

We will require all changes to documents in `constitution/`, `governance/`,
`policy/`, and `proposals/` to pass through a defined multi-stage CI/CD
pipeline before merging to `main`.

The pipeline stages are:

| Stage | Type | Blocking |
| --- | --- | --- |
| 1. Proposal validation | Automated | Yes |
| 2. Governance lint | Automated | Yes (on ERROR; warnings pass) |
| 3. Constitutional review | AI-assisted + human panel | Yes |
| 4. Comparative analysis | AI-assisted | No (advisory) |
| 5. Adversarial threat modeling | AI-assisted + human panel | Yes (on Critical) |
| 6. Simulation testing | Automated | No (advisory) |
| 7. Human review | Human (Policy Committee) | Yes |
| 8. Membership vote | Human (full membership) | Yes |
| 9. Merge and deploy | Automated bot | — |

Branch protection rules on `main` enforce that stages 2, 3, 5, 7, and 8
must all pass. No human — including repository administrators — can bypass
them by pushing directly.

The governance lint ruleset (`/lint_rules/`) is itself version-controlled and
subject to the same pipeline. Changes to the rules that would weaken
enforcement require a constitutional amendment threshold vote.

---

## Consequences

### Positive

- Structural errors are caught automatically before human review, reducing
  the cognitive load on reviewers and the risk of defects being adopted under
  time pressure.
- The pipeline creates an observable, auditable record of every check run on
  every proposal. The review history is permanent and public.
- Adversarial threat modeling (stage 5) systematically stress-tests proposals
  against known exploitation patterns — a check that informal review rarely
  performs.
- Power concentration attempts are detected mechanically (lint rule RULE-001)
  before they reach a vote.

### Negative

- Pipeline infrastructure requires maintenance. If GitHub Actions, the lint
  engine, or the AI-assisted review stages become unavailable, governance
  changes are blocked until the pipeline is repaired.
- Automated stages can produce false positives — lint warnings on legitimate
  provisions. A process for disputing or overriding specific warnings is
  required, and that process is itself a potential bypass vector.
- The pipeline adds latency to governance changes. An amendment that might
  have passed at a weekend convention now takes the full pipeline duration.
  This is a deliberate tradeoff (quality for speed) but has real costs in
  time-sensitive situations.

### Neutral / Watch Items

- Emergency override procedures must be defined. The constitution specifies
  an emergency powers track with a mandatory 60-day sunset; the pipeline must
  support a fast path for this track without eliminating validation entirely.
- The AI-assisted stages (3, 4, 5) produce advisory or contributory outputs,
  not binding decisions. Human panels retain final authority at every
  human-review stage. This boundary must be preserved and documented.

---

## Alternatives Considered

### Alternative 1: Manual Review Only (Committee-Based)

Description: All proposed changes are reviewed by a standing constitutional
committee before proceeding to a vote. No automated checks.

Reason rejected: Manual review is as good as the reviewers' attention,
knowledge, and independence. It does not scale with membership or proposal
volume. It creates a bottleneck that can be captured or delayed strategically.
Historical evidence from comparable parties (Green Party of Canada, 2020–2021;
Canadian Alliance, 2000–2003) shows that manual constitutional review failed
to catch structurally problematic provisions before they caused crises.

### Alternative 2: Automated Checks Only (No Human Stages)

Description: Changes that pass all automated validations are automatically
merged after a waiting period.

Reason rejected: Automated checks can only catch classes of problems they
are programmed to detect. Novel governance risks, contextual judgment, and
democratic legitimacy all require human deliberation. Removing human review
stages would undermine the democratic character of the institution the
pipeline is designed to protect.

### Alternative 3: Opt-in Validation (Authors Choose Which Checks to Run)

Description: Validation checks are available as tools but not required.
Authors are encouraged but not required to run them.

Reason rejected: Validation that is optional will not be run on the proposals
that most need it. Adversarial actors will specifically avoid running checks
that would detect their proposals' structural problems. Enforcement must be
structural, not reputational.

---

## Future Revisions

This ADR should be revisited if:

- GitHub changes its branch protection model in a way that makes the current
  enforcement mechanism unworkable.
- Governance lint false-positive rates rise to a level that materially impedes
  legitimate proposal processing, suggesting the ruleset needs recalibration.
- A stage of the pipeline is demonstrated to be systematically gamed or
  bypassed in practice, requiring a redesign of that stage's enforcement.
- The party adopts a self-hosted repository infrastructure, requiring
  migration of the pipeline to a different CI/CD system.
