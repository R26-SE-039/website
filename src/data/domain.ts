import type { GapRow, LiteratureTheme, TechCategory } from "@/types/content";

export const literature: LiteratureTheme[] = [
  {
    id: "bdd",
    title: "Requirements-to-test and BDD scenario generation",
    summary:
      "Gherkin gives a structured, executable specification that non-programmers can read. Rule-based converters are reliable on constrained text but brittle on free text; LLM-based generation reads well but misses negative paths and produces steps that are not observable. Hybrid template-first generation with human approval is the recommended design.",
    references: ["North (2006)", "Wynne et al. (2017)", "Wang et al. (2024)"],
  },
  {
    id: "llm-testgen",
    title: "LLM-based test code generation",
    summary:
      "TestPilot, ChatUniTest and CodaMosa show that first-shot LLM tests often fail to compile or pass trivially, and that a validate-and-repair loop drives quality. For UI tests, hallucinated selectors dominate failures and grounding the prompt in real page structure improves executability.",
    references: ["Schäfer et al. (2024)", "Xie et al. (2024)", "Lemieux et al. (2023)"],
  },
  {
    id: "agents",
    title: "GUI and web agents: Set-of-Mark, multi-role reasoning, reflexion",
    summary:
      "Set-of-Mark prompting lets a vision model refer to UI elements by number; WebVoyager and AppAgent explore interfaces autonomously; Reflexion improves agents with verbal self-reflection. None of them decides when exploration has covered enough of an application to stop.",
    references: ["Yang et al. (2023)", "He et al. (2024)", "Zhang et al. (2023)", "Shinn et al. (2023)"],
  },
  {
    id: "prioritisation",
    title: "Test prioritisation and risk prediction",
    summary:
      "APFD is the standard metric for test ordering; machine-learning prioritisation predicts failure probability from history and features, with random forests common on small tabular data. The cold-start problem makes early risk models dependent on bootstrapped data.",
    references: ["Rothermel et al. (2001)", "Elbaum et al. (2002)", "Pan et al. (2022)"],
  },
  {
    id: "validation",
    title: "Validation of LLM output: static checks and LLM-as-a-judge",
    summary:
      "Deterministic checks catch what can be proven from text; a second model can grade output against a rubric but shows self-enhancement bias when it judges its own generator, so the judge should be a different model with a fixed rubric and line-anchored, actionable findings.",
    references: ["Zheng et al. (2023)", "Bacchelli and Bird (2013)"],
  },
  {
    id: "todo-others",
    title: "TODO: literature for Components 1, 3 and 4",
    summary:
      "TODO: team members to add their literature themes (speech-to-requirement extraction, failure classification and self-healing, requirements traceability and quality prediction).",
    references: [],
  },
];

export const gapColumns = [
  "Record & playback",
  "Test-management tools",
  "Plain LLM generation",
  "Web agents",
  "NextGen QA",
];

export const gapRows: GapRow[] = [
  { capability: "Generates tests from requirements", cells: ["no", "no", "yes", "no", "yes"] },
  { capability: "Grounded in the real UI", cells: ["yes", "no", "no", "yes", "yes"] },
  { capability: "Autonomous behaviour discovery with a stopping rule", cells: ["no", "no", "no", "partial", "yes"] },
  { capability: "Independent validation of generated tests", cells: ["no", "no", "no", "no", "yes"] },
  { capability: "Executes in CI/CD and persists results", cells: ["partial", "partial", "no", "no", "yes"] },
  { capability: "Failure analysis and self-healing", cells: ["no", "no", "no", "no", "yes"] },
  { capability: "Requirement traceability", cells: ["no", "partial", "no", "no", "yes"] },
];

export const gaps = [
  "Generation without grounding: LLM generators hallucinate locators; recorders cannot generate from requirements.",
  "Exploration without a stopping rule: web agents complete tasks but have no notion of enough coverage.",
  "Validation absent or self-referential: generated tests are accepted on the generator's word.",
  "No measurement loop: predicted quality is never compared with actual execution outcomes.",
];

export const researchProblem = {
  main: "TODO: main research problem of the whole project (team to provide).",
  perComponent: [
    { no: 1 as const, question: "TODO: Component 1 research question." },
    {
      no: 2 as const,
      question:
        "How can executable UI test suites be generated automatically from Agile user stories such that they are grounded in the real application, discoverable beyond what the stories state, and independently validated before execution, within a closed CI/CD loop?",
    },
    { no: 3 as const, question: "TODO: Component 3 research question." },
    { no: 4 as const, question: "TODO: Component 4 research question." },
  ],
};

export const mainObjective =
  "TODO: main objective of the whole project (team to provide). Draft: to design, implement and evaluate an AI-powered closed-loop platform that takes a requirement from a sprint conversation to a validated, self-healing, traceable automated test.";

export const methodology = {
  name: "Design Science Research",
  steps: [
    { title: "Problem identification", text: "Fragmented, manual QA lifecycle between requirement and automated test." },
    { title: "Objectives", text: "One objective per component plus integration and deployment objectives." },
    { title: "Design and development", text: "Four FastAPI/Node services behind an API gateway with a shared React dashboard." },
    { title: "Demonstration", text: "End-to-end runs against the SauceDemo benchmark application." },
    { title: "Evaluation", text: "Measured pass rates, validator calibration, model metrics and panel feedback." },
    { title: "Communication", text: "Theses, group report, presentations and this website." },
  ],
};

export const technologies: TechCategory[] = [
  { category: "Frontend", items: [{ name: "React 19" }, { name: "Vite" }, { name: "Tailwind CSS" }, { name: "Monaco Editor" }] },
  { category: "Backend", items: [{ name: "FastAPI (Python)" }, { name: "Node.js / Express" }, { name: "PostgreSQL (Neon)" }, { name: "SQLAlchemy" }] },
  { category: "AI / ML", items: [{ name: "OpenAI" }, { name: "Anthropic Claude" }, { name: "Google Gemini" }, { name: "Ollama" }, { name: "scikit-learn" }] },
  { category: "Testing", items: [{ name: "Playwright" }, { name: "Selenium" }, { name: "Cypress" }, { name: "pytest" }] },
  { category: "DevOps & Cloud", items: [{ name: "Docker" }, { name: "Caddy" }, { name: "AWS EC2" }, { name: "GitHub Actions" }, { name: "Vercel" }] },
  { category: "TODO: other components", items: [{ name: "TODO: add technologies of C1, C3, C4" }] },
];
