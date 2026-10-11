export type ComponentNo = 1 | 2 | 3 | 4;
export type Status = "completed" | "upcoming";
export type DocStatus = "available" | "pending";

export interface ResearchComponent {
  no: ComponentNo;
  title: string;
  member: string;
  summary: string; // one line
  objective: string; // used on Domain
}

export interface Member {
  name: string;
  studentId: string;
  component: ComponentNo;
  email: string;
  leader?: boolean; // shows the "Group Leader" badge
  photo?: string; // path under public/, used through asset(); omitted → initials avatar
  phone?: string;
  github?: string;
  linkedin?: string;
  achievements?: string[];
}

export interface Supervisor {
  role: "Supervisor" | "Co-Supervisor";
  name: string;
  email: string;
  photo?: string; // path under public/; omitted → initials avatar
  linkedin?: string;
  scholar?: string; // Google Scholar profile URL
}

export interface Milestone {
  id: string; // used as anchor: proposal, pp1, pp2, final, viva
  title: string;
  date: string; // ISO "2026-03-15" or "TBA"
  marks: string; // e.g. "6%" or "TBA"
  status: Status;
  summary: string;
  details: string[];
  links?: { label: string; href: string }[];
}

export interface DocumentItem {
  id: string;
  title: string;
  category: "charter" | "proposal" | "checklist" | "final";
  owner: string; // "Group" or member name
  format: "PDF" | "DOCX" | "Link";
  status: DocStatus;
  href?: string; // required when available
  date?: string; // submission date, e.g. "2026-03-25"
  description?: string;
}

export interface Presentation {
  id: string;
  title: string;
  date: string;
  status: Status;
  slidesHref?: string;
  thumbnail?: string;
}

export interface NavChild {
  label: string;
  href: string; // may include a hash, e.g. /domain/#research-gap
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export interface LiteratureTheme {
  id: string;
  title: string;
  summary: string;
  gap: string; // where this line of work stops
  components: ComponentNo[]; // which NextGen QA components answer the gap
  references: string[];
}

export type GapMark = "yes" | "no" | "partial";

export interface GapRow {
  capability: string;
  cells: GapMark[]; // one per column in domain.gapColumns, last is NextGen QA
}

export interface TechItem {
  name: string;
  use?: string; // what it does in NextGen QA
  icon?: string; // key of brandIcons in src/data/brandIcons.ts
}

export interface TechCategory {
  category: string;
  items: TechItem[];
}
