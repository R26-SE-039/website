export const site = {
  shortName: "NextGen QA",
  fullTitle: "NextGen QA — An AI-Powered Closed-Loop QA Automation Platform",
  subtitle: "An AI-Powered Closed-Loop QA Automation Platform",
  groupId: "R26-SE-039",
  heroBadge: "Stories · Gherkin · Test code · Self-healing · Traceability",
  heroTitle: "From sprint conversation to self-healing test, in one closed loop.",
  heroDescription:
    "NextGen QA turns meeting speech into user stories, generates and independently validates executable UI tests, heals the ones that break, and traces every requirement to its result.",
  // Dashboard recording shown in the hero frame: public/video/dashboard.mp4 (1280x624, H.264, no audio,
  // ~250 KB). It is the only committed file in public/video/ (see .gitignore) so Vercel can serve it.
  heroVideo: {
    enabled: true,
    src: "/video/dashboard.mp4",
    poster: "/images/dashboard-poster.webp", // first frame, 1280x624
    caption: "NextGen QA dashboard",
  },
  // Product introduction video (YouTube). Set the 11-character id to show it; empty = "coming soon".
  introVideo: { youtubeId: "", title: "Product introduction — NextGen QA" },
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
  // One headline result per component, from the research paper (docs/Research_Paper_New (2).pdf, §IV).
  highlights: [
    {
      label: "User story generation",
      value: "0.94",
      note: "Macro-F1 on nine-class utterance classification; conflict detection 0.91 / 0.88 P/R",
    },
    {
      label: "Test case generation",
      value: "91.2%",
      note: "Executability with DOM grounding, vs 78.6% ungrounded; 93.5% selector accuracy",
    },
    {
      label: "Self-healing",
      value: "0.89",
      note: "Macro-F1 on nine-class root-cause classification over 180 CI failure runs; 100% safety-policy compliance",
    },
    {
      label: "Traceability (RTM)",
      value: "98.7%",
      note: "RTM status correctness with 143 ms update latency",
    },
  ],
} as const;
