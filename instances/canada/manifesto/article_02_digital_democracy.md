# Article 02: Digital Democracy

## Summary

This article sets the direction for two related things: the digital tools that
allow citizens to participate in democratic decisions, and the open governance
model that the PPPC uses to develop and maintain its own policies.

These are not separate topics. Both rest on the same conviction: that
democratic processes work better when they are transparent, open to
contribution, and designed to improve over time. The party practices what it
proposes. Its manifesto, governance rules, and proposal process are maintained
in a public repository where every change is visible, every decision is
traceable, and any citizen can submit an improvement.

The five sections below describe this model from principles to implementation
to long-term research directions.

## Principles

- Democratic participation should be expanded by digital tools, not
  replaced by them. Technology serves deliberation; it does not substitute
  for it.
- Governance should be transparent in how decisions are made, not just
  in what the decisions are. Process accountability matters as much as
  outcome accountability.
- Participation must be accessible regardless of geography, income, or
  technical background. A system that only technically literate people can
  use fully is not a democratic system.
- Policy is never definitively finished. Open governance systems allow
  positions to be revisited when evidence changes or circumstances demand it.
- Automation supports human judgment. Checks and validation tools provide
  information for people to act on — they do not make decisions.

## Policy Mechanisms

### Principles of Digital Democracy

Secure, accessible, and auditable digital participation infrastructure is a
precondition for any of the rest of this article to function.

The party commits to:

- Creating digital consultation and voting systems where results are
  independently auditable without exposing how individual members voted.
- Supporting hybrid assemblies — combining in-person and remote
  participation — for riding, regional, and national decision-making.
- Adopting accessibility and bilingual standards for all civic interfaces,
  with WCAG 2.1 AA compliance as the minimum baseline.
- Designing participation systems so that a member without technical skills
  can take any governance action available to any other member. Where a
  digital pathway exists, a non-digital alternative must exist alongside it.
- Publishing infrastructure uptime commitments before elections and
  conventions, and reporting against them afterward.

The principle that underlies these commitments is equal standing. A member
in a remote region casting a vote remotely should have the same confidence
in the integrity of their participation as a delegate in the convention hall.

### Open Policy Development

Good policy improves when more people can read it, question it, and suggest
changes. The PPPC maintains its manifesto and governance documents in a public,
version-controlled repository. This creates several properties that
traditional policy processes do not have:

- **Every change is recorded.** The full history of any policy position is
  publicly visible. Anyone can see what a provision said before it was
  amended, who proposed the change, and what the reasoning was.
- **Anyone can propose an improvement.** A citizen who believes a policy is
  incomplete, inconsistent, or wrong can submit a proposed change through a
  documented process. Proposals go through the same review regardless of
  who submitted them.
- **Debate is public.** Discussion about a proposed change happens in the
  open, not in private correspondence or closed committee rooms. The
  reasoning behind decisions becomes part of the permanent record.
- **The rules about rule-making are also public.** The governance documents
  that define how policy can be changed are themselves stored in the same
  open repository as the policies they govern. There is no hidden layer.

Participating in this system does not require technical skills. Web-based
interfaces allow members to browse proposals, submit ideas through guided
forms, read debate histories, and endorse changes without interacting with
the underlying version control tools. The repository is the canonical record;
the tools on top of it are designed for non-technical contributors.

### Governance-as-Code

Governance-as-code means applying practices from open-source software
development to the design and maintenance of governance rules. The same
practices that make large collaborative projects reliable, auditable, and
genuinely open to contribution work for the same reasons when applied to
policy.

In practice, this means:

- **Version control.** Every draft, revision, and ratified version of a
  governance document is preserved. Nothing is lost. Nothing can be silently
  altered. The history is the audit trail, and it belongs to everyone.
- **Peer review.** Proposed changes to policy or governance rules are
  reviewed by other contributors before they take effect. Reviews are
  public. Reviewers can raise constitutional concerns, flag Charter questions,
  or propose amendments. A proposal does not advance until it has been
  examined.
- **Automated checks.** When a proposal is submitted, automated tools scan
  it for structural problems: missing required sections, potential conflicts
  with existing policy, language that Charter jurisprudence identifies as a
  risk. These checks do not approve or reject proposals. They surface
  information so that human reviewers can apply judgment more effectively.
- **Public contribution workflow.** The path from "a citizen has an idea"
  to "a policy change is recorded in the manifesto" is documented,
  consistent, and open. It does not depend on knowing the right people,
  attending the right meetings, or being part of an insider network.

