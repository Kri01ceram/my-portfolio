export const site = {
  name: "Krishna Singh",
  title: "Krishna Singh — Portfolio",
  description: "Full-stack developer & ML data analyst.",
  email: "0.krishna1120@gmail.com",
  resumeUrl: "/resume.pdf",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  lastUpdated: "July 22, 2026",
  links: {
    github: "https://github.com/Kri01ceram",
    linkedin: "https://www.linkedin.com/in/krishna1120/",
    leetcode: "https://leetcode.com/u/0_Krishna_01/",
  },
} as const;
