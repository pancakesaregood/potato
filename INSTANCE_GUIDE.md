# Instance Guide

This guide explains how to create a new governance instance — a localized,
community-specific deployment of the open governance framework.

An instance is the framework applied to a real community: a political party,
a civic movement, a community organisation, or any group that wants to
manage collective decisions through an open, auditable, contribution-based
process.

The Canada instance (`instances/canada/`) is the reference implementation.
Read it alongside this guide to understand what a complete instance looks like.

---

## What you are building

When you create an instance, you are building:

1. **A founding document** — the supreme governing instrument of your
   community, establishing member rights, institutional structure, and
   amendment procedures.

2. **Operating rules** — bylaws, standing orders, or equivalent documents
   that govern day-to-day operations.

3. **A policy manifesto** — a collection of modular policy articles, one
   per domain, that describe what your community stands for and proposes
   to do.

4. **A proposal process** — the mechanism through which members suggest
   and debate changes to any of the above.

The core framework provides the templates and tooling. You provide the
democratic content.

---

## Step 1 — Fork the repository

```bash
# Fork on GitHub, then clone your fork
git clone https://github.com/<your-org>/potato.git
cd potato
git checkout -b instance/<your-name>
```

Choose an instance name. Use lowercase and hyphens. Examples:

```
uk-green-alliance
municipio-libre-mx
civic-commons-nz
```

---

## Step 2 — Create your instance directory

```bash
mkdir -p instances/<your-name>/manifesto
mkdir -p instances/<your-name>/proposals/archive
mkdir -p instances/<your-name>/governance/bylaws
mkdir -p instances/<your-name>/experiments
mkdir -p instances/<your-name>/cycle_reports
```

Create an instance README:

```bash
cp instances/canada/README.md instances/<your-name>/README.md
```

Edit `instances/<your-name>/README.md` to describe your community, your
jurisdiction, and what makes your instance specific.

---

## Step 3 — Write your founding document

Your founding document is the most important thing you will create. It
establishes:

- the name and purpose of your community
- the rights of members that cannot be removed without a high-threshold vote
- the institutions of your community and how they relate to each other
- how rules are made and amended
- what happens if the community dissolves

**Start from the Canada constitution** as a structural reference:

```
docs/governance/constitution.md
```

Replace everything that is Canada-specific:
- "Canada Elections Act" → your relevant law
- "federal electoral district" / "riding" → your local equivalent
- "Canadian Charter of Rights and Freedoms" → your jurisdiction's rights
  framework, or a self-contained member rights declaration if none applies
- "English and French" → your community's languages
- Institution names → whatever your community calls them

Keep the structural logic:
- constitutional supremacy clause
- separation of authority between assembly, council, and local units
- graduated amendment thresholds (higher for founding doc, lower for bylaws)
- member rights floor with non-derogation clause
- fair process requirements for discipline

Save your founding document at:

```
instances/<your-name>/governance/constitution.md
```

---

## Step 4 — Write your operating rules

Operating rules govern the practical running of your community: how meetings
work, who can vote on what, how officers are selected, how finances are
managed.

Use the Canada bylaws as structural references:

```
docs/governance/bylaws/
```

You will likely need equivalents of:
- Membership rules (who can join, what it costs, when membership lapses)
- Assembly rules (how your deliberative body convenes and operates)
- Leadership selection (how your officers are chosen)
- Policy development (how policy proposals move through your process)

Save your operating rules at:

```
instances/<your-name>/governance/bylaws/
```

---

## Step 5 — Write your foundational manifesto articles

Start with two or three articles that define what your community stands for
at the most fundamental level. These are harder to change (they anchor
everything else) and should reflect your deepest commitments, not your most
immediate policy priorities.

Use the universal template:

```bash
cp core/manifesto_template/article_template.md \
   instances/<your-name>/manifesto/article_01_foundational_principles.md
```

Fill in the four required sections:

```
## Summary
## Principles
## Policy Mechanisms
## Measurable Outcomes
```

The `## Principles` section is the most important. State what your community
will not compromise on and who it fundamentally exists to serve.

Add more articles for specific policy domains as your community develops
positions. There is no required number. Three well-written articles are
better than twenty thin ones.

---

## Step 6 — Customise the proposal template

The universal proposal template is at:

```
core/proposal_system/proposal_template.md
```

Copy it to your instance and add any jurisdiction-specific review sections
your community needs. For example:

- A movement in a country with a written constitution might add a
  "Constitutional Consistency Review" section.
- A movement focused on indigenous rights might add a "Free, Prior, and
  Informed Consent Review" section.
- A movement in a federal system might add a "Jurisdictional Analysis"
  section.

Save your customised template at:

```
instances/<your-name>/proposals/PROPOSAL_TEMPLATE.md
```

Document any additions you made and why, so future contributors understand
the review framework.

---

## Step 7 — Configure jurisdiction-specific compliance checks

The CI pipeline includes a compliance check step that is configurable per
instance. The Canada instance uses Charter compliance checks.

To configure checks for your instance, edit or create:

```
scripts/charter_compliance_placeholder.py
```

Or add an instance-specific script that the CI workflow can call. The check
should:
- Accept a file path as input
- Output warnings and errors to stdout in a parseable format
- Exit with a non-zero code only for blocking errors, not warnings

If your jurisdiction has no relevant rights framework to check against,
the placeholder script (which enforces process without legal analysis) is
sufficient to start.

---

## Step 8 — Run your first governance cycle

Open your first governance cycle by creating a cycle record:

```bash
cat > instances/<your-name>/cycle_reports/cycle_001.md << 'EOF'
# Governance Cycle 001

| Field | Value |
| --- | --- |
| Status | Open |
| Opened | YYYY-MM-DD |
| Type | Founding cycle |

## Agenda

- Ratify founding document
- Adopt foundational manifesto articles
- Elect initial officers

## Notes

First governance cycle. All proposals are founding documents.
EOF
```

Invite contributions. Every proposal goes through the workflow in
`core/proposal_system/`. The founding cycle is complete when the founding
document and at least one manifesto article have been ratified.

---

## Step 9 — Register your instance

Add a row to the instances table in `instances/README.md`:

```markdown
| [your-name](your-name/) | Brief description | Active |
```

Open a pull request to the upstream framework repository. Your instance
becomes part of the growing collection of governance experiments.

---

## What to keep universal

Do not modify files in `core/`. If you find something in `core/` that does
not work for your instance, open an issue or pull request to the framework
repository to improve it for everyone.

If you need to override a core behaviour for your instance, document the
override in your instance README and explain why the universal version does
not apply.

---

## Getting help

- Read `instances/canada/` as a complete worked example.
- Open a Governance Discussion issue in the framework repository.
- The `docs/how_to_participate.md` guide explains the contribution workflow
  in detail.
