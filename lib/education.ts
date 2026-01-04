export type Education = {
  degree: string;
  institution: string;
  year: string;
  description: string;
  href?: string;
};

export type Certification = {
  title: string;
  platform: string;
  year: string;
  description?: string;
  href?: string;
};

export const primaryEducation: Education = {
  degree: "B.Tech (Computer Science)",
  institution: "Your University",
  year: "2021 — 2025",
  description: "Focused on software engineering, data structures, systems, and applied machine learning.",
  href: "https://example.com",
};

export const certifications: Certification[] = [
  {
    title: "Cloud Fundamentals",
    platform: "Google Cloud Skills Boost",
    year: "2024",
    description: "Core cloud concepts, IAM, networking, and deploy basics.",
    href: "https://example.com",
  },
  {
    title: "React / Next.js",
    platform: "Self‑study",
    year: "2023",
    description: "App Router, data fetching patterns, and performance.",
  },
];
