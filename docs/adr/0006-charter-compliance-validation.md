# ADR-0006: Automate Canadian Charter of Rights and Freedoms Compliance Checks

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-03-15 |
| Deciders | Founding National Convention |
| Affected components | `lint_rules/`, CI/CD pipeline stage 2, constitutional review corpus |

---

## Context

The Canadian Charter of Rights and Freedoms imposes constraints on the
exercise of political power in Canada. While the Charter applies directly
to government action and not to the internal rules of private organizations
such as political parties, there are two practical reasons why Charter
compliance is relevant to the PPPC's governance documents:

**Reputational and democratic legitimacy.** A party that adopts internal
governance rules that visibly contradict Charter rights — equal voting weight,
freedom of expression, freedom of association, equality rights — undermines
its credibility to advocate for those rights in public policy. Internal
governance that contradicts the party's stated democratic principles is a
structural hypocrisy risk.

**Legal exposure in edge cases.** Courts have in some circumstances applied
Charter principles to political parties, particularly in cases involving
candidate nomination procedures and membership rights where the party
exercises a quasi-governmental function in the electoral process. The boundary
is not settled law. Governance documents that would clearly fail Charter
scrutiny if applied by a government are potential litigation targets.

The question is whether Charter compliance checks can be automated to a
useful degree, or whether the legal complexity of Charter analysis requires
purely manual legal review.

---

## Decision

We will include automated Charter compliance checks as a component of the
governance lint stage (pipeline stage 2), operating as a distinct check
category called `Charter-Lint`.

Charter-Lint checks are structured in two tiers:

### Tier 1: Hard Structural Checks (ERROR — blocking)

Provisions that almost certainly fail Charter scrutiny regardless of context.
These trigger blocking errors.

| Check | Charter Right |
| --- | --- |
| Delegate allocation formulas where per-capita voting weight varies by more than 3:1 across ridings without documented justification | Section 3 — Democratic Rights |
| Voting eligibility criteria that exclude Canadian citizens based on ethnicity, religion, gender, or protected ground | Section 15 — Equality Rights |
| Discipline provisions with no procedural fairness requirements | Section 7 analogue (procedural fairness) |

### Tier 2: Risk Flags (WARNING — non-blocking)

Provisions with contextual Charter risk that require human legal review.
These generate warnings that travel with the proposal through subsequent
pipeline stages.

| Check | Charter Right |
| --- | --- |
| Discipline clauses with undefined or vague conduct standards | Section 2(b) — Freedom of Expression |
| Blanket prohibitions on party membership that are not narrowly tailored | Section 2(d) — Freedom of Association |
| Financial entry barriers to candidate participation without hardship relief | Section 15 — Equality Rights |
| Emergency provisions without defined scope or sunset | Section 1 — Reasonable Limits |

Charter-Lint warnings are displayed in the proposal review interface with:

1. The specific provision flagged
2. The Charter right at issue
3. A plain-language explanation of the risk
4. A risk level (High / Medium / Low)
5. A suggested remediation

Charter-Lint outputs are advisory inputs to the constitutional review panel,
not legal opinions. The party shall maintain a relationship with legal counsel
for review of proposals that trigger High-risk Charter warnings.

---

## Consequences

### Positive

- Charter conflicts are surfaced at the drafting stage, before political
  capital is invested in a flawed proposal.
- The lint output provides a structured brief for legal review when it is
  needed, reducing the work of counsel and the cost of legal advice.
- Documenting the Charter analysis for each governance change creates a
  compliance record that demonstrates good-faith effort.
- Proposals that pass Charter-Lint without warnings can proceed with
  reduced legal overhead.

### Negative

- Automated Charter analysis is not legal advice. An automated check that
  passes a provision does not mean the provision is legally compliant.
  Over-reliance on Charter-Lint could create false confidence and reduce
  the frequency of actual legal review.
- Charter jurisprudence evolves. A lint rule that correctly reflects the
  law today may be incorrect after a Supreme Court decision. The ruleset
  requires active maintenance by legally informed contributors.
- The boundary between what the Charter requires of governments versus
  private organizations is legally contested. Some Charter-Lint rules
  may flag provisions that would be legally permissible for a private party.
  The conservative design choice (flag more, not less) trades false positives
  for reduced legal exposure.

### Neutral / Watch Items

- Charter-Lint rules are themselves governance documents and are subject to
  the full CI/CD pipeline when modified. Weakening a Charter-Lint rule
  requires the same review as a constitutional amendment.
- The lint output should always clearly state that it is not legal advice
  and recommend independent legal review for High-risk warnings.
- French-language Charter obligations under Section 16–20 (official languages)
  apply to the party's public-facing communications; compliance with these
  sections should be tracked separately from governance document compliance.

---

## Alternatives Considered

### Alternative 1: Manual Legal Review of All Proposals

Description: All governance proposals are reviewed by party legal counsel
before proceeding to the membership vote stage. No automated Charter checks.

Reason rejected: Legal review of every proposal is prohibitively expensive
for a volunteer political party. It creates a bottleneck that can delay
governance work and concentrates Charter interpretation in a single advisor.
Automated checks do not replace legal review for high-risk provisions;
they filter the volume so legal review is targeted where it is needed.

### Alternative 2: Charter Compliance as a Convention Responsibility

Description: Convention delegates are responsible for identifying and raising
Charter concerns during debate. No automated checks or pre-vote review.

Reason rejected: Convention delegates are not legal experts. Charter analysis
under time pressure on a convention floor is not reliable. Historical examples
(nomination rules that were subsequently challenged in court, membership
criteria that attracted human rights complaints) demonstrate that this approach
fails to catch real problems.

### Alternative 3: Exclude Internal Party Governance from Charter Review

Description: Because the Charter does not directly apply to private
organizations, do not include Charter compliance as a governance requirement.

Reason rejected: The party's founding principles commit it to democratic
rights, equal participation, and freedom of expression. Internal governance
that contradicts these principles is a failure of institutional integrity
regardless of legal technicality. Additionally, the legal boundary is
unsettled enough that excluding Charter analysis entirely is not a defensible
risk management position.

---

## Future Revisions

This ADR should be revisited if:

- The Supreme Court of Canada issues a decision that substantially clarifies
  (in either direction) the application of the Charter to political party
  governance, requiring the lint ruleset to be updated accordingly.
- A Charter-Lint rule is found to produce false positives at a rate that
  materially impedes legitimate proposals, requiring recalibration of that
  rule's threshold.
- The party establishes a standing legal review relationship that allows
  all High-risk warnings to receive timely counsel review, which might
  allow some Tier 2 warnings to be reclassified to Tier 1.
