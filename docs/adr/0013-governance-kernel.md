# ADR-0013: Governance Kernel — Universal Governance Primitives

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-03-15 |
| Deciders | Repository maintainers |
| Affected components | `core/governance_kernel.md`, `core/README.md` |
| Implemented in | Session following ADR-0012 |

---

## Context

ADR-0012 established the two-layer architecture: a universal `core/` directory
and community-specific `instances/`. The refactor created the structure, but
left an open question: what exactly must a valid governance instance implement?

`core/` contained templates, protocols, and cycle documentation, but no single
document defined the irreducible set of things every governance system built on
this framework must have. The result was a framework with a clear directory
structure but no formal specification of its behaviour — analogous to having
an operating system with a filesystem but no kernel definition.

Two problems followed from this:

**The framework had no compliance surface.** An instance could copy the
directory structure, write manifesto articles, and call itself a governance-as-
code system without actually implementing any of the functional requirements
that make the framework meaningful — proposals, review processes, transparency
logs, decision records. There was no document to check against.

**The framework was harder to explain than it should have been.** Governance-
as-code is a novel concept. Communicating it to people unfamiliar with software
architecture required walking through multiple documents. A single foundational
document, written in accessible language with a coherent organising metaphor,
would lower the barrier to understanding the framework from the outside.

The operating-system kernel analogy offered a solution to both problems. An OS
kernel defines the primitives — process, file, socket, signal — that every
program must use to interact with the system. It does not dictate application
logic, but it defines the minimum vocabulary. A governance kernel analogously
defines the primitives — Member, Proposal, Discussion, Review, Decision, Cycle,
Transparency Log — that every governance instance must implement, without
dictating the content of any governance decision.

---

## Decision

We will create `core/governance_kernel.md` as the foundational specification
document for the PPP governance framework.

### Structure

The kernel document has nine sections:

**Section 1 — What This Document Is**: Establishes the document's authority
and scope. The kernel defines the minimum functional requirements. Any file
in `core/` or `instances/` that conflicts with the kernel is subject to
amendment. Instances extend the kernel; they do not override it.

**Section 2 — The Governance Primitives**: Eight named primitives that every
governance instance must implement. Each primitive has: a name, a definition
of what it is, required fields or properties, and constraints on its
behaviour. Instances must implement all eight primitives. They may extend
them with additional fields or behaviour, but may not remove required fields
or violate constraints.

**Sections 3–8**: Expanded specification for each primitive area, covering
the detailed rules for proposals (Section 3), public discussion (Section 4),
review process (Section 5), decision mechanisms (Section 6), governance
cycles (Section 7), and data governance (Section 8).

**Section 9 — Extending the Kernel**: Defines how instances add jurisdiction-
specific behaviour without breaking kernel compliance. Extensions are additive
only.

### The Eight Primitives

The primitives are named and sequenced to reflect the lifecycle of governance
participation:

1. **Member** — a person who has accepted the operating rules and whose
   participation is recorded in the governance log.
2. **Proposal** — a structured change request with a defined state machine
   (DRAFT → OPEN → DECIDED → ADOPTED/ARCHIVED).
3. **Public Discussion** — a bounded, recorded period of open comment on a
   proposal, accessible to non-Members.
4. **Review Process** — a structured evaluation of a proposal by qualified
   Reviewers within a defined timeframe.
5. **Decision Mechanism** — the defined method by which a proposal moves
   from OPEN to DECIDED (consensus, supermajority, single-role authority
   within defined limits).
6. **Governance Cycle** — a bounded period during which proposals are
   submitted, reviewed, decided, and the cycle is closed and versioned
   with a semantic version tag.
7. **Transparency Log** — an append-only, publicly accessible record of
   all governance acts, indexed by cycle and proposal identifier.
8. **Personal Data** — see ADR-0014; added in the same work session as
   a consequence of recognising that governance participation involves
   processing of political opinions, which is special-category personal
   data under data protection law.

### Proposal State Machine

The proposal state machine is formally defined in the kernel as the canonical
lifecycle for all proposals across all instances:

```
DRAFT → OPEN → DECIDED → ADOPTED
                       ↘ ARCHIVED
```

State transitions are one-directional. A DECIDED proposal cannot return to
OPEN without being withdrawn and resubmitted as a new DRAFT. This constraint
ensures the transparency log is not retroactively ambiguous.

### Governance Cycle Versioning

