import type { ResearchComponent } from "@/types/content";

export const researchComponents: ResearchComponent[] = [
  {
    no: 1,
    title: "Meeting-to-Story Conversion",
    member: "Jinad Induvidwa A.G. (IT22251114)",
    summary:
      "Turns live sprint-meeting speech into validated, evidence-linked user stories, with conflict detection and human review.",
    objective:
      "Transcribe live multi-speaker meetings in real time, classify each utterance in context with a fine-tuned ModernBERT model, thread related requirements and detect five types of conflict for Business Analyst resolution, then generate user stories with RAG and score them through rule, evidence, hallucination and INVEST validation before approval.",
  },
  {
    no: 2,
    title: "Intelligent Test Case Generation",
    member: "Abeygunasekara D.T. (IT22303684)",
    summary:
      "Generates Gherkin and executable Playwright, Selenium and Cypress suites grounded in the live UI, with independent validation.",
    objective:
      "Generate Gherkin from user stories, then executable multi-framework test code grounded in crawled DOM selectors, explore the application autonomously with a vision-guided agent, validate every generated artefact independently (static checks plus an LLM judge on a different model), execute in CI/CD and prioritise with an ML risk model.",
  },
  {
    no: 3,
    title: "Failure Analysis and Self-Healing",
    member: "Ranasinghe S.I. (IT22371768)",
    summary:
      "Classifies CI/CD test failures into nine root causes and applies developer-approved, safety-governed repairs.",
    objective:
      "Predict the root cause of each failed CI/CD execution with a nine-class machine-learning classifier, map it to a recovery action through a deterministic policy, and repair eligible application defects in two phases: a read-only proposal, then a developer-approved change on an isolated auto-heal branch with a draft pull request, never touching the main branch or auto-merging.",
  },
  {
    no: 4,
    title: "Traceability and Quality Prediction",
    member: "Rashani K.G.M. (IT22182678)",
    summary:
      "Keeps a live requirements traceability matrix from executed tests, scoring test quality, coverage gaps and risk.",
    objective:
      "Maintain a live requirements traceability matrix updated from test approval, execution and coverage events, score each test on five weighted quality characteristics cross-checked by a RandomForest model, detect coverage gaps from real repository execution, rank them by an explainable risk score, and recommend reviewable test improvements back to test generation.",
  },
];
