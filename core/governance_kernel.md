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
- The Log records governance acts, not full identity profiles. Member
  identity data is separable from participation records to enable data
  subject rights without corrupting the audit trail (see Section 8.4).

**Interacts with**
All other primitives — every primitive event produces a Log entry.
Personal Data (Section 8.4 governs the tension between Log permanence
and data subject erasure rights).

---

### Primitive 8: Personal Data

**Description**
Personal Data is any information processed by the governance system that
relates to an identified or identifiable natural person. This includes
Member identity records, participation history, vote attribution,
discussion contributions, and any other data collected in order to operate
the governance process.

**Purpose**
Governance cannot function without processing some personal data: Members
must be verifiable, participation must be attributable, and decisions must
be traceable. Defining Personal Data as a first-class primitive ensures
that data protection is treated as a structural requirement — not an
afterthought — and that the rights of Members over their own data are
enforceable at the kernel level.

**Properties**
- Personal Data is collected only for defined governance purposes and may
  not be repurposed without a lawful basis independent of the original
  collection.
- Each category of Personal Data has a defined retention period and a
  defined access boundary (see Section 8).
- Members hold data subject rights over their Personal Data (see
  Section 8.3). These rights are limited where governance accountability
  requirements create a lawful basis for retention, but limits must be
  documented and justified.
- Personal Data is processed with the minimum necessary identifiability.
  Where a governance function can be performed with an anonymised or
  pseudonymised record, full identity linkage must not be maintained.

**Interacts with**
Member (subject of data), Transparency Log (records governance acts that
may contain personal data), Decision Mechanism (vote attribution), all
primitives that produce records involving identifiable participants.

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

---

## 8. Data Governance Agreement

This section defines the universal minimum standards for how the
governance system handles personal data. These standards are aligned with
the General Data Protection Regulation (GDPR, EU 2016/679) and reflect
broadly accepted principles of data protection. They apply to all
instances regardless of jurisdiction.

Instances operating in jurisdictions with a directly applicable data
protection regime (including the EU/EEA, UK, Canada under PIPEDA, and
equivalents) must implement the full requirements of that regime in
addition to these minimums. Where local law is stricter than this
section, local law governs.

---

### 8.1 Categories of Personal Data Processed

The governance system processes the following categories of personal data:

| Category | Examples | Sensitivity |
| --- | --- | --- |
| Identity data | Name, email address, membership ID | Standard |
| Participation data | Proposals submitted, reviews, votes | **Special category** (see note) |
| Authentication data | Password hashes, session tokens | High — internal only |
| Communication data | Discussion comments, review text | Standard — public by design |
| Administrative data | Membership status, role assignments, sanctions | Standard |

**Special category note:** Under GDPR Article 9, data that reveals
political opinions is subject to enhanced protections. Member
participation in governance — including which proposals a Member supports
or opposes, what positions they argue for, and how they vote — may
constitute processing of political opinion data. Instances operating
in GDPR jurisdictions must establish an explicit lawful basis for
processing this category (typically explicit consent under Article 9(2)(a),
or a member association exemption under Article 9(2)(d)).

---

### 8.2 Data Processing Principles

The following principles govern all personal data processing in the
system. They map directly to GDPR Article 5.

**Lawfulness, fairness, and transparency**
Personal data is processed only when a lawful basis exists. The lawful
basis for each processing activity must be documented and communicated
to Members before or at the time of data collection. Members are not
deceived about what data is collected or why.

**Purpose limitation**
Data collected for governance purposes (verifying membership, recording
participation, producing audit trails) may not be used for unrelated
purposes — including marketing, research unrelated to the governance
framework, or sharing with third parties — without a separate lawful
basis documented in the instance's data processing record.

**Data minimisation**
Only data that is necessary for the stated governance purpose is
collected. Where a governance function can be performed with less
identifiable data, the less identifiable approach is required. Examples:

- Aggregate vote tallies are always sufficient for published Cycle Reports.
  Individual vote attribution is retained internally only where required
  for accountability or audit.
