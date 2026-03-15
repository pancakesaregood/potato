# Proposal System

The proposal system is the mechanism through which any member can suggest a
change to policy, governance rules, or the manifesto. It is the same process
regardless of what is being changed — the threshold and review requirements
vary, but the intake and tracking workflow does not.

## Design goals

- **Low barrier to entry.** Submitting a proposal should not require
  technical skills, institutional standing, or prior relationships.
- **Consistent process.** A proposal from a first-time member goes through
  the same steps as one from a senior officer. The template is the same.
  The automated checks are the same.
- **Full audit trail.** Every proposal, including those that fail, is
  permanently recorded with its full history of revisions and review comments.
- **Honest about tradeoffs.** The template requires authors to address costs,
  risks, and constitutional questions — not just make the case for their
  preferred outcome.

## Proposal lifecycle

```
┌─────────────────────────────────────────────────────────────────┐
│                    PROPOSAL LIFECYCLE                           │
├──────────────┬──────────────────────────────────────────────────┤
│ 1. DRAFT     │ Author writes proposal using the template.       │
│              │ Not yet public. Can be revised freely.           │
├──────────────┼──────────────────────────────────────────────────┤
│ 2. SUBMITTED │ Author opens a pull request. Proposal is public. │
│              │ Automated checks run. Status: Under Review.      │
├──────────────┼──────────────────────────────────────────────────┤
│ 3. REVIEW    │ Community discusses. Reviewers assess.           │
│              │ Author may revise. Minimum 14-day window.        │
├──────────────┼──────────────────────────────────────────────────┤
│ 4. VOTE      │ Eligible members vote. Threshold depends on      │
│              │ the type of change (see governance protocol).    │
├──────────────┼──────────────────────────────────────────────────┤
│ 5a. ADOPTED  │ Passes vote. Merged to main. Permanent record.   │
├──────────────┼──────────────────────────────────────────────────┤
│ 5b. ARCHIVED │ Does not pass. Archived with outcome note.       │
│              │ Can be reopened in a future governance cycle.    │
└──────────────┴──────────────────────────────────────────────────┘
```

## Automated checks

When a proposal pull request is opened, the CI pipeline runs:

| Check | What it validates |
| --- | --- |
| Markdown lint | Formatting and required section headings |
| Proposal validation | All template sections are present and non-empty |
| Compliance check | Jurisdiction-specific rights and law flags (instance-configurable) |
| Consistency check | Contradictions with existing adopted policy |

Checks flag issues for human review. They do not approve or reject proposals.

## Rate limiting and endorsement

To prevent pipeline flooding and ensure proposals have some community
traction before entering formal review:

- Individual contributors: maximum 3 active (not yet voted on) proposals
  at any time.
- Proposals require a minimum number of endorsing members before entering
  the vote stage. The minimum is set by each instance in its operating rules.
- A proposal that is substantively identical to one voted down in the
  previous 12 months is subject to a cooling-off period before resubmission.

## Proposal template

The universal proposal template is in this directory at `proposal_template.md`.

Each instance may extend the template with jurisdiction-specific sections
(for example, a Canada instance adds a "Charter Review" section). Extensions
must not remove the universal sections.

## Where proposals live

```
instances/<name>/proposals/          active proposals under review
instances/<name>/proposals/archive/  proposals that did not pass
```

The repository's main branch reflects only adopted policy. Proposals in
review live on feature branches until voted on.
