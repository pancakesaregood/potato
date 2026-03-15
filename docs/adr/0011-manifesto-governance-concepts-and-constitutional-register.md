# ADR-0011: Integrate Governance-as-Code into the Manifesto and Rewrite the Constitution in Constitutional Register

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-03-15 |
| Deciders | Repository maintainers |
| Affected components | `instances/canada/manifesto/article_02_digital_democracy.md`, `docs/governance/constitution.md` |
| Implemented in | commits `dce270e`, `1c9816c`, `d8b6d97` |

---

## Context

This ADR covers two related decisions made in the same work session, both
addressing the same underlying gap: the project's operational model (open-source
governance, version control, iterative policy cycles) was not reflected in the
project's own content documents.

### Gap 1: Manifesto Article 02 did not describe the project's governance model

Article 02 (Digital Democracy) covered secure digital participation tools —
voting systems, hybrid assemblies, accessibility standards. It said nothing
about the project's own approach to policy development: that policy is written
in version-controlled text, proposed as pull requests, reviewed by contributors,
and improved through iterative cycles.

This created a coherence problem. The project's architecture (ADR-0001 through
ADR-0003) described governance-as-code as the foundational design decision, but
none of the manifesto content explained or endorsed that model. A reader of the
manifesto would not know that the project treated governance like open-source
software, or why.

An additional structural problem existed: the `## Principles` section mixed
democratic values (things the project believes) with implementation details
(things the project does), producing a section that was neither a clean
statement of values nor a useful operational guide.

### Gap 2: The constitution read like a policy document, not a constitutional instrument

The constitution's language was functional but flat. Provisions read as
administrative descriptions ("The National Council manages finances") rather
than constitutional obligations ("The National Council shall supervise the
Party's financial administration and publish regular reports to members").

Specific structural deficiencies:
- The Preamble was two short paragraphs describing the document's purpose
  rather than a founding declaration asserting democratic legitimacy.
- Member rights were listed as bullet points rather than enumerated as
  protected provisions with a non-derogation clause.
- The amendment article contained no special protection for the member
  rights section — it could be amended by the same threshold as any other
  constitutional provision.
- There was no anti-diversion clause in the dissolution provision.
- No closing ratification attestation.

---

## Decision

### Decision 1: Extend Article 02 with governance-as-code operational concepts

Article 02 will be restructured into five named subsections, adding three
new sections while preserving the original content:

1. **Principles of Digital Democracy** — the original secure participation
   content (voting systems, assemblies, accessibility), reframed.
2. **Open Policy Development** — explains that the project maintains its
   documents in a public version-controlled repository, what version control
   means for citizens in plain terms, and that participation does not require
   technical skills.
3. **Governance-as-Code** — defines the four practices (version control, peer
   review, automated checks, public contribution workflow) and explicitly
   states that governance-as-code does not mean governance by engineers.
4. **Governance Cycles** — describes the six-stage proposal lifecycle as a
   numbered process, and names three things the cycle model makes possible
   that traditional policy processes do not.
5. **Democracy-as-a-Service (Experimental)** — frames the long-term research
   direction honestly: not a policy commitment, includes the hardest open
   questions, commits to publishing findings rather than suppressing them.

The `## Principles` section will be refocused on democratic values only,
removing implementation details that belong in the subsections.

### Decision 2: Rewrite the constitution in formal constitutional register

The constitution will be rewritten with elevated language throughout, adding:

- A founding declaration Preamble ("We, the members...") with a "That..."
  structure for each founding commitment.
- Lettered sub-clauses `(a)` through `(n)` for all enumerated rights and
  powers, following the standard form for constitutional instruments.
- A non-derogation clause on member rights: no bylaw or resolution may
  curtail rights enumerated in Article 3.2 without constitutional amendment.
- A supplementary amendment requirement for Article 3.2 specifically:
  amendments to member rights require a direct membership vote in addition
  to the delegate supermajority.
- Replacement of descriptive ("manages", "oversees") with obligatory
  ("shall supervise", "shall publish") language throughout.
- An anti-diversion clause on dissolution: assets cannot flow to private
  benefit.
- A closing ratification attestation.

No substantive provision will be removed. Every institution, power,
limitation, and process that existed in the original constitution will
be present in the rewrite with equivalent or stronger effect.

---

## Consequences

### Positive

- Article 02 now describes what the project actually does, not just what
  it believes. A reader of the manifesto understands the governance model
  without needing to read the ADRs.
- The separation of democratic values (Principles) from operational
  mechanisms (Policy Mechanisms subsections) makes both sections more
  useful. Values are cleaner. Mechanisms are more detailed.
- The Democracy-as-a-Service section is honest about uncertainty in a way
  that builds rather than erodes credibility. Publishing the hard questions
  before pursuing the direction is better institutional practice than
  pursuing it and encountering the questions in public.
- The constitutional language changes have immediate legal-culture effect:
  provisions written as obligations are harder to treat as optional than
  provisions written as descriptions. "The Council shall publish reports"
  is harder to ignore than "The Council manages communications."
- The non-derogation clause and supplementary amendment threshold for
  member rights create a meaningful protection that the original document
  lacked. Member rights that can be amended by the same threshold as any
  other provision are not constitutionally protected — they are merely
  currently adopted.

### Negative

- The constitutional rewrite is extensive (403 insertions, 165 deletions
  across the same file). Extensive rewrites are harder to review than
  incremental changes. Any reviewer must compare the full before and after
  to confirm no provision was dropped or subtly altered.
- Adding a supplementary membership vote requirement for Article 3.2
  amendments increases the difficulty of amending member rights even in
  cases where amendment is warranted (e.g., expanding rights). This is
  intentional but should be documented so future contributors understand
  why the threshold exists.
- The Democracy-as-a-Service section is experimental and may age poorly
  if the open questions turn out to be unresolvable. It should be reviewed
  at each governance cycle and either substantiated with findings or removed.

### Neutral / Watch Items

- Article 17 (Resource Nationalization) was removed in the same work session
  as the Article 02 restructuring. The removal is architectural (the
  content overlaps with Article 06 and Article 10) rather than political.
  A future contributor can re-introduce resource policy under a different
  structure if the community wants it.
- The five-subsection structure of Article 02 (`### Principles of Digital
  Democracy` through `### Democracy-as-a-Service`) does not duplicate the
  `## Principles` section. The subsection named "Principles of Digital
  Democracy" covers implementation design principles (how the participation
  tools are built), while `## Principles` covers democratic values (what
  the movement believes). The naming proximity is a minor readability
  concern worth monitoring.

