# Governance Cycles

Governance in this framework operates in repeated cycles. A governance cycle
is a defined period during which proposals are submitted, reviewed, debated,
voted on, and either adopted or archived. At the end of each cycle, the
policy state is tagged as a versioned release.

This model treats policy as iterative rather than final. A position adopted
in one cycle can be revised in a later one when evidence, community
understanding, or circumstances change. No policy is permanent. Everything
can be improved.

## Why cycles

Traditional governance treats decisions as events: a law is passed, a policy
is adopted, and the question is considered settled until a crisis forces
revisiting it. This model has well-documented failure modes:

- Policies become outdated but are not revisited because no mechanism exists.
- Changes accumulate through informal workarounds rather than formal revision.
- Evidence that a policy is failing does not automatically trigger review.

The cycle model treats governance as a continuous process rather than a series
of one-off events. Every ratified policy is the current best version, not a
permanent answer.

## Cycle structure

A governance cycle has six phases:

```
┌─────────────────────────────────────────────────────────────────┐
│                    GOVERNANCE CYCLE                             │
├──────────────┬──────────────────────────────────────────────────┤
│ 1. OPEN      │ Cycle begins. Proposal submission window opens.  │
│              │ Prior cycle outcomes are published.              │
├──────────────┼──────────────────────────────────────────────────┤
│ 2. DRAFT     │ Members write and refine proposals.              │
│              │ Discussion issues are open. No votes yet.        │
├──────────────┼──────────────────────────────────────────────────┤
│ 3. REVIEW    │ All submitted proposals enter formal review.     │
│              │ Automated checks run. Human review begins.       │
│              │ Minimum 14-day window per proposal.              │
├──────────────┼──────────────────────────────────────────────────┤
│ 4. VOTE      │ Eligible members vote on reviewed proposals.     │
│              │ Results are published with full tallies.         │
├──────────────┼──────────────────────────────────────────────────┤
│ 5. MERGE     │ Adopted proposals are merged to main branch.     │
│              │ Failed proposals are archived with outcome notes.│
├──────────────┼──────────────────────────────────────────────────┤
│ 6. REPORT    │ Cycle report published: what passed, what failed,│
│              │ participation rates, open questions.             │
└──────────────┴──────────────────────────────────────────────────┘
```

## Cycle cadence

The frequency and length of governance cycles are set by each instance in
its operating rules. Common patterns:

| Model | Cycle length | When used |
| --- | --- | --- |
| Convention-based | Every 1–2 years | Established movements with large memberships |
| Quarterly | Every 3 months | Active experimental instances, early-stage |
| Continuous | Rolling, tagged releases | High-activity repositories |

An instance may run multiple simultaneous cycles for different types of
changes (e.g., a fast track for urgent governance fixes, a standard track
for policy articles).

## Version tagging

At the close of each cycle, the repository state is tagged with a semantic
version number:

```
MAJOR.MINOR.PATCH

MAJOR  incremented when the founding document is amended
MINOR  incremented when bylaws or governance protocols change
PATCH  incremented when policy articles are adopted or revised
```

Version tags allow any historic state of the policy to be retrieved exactly.
A member who wants to know what the policy said during the 2027 election cycle
can check out the tag for that period.

## Emergency cycles

Where urgent action is required (legal compliance, safety, time-sensitive
operational decisions), an instance may declare an emergency governance cycle.
Emergency cycles:

- may have shortened review windows
- require a higher vote threshold (minimum: founding document threshold)
- are subject to ratification by the next regular cycle
- are logged as emergency actions in the governance health report

Emergency cycles may not be used to circumvent the rights of members
established in the founding document.

## Cycle report format

Each cycle closes with a public report covering:

- proposals submitted, reviewed, adopted, and archived (with counts)
- participation rates by membership tier
- reasons recorded for archived proposals
- any emergency actions taken and their ratification status
- open questions identified during the cycle for the next cycle's agenda

The cycle report is stored in `instances/<name>/cycle_reports/`.
