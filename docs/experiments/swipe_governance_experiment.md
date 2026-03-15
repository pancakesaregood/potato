# Swipe Governance Experiment

| Field | Value |
| --- | --- |
| Status | Experimental |
| Phase | Research |
| Type | Governance interaction design experiment |
| Related documents | `core/governance_kernel.md`, `core/proposal_system/` |

---

## Overview

This experiment tests whether a swipe-based card interface can lower the
friction of engaging with governance proposals — and whether the sentiment
signals it collects are useful inputs to the formal governance process.

Users are shown proposals as individual cards. Each card presents a
compressed summary of a proposal and supports a small set of quick
interactions:

| Interaction | Signal recorded |
| --- | --- |
| Swipe right | Support |
| Swipe left | Oppose |
| Tap | Read the full proposal |
| Comment | Participate in the attached discussion |
| Save | Follow the proposal for updates |

**This is not a voting system.** Swipe interactions collect sentiment
signals — expressions of early-stage opinion — not binding governance
decisions. No proposal is adopted or rejected based on swipe data. All
governance decisions remain in the formal proposal lifecycle defined in
`core/governance_kernel.md`.

The distinction matters. A vote is a Decision with a defined threshold
and a binding outcome. A swipe is a signal: an indication of initial
reaction that may or may not reflect considered opinion after full
deliberation. Treating them as equivalent would misrepresent the
governance process to participants and undermine the legitimacy of formal
decisions.

---

## Goals

The experiment aims to answer three research questions:

**1. Does simplified interaction increase engagement?**
The formal proposal workflow (reading a full proposal, leaving a structured
review comment, opening a pull request) requires effort and familiarity
with the tooling. If swipe interactions reach participants who would not
otherwise engage, that is a meaningful signal about the friction cost of
the current model.

**2. Can sentiment signals surface proposals worth deeper attention?**
A large volume of swipe interactions on a proposal — particularly a
high oppose-to-support ratio — may indicate that a proposal deserves
more deliberative attention before proceeding to a vote, even if it
would formally pass review. Conversely, strong early support may help
maintainers prioritise which proposals need community champions.

**3. Does early sentiment correlate with formal Decision outcomes?**
If swipe signals reliably predict the outcome of formal votes, they may
have limited additional value. If they diverge significantly, they reveal
something about the gap between casual and considered opinion — which is
itself useful information for governance design.

---

## User Interaction Model

A user engaging with the swipe interface sees one proposal at a time,
presented as a card. The card contains:

