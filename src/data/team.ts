import type { Member, Supervisor } from "@/types/content";

// Photos: public/images/team/<studentId>.webp (square, 400 px), referenced by `photo`.
// Optional links: linkedin, github (members); linkedin, scholar (supervisors).

export const team: Member[] = [
  {
    name: "Jinad Induvidwa A.G.",
    studentId: "IT22251114",
    photo: "/images/team/IT22251114.webp",
    component: 1,
    email: "it22251114@my.sliit.lk",
  },
  {
    name: "Abeygunasekara D.T.",
    studentId: "IT22303684",
    leader: true,
    photo: "/images/team/IT22303684.webp",
    component: 2,
    email: "it22303684@my.sliit.lk",
    achievements: [],
  },
  {
    name: "Ranasinghe S.I.",
    studentId: "IT22371768",
    photo: "/images/team/IT22371768.webp",
    component: 3,
    email: "it22371768@my.sliit.lk",
  },
  {
    name: "Rashani K.G.M.",
    studentId: "IT22182678",
    photo: "/images/team/IT22182678.webp",
    component: 4,
    email: "it22182678@my.sliit.lk",
  },
];

export const supervisors: Supervisor[] = [
  {
    role: "Supervisor",
    name: "Ms. Suriyaa Kumari",
    email: "suriyaa.k@sliit.lk",
    department: "Department of Information Technology",
    photo: "/images/team/supervisor-suriyaa.webp",
  },
  {
    role: "Co-Supervisor",
    name: "Mr. Eishan Weerasinghe",
    email: "eishan.w@sliit.lk",
    photo: "/images/team/supervisor-eishan.webp",
  },
];
