export const site = {
  shortName: "NextGen QA",
  fullTitle: "NextGen QA — An AI-Powered Closed-Loop QA Automation Platform",
  subtitle: "An AI-Powered Closed-Loop QA Automation Platform",
  groupId: "R26-SE-039",
  year: 2026,
  institution: "Sri Lanka Institute of Information Technology (SLIIT)",
  faculty: "Faculty of Computing",
  department: "Department of Software Engineering",
  degree:
    "B.Sc. (Hons) in Information Technology, specialising in Software Engineering",
  supervisor: "Ms. Suriyaa Kumari",
  coSupervisor: "Mr. Eishan Weerasinghe",
  // DRAFT — team to confirm the final wording.
  abstract:
    "Agile teams capture requirements in sprint conversations faster than QA engineers can turn them into automated tests. NextGen QA closes this gap as one AI-powered loop: it converts meeting speech into user stories, generates and independently validates executable UI tests grounded in the live application, analyses and self-heals failing tests, and maintains a live requirements traceability matrix with quality prediction.",
  contactEmail: "TODO: group email",
  emailTemplate: {
    subject: "Inquiry about NextGen QA (R26-SE-039)",
    body:
      "Dear NextGen QA team,\n\nI am writing regarding your research project NextGen QA (R26-SE-039).\n\n[Your message]\n\nRegards,\n[Your name]",
  },
  links: {
    apiDocs: "https://nextgenqasliit.duckdns.org/testcase-docs/docs",
    github: "https://github.com/R26-SE-039",
  },
  // Facts only. Add a highlight only when it is true today.
  highlights: [
    {
      label: "Integrated components",
      value: "4",
      note: "Story generation, test generation, self-healing, traceability",
    },
    {
      label: "Test frameworks generated",
      value: "3",
      note: "Playwright, Selenium and Cypress from one Gherkin source",
    },
    {
      label: "Deployment",
      value: "AWS",
      note: "Docker Compose behind Caddy with automatic HTTPS",
    },
    {
      label: "Validation",
      value: "Independent",
      note: "Static checks plus an LLM judge on a different model",
    },
  ],
} as const;
