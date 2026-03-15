# The Peoples Potato Party of Canada

The Peoples Potato Party of Canada (PPPC) treats political governance like
open-source infrastructure. The manifesto, technical addendums, institutional
rules, and proposal process are stored as version-controlled Markdown so they
can be reviewed, linted, discussed, and improved through pull requests.

This repository is fictional. It is a governance-as-code reference project, not
legal advice.

## Governance as Code

In this repository:

- manifesto articles are modular files under `manifesto/`
- digital governance addendums live under `tech_governance/`
- institutional rules live under `docs/governance/`
- future changes move through `proposals/` using `templates/proposal_template.md`
- CI checks enforce formatting, proposal structure, and consistency
- Charter review is treated as a mandatory governance gate, with automation used
  as a placeholder process rather than a substitute for legal counsel

```mermaid
flowchart LR
    A[Idea or concern] --> B[Draft article or proposal]
    B --> C[Pull request review]
    C --> D[CI governance checks]
    D --> E[Council or convention review]
    E --> F[Versioned policy state on main]
```

## Repository Layout

```text
.
|-- AGENTS.md
|-- ARCHITECTURE.md
|-- manifesto/
|-- tech_governance/
|-- proposals/
|-- templates/
|-- scripts/
|-- docs/governance/
`-- .github/workflows/policy-lint.yml
```

- `manifesto/`: one file per manifesto article
- `tech_governance/`: civic technology addendums covering digital infrastructure,
  decision protocols, smart contract use cases, cryptography, and interoperability
- `proposals/`: future policy proposals and structured draft changes
- `templates/`: canonical proposal template
- `scripts/`: local validation scripts used by CI
- `docs/governance/`: constitution, bylaws, and governance process rules
- `.github/workflows/`: automated review gates

## Contribution Workflow

1. Create or update a manifesto article, technical addendum, or proposal.
2. Keep required section headers intact so automation can validate structure.
3. Run the local checks:
   - `python scripts/validate_proposals.py`
   - `python scripts/charter_compliance_placeholder.py`
   - `python scripts/policy_consistency_check.py`
4. Open a pull request and explain the policy change, risk, and intended
   ratification path.
5. Merge only when the repository text accurately reflects the proposal's
   current status.

## CI/CD Governance

The workflow in `.github/workflows/policy-lint.yml` performs four baseline
checks:

- Markdown linting for structure and formatting
- proposal template validation
- Charter compliance placeholder review
- policy consistency validation across manifesto and technical modules

The Charter compliance step is intentionally conservative. It enforces process
and flags review needs, but it does not provide legal clearance on its own.

## AI Collaboration

This repository is designed for human contributors and AI agents working
together. The operational contract for AI agents lives in `AGENTS.md`.

Agents should:

- preserve stable filenames
- keep articles modular
- use the proposal template for new initiatives
- avoid silently changing constitutional meaning
- record structural changes in `CHANGELOG.md`

## Governance Base Layer

The constitutional and organizational foundation of the party remains under
`docs/governance/`. If manifesto text conflicts with the constitutional layer,
the constitutional documents control until formally amended.
