import type { DocumentItem } from "@/types/content";

// Links only. Replace `pending` with `available` and set `href` when a document is published.
export const documents: DocumentItem[] = [
  {
    id: "charter",
    title: "Project Charter",
    category: "charter",
    owner: "Group",
    format: "PDF",
    status: "pending",
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
    title: "Checklist Document — TODO: name",
    category: "checklist",
    owner: "Group",
    format: "PDF",
    status: "pending",
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
    title: "Individual Thesis — Component 1",
    category: "final",
    owner: "TODO: member name",
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
    title: "Individual Thesis — Component 3",
    category: "final",
    owner: "TODO: member name",
    format: "PDF",
    status: "pending",
  },
  {
    id: "final-c4",
    title: "Individual Thesis — Component 4",
    category: "final",
    owner: "TODO: member name",
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
