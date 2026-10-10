import type { Milestone } from "@/types/content";

// Dates and marks are TODO until the team confirms them from the module handbook.
export const milestones: Milestone[] = [
  {
    id: "proposal",
    title: "Project Proposal",
    date: "TODO",
    marks: "TODO",
    status: "completed",
    summary:
      "Presentation and report that defined the research problem, objectives, scope and the four-component architecture.",
    details: [
      "Research problem, gap and objectives agreed with supervisors",
      "Component ownership and integration contract defined",
      "Proposal document and presentation delivered",
    ],
  },
  {
    id: "pp1",
    title: "Progress Presentation 1",
    date: "TODO",
    marks: "TODO",
    status: "completed",
    summary:
      "First demonstration of the working components and the integration path through the API gateway.",
    details: [
      "TODO: what was demonstrated (team to confirm)",
      "Panel feedback recorded and acted on",
    ],
  },
  {
    id: "pp2",
    title: "Progress Presentation 2",
    date: "TODO",
    marks: "TODO",
    status: "completed",
    summary:
      "Integrated system demonstration with evaluation evidence and the deployed platform.",
    details: [
      "TODO: what was demonstrated (team to confirm)",
      "Panel requested an independent validation mechanism for generated test cases (implemented)",
    ],
  },
  {
    id: "final",
    title: "Final Assessment",
    date: "TBA",
    marks: "TODO",
    status: "upcoming",
    summary:
      "Final presentation of the complete platform with results, individual theses and the group report.",
    details: [
      "Final report and four individual theses",
      "Live demonstration of the closed loop",
    ],
  },
  {
    id: "viva",
    title: "Viva",
    date: "TBA",
    marks: "TODO",
    status: "upcoming",
    summary: "Oral examination of each member on their component and the overall research.",
    details: ["Individual questioning on contribution, evaluation and limitations"],
  },
];
