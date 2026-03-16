# ADR-0014: GDPR-Compliant Personal Data Governance Primitive

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-03-15 |
| Deciders | Repository maintainers |
| Affected components | `core/governance_kernel.md` (Section 2 Primitive 8, Section 8) |
| Implemented in | commit `1496146` |

---

## Context

ADR-0013 defined seven governance primitives. During the drafting of the
kernel, a gap in the primitive set became apparent: participation in a
governance system involves the collection, storage, and processing of personal
data — and in particular, a category of personal data that carries heightened
legal protection.

**Governance participation involves political opinions.**

When a Member submits a Proposal, votes in a Decision, or is recorded in the
Transparency Log as having supported or opposed a governance act, that record
constitutes information about the Member's political views. Under GDPR Article
9 and equivalent national legislation, political opinions are special-category
personal data — requiring explicit consent, a lawful basis beyond standard data
processing, and specific protections.

The original seven-primitive kernel had no Personal Data primitive. This meant
that:

- Instances built on the kernel had no formal data governance obligation beyond
  whatever their local law happened to require.
- The kernel's Transparency Log requirement (append-only, permanent record of
  all governance acts) was in direct structural tension with GDPR Article 17's
  right to erasure, with no documented resolution.
- Governance participants had no defined rights over their data within the
  framework — access, correction, portability, and erasure were unaddressed.

The Transparency Log tension required specific resolution. The append-only
requirement is a feature of the framework — it ensures governance acts cannot
be silently deleted or retroactively altered, which is a core accountability
mechanism. But a permanent record of participation, indexed by identity, makes
erasure of personal data structurally impossible. These requirements pull in
opposite directions, and the kernel needed to resolve the tension explicitly
rather than leave it to instances to discover independently.

---

## Decision

We will add Personal Data as Primitive 8 to the governance kernel and create
a full Section 8 (Data Governance Agreement) in `core/governance_kernel.md`.

### Primitive 8: Personal Data

Every governance instance must:

- Identify what personal data is collected from Members and participants
  (including non-Members who engage with Public Discussions).
- Specify the lawful basis for each category of processing under applicable
  data protection law.
- Provide data subjects with access, correction, portability, and erasure
  rights consistent with the applicable legal framework.
- Apply a pseudonymisation design to resolve the Transparency Log
  permanence requirement with the right to erasure (see below).

### Section 8: Data Governance Agreement

Section 8 covers eight sub-areas:

**8.1 Data Categories**: Three categories are defined:
- Identity data (name, contact details) — collected at membership registration.
- Participation data (proposal authorship, votes, comments) — collected through
  governance activity.
- Technical data (IP addresses, session tokens) — collected by the hosting
  infrastructure.

Special-category data: participation data may constitute political opinion data
under GDPR Article 9 where it is linked to identifiable individuals.

**8.2 Data Processing Principles**: The six GDPR principles applied to the
kernel — lawfulness, purpose limitation, data minimisation, accuracy, storage
limitation, and integrity/confidentiality.

**8.3 Data Subject Rights**: Four rights are defined with implementation
requirements — right of access (30-day response), right to correction (30-day
correction), right to portability (machine-readable export), and right to
erasure (subject to the resolution in 8.4).

**8.4 Transparency Log and Erasure: The Tension Resolution**

This is the core architectural decision. The kernel resolves the tension
between Transparency Log permanence and the right to erasure through
pseudonymisation:

- The **identity record** (name, contact details, membership credentials)
  is stored separately from the **governance act record** (what was proposed,
  voted, or decided).
- On erasure request, the identity record is deleted and the link between
  the identity and the governance acts is severed.
- The governance act record is retained in the Transparency Log, now
  pseudonymised — the act is recorded but is no longer attributable to an
  identified person.
- The lawful basis for retaining the governance act record after erasure
  is GDPR Article 17(3)(b): processing necessary for the performance of a task
  carried out in the public interest.

This means a Member who requests erasure loses attribution for their past
governance acts — their proposals, votes, and comments are retained in the
log but no longer linked to their identity. The governance record is intact;
the personal data is gone.

**8.5 Privacy by Design**: Five minimum requirements for any technical
implementation — pseudonymisation architecture from the start, no collection
of data unnecessary for governance functions, access controls limiting
participation data visibility to Members, regular review of what is collected
versus what is actually used, and encryption at rest and in transit.

**8.6 Data Breach Notification**: 72-hour notification protocol to affected
data subjects in the event of a breach affecting personal data, consistent
with GDPR Article 33/34.

**8.7 Data Protection Contact**: Each instance must designate a Data
Protection Contact (not necessarily a formal DPO unless legally required)
who is responsible for receiving and responding to data subject requests.

**8.8 Jurisdiction Notes**: The kernel's data governance section is designed
to be consistent with GDPR and equivalent legislation. Instances operating
under different legal frameworks (Canada's PIPEDA, US state privacy laws,
etc.) must implement the section in a way that meets both the kernel's
minimum requirements and their applicable local law.

