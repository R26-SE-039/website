import type { Presentation } from "@/types/content";

// Slides: compressed PDFs in public/docs/ (originals kept outside the site in ../website-originals/docs).

export const presentations: Presentation[] = [
  { id: "proposal", title: "Proposal Presentation", date: "TODO", status: "completed", slidesHref: "/docs/proposal-presentation.pdf" },
  { id: "pp1", title: "Progress Presentation 1", date: "TODO", status: "completed", slidesHref: "/docs/progress-presentation-1.pdf" },
  { id: "pp2", title: "Progress Presentation 2", date: "TODO", status: "completed", slidesHref: "/docs/progress-presentation-2.pdf" },
  { id: "final", title: "Final Presentation", date: "TBA", status: "upcoming" },
];
