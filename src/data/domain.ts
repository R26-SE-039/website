import type { GapRow, LiteratureTheme, TechCategory } from "@/types/content";

// The five literature-review threads of the research paper (docs/Research_Paper_New (2).pdf, §II-A).
export const literature: LiteratureTheme[] = [
  {
    id: "requirements",
    title: "Requirements engineering and traceability",
    summary:
      "Traceability links requirements to downstream artefacts, Agile teams express functional requirements as user stories, and INVEST gives the criteria for a good story.",
    gap: "These methods assume requirements are already written down. In real teams they are negotiated in meetings, incomplete and changing, so they must be captured from conversation, conflict-checked and validated.",
    components: [1],
    references: ["Gotel & Finkelstein (1994)", "Cohn (2004)", "Wake (2003)"],
  },
  {
    id: "llm-testgen",
    title: "LLMs for software testing",
    summary:
      "LLMs generate unit tests from code and natural language, CodaMosa uses them to escape coverage plateaus, and retrieval-augmented generation grounds output in application-specific context.",
    gap: "Generated tests still carry incorrect selectors, incomplete assertions or scenarios that misrepresent the requirement, so they need grounding in the real application and verification by execution.",
    components: [2],
    references: ["Schäfer et al. (2024)", "Lemieux et al. (2023)", "Lewis et al. (2020)"],
  },
  {
    id: "agents",
    title: "Agentic exploration and visual grounding",
    summary:
      "ReAct combines reasoning with action, WebArena benchmarks autonomous web agents, Set-of-Mark improves visual grounding over numbered UI elements, and Reflexion adds memory of past mistakes.",
    gap: "These agents aim to finish a task, not to cover an application. Testing needs explicit state tracking, failure memory and a coverage-based rule for when to stop.",
    components: [2],
    references: ["Yao et al. (2023)", "Zhou et al. (2024)", "Yang et al. (2023)", "Shinn et al. (2023)"],
  },
  {
    id: "repair",
    title: "CI/CD failure analysis and program repair",
    summary:
      "CI failures come from tests, dependencies, configuration, infrastructure and application defects, and LLM repair agents show that repository-level repair is increasingly feasible, while SWE-bench shows how hard it remains.",
    gap: "Giving an agent write access raises security and reliability risks. Safe self-healing needs explicit authorisation, restricted permissions and a policy that separates diagnosis from permission to change code.",
    components: [3],
    references: ["Rausch et al. (2017)", "Bouzenia et al. (2024)", "Jimenez et al. (2024)"],
  },
  {
    id: "quality",
    title: "Test quality, prioritisation and coverage",
    summary:
      "Mutation testing estimates fault-detection power, risk-based testing ranks work by impact and likelihood, and APFD measures how quickly a test order finds faults.",
    gap: "Quality scores, coverage and traceability are usually separate artefacts. An integrated lifecycle has to keep them linked to requirements, tests, execution results and approvals.",
    components: [4],
    references: ["Jia & Harman (2011)", "Amland (2000)", "Rothermel et al. (2001)"],
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
  main:
    "Software quality assurance spans requirement elicitation, test design, execution, defect analysis, traceability and coverage, yet these activities are supported by disconnected tools and manual hand-offs. How can AI connect requirements captured in live meetings to executable tests, execution evidence, failure analysis, governed repair, traceability and coverage in one human-governed workflow?",
  perComponent: [
    {
      no: 1 as const,
      question:
        "Can requirement-bearing utterances be reliably extracted, threaded and conflict-checked from live meeting conversations to produce validated and traceable user stories?",
    },
    {
      no: 2 as const,
      question:
        "How can executable UI test suites be generated automatically from Agile user stories such that they are grounded in the real application, discoverable beyond what the stories state, and independently validated before execution, within a closed CI/CD loop?",
    },
    {
      no: 3 as const,
      question:
        "Can CI/CD test failures be accurately classified and safely handled through deterministic self-healing while preventing unauthorised repository modifications?",
    },
    {
      no: 4 as const,
      question:
        "Can test quality, requirements traceability, gap analysis and code coverage be maintained using evidence from actual test execution?",
    },
  ],
};

export const mainObjective =
  "To design, implement and evaluate an AI-driven, human-governed framework for end-to-end software testing lifecycle automation that takes a requirement from a live sprint conversation to a validated, executable, traceable test suite, with controlled, developer-approved self-healing when pipelines break.";

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
  {
    category: "Speech, retrieval & coverage",
    items: [
      { name: "Azure Speech SDK" },
      { name: "ModernBERT" },
      { name: "pgvector" },
      { name: "RandomForest" },
      { name: "nyc / Istanbul" },
      { name: "coverage.py" },
    ],
  },
];

export const literatureInsight = {
  headline: "Every ingredient exists, nobody closes the loop.",
  text: "Existing work starts from documented rather than spoken requirements, generates tests that never see the application, explores for task completion instead of coverage, gives repair agents autonomy without safety governance, and keeps traceability, quality and coverage apart from execution evidence.",
  // The paper's answer: one continuous workflow (§II-B).
  loop: ["Elicitation", "Story validation", "Test generation", "Exploration", "Execution", "Failure analysis", "Self-healing", "Traceability"],
};

export const problemNarrative = [
  "Agile teams capture requirements in sprint conversations faster than QA engineers can turn them into automated tests. Requirements live in meeting notes, test cases are derived by hand, scripts are hand-coded, failures are triaged manually and traceability is a spreadsheet.",
  "Every hand-off loses information and time, and the resulting scripts decay as soon as the interface changes, because their locators are hard-coded. Teams ship faster than they can prove that what they ship still works.",
];

export const solutionNarrative = [
  "NextGen QA treats the whole path as one closed loop. Component 1 listens to the sprint meeting and produces structured user stories. Component 2 turns those stories into Gherkin scenarios and executable Playwright, Selenium and Cypress suites grounded in the real DOM, explores the application with a vision-guided agent, validates every generated artefact with static checks and an independent LLM judge, and runs the suites in CI/CD.",
  "Component 3 classifies the failures that come back into nine root causes and, for genuine application defects, proposes a repair that a developer must approve before it lands on an isolated auto-heal branch as a draft pull request. Component 4 keeps a live requirements traceability matrix from executed tests, scoring test quality, coverage gaps and risk. Results flow back to the start, so the next sprint begins with evidence rather than assumptions.",
];
