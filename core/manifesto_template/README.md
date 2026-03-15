# Manifesto Template

A manifesto in this framework is a collection of individual policy articles,
one per domain. Each article is a standalone Markdown file. Articles can be
proposed, amended, and ratified independently of each other.

## Why modular articles

- A change to housing policy does not require reviewing climate policy.
- Different contributors can work on different domains in parallel.
- The history of any single policy position is traceable in isolation.
- Automated checks can validate one article without processing the entire
  manifesto.

## Required structure

Every manifesto article must contain exactly these four section headings,
in this order:

```markdown
## Summary
## Principles
## Policy Mechanisms
## Measurable Outcomes
```

The CI pipeline validates the presence of these headings. Articles that omit
or rename them will fail validation.

## What goes in each section

| Section | Contents |
| --- | --- |
| `## Summary` | One to three paragraphs explaining what this article covers and why it matters. Written for a general audience. |
| `## Principles` | The values and commitments that constrain this policy domain. Stated as obligations, not aspirations. |
| `## Policy Mechanisms` | The specific tools, programs, rules, or institutional arrangements being proposed. Use subsections for distinct mechanisms. |
| `## Measurable Outcomes` | Concrete, checkable results that indicate whether the policy is working. |

## Article metadata

Each article should carry a metadata table immediately after the title:

```markdown
# Article NN: Title

| Field | Value |
| --- | --- |
| Status | Draft / Proposed / Adopted |
| Domain | [policy domain] |
| Instance | [instance name] |
| Last updated | YYYY-MM-DD |
```

## Creating a new article

1. Copy `article_template.md` from this directory.
2. Replace all `[PLACEHOLDER]` sections with your content.
3. Set the status to `Draft`.
4. Place the file in `instances/<name>/manifesto/`.
5. Follow the proposal process in `core/proposal_system/`.

## Naming convention

```
article_NN_short_title.md
```

Where `NN` is the two-digit article number padded with a leading zero.
Numbers do not need to be contiguous — gaps are acceptable when articles
are archived.

## Index file

Each instance should maintain a `manifesto/_index.md` listing all current
articles with their status. This index is generated automatically by the
CI pipeline after each merge.
