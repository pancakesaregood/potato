# Architecture Decision Records

This directory contains the Architecture Decision Records (ADRs) for the
Peoples Potato Party (PPP) governance framework.

## What an ADR Does

An Architecture Decision Record captures a significant design choice, why it was
made, what alternatives were considered, and what tradeoffs follow from it.

ADRs are not policy planks. They explain why the repository is structured the
way it is.

## ADR Status Values

| Status | Meaning |
| --- | --- |
| `Proposed` | Under review |
| `Accepted` | Active decision |
| `Deprecated` | No longer recommended |
| `Superseded` | Replaced by a newer ADR |

## How To Use This Directory

1. Copy `0000-adr-template.md` to the next available numbered file.
2. Fill in context, decision, consequences, alternatives, and future revisions.
3. Set the initial status to `Proposed`.
4. Open a pull request and route the ADR through the same review pipeline used
   for repository governance changes.

## Governance Relationship

The repository hierarchy is:

```text
Constitution
  -> ADRs
    -> Bylaws and governance documents
      -> Policy and manifesto documents
        -> Proposals under review
```

Changing an ADR does not automatically change policy text, but ADRs can change
how policy and governance are processed.

## Index

| ADR | Title | Status |
| --- | --- | --- |
| [0000](0000-adr-template.md) | ADR Template | Reference |
| [0001](0001-governance-as-code.md) | Governance as Software Infrastructure | Accepted |
| [0002](0002-modular-manifesto-structure.md) | Modular Manifesto Structure | Accepted |
| [0003](0003-ci-cd-governance-model.md) | CI/CD Governance Model | Accepted |
| [0004](0004-ai-agent-collaboration.md) | AI Agent Collaboration | Accepted |
| [0005](0005-digital-democracy-architecture.md) | Digital Democracy Architecture | Accepted |
| [0006](0006-charter-compliance-validation.md) | Charter Compliance Validation | Accepted |
| [0007](0007-open-policy-development.md) | Open Policy Development | Accepted |
| [0008](0008-remove-crypto-governance.md) | Remove Cryptocurrency Governance | Accepted |
| [0009](0009-rename-tech-governance-to-civic-infrastructure.md) | Rename `tech_governance/` to `civic_infrastructure/` | Accepted |
| [0010](0010-add-participation-layer.md) | Add Participation Layer and Community Activation Infrastructure | Accepted |
| [0011](0011-manifesto-governance-concepts-and-constitutional-register.md) | Integrate Governance-as-Code into the Manifesto and Rewrite the Constitution in Constitutional Register | Accepted |
| [0012](0012-country-agnostic-governance-framework.md) | Refactor into a Country-Agnostic Governance Framework | Accepted |
| [0013](0013-governance-kernel.md) | Governance Kernel — Universal Governance Primitives | Accepted |
| [0014](0014-gdpr-data-governance-primitive.md) | GDPR-Compliant Personal Data Governance Primitive | Accepted |
| [0015](0015-complete-ci-linting-and-structure-validation.md) | Complete CI Linting and Structure Validation | Accepted |
| [0016](0016-consolidate-experiments-directory.md) | Consolidate Experiments Directory | Accepted |
| [0017](0017-github-pages-civic-participation-platform.md) | GitHub Pages as the Civic Participation Platform | Accepted |
