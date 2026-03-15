# Governance Kernel

## 1. Purpose

The Governance Kernel defines the minimal set of primitives and rules that
all governance activity in this framework depends on. It does not describe
policy. It describes the mechanics that make policy development possible.

The analogy is deliberate. An operating system kernel does not run
applications — it defines the fundamental operations (process scheduling,
memory allocation, I/O) that applications are built on top of. It is small,
stable, and hardware-agnostic. Applications that respect the kernel's
interfaces can run on any machine.

The Governance Kernel plays the same role. It does not govern a community
— it defines the fundamental operations (proposal intake, deliberation,
decision, audit) that a governance instance is built on. It is small,
stable, and jurisdiction-agnostic. Communities that implement the kernel's
interfaces can run governance in any country.

### What the kernel is not

- It is not a constitution. Constitutions are instance-specific.
- It is not a policy. Policies are content. The kernel is structure.
- It is not a process manual. Process documents elaborate on the kernel;
  they do not replace it.

### Stability guarantee

The primitives defined here change rarely and only with strong justification.
Governance infrastructure that depends on the kernel should not need to
update because of policy changes in any particular instance. Changes to the
kernel follow the same proposal and review process as any other change, with
the additional requirement that no active instance is broken by the change.

---

## 2. Core Governance Primitives

The following primitives are the indivisible units of the governance system.
All higher-level constructs — processes, templates, decision rules — are
composed from these.

---

### Primitive 1: Member

**Description**
A Member is a recognized participant in a governance instance with defined
rights and responsibilities. Membership is not anonymous — it requires a
verifiable identity within the instance, though the identity need not be
public to all parties.

**Purpose**
Governance requires accountable participants. The Member primitive
establishes who can propose, who can deliberate, and who can decide.
Without defined membership, governance collapses into either an unaccountable
crowd or an unaccountable elite.

**Properties**
- A Member holds a membership tier (defined by the instance).
- A Member's tier determines which Decisions they may participate in.
- A Member may not hold rights below the floor defined in Section 5.
- Membership is granted, suspended, and revoked only through documented
  processes — never by unilateral executive action without appeal.

**Interacts with**
Proposal (who may submit), Decision (who may vote), Transparency Log
(all Member actions are logged).

---

### Primitive 2: Proposal

**Description**
A Proposal is a structured, versioned document describing a specific change
to governance, policy, or operating rules. It is the unit of change in the
system. All modifications to the governance state originate as Proposals.

**Purpose**
Proposals formalize the change process. By requiring changes to take
proposal form before consideration, the system ensures that intent is
recorded, tradeoffs are surfaced, and decisions can be traced to their
origin.

**Properties**
- A Proposal has exactly one author at submission, and an auditable revision
  history thereafter.
- A Proposal must describe: the problem being addressed, the proposed change,
  and the tradeoffs and risks of that change.
- A Proposal exists in one and only one State at any given time (see
  Section 3).
- A Proposal that fails a Decision is not deleted — it is archived with
  the outcome recorded.

**Interacts with**
Member (author, reviewers, voters), Review Process (evaluation), Decision
Mechanism (resolution), Transparency Log (full history recorded).

---

### Primitive 3: Public Discussion

**Description**
A Public Discussion is an open deliberative thread attached to a Proposal
or to a freestanding question. It is the mechanism through which Members
evaluate, challenge, and improve proposals before a Decision is taken.

**Purpose**
Decisions made without deliberation are arbitrary. Public Discussion
ensures that the reasoning behind a Decision is developed in the open,
that dissenting views are on record, and that proposals are improved by
collective scrutiny before adoption.

**Properties**
- A Discussion is permanently associated with its Proposal or question.
- All Discussion contributions are attributable to a Member.
- Discussions have a minimum open window before a Decision can proceed
  (duration set by instance operating rules).
- Closing a Discussion does not delete it — it is archived with the
  associated Proposal.

**Interacts with**
Proposal (every Proposal has a Discussion), Member (participants),
Transparency Log (all contributions recorded).

---

### Primitive 4: Review Process

**Description**
The Review Process is the structured evaluation of a Proposal before a
Decision is taken. It includes automated checks (structural, compliance)
and human review (substantive, contextual).

