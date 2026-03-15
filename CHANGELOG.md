# Changelog

All notable governance changes should be recorded in this file.

The format is based on Keep a Changelog, adapted for governance documents.

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
