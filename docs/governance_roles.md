# Governance Roles

This document defines the contribution roles in the Peoples Potato Party of
Canada repository. Roles are not titles. They describe what someone is
currently doing and what access and responsibilities that brings.

Because this is an open-source governance experiment, role advancement is
based on demonstrated contribution, not credentials, affiliation, or election.

---

## Role Overview

```
Visitor → Contributor → Policy Author → Governance Reviewer → Maintainer
```

Every maintainer started as a visitor. There is no minimum time requirement,
only demonstrated work.

---

## Visitor

**Who:** Anyone who reads the repository without contributing.

**Access:** Full read access to all public documents.

**Responsibilities:** None.

**How to advance:** Open an issue or comment on a PR. That makes you a
Contributor.

---

## Contributor

**Who:** Anyone who has opened an issue, commented on a PR, submitted a
proposal, or made any documented contribution to the repository.

**Access:**
- Open issues using any template
- Comment on any open PR or issue
- Fork the repository and submit PRs

**Responsibilities:**
- Follow the contribution workflow in `docs/how_to_participate.md`
- Keep required section headings intact in any files you edit
- Record material changes in `CHANGELOG.md` if asked by a maintainer

**How to advance:** Demonstrate sustained, quality contributions over at least
three separate PRs or issues. Open a Governance Discussion issue requesting
Policy Author status, linking your prior contributions.

---

## Policy Author

**Who:** A contributor with a demonstrated track record of thoughtful, well-
researched proposals or substantive reviews.

**Access:**
- Everything Contributors have
- Recognized co-authorship of manifesto articles they originated
- Can request expedited review for proposals they champion

**Responsibilities:**
- Maintain the quality of proposals they sponsor through the review process
- Respond to reviewer comments within a reasonable window (suggest 14 days)
- Flag when a proposal they sponsored has become stale or should be archived
- Provide substantive reviews on at least two proposals per cycle they are
  not personally sponsoring

**How to demonstrate qualification:**
- At least three PRs merged into `instances/canada/manifesto/`, `civic_infrastructure/`, or
  `proposals/` with substantive content
- At least two substantive reviews of other contributors' proposals
- No pattern of withdrawing without explanation after review begins

**How to advance:** Sustained review participation and demonstrated
constitutional awareness over time. Maintainers recognize Governance Reviewers
by consensus.

---

## Governance Reviewer

**Who:** A Policy Author who consistently provides high-quality constitutional,
Charter, and structural review on proposals.

**Access:**
- Everything Policy Authors have
- Can request changes that block a PR from merging
- Formal standing to raise constitutional objections in any PR thread
- Access to governance system design discussions (meta-level)

**Responsibilities:**
- Apply the governance lint rules (`lint_rules/`) as interpretive context
  when reviewing
- Distinguish between personal policy disagreement and constitutional issues —
  only the latter justifies blocking a PR
- Review at least one PR per active week the reviewer is participating
- Help new contributors understand the review process

**Conduct standard:** Governance Reviewers hold a trust position. Blocking
PRs on pretextual constitutional grounds, or applying different standards to
proposals based on their policy content, is disqualifying conduct. A pattern
of pretextual blocking can be raised through a Governance Discussion issue
and reviewed by other Governance Reviewers and Maintainers.

**How to advance to Maintainer:** Invited by existing Maintainers after
demonstrated review quality, consistency, and no governance conduct concerns.

---

## Maintainer

**Who:** A Governance Reviewer who has been invited to maintain the repository
and is responsible for its overall health.

**Access:**
- Merge PRs to `main` (subject to CI checks passing and review requirements)
- Manage issues and labels
- Update repository configuration (with consensus from other Maintainers)
- Represent the repository in external communications

**Responsibilities:**
- Ensure every merged PR has passed all CI checks and received appropriate
  review
- Respond to governance conduct concerns raised by Contributors or Reviewers
- Publish release tags and update `CHANGELOG.md` after significant merges
- Review and respond to ADR proposals that affect repository architecture
- Ensure the contribution pathway remains accessible to new participants —
  a repository that only insiders can navigate has failed its purpose

**How a Maintainer loses the role:** Inactivity (no contribution for six
months without notice), sustained conduct concerns that are not resolved through
discussion, or voluntary resignation. Role changes are recorded in
`CHANGELOG.md`.

**Maintainer count:** The repository should have between two and six active
Maintainers. Below two is a bus-factor risk. Above six tends to produce
coordination overhead that slows the contribution pipeline.

---

## AI Agents

AI agents (Codex, Claude, Gemini, and others) may contribute to this
repository under the terms in `AGENTS.md`. Agents operate as Contributors
with the following restrictions:

- Agents may not merge PRs.
- Agents may not change constitutional meaning without a human maintainer
  explicitly approving the change.
- Agent-authored content must be labeled as such in the commit message or
  PR description.
- Agents follow the same lint and validation requirements as human contributors.

---

## Role Change Process

Role advancements happen through a Governance Discussion issue:

1. Open a **Governance Discussion** issue with the title
   `[Role] Request: [Your GitHub handle] → [Target Role]`
2. Link the contributions that demonstrate qualification
3. Any current holder of the target role (or higher) can endorse or raise
   concerns
4. After seven days with no unresolved concerns, a Maintainer confirms the role

Role changes are recorded in `CHANGELOG.md`.

---

## What these roles are not

- They are not elected positions in a political party.
- They do not confer legal authority or represent a registered organization.
- They are not permanent — anyone who stops contributing returns to Visitor
  status after six months of inactivity.
- They do not affect anyone's ability to fork the repository and build on it
  independently.
