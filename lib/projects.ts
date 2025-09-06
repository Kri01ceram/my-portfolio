import type { Project } from "@/components/project-card";

export const projects: Project[] = [
  {
    title: "CABSHARENITR",
    description: "Ride-sharing app for the NIT Rourkela community to share cabs and fares.",
    tags: ["Next.js", "tRPC/REST", "Prisma", "Postgres", "Auth"],
    link: "https://your-demo-link.example",
    repo: "https://github.com/your/repo",
  },
  {
    title: "Credit Risk Detection",
    description: "Supervised learning model trained on real-world bank data to assess borrower risk. Includes feature engineering, model comparison, and explainability to support underwriting decisions.",
    tags: ["Python", "Pandas", "Scikit-learn", "XGBoost", "EDA"],
    repo: "https://github.com/your/credit-risk-detection",
  },
];
