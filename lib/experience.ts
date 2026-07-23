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
    start: "MAY 2026",
    end: "JUL 2026",
    role: "Full‑Stack Developer",
    company: "Airace",
    location: "Remote",
    tech: ["Next.js", "React", "TypeScript", "Tailwind", "Firebase"],
    highlights: [
      "Shipped production-ready features end-to-end across UI, API, and data.",
      "Improved reliability and performance through profiling and iterative refactors.",
      "Collaborated with stakeholders to translate requirements into scoped deliverables.",
    ],
    
  },
];