- Discussion contributions require a Member identifier for accountability
  but do not require full legal name in public-facing records unless the
  instance's operating rules specifically require it.

**Accuracy**
Personal data must be kept accurate. Members have the right to correct
inaccurate data about themselves (see Section 8.3). Where a correction
is made to a governance record, the original entry is preserved with
an appended correction note — it is not overwritten.

**Storage limitation**
Personal data is retained only as long as necessary for the governance
purpose it was collected for, subject to the transparency and
accountability requirements in Section 6.

| Data category | Default retention |
| --- | --- |
| Identity data (active member) | Duration of membership + 2 years |
| Identity data (former member) | 7 years post-membership, then pseudonymised |
| Participation and vote records | Permanent (public interest — see Section 8.4) |
| Authentication data | Deleted or invalidated immediately on session end or membership termination |
| Sanction and appeal records | 7 years from closure of proceedings |

Instances may extend retention periods where required by law. They may
not shorten the participation and vote record retention below the
permanent threshold established in Section 6.

**Integrity and confidentiality**
Personal data is protected against unauthorised access, accidental loss,
and destruction. Technical measures (access controls, encryption in
transit, secure storage) and organisational measures (access limited to
role-appropriate personnel) are required. Authentication data is never
stored in plaintext.

**Accountability**
Each instance that processes personal data is the data controller for
that data. The instance must be able to demonstrate compliance with
these principles on request. A record of processing activities must be
maintained and made available to Members.

---

### 8.3 Member Data Subject Rights

Members hold the following rights over their personal data. Instances
must provide a mechanism for Members to exercise each right and must
respond within 30 days.

**Right of access (GDPR Article 15)**
A Member may request a copy of all personal data held about them,
the purposes for which it is processed, the retention periods that
apply, and with whom it has been shared.

**Right to rectification (GDPR Article 16)**
A Member may request correction of inaccurate personal data. In
governance records, corrections are appended rather than overwritten
(see Section 8.2, Accuracy).

**Right to erasure (GDPR Article 17)**
A Member may request deletion of their personal data. This right is
limited where retention is required for the governance accountability
purposes described in Section 8.4. The instance must:
- delete or pseudonymise data that is not required for accountability, and
- explain in writing which data is retained, under which lawful basis,
  and for how long.

**Right to restriction of processing (GDPR Article 18)**
While a rectification request or an objection is under review, the
Member may request that their data not be actively used for new
processing purposes.

**Right to data portability (GDPR Article 20)**
Where data was collected on the basis of consent or contractual
necessity, a Member may request their data in a structured,
machine-readable format.

**Right to object (GDPR Article 21)**
A Member may object to processing based on legitimate interests. The
instance must cease that processing unless it can demonstrate compelling
legitimate grounds that override the Member's interests.

**Right not to be subject to automated decisions (GDPR Article 22)**
No decision that significantly affects a Member's rights or standing
(approval, suspension, expulsion, role assignment) may be made solely
by automated processing without human review and an opportunity for
the Member to contest the outcome.

---

### 8.4 The Transparency–Erasure Tension

Section 6 requires that governance records be permanent and append-only.
GDPR Article 17 grants a right to erasure. These requirements are in
direct tension for participation data (votes, proposals, review
contributions) that is both personal data and a governance accountability
record.

The resolution is the public interest exception in GDPR Article 17(3)(b),
which provides that the right to erasure does not apply where processing
is necessary for the performance of a task carried out in the public
interest. Democratic governance records — the audit trail that allows
Members and the public to verify that decisions were made fairly — qualify
under this exception.

The following rules implement this balance:

**What must be retained permanently (Article 17(3)(b) applies)**
- The fact that a Proposal was submitted, reviewed, voted on, and
  adopted or archived.
- The aggregate vote tally and outcome of every Decision.
- The text of all adopted Proposals (these are the governance record itself).
- The existence of Discussion contributions linked to a Proposal.

**What must be erasable on request**
- The link between a specific Member's identity and their individual vote,
  where the vote was conducted by secret ballot.