---

## Consequences

### Positive

- The kernel now addresses a real and non-trivial legal obligation. Any
  instance that complies with the kernel's Section 8 will have a defensible
  data governance framework consistent with major privacy legislation.
- The Transparency Log tension is explicitly resolved rather than deferred.
  Instance builders do not discover the tension when they receive their first
  erasure request — the resolution is designed into the architecture.
- The pseudonymisation approach correctly separates two distinct concerns:
  the accountability function of the governance record (who made what
  decisions) and the privacy function of personal identity. Separating them
  at the data model level is the right architectural choice, not just a
  compliance workaround.
- Designating political opinion data as special-category from the start
  creates the right cultural and legal orientation for governance instance
  operators. Political opinion data is sensitive. Treating it as such from
  the beginning is better than discovering the obligation after data has
  been collected without adequate basis.

### Negative

- Adding a full data governance section to the kernel significantly increases
  its length. Section 8 is detailed and technical compared to the other
  primitive sections. The kernel was designed to be the entry point for new
  contributors; a long technical section on privacy law risks making it
  harder to read as an overview document.
- The GDPR Article 17(3)(b) public interest basis for retaining pseudonymised
  governance act records has not been legally tested for governance systems of
  this type. It is the correct doctrinal argument, but an instance that needs
  to rely on it in a dispute with a data subject should obtain jurisdiction-
  specific legal advice.
- Pseudonymisation adds implementation complexity. A flat database structure
  that links identity to participation data inline is simpler to build.
  The kernel's design requires a separation that must be implemented correctly
  from the start — retrofitting it after data has been collected is harder.

### Neutral / Watch Items

- The kernel specifies GDPR as the reference framework because it is the most
  comprehensive and widely adopted privacy regulation globally. Instances
  operating under other legal frameworks (Canada, US, Australia, etc.) should
  review their local obligations against Section 8 and document any
  jurisdiction-specific modifications in their instance documentation.
- The Data Protection Contact designation does not create a mandatory DPO
  appointment. Instances that are subject to mandatory DPO requirements under
  GDPR Article 37 (processing at large scale, systematic monitoring, etc.)
  must comply with those requirements independently of the kernel's Section
  8.7 designation.
- The kernel's data minimisation requirement may conflict with some governance
  models that log extensive participation metadata for transparency purposes.
  The tension should be resolved at design time: log what is necessary for
  accountability; do not log what is not.

---

## Alternatives Considered

### Alternative 1: Address data governance in an appendix, not a primitive

Description: Keep the kernel at seven primitives. Add data governance as a
non-normative appendix — guidance rather than a required primitive.

Reason rejected: Making data governance optional is the wrong orientation.
Privacy obligations are not optional for instances that collect personal data,
which all governance instances do by definition. Treating it as a primitive
signals its weight correctly. An appendix would be read as advisory; the
primitive designation is normative.

### Alternative 2: Resolve the transparency/erasure tension by excluding
participation data from the Transparency Log

Description: Change the Transparency Log requirement so that it records
governance acts without attributing them to identifiable individuals — a
privacy-first log design from the start, rather than one that requires
pseudonymisation on erasure.

Reason rejected: The Transparency Log's accountability function depends on
the ability to attribute governance acts to Members. An unattributed log —
"someone proposed X, someone voted against Y" — cannot be used to identify
whether a conflict of interest existed, whether a Member consistently argued
for positions that benefited them, or whether a Review was influenced by
the Reviewer's prior participation. Attribution is not incidental to the
log's purpose; it is central to it. The pseudonymisation approach preserves
attribution during active membership and enables erasure when the Member
exercises their right — the correct balance.

### Alternative 3: Defer data governance to instance-level documentation

Description: Require each instance to develop its own data governance approach
as part of instance setup, without kernel-level specification.

Reason rejected: The tension between the Transparency Log and the right to
erasure is universal — it exists for every governance instance, not just the
Canada instance. Deferring its resolution to each instance means each instance
rediscovers the problem independently and may resolve it inconsistently or
incorrectly. Kernel-level resolution is the correct location for a kernel-
level tension.

---

## Future Revisions

This ADR should be revisited if:

- GDPR enforcement decisions or court rulings clarify the scope of Article
  17(3)(b) in ways that affect the pseudonymisation resolution. The resolution
  should be updated if the legal basis is narrowed or the approach is challenged.
- An instance operates under a legal framework that is irreconcilably different
  from the GDPR-based approach, requiring a more jurisdiction-neutral primitive
  specification.
- Technical implementation of the pseudonymisation architecture reveals
  practical difficulties (e.g., relational database constraints that make
  identity/participation separation complex) that warrant reconsidering the
  data model design.
- The volume of Section 8 material grows to the point where it should be
  extracted into a standalone `core/data_governance_agreement.md` referenced
  from the kernel, rather than included inline.