---

## Alternatives Considered

### Alternative 1: Create a separate Article for Governance-as-Code

Description: Add a new manifesto article (e.g., Article 18) specifically
for governance infrastructure concepts, rather than integrating them into
Article 02.

Reason rejected: The task brief noted that Article 02 and a hypothetical
Article 18 on governance infrastructure were overlapping. Combining them
into one coherent article eliminates redundancy. Governance-as-code is not
a standalone policy domain — it is the operating model for digital democracy,
and belongs within that article.

### Alternative 2: Leave the constitutional language unchanged

Description: Retain the original flat, administrative language and rely on
the bylaw documents for specific obligations.

Reason rejected: Constitutional register matters. Documents that read as
optional descriptions produce cultures of optional compliance. The
rewrite is not cosmetic — it converts descriptions into obligations, adds
structural protections that did not exist, and produces a document that
can be read as what it is: the supreme governing instrument of the
organisation.

### Alternative 3: Incremental constitutional updates (one clause at a time)

Description: Make the constitutional language improvements as a series of
small PRs, each changing a section or two.

Reason rejected: The language issues were systemic. The Preamble, the
member rights section, the obligation language, the dissolution clause,
and the amendment thresholds all needed attention. Incremental changes
would require many small PRs with no clear completion state, and each
intermediate state would be partially improved and partially original —
harder to review than one complete rewrite.

---

## Future Revisions

This ADR should be revisited if:

- The Democracy-as-a-Service section is not reviewed and updated at the
  next governance cycle, at which point it should either have findings
  attached or be removed.
- The non-derogation clause or supplementary amendment threshold for
  member rights creates unintended difficulties (e.g., an urgent rights
  expansion is blocked by the higher threshold). If this occurs, the
  threshold for the supplementary vote should be reconsidered, not removed.
- A contributor proposes restoring Article 17 or equivalent resource policy
  content, which should be evaluated on its own merits through the proposal
  process.