**Purpose**
Without review, governance systems accumulate contradictory, incomplete,
or harmful policy without detection. The Review Process is the filter
between proposal intent and adopted governance.

**Properties**
- Automated checks validate structure and flag compliance risks. They do
  not approve or reject Proposals — that is the role of human reviewers
  and the Decision Mechanism.
- Human review requires a minimum number of reviewers set by the instance
  (higher for foundational documents, lower for minor policy).
- A Proposal that fails automated checks may still proceed to human review;
  the failure is visible to all reviewers.
- Reviewers may be any eligible Member, subject to conflict-of-interest
  rules defined by the instance.

**Interacts with**
Proposal (subject of review), Member (reviewers), Decision Mechanism
(feeds into), Transparency Log (all review outputs recorded).

---

### Primitive 5: Decision Mechanism

**Description**
The Decision Mechanism is the process by which eligible Members resolve
a reviewed Proposal into one of two outcomes: Adopted or Archived. It
operates at a threshold appropriate to the significance of the change.

**Purpose**
Deliberation without resolution is indefinite. The Decision Mechanism
converts distributed opinion into a binding governance outcome, with the
threshold calibrated to the reversibility and consequence of the change.

**Properties**
- Every Decision requires a defined threshold (proportion of eligible
  Members who must assent for the Proposal to be Adopted).
- Thresholds are graduated: lower for ordinary policy, higher for
  operating rules, highest for foundational documents (see
  `core/governance_protocol/`).
- A Decision is not valid unless a minimum participation level is met
  (quorum). If quorum is not met, the Decision is deferred, not voided.
- All Decisions are recorded with: the question put, the vote tally,
  the outcome, and the date.

**Interacts with**
Proposal (subject of decision), Member (voters), Review Process
(precondition), Transparency Log (outcome recorded).

---

### Primitive 6: Governance Cycle

**Description**
A Governance Cycle is a bounded period within which Proposals are
submitted, reviewed, decided, and integrated. At the close of each Cycle,
the governance state is tagged as a versioned snapshot.

**Purpose**
Continuous, unstructured change is ungovernable. Cycles create predictable
windows for participation, prevent proposal flooding, and produce a
versioned history of how governance has evolved over time. The model is
analogous to a software release cycle: changes accumulate in a branch,
are reviewed as a cohort, and are released as a named version.

**Properties**
- A Cycle has a defined open date and close date.
- Proposals that do not complete the Decision stage by the Cycle close
  are carried forward or archived according to instance operating rules.
- Each Cycle closes with a public Cycle Report (see Section 4).
- Cycle cadence is set by each instance. The framework does not impose
  a frequency.

**Interacts with**
All other primitives — the Cycle is the temporal container within which
they operate.

---

### Primitive 7: Transparency Log

**Description**
The Transparency Log is the append-only, permanent record of all
governance events: Proposals submitted, revised, and decided; Discussions
opened and closed; Decisions taken with tallies; Cycle Reports published;
Member status changes.

**Purpose**
Accountability requires memory. The Transparency Log ensures that no
governance action disappears — every decision can be traced to the
proposal that caused it, the discussion that shaped it, and the members
who decided it. This is what separates governance from administration.

**Properties**
- The Log is append-only. Entries are never deleted or altered.
- The Log is public by default. Instances may restrict specific fields
  (e.g., voter identity in secret ballots) but must justify and document
  any restriction.
- The Log is machine-readable and human-readable simultaneously.
- The Log is stored in the version-controlled repository, meaning its own
  history is auditable.

**Interacts with**
All other primitives — every primitive event produces a Log entry.

---

## 3. Proposal State Machine

A Proposal exists in exactly one State at any time. State transitions are
triggered by defined events and are recorded in the Transparency Log.

```
                    ┌─────────────────────────────────────────────┐
                    │             PROPOSAL STATE MACHINE          │
                    └─────────────────────────────────────────────┘

  [Author]                                            [Member vote]
     │                                                     │
     ▼                                                     ▼
  DRAFT ──── submitted ────► OPEN ──── review closes ────► DECIDED
  (private)   (PR opened)  (public,    (vote opens)       │       │
                           discussion                      │       │
                           active)                         ▼       ▼
                                                       ADOPTED  ARCHIVED
                                                       (merged) (recorded,
                                                                 closeable)
```

