# Contributing

This repository is an open governance framework exploring governance-as-code
— the practice of managing democratic processes through version-controlled
text, open contribution workflows, and automated validation.

Contributions are welcome in many forms: ideas, documentation improvements,
governance experiments, policy proposals, structural suggestions, and review
of others' work. No prior approval is needed to participate. Discussion
before major changes is expected and makes the process faster, not slower.

---

## Ways to Contribute

| Contribution type | How to start |
| --- | --- |
| Propose a governance idea | Open a Policy Proposal issue |
| Ask a question or start a debate | Open a Policy Question issue |
| Discuss the governance system itself | Open a Governance Discussion issue |
| Submit a governance experiment | Add a file to `docs/experiments/` via PR |
| Improve documentation | Open a PR with your changes |
| Propose a structural change | Open a Governance Discussion issue first |
| Review someone else's PR | Comment directly on the open PR |

Issue templates for all of the above are in `.github/ISSUE_TEMPLATE/`.

---

## Opening Issues

Open an issue when you want to:

- propose a governance idea before drafting a full proposal
- ask a question about the architecture or kernel design
- suggest a new experiment or interaction model
- identify an inconsistency or gap in the documentation
- discuss a possible improvement to the framework or an instance

Use a clear title that states the subject directly. Use the appropriate
issue template — each one is structured to capture the information
reviewers need to engage usefully with your submission.

You do not need to have a solution to open an issue. A well-framed
question is a contribution.

---

## Governance Proposals

Formal governance proposals follow the system defined in
[`core/proposal_system/`](core/proposal_system/).

A proposal is a structured document that moves through a defined lifecycle
before changing anything in the governance state. The minimum required
sections are:

| Section | What it covers |
| --- | --- |
| Problem statement | What gap or issue does this address, and who is affected? |
| Proposed change | What rule, article, or process is being changed and how? |
| Reasoning | Why is this the right approach? What alternatives were considered? |
| Consequences | What tradeoffs, costs, or risks does this introduce? |

**Start with an issue, not a PR.** A proposal that arrives as a pull
request without prior discussion is harder to review. Open a Policy
Proposal or Policy Question issue first. Use the discussion to test the
idea, identify objections, and refine the framing before writing the
full proposal document.

When you are ready to submit:

1. Copy `core/proposal_system/proposal_template.md` to your instance's
   `instances/<name>/proposals/` directory.
2. Fill in all required sections. Incomplete sections are fine — write
   what you know and flag what needs more work.
3. Open a pull request and link it to the discussion issue.
4. Run the local validation scripts before opening the PR (see below).

The full proposal lifecycle (Draft → Submitted → Under Review → Decided
→ Adopted or Archived) is documented in `core/proposal_system/`.

---

## Governance Kernel Changes

The governance kernel is in [`core/governance_kernel.md`](core/governance_kernel.md).
It is the highest-stability document in the repository. Changes to it
require a higher bar than ordinary contributions:

1. Open a Governance Discussion issue explaining the proposed change
   and why the kernel — rather than an instance document or `core/`
   module — is the right place for it.
2. Allow at least 14 days for discussion.
3. Submit a pull request with explicit reasoning documented in the PR
   description.
4. Write an Architecture Decision Record (see [`docs/adr/`](docs/adr/))
   if the change is structural.
5. Obtain review from at least two Governance Reviewers or Maintainers.

Changes that can be made at the instance level should be made there.
The kernel should only change when a rule needs to apply universally
to every governance instance built on the framework.

---

## Experiments

Governance experiments are documented in
[`docs/experiments/`](docs/experiments/).

An experiment is a structured exploration of a governance question or
mechanism that is not yet ready for adoption. Examples include:

- alternative voting or deliberation mechanisms
- civic participation interaction models
- governance simulations
- new proposal intake patterns

Experiments are exploratory and not binding. They do not change the
governance kernel or any instance's policy unless formally adopted
through the proposal process.

To contribute an experiment:

1. Create a new Markdown file in `docs/experiments/`.
2. State the question the experiment addresses.
3. Document the genuine tradeoffs — not just the case for the idea.
4. Describe what metrics or observations would indicate the experiment
   is worth formalizing.
5. Open a PR. The bar for merging experiments is lower than for kernel
   or policy changes. A well-framed question with honest tradeoffs is
   sufficient.

---

## Pull Request Process

```
Fork the repository
 ↓
Create a branch named for your change (e.g. experiment/swipe-ui or proposal/rent-standard)
 ↓
Make your changes
 ↓
Run local validation (see below)
 ↓
Open a pull request linked to the relevant issue
 ↓
Automated CI checks run
 ↓
Review by Contributors, Governance Reviewers, or Maintainers
 ↓
Merge or revision
```

Keep pull requests small and focused. A PR that changes one thing is
faster to review than one that changes five. If you find yourself
touching unrelated files, consider splitting the work into separate PRs.

Do not push directly to `main`. All changes go through pull requests.

### Local validation

Run these checks before opening a PR:

```bash
python scripts/validate_proposals.py
python scripts/charter_compliance_placeholder.py
python scripts/policy_consistency_check.py
```

Markdown formatting is also validated automatically by the CI pipeline
(`.github/workflows/policy-lint.yml`) when the PR is opened. A failing
check does not close your PR — it flags what needs attention.

---

## Where Things Live

| Content type | Location |
| --- | --- |
| Universal framework templates and protocols | `core/` |
| Canada instance policy articles | `instances/canada/manifesto/` |
| Canada governance documents | `docs/governance/` |
| Proposals under review | `instances/<name>/proposals/` |
| Governance experiments | `docs/experiments/` |
| Civic technology addendums | `civic_infrastructure/` |
| Architecture Decision Records | `docs/adr/` |
| CI validation scripts | `scripts/` |

New instance? See [`INSTANCE_GUIDE.md`](INSTANCE_GUIDE.md).

---

## Documentation Guidelines

When writing or editing documentation:

- Use plain Markdown with clear, hierarchical headings.
- Keep filenames stable. Renames require updating all cross-references
  and should be accompanied by a note in `CHANGELOG.md`.
- Preserve required section headings in manifesto articles and proposal
  documents — the CI validation checks for them.
- Write in neutral, technical language. Avoid partisan framing.
- State tradeoffs honestly. Documentation that only presents the case
  for an idea is less useful than documentation that also names the
  objections.
- One major change per pull request where practical.

---

## Roles

Contribution roles (Visitor, Contributor, Policy Author, Governance
Reviewer, Maintainer) are defined in
[`docs/governance_roles.md`](docs/governance_roles.md).

Roles describe what someone is currently doing. They are not permanent,
not elected, and not required to start contributing. You can open an
issue or submit a PR without holding any formal role.

---

## AI Agents

AI agents may contribute to this repository as Contributors under the
terms in [`AGENTS.md`](AGENTS.md). Agents must:

- label their contributions clearly in commit messages or PR descriptions
- not merge PRs
- not change constitutional meaning without explicit human maintainer approval
- follow the same lint and validation requirements as human contributors

---

## Transparency

All contributions and decisions in this repository are visible and
traceable through git history, issues, pull requests, and ADR
documentation. Nothing is decided in private. If a decision was made
and is not traceable through one of these channels, that is a gap in
the governance record and should be corrected.

See [`GOVERNANCE.md`](GOVERNANCE.md) for how decisions in this
repository are made.
