# ADR-0017: GitHub Pages as the Civic Participation Platform

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-03-15 |
| Deciders | Repository maintainers |
| Affected components | `site/`, `.github/workflows/deploy-pages.yml`, Phase 3 (ROADMAP.md) |
| Implemented in | This ADR |

---

## Context

ROADMAP.md Phase 3 specifies a civic participation platform with three
components: a manifesto browser, a proposal portal, and a governance health
dashboard. The requirements also include WCAG 2.1 AA accessibility, bilingual
interface, and mobile-accessible participation flows.

A key architectural constraint is established in the Phase 3 description and
in the repository's design philosophy: the repository is the source of truth.
The web interface is a thin client over GitHub. It does not maintain its own
database, does not process authentication credentials, and does not store any
state that is not already in the repository.

This constraint is not incidental. It follows directly from the governance-as-
code principle in ADR-0001: if governance state lives in a separate database
that the web interface maintains independently, that database becomes a second
source of truth. Divergence between the two produces confusion about which
is authoritative. Preventing divergence requires synchronisation infrastructure
that introduces complexity and failure modes.

The no-separate-database constraint substantially narrows the hosting choices.
Options considered:

**Managed hosting (Vercel, Netlify, Railway, etc.)**: These platforms add
service dependencies, cost, and operational overhead. They also typically
encourage or require server-side processing, which risks drifting toward a
separate-database architecture as the application grows.

**Self-hosted VPS**: Adds operational overhead, cost, and requires
infrastructure maintenance that is out of scope for a governance experiment
at this stage.

**GitHub Pages with GitHub Actions**: The repository is already on GitHub.
GitHub Pages serves static files with zero operational overhead. The GitHub
REST API provides read access to repository content without authentication
and write access (creating issues and PRs) through OAuth. This makes it
possible to build all three Phase 3 components without any server-side
infrastructure — the browser talks directly to the GitHub API.

GitHub Pages has one constraint worth noting: it serves static files only.
There is no server-side rendering, no session management, and no database.
This constraint is an asset for this project, not a limitation. It enforces
the thin-client architecture that the governance model requires.

---

## Decision

Host the civic participation platform on GitHub Pages, deployed via GitHub
Actions from a `site/` directory at the repository root. The site is
vanilla HTML, CSS, and JavaScript — no framework, no build step, no
dependencies beyond CDN-delivered libraries for markdown rendering and
HTML sanitisation.

### Site structure

```
site/
├── .nojekyll              disable Jekyll processing
├── index.html             manifesto browser (home page)
├── proposals.html         proposal portal
├── dashboard.html         governance health dashboard
├── 404.html               custom 404 page
├── css/
│   └── main.css           all styles, CSS custom properties for theming
└── js/
    ├── config.js          repository configuration (owner, repo, paths)
    ├── github.js          GitHub REST API wrapper with caching
    ├── manifesto.js       manifesto browser page logic
    ├── proposals.js       proposal portal page logic
    └── dashboard.js       governance health page logic
```

### Three components

**Manifesto browser (index.html)**: Lists all articles from
`instances/canada/manifesto/` via the GitHub Contents API. Clicking an
article fetches and renders the Markdown content using marked.js, sanitised
with DOMPurify. Article list is sorted by filename (preserving the 01–17
ordering). The full article text is readable without leaving the site.

**Proposal portal (proposals.html)**: Lists open pull requests against `main`
via the GitHub Pulls API, displaying title, author, and labels. Proposal
submission generates a pre-filled GitHub Issues URL using the query string
API — the user is redirected to GitHub's own issue creation form with the
proposal template pre-populated. This design avoids requiring OAuth tokens
on the site itself while still guiding contributors toward correctly
structured proposals.

**Governance health dashboard (dashboard.html)**: Displays repository metrics
fetched from the GitHub REST API: total commits, open PRs, contributors,
article count, last commit date, and version from `VERSION`. This is the
automated governance health dashboard described in the Phase 3 roadmap.

### Technical choices

**No framework**: The site uses vanilla JavaScript with ES module imports.
This minimises dependencies, avoids framework-specific upgrade cycles, and
keeps the codebase accessible to contributors who do not use modern JavaScript
toolchains. Any contributor who can read HTML and JavaScript can contribute
to the site without learning a framework.

**CDN-delivered libraries**: marked.js (Markdown rendering) and DOMPurify
(HTML sanitisation) are loaded from jsDelivr CDN. These are the only runtime
dependencies. DOMPurify is required because content is fetched from GitHub
and rendered as HTML — sanitisation prevents XSS in the unlikely event that
malicious content were introduced into the repository.

**sessionStorage caching**: API responses are cached in sessionStorage with
a 5-minute TTL. This reduces GitHub API calls (unauthenticated rate limit:
60 requests/hour/IP) and improves perceived performance on multi-page
browsing within a session.

