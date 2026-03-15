# Architecture Decision Records

This directory contains the Architecture Decision Records (ADRs) for the
Peoples Potato Party of Canada (PPPC) governance repository.

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
