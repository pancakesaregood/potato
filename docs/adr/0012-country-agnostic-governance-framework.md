# ADR-0012: Refactor into a Country-Agnostic Governance Framework

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-03-15 |
| Deciders | Repository maintainers |
| Affected components | `core/`, `instances/`, `INSTANCE_GUIDE.md`, `instances/canada/manifesto/` (git mv from `manifesto/`) |
| Implemented in | commit `da99d65` |

---

## Context

The repository was originally structured as a single-purpose governance
system for the Peoples Potato Party of Canada. All manifesto articles
lived at the repository root in `manifesto/`, governance documents were
in `docs/governance/`, and there was no mechanism for another community
to adopt the same framework without forking and manually adapting
Canada-specific content.

Several pressures made this structure worth revising:

**The framework had already proven itself.** ADRs 0001–0011 established a
complete governance-as-code system: constitutional documents, bylaws,
a CI/CD pipeline, lint rules, proposal templates, governance cycles, and
participation infrastructure. This was more than a one-community tool.
The architecture was general. The content was specific to Canada.

**Content and structure were entangled.** The `manifesto/` directory at the
root implied the manifesto was the framework itself rather than one
community's expression of it. A contributor arriving at the repository had
no way to distinguish "things that apply to any governance instance" from
"things that are specific to the Canada instance."

**No instantiation path existed.** There was no documented process for a
second community — a UK progressive alliance, a municipal movement in
Mexico, a community organisation in New Zealand — to adopt the same
infrastructure. The practical answer was "fork and delete the Canada
stuff," which loses the shared framework and breaks upstream improvements.

**The Canada instance needed a home.** Governance documents in
`docs/governance/` referenced Canadian law, the Canadian Charter, and
Canadian electoral structures. Manifesto articles addressed Canadian
policy domains. These belonged in a Canada-specific namespace, not at the
repository root as if they were universal.

---

## Decision

We will separate the repository into two layers:

### Layer 1: Universal framework (`core/`)

A `core/` directory containing everything that applies to any governance
instance, with no references to specific countries, legal systems, or
political contexts:

```
core/
├── manifesto_template/     universal article structure and guidance
├── governance_protocol/    how governance processes work
├── proposal_system/        how proposals are submitted and reviewed
└── governance_cycles/      how policy evolves through iterative cycles
```

Nothing in `core/` will reference Canada, the Charter, federal electoral
districts, or any jurisdiction-specific concept. If a file in `core/`
requires such a reference to make sense, it belongs in an instance.

### Layer 2: Community instances (`instances/`)

An `instances/` directory where each subdirectory is a complete,
self-contained governance deployment for a specific community:

```
instances/
├── README.md               instance index and registry
└── canada/
    ├── README.md           Canada instance overview and article index
    └── manifesto/          Canada-specific policy articles
```

The Canada instance is the reference implementation. Its governance
documents (`docs/governance/`) remain at the repository level for now,
linked from `instances/canada/README.md`, because they predate this
refactor and a full migration is out of scope for this commit.

### Migration

The existing `manifesto/` directory will be moved to
`instances/canada/manifesto/` using `git mv` to preserve file history.

All cross-references to `manifesto/` paths in `ARCHITECTURE.md`,
`AGENTS.md`, `CONTRIBUTING.md`, `docs/how_to_participate.md`,
`docs/governance_roles.md`, `README.md`, and the `ROADMAP.md` will be
updated in the same commit.

### Instantiation guide

`INSTANCE_GUIDE.md` at the repository root will document the nine steps
required to create a new governance instance: fork, directory structure,
founding document, operating rules, foundational manifesto articles,
proposal template customisation, compliance check configuration, first
governance cycle, and instance registration.

The guide will use the Canada instance as the worked example throughout.

---

## Consequences

### Positive

- The framework is now reusable. A second community can follow
  `INSTANCE_GUIDE.md` and have a complete governance-as-code system
  without needing to strip out Canada-specific content manually.
- The separation of universal structure (`core/`) from specific content
  (`instances/`) makes the repository self-documenting. A contributor
  can immediately identify which files define the framework and which
  define a particular community's position.
- The Canada instance is now clearly identified as an instance — one
  implementation of the framework — rather than the framework itself.
  This is accurate and reduces the impression that the framework is
  Canada-specific.
- The `instances/README.md` registry provides a canonical list of
  communities using the framework. As more instances are added, this
  becomes a map of the framework's reach.
- The `INSTANCE_GUIDE.md` makes the framework actionable without
  requiring contributors to read through the ADR history to understand
  how to adopt it.

### Negative

