export type ExperienceItem = {
  id: string;
  start: string; // e.g. "Jun 2024"
  end: string; // e.g. "Present"
  role: string;
  company: string;
  location: string;
  tech: string[];
  highlights: string[];
  links?: Array<{ label: string; href: string }>;
};

export const experience: ExperienceItem[] = [
  {
    id: "current",
    start: "2024",
    end: "Present",
    role: "Full‑Stack Developer",
    company: "Independent",
    location: "Remote",
    tech: ["Next.js", "React", "TypeScript", "Tailwind", "Firebase"],
    highlights: [
      "Shipped production-ready features end-to-end across UI, API, and data.",
      "Improved reliability and performance through profiling and iterative refactors.",
      "Collaborated with stakeholders to translate requirements into scoped deliverables.",
    ],
    links: [
      { label: "Projects", href: "#projects" },
    ],
  },
];