| State    | Entry event                        | Exit event                   |
| -------- | ---------------------------------- | ---------------------------- |
| DRAFT    | Author begins writing              | Author submits (opens PR)    |
| OPEN     | PR opened, automated checks run    | Review window closes         |
| DECIDED  | Vote completes at required quorum  | Merge or archive action      |
| ADOPTED  | Proposal meets Decision threshold  | Terminal state               |
| ARCHIVED | Proposal fails or is withdrawn     | Can be reopened in new Cycle |

**Invariants:**

- A Proposal may not move from DRAFT to DECIDED without passing through OPEN.
- A Proposal in ADOPTED state may not be modified — a new Proposal must
  be raised to change it.
- A Proposal in ARCHIVED state may be reopened in a future Cycle as a new
  DRAFT, with a reference to the prior attempt.

---

## 4. Governance Cycles

Governance occurs through repeating Cycles. Each Cycle is a versioned unit
of governance work, analogous to a software sprint or release iteration.

### Why cycles rather than continuous flow

Continuous, unstructured governance accumulates unevaluated proposals,
produces incoherent policy sets, and makes participation unpredictable.
Cycles solve these problems by:

- Creating a known participation window that Members can plan around.
- Batching related proposals for coherent review (contradictions surface
  within the cycle rather than after adoption).
- Producing a versioned snapshot at close so the policy state at any
  point in time is exactly retrievable.
- Generating a Cycle Report that makes the health of the governance
  process visible to Members and the public.

### Cycle phases

```
  OPEN  →  DRAFT  →  REVIEW  →  VOTE  →  MERGE  →  REPORT
```

| Phase  | What happens                                                   |
| ------ | -------------------------------------------------------------- |
| OPEN   | Cycle begins; prior Cycle Report published; submission window opens |
| DRAFT  | Members write Proposals; Discussion issues active; no votes yet |
| REVIEW | Proposals enter formal Review Process; minimum window enforced  |
| VOTE   | Eligible Members vote; quorum and threshold rules apply         |
| MERGE  | Adopted Proposals merged; failed Proposals archived            |
| REPORT | Cycle Report published; repository tagged with semantic version |

### Cycle cadence

Instances set their own cadence. The framework is compatible with:
convention-based (annual or biennial), quarterly, or continuous-release
models. See `core/governance_cycles/` for implementation guidance.

### Emergency Cycles

An Emergency Cycle may be declared when urgent action cannot wait for
the next regular Cycle. Emergency Cycles are subject to the constraints
in `core/governance_cycles/` and may not be used to circumvent Member
rights defined in the founding document.

---

## 5. Review and Decision Rules

The following rules are universal minimums. Instances may set stricter
rules; they may not set weaker ones.

### Review rules

**Minimum reviewer count**
- Ordinary policy changes: 2 reviewers who are not the author.
- Operating rule changes: 3 reviewers, including at least 1 Governance
  Reviewer or Maintainer.
- Foundational document changes: 5 reviewers, including at least 2
  Maintainers.

**Conflict of interest**
A reviewer may not review a Proposal in which they have a direct personal
interest. The reviewer must declare the conflict and recuse. Declaration
and recusal are logged.

**Review window**
No Proposal may proceed to a vote before a minimum 14-day public review
window has elapsed from the date of submission. Instances may set longer
windows; emergency cycles may shorten this with higher vote thresholds
applied.

**Automated checks as preconditions, not gatekeepers**
Automated checks flag structural and compliance issues. They do not block
human review. A Proposal with a failing automated check may proceed to
human review, but the failure is visible to all reviewers and must be
addressed before a Proposal can be Adopted.

### Decision rules

**Graduated thresholds**
The required threshold scales with the significance of the change:

| Change type          | Minimum threshold                        |
| -------------------- | ---------------------------------------- |
| Ordinary policy      | Simple majority of votes cast            |
| Operating rules      | 60% of votes cast                        |
| Foundational document| 75% of votes cast                        |
| Dissolution or merger| 75% + direct membership ratification     |

