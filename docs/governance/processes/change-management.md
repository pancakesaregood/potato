# Change Management

| Field | Value |
| --- | --- |
| Status | Founding draft |
| Version | 0.1.0 |
| Scope | Governance drafting, ratification, and release workflow |
| Last updated | 2026-03-15 |

## 1. Purpose

This document defines how governance text is proposed, reviewed, ratified,
versioned, and archived inside the repository.

## 2. Source of Authority

The repository is the Party's editorial source of truth. Legal or internal force
comes only from the ratification path required by the constitution or bylaw for
the specific change.

## 3. Document Status Labels

Every substantive governance document or amendment should identify one of the
following statuses:

- `Draft`: text under development
- `Proposed`: formally submitted for consideration
- `Provisionally Adopted`: approved between conventions but awaiting final
  ratification
- `Ratified`: adopted and in force
- `Archived`: preserved for history but no longer operative

## 4. Metadata Standard

Each governance document should maintain a short metadata table showing:

- status
- version
- authority or ratifying body
- last updated date

When a document changes, update the metadata in the same commit.

## 5. Substantive vs Editorial Changes

### 5.1 Substantive Changes

The following are substantive and require a ratification path to be recorded:

- voting rights or eligibility changes
- threshold, quorum, or timeline changes
- additions or removals of offices, committees, or bodies
- powers, appeals, discipline, or finance rules
- delegate formulas or leadership rules

### 5.2 Editorial Changes

The following may be merged without separate ratification if they do not alter
meaning:

- grammar, spelling, and punctuation fixes
- formatting improvements
- broken cross-link fixes
- headings, numbering, or style normalization

If there is doubt, classify the change as substantive.

## 6. Versioning Rules

The repository uses governance semantic versioning:

- Major: constitutional architecture, voting rights, or national power changes
- Minor: new bylaws, material bylaw revisions, or new recurring processes
- Patch: clarifications and non-substantive cleanups

The active repository version is recorded in `VERSION`, and each release must be
summarized in `CHANGELOG.md`.

## 7. GitHub Workflow

1. Open an issue or discussion for the proposed change.
2. Draft the text using the closest template in `docs/governance/templates/`.
3. Create or update the relevant Markdown file.
4. Open a pull request that identifies:
   - the affected document
   - whether the change is substantive or editorial
   - the ratifying body and threshold
   - the intended effective date
5. Merge the pull request only when the repository accurately reflects the
   proposal's current status.

## 8. Ratification Recording

When a proposal is decided, the repository should be updated to record:

- the adoption date
- the deciding body
- the threshold used
- whether the text is now ratified, provisional, rejected, or archived

Rejected proposals should normally be preserved in pull request history rather
than in the live documents unless the Party keeps a formal archive of defeats.

## 9. Release Practice

After a ratified substantive change:

1. update the affected document metadata
2. update `CHANGELOG.md`
3. bump `VERSION`
4. create a git tag in the format `gov-vX.Y.Z`

## 10. Scheduled Review

At least once per year, the National Council should review:

- unresolved governance proposals
- documents marked `Provisionally Adopted`
- broken cross-links or stale process references
- whether a convention package should be assembled for the next cycle
