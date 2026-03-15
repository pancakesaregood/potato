# Digital Democracy Architecture

This document describes the high-level operating model for the Peoples Potato
Party of Canada governance platform. It explains how citizens, digital identity,
policy workflows, and implementation bodies connect inside the repository and in
future platform design.

## Contribution and Governance Flow

The path from a citizen's idea to a change in the canonical manifesto:

```mermaid
flowchart TD
    A([Citizen has an idea]) --> B[GitHub Issue\nPolicy Proposal · Question · Governance]
    B --> C[Draft Proposal\nproposals/ using template]
    C --> D[Pull Request opened\nagainst manifesto/ or docs/]

    D --> E{CI Pipeline}

    E --> E1[Markdown lint]
    E --> E2[Proposal validation]
    E --> E3[Charter compliance check]
    E --> E4[Policy consistency check]

    E1 & E2 & E3 & E4 --> F{All checks pass?}

    F -- No --> G[Author revises\nand pushes fix]
    G --> E

    F -- Yes --> H[Community Review\nContributors · Policy Authors\nGovernance Reviewers]

    H --> I{Consensus\nreached?}

    I -- No --> J[Revise or archive\nproposal]
    I -- Yes --> K[Maintainer merges\nto main]

    K --> L[Versioned policy state\nCommit history = audit trail]
```

## Governance Authority Hierarchy

Where authority sits when there is a conflict between documents:

```mermaid
flowchart TD
    A[Constitution\ndocs/governance/constitution.md] -->|controls| B
    B[Bylaws\ndocs/governance/bylaws/] -->|inform| C
    C[Architecture Decision Records\ndocs/adr/] -->|explain design of| D
    D[Governance Documents\ncivic_infrastructure/ · ARCHITECTURE.md] -->|frame| E
    E[Manifesto Articles\nmanifesto/] -->|express| F
    F[Proposals Under Review\nproposals/]
```

If manifesto text conflicts with the constitutional layer, the constitutional
documents control until formally amended.

## Repository Data Flow

How files move through the system from authoring to ratified state:

```mermaid
flowchart LR
    subgraph Authoring
        A[manifesto/\narticles]
        B[proposals/\ndrafts]
        C[civic_infrastructure/\naddendums]
        D[experiments/\nstarter debates]
    end

    subgraph Validation
        E[scripts/\nvalidate_proposals.py\ncharter_compliance.py\npolicy_consistency.py]
        F[.github/workflows/\npolicy-lint.yml]
    end

    subgraph Authority
        G[docs/governance/\nconstitution + bylaws]
        H[docs/adr/\narchitectural decisions]
    end

    subgraph Output
        I[main branch\nratified governance state]
        J[CHANGELOG.md\naudit record]
    end

    A --> F
    B --> F
    C --> F
    D --> B
    E --> F
    G --> F
    H --> F
    F -->|passes| I
    I --> J
```

## Architecture Overview

```mermaid
flowchart TD
    subgraph CL[Citizen Layer]
        Citizens[Citizens and members]
        Riders[Riding associations]
        Delegates[Delegates and volunteers]
    end

    subgraph DI[Digital Identity]
        Identity[Identity and membership registry]
        Consent[Consent, privacy, and audit controls]
        Eligibility[Eligibility and credential checks]
    end

    subgraph GP[Governance Platform]
        Manifesto[Manifesto modules]
        Proposals[Proposal workflow]
        Voting[Deliberation and voting services]
        Rules[Constitution and bylaws]
    end

    subgraph PF[Policy Feedback Loop]
        Feedback[Citizen feedback]
        Metrics[Measurable outcomes]
        Review[Review and amendment cycle]
    end

    subgraph IL[Implementation Layer]
        Council[National Council]
        Local[Riding associations]
        Delivery[Campaign and implementation teams]
    end

    Citizens --> Identity
    Riders --> Identity
    Delegates --> Eligibility
    Identity --> Manifesto
    Consent --> Proposals
    Eligibility --> Voting
    Manifesto --> Feedback
    Proposals --> Voting
    Rules --> Voting
    Voting --> Review
    Feedback --> Review
    Metrics --> Review
    Review --> Council
    Review --> Local
    Council --> Delivery
    Local --> Delivery
```

## Citizen Layer

The citizen layer includes members, supporters, riding associations, delegates,
and volunteers. This is the participation surface of the system. It is where
ideas originate, where feedback is collected, and where democratic legitimacy is
formed.

Design goals:

- low barrier to participation
- regional accessibility
- bilingual and inclusive communication
- transparent feedback channels

## Digital Identity

The digital identity layer is responsible for membership records, eligibility,
consent, and auditability. In repository terms, this layer is represented by the
rules in `docs/governance/` and by proposal requirements that force identity and
eligibility assumptions to be made explicit.

Key functions:

- maintain trusted membership records
- support secure voting and consultation
- track consent and privacy boundaries
- preserve an audit trail for governance decisions

## Governance Platform

The governance platform is the authoring and decision environment. In the
repository, it is expressed through:

- `manifesto/` for policy articles
- `civic_infrastructure/` for civic technology addendums (digital infrastructure,
  decision protocols, smart contract use cases, cryptographic security)
- `proposals/` and `templates/` for change intake
- `docs/governance/` for formal authority and process
- `.github/workflows/` and `scripts/` for automated checks

This layer should be modular, reviewable, and easy to test.

Note: earlier drafts of `civic_infrastructure/` included addendums on tokenomics
and distributed-ledger governance. Those have been removed. The system does
not rely on cryptocurrency, tokens, or blockchain consensus. See
`docs/adr/0008-remove-crypto-governance.md` for the architectural rationale.

## Policy Feedback Loop

The policy feedback loop turns political promises into an iterative system. Each
article and addendum should define measurable outcomes or validation targets so
future contributors can compare intent against results.

Loop stages:

1. propose a policy or change
2. gather citizen feedback
3. review constitutional, fiscal, and environmental impacts
4. adopt, reject, or revise the proposal
5. measure results and feed them back into the next cycle

## Implementation Layer

The implementation layer includes the National Council, riding associations,
campaign teams, and future delivery institutions. This is where approved policy
must move from text into operations, legislation, or public service design.

Implementation priorities:

- accountability for execution
- traceability from policy text to action
- publication of measurable outcomes
- periodic review against manifesto commitments

## Repository Mapping

```mermaid
flowchart LR
    A[manifesto/] --> B[proposals/]
    B --> C[scripts/]
    C --> D[GitHub Actions]
    D --> E[docs/governance/]
    E --> F[ratified governance state\non main branch]
    B --> G[civic_infrastructure/]
    H[experiments/] --> B
    I[docs/adr/] --> E
```

The repository is intentionally split so policy, implementation, and
institutional authority can evolve without being collapsed into one file or one
approval path.

Related documents:

- Contribution guide: [docs/how_to_participate.md](docs/how_to_participate.md)
- Governance roles: [docs/governance_roles.md](docs/governance_roles.md)
- Development roadmap: [ROADMAP.md](ROADMAP.md)
