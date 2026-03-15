# Core Governance Framework

This directory contains the universal, country-agnostic infrastructure for
any governance instance built on this framework.

Nothing in `core/` references a specific country, legal system, electoral
structure, or political context. These are the building blocks. A governance
instance — stored in `instances/<name>/` — provides the specific policies,
constitutional structures, and cultural context that make the framework
concrete for a particular community.

## What lives here

```
core/
├── manifesto_template/     universal article structure and guidance
├── governance_protocol/    how governance processes work
├── proposal_system/        how proposals are submitted and reviewed
└── governance_cycles/      how policy evolves through iterative cycles
```

## How core relates to instances

```
core/ (universal)
  └── defines structure, templates, and protocols

instances/<name>/ (specific)
  └── implements those structures for a real community
```

Think of `core/` as the framework and `instances/` as the applications built
on top of it. The framework provides consistent structure and tooling. Each
instance provides the democratic content and community context.

## What does not live here

- Policy positions on any issue
- References to specific national laws, courts, or electoral systems
- Country-specific institutions (e.g., "Parliament", "Senate", "riding")
- Cultural or historical references specific to one community

If a document in `core/` contains any of the above, it belongs in an
instance instead.

## Creating a new instance

See [INSTANCE_GUIDE.md](../INSTANCE_GUIDE.md) at the repository root.