Governance-as-code does not mean governance by engineers or technical
specialists. It means borrowing the discipline of open, traceable,
peer-reviewed work and applying it to democratic institutions. The goal is
to make governance harder to capture, easier to audit, and more genuinely
accessible to the people it affects.

### Governance Cycles

Policy development in this system operates in repeated cycles. Rather than
treating a policy as settled once adopted, the cycle model treats every
ratified position as the current best version — open to improvement when
evidence, circumstances, or community understanding changes.

A governance cycle moves through six stages:

1. **Idea submission.** A member or citizen identifies a problem or
   opportunity and opens a proposal. No technical background is required.
   The submission is logged publicly and becomes part of the permanent
   record regardless of what happens next.

2. **Proposal drafting.** The idea is developed into a structured proposal.
   A standard template requires the author to describe the problem, the
   proposed mechanism, the expected costs, and the constitutional questions
   the proposal raises. Partial drafts are acceptable — gaps are flagged
   for reviewers, not used to reject the proposal outright.

3. **Community discussion.** The draft is open for comment for a defined
   minimum period. Members can question, endorse, revise, or raise concerns.
   The discussion is public and becomes part of the proposal's history.

4. **Automated review.** Automated checks flag structural issues, policy
   contradictions, and potential Charter conflicts. Findings are advisory
   and are published alongside the proposal so reviewers have full
   information before deliberating.

5. **Policy revision.** Based on community input and review findings, the
   author revises the proposal. Each revision is tracked; no earlier draft
   is lost.

6. **Merge or archive.** If the proposal reaches sufficient consensus and
   passes review, it is merged into the canonical policy. If it does not,
   it is archived with a note explaining the outcome. Archived proposals
   are not failures — they are part of the public record and can be reopened
   in a future cycle when conditions change.

The cycle model makes three things possible that traditional policy processes
do not:

- A position that was right in one year can be updated in a later year
  without pretending the original was a mistake.
- Evidence that emerges after a policy is adopted can trigger a revision
  cycle without requiring a crisis or a formal parliamentary procedure.
- A proposal that lacks consensus today may succeed in a later cycle when
  political or evidential conditions have shifted.

The length and frequency of governance cycles are defined in the party bylaws,
and can themselves be updated through the same process.

### Democracy-as-a-Service (Experimental)

This section describes a long-term research direction. It is not a current
policy commitment or an operational system. It is included here because the
PPPC is committed to being honest about where its thinking is heading, and to
inviting scrutiny before a direction is pursued rather than after.

The question this direction explores is: **could the governance infrastructure
built for the PPPC be made available to other communities as a starting point
for their own democratic experiments?**

A community land trust, a small municipality, a residents' association, or a
workers' cooperative might want to manage collective decisions through an open,
auditable, contribution-based process — but lack the capacity to build that
infrastructure from scratch. If the PPPC's governance tools are genuinely
open-source and well-documented, another community can adapt them for a
different purpose without permission or technical expertise.

This is the concept sometimes called Democracy-as-a-Service: governance
infrastructure that is modular, deployable, and community-configurable. The
analogy is to open-source software platforms that organisations can self-host
and adapt — the underlying system is shared, but each deployment is governed
by its own community.

The idea raises questions the party does not yet have satisfactory answers to,
and will not proceed without them:

- What safeguards prevent a community from using open democratic tools to
  make decisions that harm minorities or override individual rights? An
  open process is not automatically a just one.
- Who bears responsibility when governance tools deployed by a third
  community produce a harmful outcome?
- How do you keep infrastructure genuinely open to all while preventing it
  from being captured by well-resourced actors who can devote more time
  and technical capacity to the process than ordinary participants?

These questions are part of the research agenda. The party commits to
publishing what it learns at each regular national convention — including what
failed, what was revised, and what remains unresolved. The model will not be
deployed in contexts where the answers to these questions are not yet
adequate.

## Measurable Outcomes

- Participation rates increase for remote, rural, and accessibility-dependent
  members over successive convention cycles.
- Digital voting systems produce independently auditable records without
  exposing how individual members voted.
- Accessibility defects are tracked and resolved within published service
  windows. Unresolved defects are reported publicly.
- The full revision history of any manifesto article or governance document
  is publicly accessible without requiring a login or technical tool.
- A first-time contributor can submit a policy proposal through the documented
  process without requiring technical assistance from another member.
- Every governance cycle produces a public record of proposals submitted,
  reviewed, merged, and archived, with counts and plain-language reasoning
  for each outcome.
- Automated review checks run on every proposal and produce a publicly
  accessible report before human review begins.
- The Democracy-as-a-Service research direction publishes a findings report
  at each regular national convention covering progress, failures, open
  questions, and whether conditions are yet adequate to proceed further.
