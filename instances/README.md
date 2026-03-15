# Instances

An instance is a complete, community-specific governance deployment built on
the core framework. Each instance lives in its own subdirectory here.

```
instances/
├── canada/      The Peoples Potato Party of Canada (reference implementation)
└── <yours>/     Your community's governance instance
```

## What an instance contains

```
instances/<name>/
├── README.md               what this instance is and who it is for
├── manifesto/              policy articles for this community
│   ├── _index.md           auto-generated article index
│   └── article_NN_*.md     individual policy articles
├── governance/             founding document and operating rules
│   ├── constitution.md     the founding charter
│   └── bylaws/             operating rules
├── proposals/              policy proposals under active review
│   └── archive/            proposals that did not pass
├── experiments/            open policy questions and debate spaces
└── cycle_reports/          end-of-cycle governance reports
```

## What an instance inherits from core

Every instance automatically inherits:

- the proposal system (`core/proposal_system/`)
- the governance cycle structure (`core/governance_cycles/`)
- the governance protocol (`core/governance_protocol/`)
- the manifesto article structure (`core/manifesto_template/`)
- the CI/CD validation pipeline (`.github/workflows/`)

Instances do not need to copy these. They use them by being in the same
repository and following the same file conventions.

## Creating a new instance

See [INSTANCE_GUIDE.md](../INSTANCE_GUIDE.md).

## Existing instances

| Instance | Description | Status |
| --- | --- | --- |
| [canada](canada/) | Peoples Potato Party of Canada — reference implementation | Active |
