import type { ResearchComponent } from "@/types/content";

export const researchComponents: ResearchComponent[] = [
  {
    no: 1,
    title: "Meeting-to-Story Conversion",
    member: "TODO: member name",
    summary: "Converts meeting speech into structured, prioritised user stories.",
    objective:
      "TODO: Component 1 objective (team to provide). Draft: convert sprint-meeting speech and transcripts into structured user stories with a classifier that filters requirement-bearing utterances.",
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
    member: "TODO: member name",
    summary: "Classifies test failures and repairs broken locators automatically.",
    objective:
      "TODO: Component 3 objective (team to provide). Draft: classify failures into a root-cause taxonomy and self-heal locators or propose code fixes through GitHub.",
  },
  {
    no: 4,
    title: "Traceability and Quality Prediction",
    member: "TODO: member name",
    summary:
      "Maintains a live requirements traceability matrix and predicts quality.",
    objective:
      "TODO: Component 4 objective (team to provide). Draft: produce a live requirements traceability matrix and coverage and quality signals across Components 1 and 2.",
  },
];