**Quorum**
A Decision requires a minimum quorum (proportion of eligible Members
who must vote) defined by the instance. A Decision taken below quorum
is deferred to the next Cycle, not voided.

**Transparency of outcome**
Every Decision is published with: the final text voted on, the vote
tally (for/against/abstain), the quorum achieved, and the outcome.
Secret ballots may conceal individual votes; they may not conceal
aggregate tallies.

**Member rights floor**
No Decision — regardless of threshold achieved — may:

- Remove a Member's right to propose changes through a documented process.
- Remove a Member's right to procedural fairness in an adverse proceeding.
- Remove a Member's right to appeal an adverse decision.
- Apply a new rule retroactively to past Member conduct.

These rights can be modified only by a foundational document amendment
that itself passes the foundational document threshold.

---

## 6. Transparency and Auditability

Transparency is not a feature — it is a structural property of the
governance system. It is implemented through the Transparency Log
(Primitive 7) and the version-controlled repository.

### What must be public

| Record                       | Retention  |
| ---------------------------- | ---------- |
| All submitted Proposals      | Permanent  |
| All Proposal revisions       | Permanent  |
| All Discussion contributions | Permanent  |
| All Review outputs           | Permanent  |
| All Decision outcomes        | Permanent  |
| All Cycle Reports            | Permanent  |
| Member status changes        | Permanent  |
| Emergency Cycle declarations | Permanent  |

No governance record may be deleted. Corrections are made by appending
a correction entry, not by removing the original.

### Traceability requirement

Any governance state (any rule that is currently in force) must be
traceable to:

1. The Proposal that introduced it.
2. The Decision that adopted it.
3. The Cycle in which it was adopted.
4. The Members who reviewed and voted on it.

If any of these four links cannot be established for a rule currently
in force, the governance record is incomplete and must be corrected.

### Trust through openness

Governance systems derive legitimacy from their members' confidence that
the process is honest. Transparency Log records build that confidence not
by asserting trustworthiness, but by making verification possible for
anyone. A Member who doubts a Decision can check the record. A journalist
investigating an outcome can check the record. A future Member trying to
understand why a rule exists can check the record.

Trust is a consequence of auditability, not a precondition for it.

---

## 7. Extensibility

The Governance Kernel defines primitives and minimum rules. It does not
define policy, institutions, or jurisdiction-specific processes. This is
intentional.

### The extension model

```
┌────────────────────────────────────────────────────┐
│                 GOVERNANCE KERNEL                   │
│   (primitives, state machine, minimum rules)        │
└────────────────────────┬───────────────────────────┘
                         │ extended by
          ┌──────────────┴──────────────┐
          │                             │
┌─────────▼──────────┐       ┌──────────▼──────────┐
│   core/ modules    │       │  instance-specific  │
│   (universal       │       │  governance docs    │
│    procedures)     │       │  (constitutions,    │
│                    │       │   bylaws, policy)   │
└────────────────────┘       └─────────────────────┘
```

### What instances extend

Instances built on this framework add:

- A **founding document** defining member rights, institutions, and
  amendment procedures appropriate to their jurisdiction and community.
- **Operating rules** defining cycle cadence, quorum levels, role
  structures, and day-to-day procedures.
- **Policy articles** defining the community's positions on specific
  issues.
- **Compliance checks** configured for their jurisdiction's legal and
  rights framework.

### What instances may not override

Instances may not relax the minimum rules defined in Sections 5 and 6.
Specifically:

- Review windows may not be shorter than 14 days outside emergency cycles.
- Decision thresholds may not be lower than the minimums in Section 5.
- Member rights floor protections may not be removed.
- Transparency Log records may not be deleted.

If a minimum rule proves unworkable for a community's context, the
correct path is an upstream contribution to improve the kernel — not
a local override that silently weakens the framework's guarantees.

### Modules, not forks

Extensions should be layered on top of the kernel, not spliced into it.
A governance instance that modifies `core/governance_kernel.md` directly
has forked the framework. A governance instance that implements the kernel
in its founding document and operating rules, and adds its own policy
content, remains compatible with framework improvements.

The principle is the same as in software: depend on the interface, not
the implementation. The kernel is the interface.
