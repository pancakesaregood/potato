# How to Participate

Welcome. This document explains how to contribute to the Peoples Potato Party
of Canada governance repository. You do not need a technical background to
participate. The most valuable contributions are clear ideas and honest
feedback.

This repository is a **civic governance experiment**. It is fictional, not a
registered political party. Contributions are experiments in how open,
collaborative policy design could work — not legal documents or binding
political commitments.

---

## The four ways to contribute

```
1. Open a Discussion Issue  →  share an idea or question
2. Submit a Proposal        →  draft a structured policy change
3. Open a Pull Request      →  edit the manifesto or governance documents
4. Review someone else's PR →  comment, suggest, or endorse a change
```

You do not need to do all four. Start with what feels natural.

---

## 1. Open a Discussion Issue

If you have an idea, a concern, or a question — but are not ready to write a
full proposal — open a GitHub Issue.

**Go to:** Issues → New Issue → choose a template

Three templates are available:

| Template | Use it when |
| --- | --- |
| **Policy Proposal** | You have a specific policy idea ready to develop |
| **Policy Question** | You want to raise a question or start a debate |
| **Governance Discussion** | You want to discuss how the system itself works |

You do not need to have an answer to open a question issue. Raising the right
question is a contribution.

---

## 2. Submit a Policy Proposal

A proposal is a structured document that moves through a review process before
changing anything in the manifesto.

### Step 1 — Copy the template

```
templates/proposal_template.md
```

Copy it to `proposals/your-short-title.md`. Use lowercase and hyphens in the
filename.

### Step 2 — Fill in the required sections

The template has eight sections. All are required:

| Section | What to write |
| --- | --- |
| **Proposal Title** | Short name for the proposal |
| **Problem Statement** | What public problem does this address? |
| **Policy Mechanism** | What rule, program, or action is proposed? |
| **Constitutional Review** | What Charter or legal questions arise? |
| **Economic Impact** | What does it cost or save? |
| **Environmental Impact** | What environmental effects follow? |
| **Citizen Feedback** | Who has been consulted, or who should be? |
| **Implementation Plan** | How would this actually happen? |

You do not need expert answers for every section. Writing "this needs legal
review" or "cost estimate unknown — see sources X and Y" is honest and useful.
Incomplete sections are flagged by the CI checks so reviewers know what is
still needed.

### Step 3 — Open a Pull Request

Open a PR adding your `proposals/your-short-title.md` file. In the PR
description, summarize:

- what the proposal changes
- what you are uncertain about
- what kind of feedback you want

The PR does not change the manifesto yet. It adds a proposal for review.

### Step 4 — Automated checks run

When you open a PR, the CI pipeline runs four checks automatically:

| Check | What it does |
| --- | --- |
| **Markdown lint** | Confirms formatting and required headings are present |
| **Proposal validation** | Confirms all required template sections are included |
| **Charter compliance** | Flags potential conflicts with Charter rights for human review |
| **Policy consistency** | Checks for contradictions with existing manifesto text |

A failing check does not close your PR. It tells you and reviewers what needs
attention. You can push commits to the same branch to fix issues.

### Step 5 — Human review and discussion

Reviewers will comment on your PR. This is the deliberation stage. You can
respond to comments, push revisions, or ask for clarification. There is no
time limit on deliberation.

### Step 6 — Merge or archive

If the proposal reaches consensus among reviewers and passes all checks, a
maintainer merges it. If it does not reach consensus, it is archived in
`proposals/` with a note explaining why.

Archived proposals are not failures. They are part of the permanent record and
can be reopened in a future cycle.

---

## 3. Open a Pull Request to Edit the Manifesto

If you want to propose a change directly to a manifesto article or technical
addendum — not just add a proposal document — you can edit the relevant file
and open a PR against it.

**Manifesto articles** are in `instances/canada/manifesto/`. Each article must keep its four
required headings:

```
## Summary
## Principles
## Policy Mechanisms
## Measurable Outcomes
```

**Technical addendums** are in `civic_infrastructure/`. Each must keep:

```
## Summary
## Design Principles
## Technical Mechanisms
## Validation Targets
```

If your change is substantive (changes meaning, not just corrects a typo),
include a reference to the proposal or issue that motivated it in your PR
description. This keeps the audit trail intact.

---

## 4. Review Someone Else's PR

Reviewing and commenting is as valuable as proposing. When you review:

- ask questions about sections you find unclear
- point out potential Charter or constitutional issues
- suggest alternative approaches
- endorse the proposal if you think it should proceed

You do not need to be an expert. "I do not understand what this means in
practice" is a useful review comment.

---

## What the automated checks actually do

The CI pipeline runs on every PR that touches `instances/`, `civic_infrastructure/`,
`proposals/`, or `docs/governance/`.

```
scripts/validate_proposals.py      — checks required headings are present
scripts/charter_compliance_placeholder.py — flags Charter risk areas
scripts/policy_consistency_check.py       — checks for text contradictions
```

All three scripts run locally too. If you want to check your work before
opening a PR:

```bash
python scripts/validate_proposals.py
python scripts/charter_compliance_placeholder.py
python scripts/policy_consistency_check.py
```

The Charter compliance script is a placeholder. It enforces process and
flags areas that need human legal review. It does not provide legal clearance.

---

## Things to avoid

- Do not change constitutional meaning in manifesto files without a
  corresponding update to `docs/governance/`.
- Do not invent ratification status or claim a proposal has been approved
  when it has not.
- Do not remove or rename required section headings — the CI checks depend
  on them.
- Do not push directly to `main`. All changes go through pull requests.

---

## Getting help

If you are stuck, open a **Governance Discussion** issue and describe what you
are trying to do. Other contributors and maintainers will help you find the
right path.

The `docs/experiments/` folder contains starter experiments designed for
new contributors. They are lower-stakes than manifesto articles — a good
place to start if you want to try the contribution workflow before proposing
a major change.