- **Proposal title** — the full title from the proposal document
- **Short summary** — a one to two sentence description of what the
  proposal changes and why (author-written or auto-extracted from the
  proposal's Problem Statement section)
- **Author** — the contributor who submitted the proposal
- **Policy area** — the domain tag from the proposal metadata
- **Link** — a direct link to the full proposal (GitHub PR or issue)

The card does not contain the full proposal text. Users who want to
engage substantively follow the link to the formal proposal.

Quick interactions (swipe left, swipe right, save) are available without
reading the full proposal. This is intentional: the experiment tests
whether the signal generated from card-level engagement has value, not
whether it substitutes for informed deliberation.

---

## Integration with Governance Workflow

The swipe interface sits alongside the formal governance process. It does
not replace any stage of the proposal lifecycle.

```
Proposal submitted to governance repository
        │
        ▼
Proposal enters OPEN state (formal review begins)
        │
        ├──────────────────────────────────────────┐
        │                                          │
        ▼                                          ▼
  Formal review process                  Proposal card published
  (reviewers, automated checks,          to swipe interface
   discussion, vote)                              │
        │                                         ▼
        │                                 Users swipe, comment, save
        │                                         │
        │                                         ▼
        │                                 Sentiment signals aggregated
        │                                 and published alongside
        │                                 proposal discussion
        │                                          │
        └──────────────────────────────────────────┘
        │
        ▼
  Formal Decision (vote)
  Proposal adopted or archived
```

Swipe data is visible to reviewers and to the proposal author. It is
published in the Transparency Log alongside the proposal record. It is
not a vote and carries no weight in the formal Decision outcome.

Maintainers may choose to note high-engagement or high-opposition swipe
data in their review commentary, but they are not required to act on it.
The formal process governs; the swipe signal informs.

---

## Metrics Collected

The following signals are recorded per proposal per user interaction:

| Metric | Description |
| --- | --- |
| `support_count` | Number of right-swipes |
| `oppose_count` | Number of left-swipes |
| `support_ratio` | `support_count / (support_count + oppose_count)` |
| `engagement_count` | Total swipe interactions (support + oppose) |
| `comment_count` | Number of comments submitted through the card interface |
| `save_count` | Number of users following the proposal for updates |
| `tap_through_rate` | Proportion of card views that resulted in a tap to the full proposal |

All metrics are aggregated and public. Individual swipe actions are
attributed to a member identity for abuse prevention but are not
individually published. Aggregate tallies are published in the
Transparency Log as part of the proposal record.

These are signals, not votes. They measure engagement and early sentiment.
They do not constitute a Decision.

---

## Risks and Limitations

This experiment has known limitations. They are documented here because
governance tooling that obscures its own weaknesses causes the most harm.

**Oversimplification of complex proposals**
Many governance proposals involve genuine tradeoffs that resist a
support/oppose framing. A user who has only read a card summary and
swiped right may hold a different view after reading the full proposal
and its discussion. Swipe signals from card-level engagement may not
reflect the opinion that would emerge from informed deliberation.

The experiment tracks `tap_through_rate` partly to measure how often
this gap occurs. If most users swipe without reading the full proposal,
the signal should be weighted accordingly.

**Popularity bias**
Proposals that are easy to understand at card length, or that address
emotionally salient issues, will attract more engagement than technically
complex or procedural proposals. A constitutional amendment touching
a high-salience issue will outperform a bylaw correction on membership
renewal dates regardless of their relative importance. Swipe volume
is not a proxy for governance significance.

**Bot and coordinated manipulation**
A swipe interface that influences the visibility of proposals creates
an incentive to manipulate it. Coordinated accounts or automated
swipe patterns could artificially inflate or suppress support signals.
This risk cannot be fully mitigated at the experiment stage. Member
authentication and rate limiting are baseline protections, not
guarantees.

**Sentiment misinterpretation**
An oppose signal on a proposal may mean "I oppose this policy",
"I oppose the framing of this card", "I oppose this being discussed
now", or "I accidentally swiped left." The swipe interface collapses
these distinct reactions into a single signal. Reviewers should treat
oppose signals as an invitation to investigate, not as a reliable
measurement of member opposition.

**Observer effect**
Publishing live swipe tallies alongside a proposal in formal review
may influence reviewer behaviour and vote outcomes in ways that are
difficult to measure. Reviewers who see high early opposition may anchor
on that signal. This is a structural risk of any public sentiment
aggregation mechanism.

This experiment is exploratory. The goal is to generate enough data
to assess whether these risks outweigh the participation benefits —
not to assert in advance that they do not.

---

## Future Possibilities

The following extensions are not part of the current experiment scope.
They are documented to make the research direction legible and to invite
feedback on whether these directions are worth pursuing.

**Proposal momentum scoring**
A time-weighted engagement signal that captures whether a proposal is
gaining or losing attention over its review window. A proposal with
rising engagement late in its review window may warrant an extension;
one with declining engagement may indicate contributor fatigue.

**Reputation-weighted signals**
Weighting swipe signals by the reviewer role or governance history of
the swiper. A signal from a Governance Reviewer would carry more
informational weight than one from a first-time visitor, without
giving either group a formal veto. This raises questions about whether
weighting signals by reputation reintroduces the participation barriers
the interface is intended to lower.

**Integration with formal proposal intake**
Generating a structured discussion issue automatically when a proposal
crosses a high-opposition threshold, to surface concerns that have not
yet been articulated in the formal review.

**Moderation tooling**
Automated flagging of engagement patterns consistent with coordinated
manipulation, with manual review before signals from flagged accounts
are included in published tallies.

None of these extensions should be implemented before the base
experiment has produced enough data to evaluate the core assumption:
that swipe-level sentiment signals have useful informational content
for governance participants.

---

## How to Contribute

This experiment is open for feedback and design contribution.

- **To comment on the design:** open a **Governance Discussion** issue
  referencing this document.
- **To propose a change to the experiment scope:** open a
  **Policy Proposal** PR modifying this document with your proposed
  changes and rationale.
- **To propose implementation:** see `core/proposal_system/` for the
  proposal template. Technical implementation proposals should address
  the manipulation and observer-effect risks documented above.
