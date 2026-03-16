# Article 15: Child Support Smart Contracts

## Summary

Child support enforcement is one of the areas where the gap between legal
obligation and practical outcome is largest and most consequential. Court
orders are made; payments are not collected. Children and caregiving parents
bear the cost of enforcement failures. The administrative burden of pursuing
arrears through courts is substantial, slow, and inaccessible to people
without legal representation.

Automation tools — rule-based payment systems, digital escrow, automated
notification and enforcement triggers — have genuine potential to reduce
this gap. The PPPC is interested in applying these tools to child support
administration, with appropriate safeguards for the people they affect.

This article does not propose replacing judicial oversight with algorithms.
It proposes using automation to reduce administrative friction and
enforcement failure while preserving — and in some cases strengthening —
human review rights. The best interests of the child remain the governing
standard throughout.

This article also engages with the governance kernel's smart contract
infrastructure (see `civic_infrastructure/smart_contracts.md`). Any
child support automation must meet the data governance requirements
of Article 03 (Equality and Rights) and the kernel's Personal Data
primitive — particularly regarding special-category data in family law.

---

## Principles

**1. The child's best interests are not negotiable.**
Child support exists to ensure that children have adequate financial support
regardless of their parents' relationship. Every design decision — automation
depth, override authority, enforcement aggressiveness — must be evaluated
against this standard.

**2. Automation reduces friction; it does not replace judgment.**
Rule-based payment processing can enforce agreed amounts reliably. It cannot
evaluate changed circumstances, assess hardship claims, or determine whether
an order is still appropriate. Human review must be available, accessible,
and resourced — not a theoretical right that is practically unavailable.

**3. Family law data is highly sensitive personal data.**
Financial information, custody arrangements, employment status, home addresses,
and family health information in child support files are sensitive personal
data. Any automation system must be designed with privacy-by-design, data
minimisation, purpose limitation, and strict access controls — consistent
with PIPEDA and the governance kernel's Section 8.

**4. Accessibility is a design requirement, not an accessibility feature.**
The people most likely to benefit from better child support enforcement
include single parents with low incomes, people with limited digital literacy,
people in remote communities, and survivors of intimate partner violence for
whom contact with a former partner carries safety risks. The system must work
for these users, not just tech-comfortable urban users.

**5. Pilots precede at-scale deployment.**
Child support automation at scale affects real families with real
dependencies. Piloting, evaluating, and publishing results before national
rollout is not excessive caution — it is the appropriate standard for
systems affecting vulnerable people.

---

## Policy Mechanisms

**Legal and constitutional review**
Commission an independent review of the constitutional and statutory framework
for child support automation, covering:
- Division of powers: family law is largely provincial; federal jurisdiction
  is primarily in divorce proceedings under the Divorce Act
- Provincial co-ordination requirements for a multi-jurisdictional system
- PIPEDA and provincial privacy law requirements for family law data
- Interaction with existing provincial maintenance enforcement programs

Review published within 18 months. Federal-provincial working group
convened on the basis of review findings.

**Pilot programme design**
In jurisdictions where both federal and provincial governments consent,
design and operate a pilot programme covering:
- Automated payment processing for Divorce Act orders using federal
  payment infrastructure
- Digital escrow for cases where direct payment between parties
  creates safety or compliance risks
- Automated enforcement triggers (arrears notification, income source
  garnishment initiation) with human review gate before execution
- Participant notification in plain language via preferred channel
  (not just digital — phone, mail options required)
- Full human override by a maintenance enforcement officer at every
  automated trigger point

The pilot does not limit or remove any existing enforcement rights.
It supplements them with reduced administrative burden.

**Privacy and safety safeguards**
The pilot system must, before launch:
- Pass an independent privacy impact assessment published in full
- Implement address confidentiality protections for participants
  at safety risk from former partners
- Apply data minimisation: only data necessary for payment processing
  and enforcement is collected
- Provide participants with full rights under the governance kernel's
  Section 8: access, correction, deletion of personal data (with audit
  log records pseudonymised and retained for legal reasons)
- Not share data with immigration authorities, tax authorities, or
  other federal departments without separate legal authority

**Outcome evaluation and publication**
The pilot is evaluated on:
- Payment compliance rates compared with pre-pilot enforcement baseline
- Arrears recovery rates
- Time from order to first payment
- Human override request rates and outcomes
- Participant experience surveys (caregiving parents and paying parents)
- Error rates and appeal volumes

Evaluation is published in full. Independent evaluation is preferred.
Results inform a decision on expansion, modification, or discontinuation.

**Federal-provincial coordination**
The majority of child support administration is provincial. Federal
action is limited to Divorce Act cases and to facilitating a voluntary
co-ordination framework. No province or territory is required to
participate. The framework provides: common data standards, shared
infrastructure options, and federal funding for provinces that opt in
and meet minimum design requirements for human review and privacy.

---

## Measurable Outcomes

- Independent legal review published within 18 months of this article's
  adoption.
- Pilot programme launched in at least two consenting jurisdictions within
  three years of legal review completion.
- Privacy impact assessment published before pilot launch.
- Pilot evaluation published within 12 months of pilot completion,
  covering all metrics listed above.
- Payment compliance rates in pilot jurisdictions compared with
  pre-pilot baselines, published quarterly.
- Zero instances of participant address data disclosed to parties
  presenting safety risk.
- Human override pathway used and resolved within published timelines
  in all pilot jurisdictions.
