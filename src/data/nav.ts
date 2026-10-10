import type { NavItem } from "@/types/content";
import { milestones } from "./milestones";

// One-page site: every tab is an anchor on the home page.
export const navItems: NavItem[] = [
  { label: "Home", href: "/#top" },
  {
    label: "Domain",
    href: "/#literature-survey",
    children: [
      { label: "Literature Survey", href: "/#literature-survey" },
      { label: "Research Gap", href: "/#research-gap" },
      { label: "Research Problem", href: "/#research-problem" },
      { label: "Research Objectives", href: "/#research-objectives" },
      { label: "Methodology", href: "/#methodology" },
      { label: "Technologies", href: "/#technologies" },
    ],
  },
  {
    label: "Milestones",
    href: "/#milestones",
    children: milestones.map((m) => ({ label: m.title, href: `/#${m.id}` })),
  },
  { label: "Documents", href: "/#documents" },
  { label: "Presentations", href: "/#presentations" },
  { label: "About Us", href: "/#about" },
  { label: "Contact Us", href: "/#contact" },
];

/** Section ids that the navbar scroll-spy watches, mapped to the nav item they highlight. */
export const sectionToNav: Record<string, string> = {
  top: "/#top",
  "literature-survey": "/#literature-survey",
  "research-gap": "/#literature-survey",
  "research-problem": "/#literature-survey",
  "research-objectives": "/#literature-survey",
  methodology: "/#literature-survey",
  technologies: "/#literature-survey",
  milestones: "/#milestones",
  documents: "/#documents",
  presentations: "/#presentations",
  about: "/#about",
  contact: "/#contact",
};
