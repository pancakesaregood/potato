# ADR-0004: Assign Distinct Roles to AI Agents in the Governance Pipeline

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-03-15 |
| Deciders | Founding National Convention |
| Affected components | CI/CD pipeline stages 3, 4, 5; `/governance/ai-agents/` |

---

## Context

The PPPC governance pipeline includes stages where AI language models
contribute to analysis: constitutional review, comparative governance analysis,
and adversarial threat modeling. These stages require substantial reasoning
over large text corpora — tasks where AI assistance offers real efficiency
gains.

However, using AI in governance processes introduces risks that do not exist
in typical software development contexts:

- **Authority ambiguity.** If AI outputs are treated as authoritative rather
  than advisory, democratic accountability erodes. Members may ratify changes
  that were, in effect, drafted and reviewed by models with no democratic
  mandate.
- **Model monoculture.** Relying on a single model for all analysis creates a
  single point of failure: one model's blind spots, training biases, or
  failure modes affect the entire pipeline.
- **Scope creep.** AI agents given broad access to governance systems may
  take actions beyond their intended role — committing changes, opening
  issues, or modifying pipeline configuration without explicit authorization.

The design question is how to capture the analytical value of AI assistance
while maintaining clear human authority, avoiding model monoculture, and
defining explicit scope boundaries for each agent.

---

## Decision

We will use multiple AI agents in the governance pipeline, each with a
defined, narrow role, a specific corpus scope, and no write access beyond
its designated output location.

### Agent Roster

| Agent | Primary Model | Pipeline Stage | Role |
| --- | --- | --- | --- |
| Constitutional Analyst | Claude | Stage 3 | Check proposal against constitution corpus; identify conflicts and gaps |
| Comparative Analyst | Gemini | Stage 4 | Compare proposal against reference governance corpus; surface historical analogues |
| Adversarial Reviewer | Codex / GPT-4o | Stage 5 | Enumerate exploitation vectors; stress-test against threat model library |
| Simulation Interpreter | Claude | Stage 6 | Interpret simulation outputs; flag anomalies |

### Shared Constraints (all agents)

1. **Advisory only.** No AI agent output is binding. Every AI-produced
   finding is a recommendation to a human review panel, which retains full
   authority to accept, modify, or reject it. All AI findings are logged
   alongside the human panel's response.
2. **Write scope limited to designated output files.** Agents write only to
   `/proposals/PPPC-PROP-YYYY-NNN/<stage>_ai_report.md`. They have no
   write access to `constitution/`, `governance/`, `policy/`, or pipeline
   configuration files.
3. **Read scope defined per agent.** Each agent is given a specific document
   corpus relevant to its role. No agent has unrestricted repository access.
4. **Deterministic configuration.** Model version, temperature, and prompt
   templates are version-controlled in `/governance/ai-agents/`. Changes
   to agent configuration are subject to the same pipeline as governance
   changes.
5. **Disagreement is logged, not suppressed.** Where two agents reach
   conflicting findings on the same proposal, both findings are published.
   Human reviewers receive the conflict explicitly. Consensus among AI
   agents is not a goal.

### Why separate models for separate stages?

Different models have different strengths and different failure modes.
Constitutional analysis requires precise cross-reference over structured
text; comparative analysis requires broad knowledge retrieval; adversarial
review requires creative hypothesis generation. Using the same model for
all three would apply one tool's strengths and weaknesses uniformly across
tasks that have different requirements.

Separation also provides independent verification: if a proposal has a
critical flaw, it is more likely to be caught if three independently trained
systems are each looking for it from a different angle.

---

## Consequences

### Positive

- No single model's blind spots determine the quality of governance review.
- Clear write-scope boundaries prevent agents from taking unintended actions
  on governance documents.
- Agent configuration is version-controlled: changes to how AI is used in the
  pipeline are themselves subject to governance review.
- Disagreement between agents is a feature, not a bug — it surfaces ambiguity
  for human resolution rather than papering over it.

### Negative

- Running multiple models on each proposal increases cost and latency compared
  to a single-model approach.
- Maintaining three separate agent configurations (prompts, model versions,
  corpus definitions) is ongoing operational work.
- Members reviewing AI outputs must understand that the three reports reflect
  different analytical frames and should be read together, not independently.
  This requires documentation and onboarding.

### Neutral / Watch Items

- The model roster is not fixed. As models change and new capabilities
  emerge, the best assignment of tasks to models should be re-evaluated.
  The version-controlled configuration makes rotation straightforward.
- AI-generated outputs should be clearly labeled as such in all published
  proposal documentation. The label must specify the model version used,
  so the output is interpretable in future review.

---

## Alternatives Considered

### Alternative 1: Single AI Agent for All Pipeline Stages

Description: One AI model performs constitutional review, comparative
analysis, and adversarial review as sequential tasks in a single pipeline
run.

Reason rejected: Concentrates all AI-related analysis in one model's
capability profile and failure modes. A model that is strong at constitutional
cross-reference may be weak at adversarial hypothesis generation. Using one
model for all stages also makes the system more vulnerable to prompt injection
or model-level manipulation targeted at a single agent.

### Alternative 2: AI Agents with Write Access to Governance Documents

Description: AI agents are permitted to draft amendments, merge approved
proposals, or directly edit governance files as part of the pipeline.

Reason rejected: Giving AI agents write access to constitutional documents
would mean governance changes could be authored by systems with no democratic
mandate. Even if the changes are subsequently ratified by humans, the
practical locus of authorship would shift to the model. This is incompatible
with the democratic accountability principles in the party constitution.

### Alternative 3: No AI in the Pipeline (Human Review Only)

Description: All pipeline stages are performed by human committees. AI tools
may be used informally by individual reviewers but have no formal pipeline role.

Reason rejected: The scale and complexity of constitutional cross-reference
analysis — checking a proposal against every existing provision in real time —
is not practical for volunteer committees working under time constraints.
AI-assisted analysis does not replace human judgment; it structures the
information human reviewers need to exercise that judgment effectively.

---

## Future Revisions

This ADR should be revisited if:

- A model demonstrates systematic bias or failure modes in a specific stage
  that materially affects the quality of governance review.
- The cost of running multiple models per proposal becomes prohibitive
  relative to the party's operational budget.
- Regulatory or legal developments in Canada restrict the use of AI systems
  in governance or decision-support processes.
- A stage's AI output is demonstrably unused or ignored by human panels in
  practice, suggesting the stage should be redesigned or removed.
