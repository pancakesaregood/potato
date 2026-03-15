# Governance Protocol

This directory describes the universal governance architecture that every
instance built on this framework shares. These protocols define how decisions
are made, how authority is structured, and how accountability is maintained —
without prescribing the specific institutions or legal forms any particular
community must use.

## The governance stack

```
Constitution / Founding Charter          ← instance-specific, highest authority
    └── Bylaws / Operating Rules         ← instance-specific, amended by convention
         └── Governance Protocol        ← framework-level, defines process structure
              └── Policy Articles       ← instance-specific, policy content
                   └── Proposals        ← any member, change intake
```

Everything above the governance protocol layer is instance-specific. The
protocol layer defines the machinery that all instances share.

## Core protocols

### Authority hierarchy

Every instance must define a clear authority hierarchy with at least three
levels:

1. **Founding document** (constitution, charter, or equivalent) — supreme,
   hardest to amend, defines member rights and institutional structure.
2. **Operating rules** (bylaws, standing orders) — govern day-to-day
   operations, easier to amend, cannot contradict the founding document.
3. **Policy positions** (manifesto articles, resolutions) — the content of
   what the movement stands for, amendable through the proposal system.

No lower-level document may contradict a higher-level one. Conflicts are
resolved in favour of the higher-level document until the lower one is
formally corrected.

### Separation of powers

Instances should distribute authority across at least three distinct bodies:

- A **deliberative assembly** (convention, congress, general assembly) —
  the supreme democratic authority, meets periodically.
- A **governing council** (executive committee, steering group) — exercises
  authority between assemblies, accountable to the assembly.
- **Local units** (chapters, branches, regional associations) — the primary
  organizing layer, closest to members.

No single body or person should hold appointment, dismissal, budget approval,
constitutional interpretation, and emergency declaration powers simultaneously.
See `civic_infrastructure/governance_protocol.md` for the full treatment.

### Member rights floor

Every instance must define a floor of member rights that cannot be removed
by bylaws, resolutions, or executive action — only by amendment to the
founding document. At minimum, members must have:

- the right to participate in the processes relevant to their membership tier
- the right to propose changes through a documented process
- the right to procedural fairness in any adverse proceeding
- the right to appeal adverse decisions

### Decision thresholds

Instances must define graduated decision thresholds:

| Decision type | Minimum threshold |
| --- | --- |
| Ordinary policy | Simple majority of votes cast |
| Operating rules (bylaws) | 60% of votes cast |
| Founding document | 75% of votes cast |
| Dissolution or merger | 75% + direct membership vote |

Thresholds may be set higher but not lower than these minimums.

### Proposal states

All proposals must move through defined states. The minimum required states
are:

```
Draft → Submitted → Under Review → Voted → [Adopted | Archived]
```

Instances may add intermediate states (e.g., Amended, Deferred) but must
not skip from Submitted directly to Adopted without a review and vote stage.

## Universal implementation documents

The following documents in `civic_infrastructure/` implement these protocols
and are available to all instances:

| Document | What it covers |
| --- | --- |
| [governance_protocol.md](../../civic_infrastructure/governance_protocol.md) | Proposal state machine and audit trail |
| [decision_protocol.md](../../civic_infrastructure/decision_protocol.md) | Democratic consensus and voting workflow |
| [civic_digital_infrastructure.md](../../civic_infrastructure/civic_digital_infrastructure.md) | Digital participation platforms |
| [cryptography.md](../../civic_infrastructure/cryptography.md) | Identity, signatures, and secure voting |
| [interoperability.md](../../civic_infrastructure/interoperability.md) | Data exchange across civic systems |
| [smart_contracts.md](../../civic_infrastructure/smart_contracts.md) | Civic automation use cases |

## What instances add

On top of this universal layer, each instance provides:

- A founding document adapted to its jurisdiction and community norms
- Operating rules suited to its scale and legal context
- Policy articles addressing its community's specific challenges
- Jurisdiction-specific compliance (electoral law, privacy law, etc.)

See `instances/canada/` for a complete example.
