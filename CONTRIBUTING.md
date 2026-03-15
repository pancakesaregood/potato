# Contributing

This repository manages governance content as source code. Text can be drafted,
reviewed, linted, versioned, and merged through GitHub, but formal political
authority still depends on the ratification path described in
`docs/governance/`.

## What Goes Where

- `instances/canada/manifesto/`: one article per major policy theme
- `civic_infrastructure/`: digital democracy and implementation addendums
- `proposals/`: new policy proposals and structured amendments
- `templates/`: canonical drafting templates
- `docs/governance/`: constitution, bylaws, and process rules

## Required Authoring Rules

- Use plain Markdown with clear headers.
- Keep filenames stable unless a structural rename is necessary.
- Preserve required section headings so CI can validate documents.
- Use simple language and explain measurable outcomes.
- Keep one major change per pull request where practical.
- Update `CHANGELOG.md` and `VERSION` for ratified or materially significant
  repository changes.

## Proposal Workflow

1. Start with `templates/proposal_template.md`.
2. Save the proposal under `proposals/`.
3. State the policy problem, mechanism, constitutional review path, and
   implementation plan.
4. Link the proposal to any affected manifesto articles or governance files.
5. Open a pull request and describe the intended review and ratification path.

## Local Validation

Run these checks before opening a pull request:

- `python scripts/validate_proposals.py`
- `python scripts/charter_compliance_placeholder.py`
- `python scripts/policy_consistency_check.py`

Markdown formatting is also validated in CI through `policy-lint.yml`.

## Review Expectations

Reviewers should assess:

- consistency with the constitution and bylaws
- clarity of policy mechanisms
- Charter and human-rights implications
- fiscal, environmental, and implementation tradeoffs
- whether measurable outcomes are testable

## Ratification Status Labels

Use these labels in pull requests and major governance documents where
relevant:

- `Draft`
- `Proposed`
- `Provisionally Adopted`
- `Ratified`
- `Archived`

## AI Agent Collaboration

AI agents may draft and refactor content, but they should not invent
ratification status, legal clearance, or governance authority. For operational
rules, follow `AGENTS.md`.
