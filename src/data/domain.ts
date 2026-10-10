import type { ComponentNo, GapRow, LiteratureTheme, TechCategory } from "@/types/content";

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
  // RQ1-RQ4 and their headline results, from the research paper (§I and §IV).
  perComponent: [
    {
      no: 1 as const,
      question:
        "Can requirement-bearing utterances be reliably extracted, threaded and conflict-checked from live meeting conversations to produce validated and traceable user stories?",
      result: "0.94 macro-F1 utterance classification · 0.91 / 0.88 conflict precision / recall · 4.3 / 5 story rating",
    },
    {
      no: 2 as const,
      question:
        "Can grounded, coverage-driven agentic test generation produce executable test suites with improved executability and coverage over baseline approaches?",
      result: "91.2% executability vs 78.6% ungrounded · 84 UI states vs 76 for BFS · APFD 0.82",
    },
    {
      no: 3 as const,
      question:
        "Can CI/CD test failures be accurately classified and safely handled through deterministic self-healing while preventing unauthorised repository modifications?",
      result: "0.89 root-cause macro-F1 · 100% safety-policy compliance · 0% unsafe modifications",
    },
    {
      no: 4 as const,
      question:
        "Can test quality, requirements traceability, gap analysis and code coverage be maintained using evidence from actual test execution?",
      result: "98.7% RTM status correctness · 143 ms update latency · 94.1% coverage-agent success",
    },
  ],
};

export const mainObjective =
  "To design, implement and evaluate an AI-driven, human-governed framework for end-to-end software testing lifecycle automation that takes a requirement from a live sprint conversation to a validated, executable, traceable test suite, with controlled, developer-approved self-healing when pipelines break.";

// Design Science Research steps, filled from the research paper (§III-A, §III-F).
export const methodology = {
  name: "Design Science Research",
  steps: [
    {
      title: "Problem identification",
      text: "Disconnected tools and manual hand-offs between spoken requirements, tests, failures and traceability.",
    },
    {
      title: "Objectives",
      text: "Four research questions, one per component, plus their integration into one human-governed framework.",
    },
    {
      title: "Design and development",
      text: "Five independently deployable microservices (authentication plus the four components), database-per-service, connected only through defined APIs.",
    },
    {
      title: "Demonstration",
      text: "Live meetings flow to stories, tests, CI runs, repairs and the RTM end to end, with SauceDemo as the target application.",
    },
    {
      title: "Evaluation",
      text: "Component and end-to-end metrics against random and BFS baselines, with three ablations: grounding, Reflexion memory and learned scoring.",
    },
    { title: "Communication", text: "Research paper, theses, group report, presentations and this website." },
  ],
};

// `icon` is a key of brandIcons (src/data/brandIcons.ts); items without one use a line icon.
export const technologies: TechCategory[] = [
  {
    category: "Frontend",
    items: [
      { name: "React 19", use: "Shared dashboard", icon: "react" },
      { name: "Vite", use: "Build and dev server", icon: "vite" },
      { name: "Tailwind CSS", use: "Styling", icon: "tailwindcss" },
      { name: "Monaco Editor", use: "Gherkin and code editors", icon: "visualstudiocode" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "FastAPI (Python)", use: "Component services", icon: "fastapi" },
      { name: "Node.js / Express", use: "Auth and API gateway", icon: "nodedotjs" },
      { name: "PostgreSQL (Neon)", use: "Database per service", icon: "postgresql" },
      { name: "SQLAlchemy", use: "ORM", icon: "sqlalchemy" },
    ],
  },
  {
    category: "AI / ML",
    items: [
      { name: "OpenAI", use: "LLM provider", icon: "openai" },
      { name: "Anthropic Claude", use: "LLM provider and judge", icon: "anthropic" },
      { name: "Google Gemini", use: "LLM and embeddings", icon: "googlegemini" },
      { name: "Ollama", use: "Local models", icon: "ollama" },
      { name: "scikit-learn", use: "Classifiers and scoring", icon: "scikitlearn" },
    ],
  },
  {
    category: "Testing",
    items: [
      { name: "Playwright", use: "DOM inspector, agent, suites", icon: "playwright" },
      { name: "Selenium", use: "Generated suites", icon: "selenium" },
      { name: "Cypress", use: "Generated suites", icon: "cypress" },
      { name: "pytest", use: "Service tests", icon: "pytest" },
    ],
  },
  {
    category: "DevOps & Cloud",
    items: [
      { name: "Docker", use: "Compose deployment", icon: "docker" },
      { name: "Caddy", use: "HTTPS reverse proxy", icon: "caddy" },
      { name: "AWS EC2", use: "Hosting", icon: "amazonec2" },
      { name: "GitHub Actions", use: "Test runs and CI", icon: "githubactions" },
      { name: "Vercel", use: "Dashboard hosting", icon: "vercel" },
    ],
  },
  {
    category: "Speech, retrieval & coverage",
    items: [
      { name: "Azure Speech SDK", use: "Speech-to-text, diarisation", icon: "microsoftazure" },
      { name: "ModernBERT", use: "Utterance classifier", icon: "huggingface" },
      { name: "pgvector", use: "Semantic search", icon: "postgresql" },
      { name: "RandomForest", use: "Quality-score check" },
      { name: "nyc / Istanbul", use: "JavaScript coverage" },
      { name: "coverage.py", use: "Python coverage" },
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
  "Modern Agile delivery relies on many human and tool hand-offs across the testing lifecycle. Each one loses context, and the AI tools that help with single steps are separate solutions rather than one workflow from requirement to evidence.",
];

// The four lifecycle problems the paper's introduction names, and the component that answers each.
export const problemPoints: { no: ComponentNo; title: string; text: string }[] = [
  {
    no: 1,
    title: "Requirements lost in conversation",
    text: "Requirements are discussed verbally in sprint meetings and later rewritten as backlog items, inviting context loss, misinterpretation and unresolved conflicts.",
  },
  {
    no: 2,
    title: "Generated tests that do not run",
    text: "LLMs speed up test writing, but their tests can contain invalid element references, omit acceptance criteria or fail to execute.",
  },
  {
    no: 3,
    title: "Failures fixed by hand, or unsafely",
    text: "CI/CD failures need manual diagnosis, and unrestricted automated repair is risky when AI agents can modify the repository.",
  },
  {
    no: 4,
    title: "Traceability apart from execution",
    text: "Traceability and coverage are maintained separately from actual test runs, so they are rarely timely or reliable.",
  },
];

export const solutionNarrative = [
  "An AI-driven, human-governed framework for the whole testing lifecycle. Requirements captured from live meetings become validated user stories, then executable test scenarios. Execution results drive failure analysis and controlled repair, and every artefact stays linked through a shared traceability layer.",
  "Human governance is the key design principle: AI components analyse, generate and propose, but consequential artefacts must pass explicit approval gates, and repository changes are restricted by a deterministic safety policy with developer approval.",
];

// The architecture's four rules, from the paper's conclusion (§V).
export const designPrinciples: { title: string; text: string; no: ComponentNo }[] = [
  {
    no: 1,
    title: "Classification before generation",
    text: "Utterances are classified in context and conflict-checked before any user story is written.",
  },
  {
    no: 2,
    title: "Evidence before approval",
    text: "Scenarios, element maps and suites are grounded in the real application and approved by an engineer.",
  },
  {
    no: 3,
    title: "Policy before permission",
    text: "A deterministic policy and developer approval decide every repair; nothing reaches the main branch.",
  },
  {
    no: 4,
    title: "Execution before belief",
    text: "Coverage and traceability are written to the RTM only from successful test execution.",
  },
];
