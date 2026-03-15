# AGENTS

This repository is designed for collaborative editing by human contributors and
AI agents such as Codex, Claude, and Gemini.

## Repository Architecture

- `instances/canada/manifesto/`: authoritative policy articles for the PPP manifesto
- `civic_infrastructure/`: civic technology addendums (digital infrastructure,
  decision protocols, smart contracts, cryptography, interoperability)
- `proposals/`: future proposals, experiments, and structured policy drafts
- `templates/`: canonical templates for new submissions
- `docs/governance/`: constitutional and bylaw authority
- `scripts/`: local and CI validation scripts
- `.github/workflows/`: automated governance review gates

## Where To Place New Work

- Add new manifesto content by editing the relevant file in `instances/canada/manifesto/`.
- Add civic technology implementation detail in `civic_infrastructure/`. Do not
  introduce tokenomics, cryptocurrency, or blockchain governance concepts —
  see `docs/adr/0008-remove-crypto-governance.md`.
- Add new policy proposals in `proposals/` using
  `templates/proposal_template.md`.
- Add institutional rules, ratification rules, or authority changes in
  `docs/governance/`.

## Article Update Rules

Manifesto articles must keep these exact section headings:

- `## Summary`
- `## Principles`
- `## Policy Mechanisms`
- `## Measurable Outcomes`

Technical governance addendums must keep these exact section headings:

- `## Summary`
- `## Design Principles`
- `## Technical Mechanisms`
- `## Validation Targets`

## Proposal Rules

Every proposal in `proposals/` must keep the headings from
`templates/proposal_template.md`:

- `## Proposal Title`
- `## Problem Statement`
- `## Policy Mechanism`
- `## Constitutional Review`
- `## Economic Impact`
- `## Environmental Impact`
- `## Citizen Feedback`
- `## Implementation Plan`

## Governance Change Rules

- Do not change constitutional meaning in manifesto files.
- If a policy change affects authority, voting, rights, or ratification, update
  `docs/governance/` as well.
- Do not invent ratification status or legal approval.
- Record material repository changes in `CHANGELOG.md`.

## Validation Expectations

Before finishing an edit, agents should expect these checks to pass:

- Markdown linting
- proposal template validation
- Charter compliance placeholder review
- policy consistency validation

## Writing Style

- Use Markdown.
- Prefer simple language.
- Use Mermaid diagrams only where they clarify process or architecture.
- Keep sections modular and easy to diff.
- Preserve stable filenames unless a full repository update is performed.