- Contact details and identity data beyond what is required to attribute
  public governance acts.
- Authentication and session data.
- Any data collected for a purpose other than governance accountability.

**Implementation**
Instances should design their data architecture to separate the
governance record (which is permanent) from the identity record (which
is subject to erasure rights). A pseudonymisation approach — where the
governance record references a persistent pseudonym, and the mapping
from pseudonym to identity is held separately and deletable — satisfies
both the transparency requirement and the erasure right for non-public-act
data.

---

### 8.5 Privacy by Design

Privacy protection is built into the governance system from the design
stage, not added after the fact. This section defines the minimum
design requirements.

**Data minimisation by default**
Systems must be configured to collect the minimum necessary data by
default. Collecting additional data requires an active configuration
choice with a documented purpose.

**Separation of identity and participation records**
Member identity data (legal name, contact details, authentication
credentials) is stored separately from governance participation records
(votes, proposals, review contributions). This separation allows
identity data to be corrected, pseudonymised, or deleted without
corrupting the governance audit trail.

**Access control by role**
Access to personal data is restricted by role:

| Data category | Accessible to |
| --- | --- |
| Full identity data | Data controller (instance maintainers) only |
| Pseudonymised participation records | Governance Reviewers and Maintainers |
| Public governance acts (proposals, public votes) | Any member of the public |
| Authentication data | Automated systems only — no human access to plaintext |

**Secure transmission**
All data in transit between Members and governance systems is encrypted
(TLS 1.2 minimum). Governance systems do not transmit personal data over
unencrypted channels.

---

### 8.6 Data Breach Notification

Where personal data is subject to a breach (unauthorised access, loss,
destruction, or disclosure), the instance must:

1. **Contain the breach** as quickly as technically possible.
2. **Assess the risk** to affected Members within 24 hours of discovery.
3. **Notify the relevant supervisory authority** within 72 hours of
   discovery where the breach is likely to result in a risk to the
   rights and freedoms of natural persons (GDPR Article 33). Instances
   not subject to GDPR must apply equivalent notification timelines
   under their local regime, or this timeline if no local regime applies.
4. **Notify affected Members** without undue delay where the breach is
   likely to result in a high risk to their rights and freedoms
   (GDPR Article 34). The notification must describe: what data was
   affected, what likely consequences are, and what steps are being taken.
5. **Document the breach** in the instance's data breach register,
   regardless of whether notification was required.

---

### 8.7 Data Protection Contact

Each instance must designate a data protection contact — a person or
role responsible for responding to data subject requests, managing the
data breach process, and maintaining the record of processing activities.

The contact must be:
- Named in the instance's operating rules or public governance documents.
- Reachable by Members through a documented channel.
- Independent enough to provide honest assessment of data protection
  compliance without organisational pressure to minimise concerns.

Instances operating in the EU/EEA with large-scale processing of special
category data (political opinions) may be required to appoint a formal
Data Protection Officer under GDPR Article 37. Instances should take
legal advice on whether this obligation applies.

---

### 8.8 Jurisdiction Notes

This section applies universally. Instances in specific jurisdictions
must layer their local requirements on top of these minimums:

| Jurisdiction | Applicable regime | Key additions |
| --- | --- | --- |
| EU / EEA | GDPR (EU 2016/679) | DPO obligation, supervisory authority notification, full Article 9 special category regime |
| United Kingdom | UK GDPR + Data Protection Act 2018 | Equivalent to EU GDPR post-Brexit |
| Canada | PIPEDA + provincial equivalents | Breach reporting to OPC; Quebec Law 25 adds stricter consent requirements |
| Australia | Privacy Act 1988 + APPs | Mandatory data breach notification scheme |
| Other jurisdictions | Local data protection law | Instance must identify and document applicable law |

Where no local data protection law applies, this section constitutes
the minimum standard the instance commits to as a matter of governance
ethics, not legal obligation.

Instances may not use the absence of local legal requirements as
justification for collecting more data, retaining it longer, or granting
broader access than this section specifies.
