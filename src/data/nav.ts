import type { NavItem } from "@/types/content";
import { milestones } from "./milestones";

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Domain",
    href: "/domain/",
    children: [
      { label: "Literature Survey", href: "/domain/#literature-survey" },
      { label: "Research Gap", href: "/domain/#research-gap" },
      { label: "Research Problem", href: "/domain/#research-problem" },
      { label: "Research Objectives", href: "/domain/#research-objectives" },
      { label: "Methodology", href: "/domain/#methodology" },
      { label: "Technologies", href: "/domain/#technologies" },
    ],
  },
  {
    label: "Milestones",
    href: "/milestones/",
    children: milestones.map((m) => ({
      label: m.title,
      href: `/milestones/#${m.id}`,
    })),
  },
  { label: "Documents", href: "/documents/" },
  { label: "Presentations", href: "/presentations/" },
  { label: "About Us", href: "/about/" },
  { label: "Contact Us", href: "/contact/" },
];
