# Instance: Canada — Peoples Potato Party of Canada

This is the reference implementation of the governance framework, built for
a fictional Canadian federal political movement. It demonstrates how the
universal core framework is applied to a specific jurisdiction, electoral
system, and cultural context.

## What makes this instance Canada-specific

- **Electoral system:** The manifesto and governance documents refer to
  federal electoral districts ("ridings"), the Canada Elections Act, and
  federal/provincial jurisdiction divisions.
- **Rights framework:** The founding constitution and proposal review process
  reference the Canadian Charter of Rights and Freedoms.
- **Languages:** English and French bilingualism requirements are built into
  the governance structure.
- **Policy context:** Manifesto articles address Canadian-specific conditions
  (provincial healthcare, resource extraction policy, Truth and Reconciliation,
  etc.)
- **Institutions:** The governance structure refers to Canadian parliamentary
  conventions.

None of the above belongs in `core/`. It lives here.

## Governance documents

| Document | Location |
| --- | --- |
| Constitution | [docs/governance/constitution.md](../../docs/governance/constitution.md) |
| Membership bylaw | [docs/governance/bylaws/membership.md](../../docs/governance/bylaws/membership.md) |
| Convention bylaw | [docs/governance/bylaws/conventions.md](../../docs/governance/bylaws/conventions.md) |
| Leadership selection | [docs/governance/bylaws/leadership-selection.md](../../docs/governance/bylaws/leadership-selection.md) |
| National Council | [docs/governance/bylaws/national-council.md](../../docs/governance/bylaws/national-council.md) |
| Riding associations | [docs/governance/bylaws/riding-associations.md](../../docs/governance/bylaws/riding-associations.md) |
| Policy development | [docs/governance/bylaws/policy-development.md](../../docs/governance/bylaws/policy-development.md) |

Note: Governance documents are currently at `docs/governance/` rather than
`instances/canada/governance/` for historical reasons. This location is
canonical for the Canada instance.

## Manifesto

Policy articles are in `instances/canada/manifesto/`. Each covers one domain.

| Article | Domain |
| --- | --- |
| [01](manifesto/article_01_foundational_principles.md) | Foundational Principles |
| [02](manifesto/article_02_digital_democracy.md) | Digital Democracy |
| [03](manifesto/article_03_equality_and_rights.md) | Equality and Rights |
| [04](manifesto/article_04_justice_and_prison_reform.md) | Justice and Prison Reform |
| [05](manifesto/article_05_housing_and_homelessness.md) | Housing and Homelessness |
| [06](manifesto/article_06_environmental_responsibility.md) | Environmental Responsibility |
| [07](manifesto/article_07_drug_epidemic_response.md) | Drug Epidemic Response |
| [08](manifesto/article_08_governance_and_accountability.md) | Governance and Accountability |
| [09](manifesto/article_09_financial_responsibility.md) | Financial Responsibility |
| [10](manifesto/article_10_climate_change.md) | Climate Change |
| [11](manifesto/article_11_freelander_citizenship.md) | Freelancer Citizenship |
| [12](manifesto/article_12_truth_and_reconciliation.md) | Truth and Reconciliation |
| [13](manifesto/article_13_symbolism_of_brown.md) | Symbolism of Brown |
| [14](manifesto/article_14_ten_year_vision.md) | Ten-Year Vision |
| [15](manifesto/article_15_child_support_smart_contracts.md) | Child Support and Smart Contracts |
| [16](manifesto/article_16_world_hunger.md) | World Hunger |

## Proposals and experiments

Active policy proposals: `proposals/`

Open policy experiments (structured debate spaces for new contributors):

- [Digital Referendums](../../docs/experiments/digital_referendums.md)
- [Housing Policy](../../docs/experiments/housing_policy_experiment.md)
- [Energy Strategy](../../docs/experiments/energy_strategy_experiment.md)

## Using this instance as a reference

If you are building a new instance, the Canada instance shows how the
framework components fit together for a real community. Reading the
constitution and one or two manifesto articles will give you a concrete
sense of the expected level of detail and the tone.

The Canada instance is not a model to copy wholesale — it reflects
Canadian political and legal context that will not apply elsewhere.
Use it as a reference for structure, not substance.
