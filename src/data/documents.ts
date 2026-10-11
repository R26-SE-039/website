import type { DocumentItem } from "@/types/content";

// Set `status: "available"` and `href` when a document is published. `href` is either a file in
// public/docs/ (compressed PDF, e.g. "/docs/checklist.pdf") or an external link (Google Drive share URL).
export const documents: DocumentItem[] = [
  {
    id: "charter",
    title: "Project Charter (TAF)", // Topic Assessment Form, R26-SE-039
    category: "charter",
    owner: "Group",
    format: "PDF",
    status: "available",
    href: "/docs/topic-assessment-form.pdf",
    description: "Scope, roles and the initial plan agreed with the supervisors.",
  },
  {
    id: "proposal",
    title: "Proposal Document",
    category: "proposal",
    owner: "Group",
    format: "PDF",
    status: "pending",
  },
  {
    id: "checklist-1",
    title: "Checklist Document",
    category: "checklist",
    owner: "Group",
    format: "PDF",
    status: "available",
    href: "/docs/checklist.pdf",
  },
  {
    id: "final-group",
    title: "Final Group Report",
    category: "final",
    owner: "Group",
    format: "PDF",
    status: "pending",
  },
  {
    id: "final-c1",
    title: "Individual Thesis — Component 1: Meeting-to-Story Conversion",
    category: "final",
    owner: "Jinad Induvidwa A.G.",
    format: "PDF",
    status: "pending",
  },
  {
    id: "final-c2",
    title: "Individual Thesis — Component 2: Intelligent Test Case Generation",
    category: "final",
    owner: "Abeygunasekara D.T.",
    format: "PDF",
    status: "pending",
  },
  {
    id: "final-c3",
    title: "Individual Thesis — Component 3: Failure Analysis and Self-Healing",
    category: "final",
    owner: "Ranasinghe S.I.",
    format: "PDF",
    status: "pending",
  },
  {
    id: "final-c4",
    title: "Individual Thesis — Component 4: Traceability and Quality Prediction",
    category: "final",
    owner: "Rashani K.G.M.",
    format: "PDF",
    status: "pending",
  },
];

export const documentCategories: { id: DocumentItem["category"]; title: string }[] = [
  { id: "charter", title: "Project Charter" },
  { id: "proposal", title: "Proposal Documents" },
  { id: "checklist", title: "Checklist Documents" },
  { id: "final", title: "Final Documents" },
];