- The `git mv` of `manifesto/` to `instances/canada/manifesto/` changes
  file paths that may be referenced in cached links, CI configuration,
  or contributor bookmarks. Cross-references in documentation are updated
  in this commit, but any external references (linked from outside the
  repository) will break.
- The Canada governance documents (`docs/governance/`) remain at the
  repository level rather than inside `instances/canada/governance/`.
  This is a structural inconsistency: the manifesto is now at
  `instances/canada/manifesto/` but the constitution and bylaws are at
  `docs/governance/`. The inconsistency is documented and accepted as a
  deferred migration.
- Creating a multi-instance structure adds complexity to the CI pipeline.
  The current pipeline targets `instances/` as a trigger path, which
  correctly catches all instance changes, but compliance checks are still
  configured for the Canada instance only. Configuring per-instance
  compliance checks is a Phase 3 concern.

### Neutral / Watch Items

- The `experiments/` files added in ADR-0010 (`experiments/digital_referendums.md`,
  `experiments/housing_policy_experiment.md`, `experiments/energy_strategy_experiment.md`)
  are Canada-specific and should migrate to `instances/canada/experiments/`
  in a future commit for consistency with this structure.
- The `core/` directory contains structural templates and protocols, but
  not executable tooling. The CI scripts in `scripts/` are also
  effectively framework-level infrastructure and would logically sit in
  `core/` as well. This is left for a future refactor to avoid changing
  the CI configuration at the same time as the directory structure.
- Future instances should not modify files in `core/`. If a core file
  does not work for a specific instance, the correct path is an upstream
  contribution to improve the core for everyone, not a local override.
  This convention is documented in `INSTANCE_GUIDE.md` but not enforced
  by the CI pipeline.

---

## Alternatives Considered

### Alternative 1: Keep the flat structure; fork for other communities

Description: Leave the repository as a Canada-specific system. Other
communities who want to use the framework fork the repository and adapt
it themselves. No `core/` or `instances/` separation.

Reason rejected: Forking loses shared improvements. If the Canada instance
fixes a bug in the proposal validation script, a fork that did not upstream
the fix remains broken. A monorepo with a clear instance boundary is a
stronger architecture for a framework that expects multiple deployments.
The `core/` abstraction also forces the discipline of identifying what is
truly universal versus what is Canada-specific — a discipline that makes
the framework itself better.

### Alternative 2: Move all Canada documents into `instances/canada/`

Description: Move not just `manifesto/` but also `docs/governance/`
(constitution, bylaws) into `instances/canada/governance/`, making the
instance self-contained.

Reason rejected: The `docs/governance/` documents predate this refactor
and have stable internal cross-references and CI paths built around their
current location. Moving them in the same commit as the `manifesto/` git
mv would produce a very large changeset with a high risk of broken
references. The partial migration (manifesto moved, governance documents
deferred) is accepted as a known inconsistency to be resolved in a future
commit.

### Alternative 3: `communities/` instead of `instances/`

Description: Name the second-level directory `communities/` rather than
`instances/`.

Reason rejected: "Instance" is the established term in framework and
platform architecture for a specific deployment of a general-purpose
system. A reader familiar with software architecture will immediately
understand `instances/canada/` as "the Canada deployment of this
framework." "Communities" is warmer but less precise — it does not carry
the implication that all instances share the same underlying infrastructure.

### Alternative 4: No `core/` directory; keep templates in `docs/`

Description: Keep universal templates and protocols inside `docs/` rather
than creating a new top-level `core/` directory.

Reason rejected: `docs/` is associated with human-readable documentation
about the Canada instance (governance documents, ADRs, participation
guides). Placing universal framework templates in `docs/` would blur the
boundary between "documentation of the Canada instance" and "templates
any instance should use." A top-level `core/` directory makes the
framework layer a first-class citizen of the repository structure, which
it now is.

---

## Future Revisions

This ADR should be revisited if:

- The Canada governance documents (`docs/governance/`) are migrated to
  `instances/canada/governance/`, at which point the structural
  inconsistency noted above is resolved and this ADR should be updated
  to reflect the completed migration.
- The `experiments/` files are migrated to `instances/canada/experiments/`,
  completing the Canada instance encapsulation.
- A second community creates an instance and the `INSTANCE_GUIDE.md`
  proves incomplete or misleading — the guide should be updated based on
  real instantiation experience, not just the Canada reference case.
- The CI pipeline is extended to support per-instance compliance check
  configuration, at which point `scripts/charter_compliance_placeholder.py`
  should be documented as the Canada-specific check rather than the
  framework default.
