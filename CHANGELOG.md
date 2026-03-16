# Changelog

All notable governance changes should be recorded in this file.

The format is based on Keep a Changelog, adapted for governance documents.

## [0.7.0] - 2026-03-15

### Added

- `site/` — Phase 3 civic participation platform, hosted on GitHub Pages (ADR-0017).
  Three components:
  - `site/index.html` — manifesto browser: lists and renders all articles via the
    GitHub Contents API with marked.js and DOMPurify.
  - `site/proposals.html` — proposal portal: displays open PRs and guides
    contributors to submit proposals via GitHub Issues template.
  - `site/dashboard.html` — governance health dashboard: live metrics from the
    GitHub API (article count, open PRs, contributors, pipeline status, recent
    commits, VERSION, ADR count).
  - `site/404.html` — custom 404 page.
  - `site/css/main.css` — accessible styling using the party's brown colour palette.
  - `site/js/config.js` — repository configuration (owner, repo, API paths).
  - `site/js/github.js` — GitHub REST API wrapper with sessionStorage caching.
  - `site/js/manifesto.js`, `proposals.js`, `dashboard.js` — page logic.
  - `site/.nojekyll` — disables Jekyll processing.
- `.github/workflows/deploy-pages.yml` — deploys `site/` to GitHub Pages on
  push to `main` and on manual dispatch.
- ADR-0017 documenting the GitHub Pages architecture decision.

## [0.6.0] - 2026-03-15

### Added

- `instances/canada/manifesto/why_the_potato.md` — symbolic and philosophical
  statement of the potato as the party's core symbol (commit `e781ba6`).
- All 12 remaining Canadian manifesto stub articles expanded to full policy
  documents: articles 05 (Housing), 06 (Environment), 07 (Drug Epidemic),
  08 (Governance), 09 (Financial Responsibility), 10 (Climate Change),
  11 (Freelander Citizenship), 12 (Truth and Reconciliation), 13 (Symbolism
  of Brown), 14 (Ten Year Vision), 15 (Child Support Smart Contracts),
  16 (World Hunger). Earlier articles 01, 03, and 04 were expanded in the
  same session (commit `e781ba6`, `f4ccf1e`).

### Changed

- All expanded manifesto articles align with the four-section structure
  (`## Summary`, `## Principles`, `## Policy Mechanisms`, `## Measurable
  Outcomes`) established in ADR-0011.

## [0.5.0] - 2026-03-15

### Added

- `core/governance_kernel.md` — foundational specification of eight governance
  primitives, state machine, cycle versioning, and data governance agreement
  (ADR-0013, ADR-0014, commits `40f8b7a`, `1496146`).
- GDPR-compliant Personal Data primitive (Primitive 8) and full Section 8
  Data Governance Agreement in the governance kernel, including the
  pseudonymisation resolution to the Transparency Log / right-to-erasure
  tension (commit `1496146`).
- `docs/experiments/swipe_governance_experiment.md` — sentiment signal
  collection mechanism (not a voting system) for governance proposals
  (commit `1c26a5a`).
- `GOVERNANCE.md` — top-level governance reference covering roles, decision
  tiers, and the no-tie-breaking-by-design clause (commit `0846689`).
- `CODE_OF_CONDUCT.md` — repository operating rules covering conduct,
  hate speech as policy subject vs. conduct in contributions, and a
  four-tier enforcement ladder (commit `992431f`).
- `instances/canada/manifesto/article_17_hate_speech_and_harmful_content.md` —
  full policy article distinguishing criminal hate speech, civil hate speech,
  and protected offensive speech; platform accountability and independent
  oversight mechanisms (commit `992431f`).
- `scripts/validate_structure.py` — new CI script checking core structure,
  instance layout, ADR format fields, experiments directory, and stale
  hardcoded paths in Python scripts (ADR-0015, commit `febd625`).
- ADRs 0013–0016 documenting the governance kernel, data governance,
  linting completeness, and experiments consolidation.

### Changed

- `CONTRIBUTING.md` rewritten from outdated 71-line stub to a complete
  contributor guide covering instance vs. framework contributions, the
  governance kernel change process, and a current directory reference
  table (commit `0846689`).
- All three existing lint scripts (`validate_proposals.py`,
  `charter_compliance_placeholder.py`, `policy_consistency_check.py`)
  rewritten to use dynamic path discovery over `instances/*/` instead
  of hardcoded pre-ADR-0012 paths (ADR-0015, commit `febd625`).
- `.github/workflows/policy-lint.yml` updated to include `validate_structure.py`
  and updated markdownlint ignore patterns (commit `febd625`).
- GitHub issue templates (`policy_proposal.yml`, `policy_question.yml`,
  `governance_discussion.yml`) updated to reflect the `instances/` structure,
  with instance/scope dropdowns and updated path references (commit `0846689`).
- Root `experiments/` consolidated into `docs/experiments/`; all
  cross-references updated (ADR-0016, commit `7f8d68a`).
- Framework-level files refactored from PPPC to PPP naming; Canada instance
  retains PPPC (commit `8ceaf55`).
- `civic_infrastructure/civic_digital_infrastructure.md` — "Canadian resident"
  generalised to "community member"; bilingual access generalised to
  instance-appropriate multilingual access (commit `8ceaf55`).
- `core/README.md` updated to list `governance_kernel.md` as the foundational
  entry point (commit `40f8b7a`).

## [0.4.0] - 2026-03-15

### Added

- Participation layer: `docs/how_to_participate.md`, `docs/governance_roles.md`,
  `ROADMAP.md`.
- Three starter experiments in `docs/experiments/`: digital referendums, housing
  policy, energy strategy.
- Three new GitHub Issue templates: `policy_proposal.yml`, `policy_question.yml`,
  `governance_discussion.yml`.
- Architecture Decision Records `docs/adr/` (ADR-0001 through ADR-0008).
- ADR-0008 documenting removal of crypto governance mechanisms.

### Changed

- Rewrote `README.md` for first-time contributor clarity.
- Added three Mermaid diagrams to `ARCHITECTURE.md`: contribution flow,
  governance authority hierarchy, and repository data flow.
- `tech_governance/` renamed to `civic_infrastructure/` to better reflect
  project scope.
- `consensus_mechanism.md` renamed to `decision_protocol.md`.
- All cross-references updated to reflect new directory name.

### Removed

- `civic_infrastructure/tokenomics.md` (crypto governance — see ADR-0008)
- `civic_infrastructure/distributed_ledger.md` (crypto governance — see ADR-0008)

## [0.3.0] - 2026-03-15

### Added

- Charter compliance lint fixes to bylaws (conventions, membership,
  leadership-selection) and constitution.
- `civic_infrastructure/civic_digital_infrastructure.md` replacing removed
  crypto governance documents.
- `civic_infrastructure/smart_contracts.md` expanded with four civic use cases.

## [0.2.0] - 2026-03-15

### Added

- Modular manifesto structure under `manifesto/`.
- Civic technology addendums under `civic_infrastructure/`.
- Proposal workspace and repository-wide proposal template.
- Governance CI workflow for Markdown linting, proposal validation, Charter
  placeholder checks, and policy consistency checks.
- Root architecture documentation and AI agent instructions.

### Changed

- Reframed the repository as a governance-as-code platform for the Peoples
  Potato Party of Canada.

## [0.1.0] - 2026-03-15

### Added

- Founding governance repository structure.
- Core constitution for the Peoples Potato Party of Canada.
- Modular bylaws for membership, riding associations, national council,
  conventions, leadership selection, and policy development.
- Change-management process and drafting templates.
- GitHub collaboration templates for governance and policy proposals.
