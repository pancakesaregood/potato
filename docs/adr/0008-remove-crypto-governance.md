# ADR-0008: Remove Cryptocurrency Governance Mechanisms

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-03-15 |
| Deciders | Founding National Convention |
| Affected components | `civic_infrastructure/`, `ARCHITECTURE.md`, `README.md`, `AGENTS.md` |
| Supersedes | `civic_infrastructure/tokenomics.md`, `civic_infrastructure/distributed_ledger.md` |

---

## Context

Early drafts of the PPP's technical governance layer included two addendums
that described cryptocurrency-adjacent concepts:

**`tokenomics.md`** proposed a model for civic tokens or credits — digital
units that could be used to route civic participation incentives or benefit
payments. Even though the document was defensively framed (non-speculative
design, no sale of voting power, auditable issuance), the underlying
architecture requires participants to engage with token infrastructure.

**`distributed_ledger.md`** explored the use of a distributed ledger for
tamper-evident governance audit trails. Again, the framing was cautious (solve
a real trust problem, prefer simpler alternatives), but the presence of the
document implied that distributed ledger technology was a live architectural
option for core governance infrastructure.

Both documents were included in a version of the project that positioned the
PPP governance system as an experiment in blockchain-based civic coordination.
That framing has been retired.

The project now focuses on **open-source civic governance** — the use of
version-controlled documents, automated review pipelines, and accessible
digital participation tools to make political governance more transparent and
participatory. This goal does not require cryptocurrency, tokens, or blockchain
infrastructure.

Retaining the crypto governance documents creates several problems:

1. **Access barrier.** Any governance system that requires cryptocurrency
   knowledge or holdings to participate fully excludes the majority of the
   Canadian public — including the populations most dependent on the social
   programs the party is designed to improve.

2. **Regulatory exposure.** Civic token systems involving issuance, redemption,
   and exchange may attract securities regulation scrutiny under Canadian law,
   creating legal overhead that is disproportionate to the problem being solved.

3. **Reputational noise.** A party described as a "blockchain governance
   project" attracts a particular audience and set of assumptions that are
   inconsistent with the project's actual civic focus.

4. **False necessity.** The specific problems the token and ledger addendums
   were addressing — incentivizing participation, maintaining tamper-evident
   audit trails — have solutions that do not require cryptocurrency. Git commit
   history, public audit logs, and conventional cryptographic signatures address
   the audit trail problem. Accessible participation platforms and democratic
   processes address the participation incentive problem.

---

## Decision

We will remove `tokenomics.md` and `distributed_ledger.md` from
`civic_infrastructure/` and replace them with
`civic_digital_infrastructure.md`, which describes the same problem space
(accessible participation, audit trails, transparent governance infrastructure)
using approaches that do not depend on cryptocurrency.

We will rename `consensus_mechanism.md` to `decision_protocol.md` to remove
the ambiguity between "blockchain consensus mechanism" and "democratic
decision-making protocol." The content of that file was already about
governance workflow, not distributed consensus — the rename corrects a
misleading title.

`smart_contracts.md` is retained and expanded. Smart contracts remain a valid
tool for specific, narrow civic automation use cases (child support enforcement,
grant disbursement, conditional program payments). The distinction is:

- **Removed:** smart contracts as governance mechanisms, token systems,
  blockchain-based voting or political control.
- **Retained:** smart contracts as automation tools for specific civic
  administrative workflows, with human override at every step.

No other governance documents, manifesto articles, or constitutional provisions
are affected by this change.

---

## Consequences

### Positive

- The project's purpose is unambiguous: open-source civic governance, not
  cryptocurrency governance.
- Participation barriers related to crypto knowledge or holdings are
  eliminated by design, not as an afterthought.
- Legal surface area related to token issuance and securities regulation is
  removed.
- The remaining `civic_infrastructure/` documents are all relevant to the project's
  actual scope and contain no content that requires crypto expertise to
  understand or evaluate.

### Negative

- If the party ever wanted to revisit a non-speculative civic token or
  micro-incentive system, it would need to go through the full ADR and
  governance pipeline to reintroduce the concept. This ADR creates a
  deliberate friction point for that path.
- Distributed ledgers do have legitimate use cases for tamper-evident public
  records that the simpler Git-based audit trail does not fully replicate
  (specifically: decentralized verification without trusting the repository
  host). This capability is being traded for simplicity. If the repository
  host becomes untrustworthy, this tradeoff will need to be revisited.

### Neutral / Watch Items

- `smart_contracts.md` remains in the repository. The boundary between
  "civic automation tool" (acceptable) and "governance mechanism" (removed)
  should be clearly maintained. Any future smart contract proposal must
  pass the governance pipeline and explicitly demonstrate it does not cross
  that boundary.
- `cryptography.md` is unaffected by this decision. Cryptographic security
  (encryption, digital signatures, key management) is not the same as
  cryptocurrency and remains a required component of the system's security
  baseline.

---

## Alternatives Considered

### Alternative 1: Retain the Documents with Stronger Caveats

Description: Keep `tokenomics.md` and `distributed_ledger.md` but add
prominent disclaimers that they are exploratory only and are not part of
the operational system.

Reason rejected: Documents in the repository imply endorsement or at least
consideration. A document that is "exploratory only" but remains in the
canonical `civic_infrastructure/` directory will be read as authoritative by
contributors (human and AI) who encounter it later. Removing it is a cleaner
architectural statement than annotating it. The concepts the documents explored
are addressed in `civic_digital_infrastructure.md` using non-crypto approaches.

### Alternative 2: Move Crypto Documents to an `experiments/` Directory

Description: Archive `tokenomics.md` and `distributed_ledger.md` in a clearly
labelled experimental area, signalling they are not active architectural choices
but preserving them for reference.

Reason rejected: The Git history already preserves these documents for
reference — they will be visible to anyone who reads the commit log and can
be restored if the party ever wants to revisit the concept. An `experiments/`
directory that exists but is explicitly not authoritative adds navigational
confusion without adding value over the history log.

### Alternative 3: Remove Smart Contracts Along with Tokenomics

Description: Remove all crypto-adjacent content, including `smart_contracts.md`,
to make the non-crypto position unambiguous.

Reason rejected: Smart contracts are a general-purpose automation technology
with clearly applicable civic use cases (child support, grant disbursement,
compliance reporting) that do not require cryptocurrency knowledge to understand
or operate. The architectural distinction between "blockchain governance" and
"rule-based civic automation" is real and worth preserving. Removing
`smart_contracts.md` would eliminate a document that describes genuinely useful
and accessible civic technology.

---

## Future Revisions

This ADR should be revisited if:

- The party formally decides to explore a non-speculative, legally compliant
  civic incentive system that requires some form of digital credit or token
  infrastructure. Any such exploration must begin with a new ADR that
  explicitly addresses the access, regulatory, and reputational concerns
  documented here.
- The Git repository hosting arrangement becomes untrustworthy in a way that
  makes the simpler audit trail insufficient, creating a legitimate case for
  a decentralized verification layer.
- Canadian law or Elections Canada guidance changes in a way that affects
  the permissibility of smart contracts in party administration.