Governance cycles close with a semantic version tag following `MAJOR.MINOR.PATCH`
conventions applied to governance (constitutional amendments = MAJOR, policy
adoptions = MINOR, corrections = PATCH). This was established in earlier
governance documents but is now formally defined in the kernel as a binding
requirement rather than a convention.

---

## Consequences

### Positive

- The framework now has a formal specification. An instance can be evaluated
  for kernel compliance by checking whether all eight primitives are
  implemented and whether the state machine and transparency log requirements
  are met.
- The kernel document serves as the entry point for new contributors. Rather
  than reading ADRs 0001–0012 to understand the framework, a new contributor
  can read `core/governance_kernel.md` and have a complete mental model of
  how the system works.
- The OS kernel analogy is accurate and useful. It correctly conveys that
  the kernel defines the minimum vocabulary, not the content of decisions —
  addressing a common misunderstanding that governance-as-code means
  automating decisions rather than structuring the processes around them.
- The primitives language creates a shared vocabulary for discussing the
  framework. Contributors can refer to "the Review Process primitive" or
  "the Transparency Log" as defined concepts rather than describing what
  they mean each time.

### Negative

- The kernel adds a compliance requirement on all existing and future
  instances. The Canada instance, as the reference implementation, is
  implicitly the test of whether the kernel requirements are achievable.
  If the Canada instance cannot meet a kernel requirement without difficulty,
  the requirement should be reconsidered.
- The kernel specification may become a point of contention if future
  instances have governance models that do not fit the eight-primitive
  structure. The kernel should be treated as open to extension through the
  standard proposal process, not as a closed specification.
- `core/governance_kernel.md` is now a single large document covering
  specification, rationale, and operational guidance. There is a risk
  that it grows unwieldy as the framework matures. A future refactor may
  split it into `core/governance_kernel_spec.md` (normative) and
  `core/governance_kernel_guide.md` (explanatory).

### Neutral / Watch Items

- The kernel defines the primitives but does not provide tooling to validate
  compliance. The CI pipeline's `scripts/validate_structure.py` checks for
  required files and ADR format but does not check primitive compliance.
  A future lint rule could check that each instance directory contains the
  required primitive documentation.
- The primitive numbering (1–8) reflects the lifecycle sequence, not a
  priority ordering. Instances should implement all eight from the start,
  not sequentially.

---

## Alternatives Considered

### Alternative 1: Distribute the kernel definition across existing `core/` documents

Description: Rather than a single `governance_kernel.md`, distribute primitive
definitions across `core/governance_protocol/`, `core/proposal_system/`, and
`core/governance_cycles/`.

Reason rejected: Distribution makes the specification harder to reference and
harder to ensure completeness. The kernel analogy specifically requires a single
authoritative specification document. Distributing it across multiple files
produces the same problem the kernel was designed to solve: no single place to
check compliance.

### Alternative 2: Use a formal specification language (JSON Schema, YAML)

Description: Define the primitives as machine-readable schemas rather than
prose, enabling automated compliance checking.

Reason rejected: The primary audience for the kernel document is human
contributors and evaluators, not automated tools. Prose specifications are
more accessible and more useful at the current stage of the framework.
Machine-readable schemas can be added as a complement to prose specifications
if compliance checking tooling is developed in the future.

### Alternative 3: Defer the kernel until a second instance exists

Description: Wait until a real second instance needs to be created before
defining formal primitives, on the grounds that one instance is insufficient
evidence for what the abstractions should be.

Reason rejected: The kernel definition process itself is valuable. Writing
the primitives forces the question of what is truly universal versus what is
Canada-specific. Several design decisions in the kernel (the state machine,
the versioning convention, the transparency log append-only requirement) were
clarified by the process of writing the specification, not by observing
multiple instances.

---

## Future Revisions

This ADR should be revisited if:

- A second instance is created and the kernel requirements are found to
  be too Canada-specific — at which point specific primitives should be
  relaxed or made instance-configurable.
- The kernel document grows beyond approximately 600 lines, at which point
  splitting normative specification from explanatory guidance should be
  considered.
- Automated compliance checking tooling is developed, which would require
  the prose specification to be accompanied by (or replaced by) a machine-
  readable schema.
- A governance instance proposes a ninth primitive, which should be evaluated
  against whether it is truly universal (belongs in the kernel) or instance-
  specific (belongs in the instance's extension documentation).
