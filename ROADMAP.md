# Roadmap

This roadmap describes the development phases for the Peoples Potato Party of
Canada governance repository. It is a living document. Phases are not fixed
timelines — they are descriptions of capability states the project moves
through as community and infrastructure develop.

This project is a civic governance experiment. It is not a registered political
party and does not make legal or electoral commitments.

---

## Phase 1 — Architecture

**Status: Completed**

The foundational structure of a governance-as-code system is in place.

Delivered:
- [x] Manifesto articles (`instances/canada/manifesto/`)
- [x] Governance constitution and bylaws (`docs/governance/`)
- [x] Architecture Decision Records (`docs/adr/`)
- [x] CI/CD governance pipeline (`.github/workflows/policy-lint.yml`)
- [x] Governance lint rules and validation scripts (`scripts/`, `lint_rules/`)
- [x] Proposal template and intake process (`templates/`, `proposals/`)
- [x] Charter compliance placeholder checks
- [x] Crypto governance removal and civic technology refocus
- [x] Technical governance addendums (`civic_infrastructure/`)
- [x] AGENTS.md for AI agent collaboration contract

---

## Phase 2 — Community Activation

**Status: Active**

Make the repository usable by real contributors. Build the participation
layer so humans (and AI agents) can engage with the governance system
without needing to understand its full architecture first.

Goals:
- [ ] Onboarding documentation that works for non-technical contributors
- [ ] Starter experiments in `docs/experiments/` to lower the first-contribution barrier
- [ ] Governance roles defined and documented
- [ ] Issue templates that guide contributors toward useful submissions
- [ ] Updated README that communicates the project within 10 seconds
- [ ] First external contributors make substantive contributions
- [ ] At least two proposals moved through the full review pipeline
- [ ] Governance roles populated: at least two Policy Authors, one Governance
      Reviewer, two Maintainers

Success criteria for Phase 2 completion: the project can sustain contribution
activity without the founding contributors being actively involved in every
interaction.

---

## Phase 3 — Civic Participation Platform

**Status: Planned**

Build accessible digital infrastructure on top of the repository so
participation does not require Git or Markdown familiarity.

Goals:
- [ ] Web interface for browsing proposals and manifesto articles
- [ ] Proposal submission form that generates correctly formatted PRs
- [ ] Public governance health dashboard (automated from repository data)
- [ ] Bilingual interface (English and French)
- [ ] WCAG 2.1 AA accessibility compliance
- [ ] Mobile-accessible participation flows
- [ ] Public API for proposal and governance data (read-only)
- [ ] Integration with the existing CI/CD pipeline (web submissions go through
      the same checks as direct PR submissions)

Dependencies:
- Phase 2 must produce stable governance workflows before building a UI on
  top of them. Building the interface before the process is stable risks
  encoding broken workflows into the UI.

---

## Phase 4 — Digital Democracy Infrastructure

**Status: Planned**

Implement the more complex digital democracy capabilities described in
`docs/adr/0005-digital-democracy-architecture.md`.

Goals:
- [ ] End-to-end verifiable (E2E-V) remote voting system for membership
      consultations and governance votes
- [ ] Secure digital identity layer for member verification without exposing
      personal data beyond what each function requires
- [ ] Append-only, publicly verifiable governance audit log
- [ ] Simulation engine for testing governance proposals before ratification
      (`simulations/`)
- [ ] Adversarial threat modeling pipeline integrated into CI
- [ ] Constitutional compliance checking with legal review integration
- [ ] Smart contract pilots for civic automation use cases (child support,
      grant disbursement) as described in
      `civic_infrastructure/smart_contracts.md`

Dependencies:
- Phase 3 participation platform must be stable and accessible before adding
  the complexity of cryptographic voting infrastructure.
- Smart contract pilots require legal review and are independent of the
  platform timeline — they can be developed in parallel.

---

## Ongoing — Governance Maintenance

These activities run continuously across all phases:

- Annual constitutional audit (as defined in `docs/governance/constitution.md`)
- CHANGELOG.md updates after significant merges
- ADR review when architectural decisions need revisiting
- Governance role updates as contributors advance
- Lint rule maintenance as Charter jurisprudence and governance patterns
  evolve
- Dependency and tooling updates for the CI pipeline

---

## What is not on this roadmap

- Electoral participation or candidate nomination (this is not a registered party)
- Fundraising infrastructure
- Official legal advice or Charter opinions
- Any system that makes binding political decisions

---

## How to contribute to the roadmap

The roadmap is itself a governance document. To propose changes:

1. Open a **Governance Discussion** issue describing what you think should
   be added, moved, or removed
2. Reference the relevant ADR or governance document if applicable
3. If there is consensus, a Maintainer updates this file and records the
   change in `CHANGELOG.md`

Phase 2 completion criteria and Phase 3 scope are especially open for
community input at this stage.