**Brown colour scheme**: The site uses the party's brown identity (soil, earth,
labour) as the visual language, consistent with Article 13 (Symbolism of Brown).
CSS custom properties define the palette so instance maintainers can retheme
by changing a single file.

**GitHub Actions deployment**: The `deploy-pages.yml` workflow deploys the
`site/` directory to GitHub Pages on every push to `main` and on manual
dispatch. The workflow uses the official `actions/upload-pages-artifact` and
`actions/deploy-pages` actions with the minimal required permissions.

---

## Consequences

### Positive

- Zero operational overhead. GitHub Pages hosting is free and requires no
  infrastructure management. Deployments are automatic on merge to `main`.
- The thin-client constraint is enforced architecturally, not just by policy.
  A static site cannot maintain a separate database. The governance-as-code
  principle is preserved structurally.
- No authentication required for reading. The manifesto browser and health
  dashboard work for any visitor without logging in. This is the correct
  default for public civic infrastructure.
- Proposal submission redirects to GitHub, which handles authentication.
  This means the site never handles credentials, which eliminates an entire
  category of security and privacy risk.
- Vanilla JS is maximally maintainable. No framework churn, no toolchain
  requirements. A contributor with basic web skills can modify the site.

### Negative

- GitHub API rate limits (60 unauthenticated requests/hour/IP) constrain
  how many API calls the site can make. The sessionStorage cache mitigates
  this but does not eliminate the constraint. Under heavy simultaneous use
  from the same IP address (e.g., a school or office), rate limits could
  be reached.
- The proposal submission redirect to GitHub.com requires contributors to
  have or create a GitHub account to submit proposals. This is a participation
  barrier for people who do not use GitHub. The Phase 3 goal of "not
  requiring Git or Markdown familiarity" is partially met — browsing the
  manifesto requires no account, but submitting proposals does.
- Server-side rendering is not available. The site will render a loading state
  before content appears. On slow connections, this may be noticeable. A
  future enhancement could pre-render article lists into the HTML during
  the GitHub Actions build step.
- The site cannot be rendered without JavaScript. Screen reader accessibility
  is limited to what can be achieved with client-side rendering. A future
  build step that generates static HTML from the API response would improve
  this.

### Neutral / Watch Items

- The `site/js/config.js` file contains the repository owner and name. If
  the repository is transferred or renamed, this file must be updated.
- jsDelivr CDN availability is a soft dependency. If jsDelivr is unavailable,
  the site loses Markdown rendering but the page structure remains accessible.
  A fallback to displaying raw Markdown is acceptable.
- The site is designed for the Canada instance. If other instances are created,
  a separate instance selector or separate sites per instance would be needed.
  This is a Phase 4 or later concern.

---

## Alternatives Considered

### Alternative 1: Jekyll (GitHub Pages native)

Description: Use Jekyll, GitHub Pages' native static site generator, with
Markdown files processed directly from the repository.

Reason rejected: Jekyll's Liquid templating and Ruby dependency stack add
build complexity that is hard to maintain for contributors without Ruby
experience. More critically, Jekyll processes the repository's own governance
Markdown files, which risks conflicts between Jekyll's processing and the
governance scripts' own file format requirements. A separate `site/` directory
with its own HTML is cleaner. The site fetching content via the GitHub API
also means it always serves the current `main` branch state, which is the
correct source-of-truth behaviour.

### Alternative 2: Next.js or Astro with static export

Description: Use a modern static site framework with React or component-based
templating, exported to static HTML.

Reason rejected: The governance-as-code philosophy favours minimal, auditable
infrastructure. A framework build pipeline introduces `node_modules`, lock
files, version upgrade cycles, and toolchain dependencies that are foreign
to the repository's existing Python/Markdown/YAML stack. Vanilla HTML and
JavaScript require no build step and are accessible to any contributor. The
functionality required (API calls, Markdown rendering, basic routing) does
not benefit from a framework at this scale.

### Alternative 3: Pre-rendered static HTML via Actions

Description: GitHub Actions build step fetches the GitHub API, renders all
articles to HTML, and writes them into the `site/` directory before deployment.

Reason rejected: This approach has merit as a future enhancement and is
documented as a watch item. It is deferred because it adds build complexity
(a Python or Node script to fetch and render content) without being required
for a functional Phase 3 MVP. The client-side rendering approach is
sufficient for launch.

---

## Future Revisions

This ADR should be revisited if:

- GitHub API rate limits are reached in practice, at which point either
  a pre-rendering build step or a GitHub OAuth App token for the Pages
  site should be considered.
- The proposal submission barrier (requires GitHub account) becomes a
  documented obstacle to participation, at which point a server-side
  function (e.g., GitHub Actions as API backend via `workflow_dispatch`)
  should be evaluated.
- A second instance is created and the site needs to serve multiple instances,
  at which point an instance selector and per-instance manifesto paths are
  required.
- The site's JavaScript-only rendering is found to create accessibility issues
  for assistive technology users, at which point the pre-rendering approach
  in Alternative 3 should be revisited.
