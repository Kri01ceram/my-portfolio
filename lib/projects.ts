import type { Project } from "@/components/project-card";

export const projects: Project[] = [
  {
    title: "CABSHARENITR",
    description: "Ride-sharing app for the NIT Rourkela community to share cabs and fares.",
    tags: ["Next.js", "tRPC/REST", "Prisma", "Postgres", "Auth"],
    domain: "web",
    category: "valuable",
    link: "https://your-demo-link.example",
    repo: "https://github.com/your/repo",
  },
  {
    title: "Credit Risk Detection",
    description: "Supervised learning model trained on real-world bank data to assess borrower risk. Includes feature engineering, model comparison, and explainability to support underwriting decisions.",
    tags: ["Python", "Pandas", "Scikit-learn", "XGBoost", "EDA"],
    domain: "ml",
    category: "valuable",
    repo: "https://github.com/your/credit-risk-detection",
  },
  {
    title: "Portfolio Site",
    description: "Personal portfolio built with Next.js app router and Tailwind.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    domain: "web",
    category: "practice",
  },
  {
    title: "Image Classifier",
    description: "CNN-based image classifier with transfer learning and proper augmentation.",
    tags: ["PyTorch", "TensorFlow", "Python"],
    domain: "ml",
    category: "practice",
  },
  {
    title: "E-commerce Platform",
    description: "Scalable e-commerce backend with PostgreSQL, Prisma, and queue workers.",
    tags: ["Node.js", "Prisma", "PostgreSQL", "Redis"],
    domain: "web",
    category: "scaled",
  },
  {
    title: "Fraud Detection System",
    description: "End-to-end fraud detection with feature store, model serving, and monitoring.",
    tags: ["Python", "Pandas", "Scikit-learn", "Airflow"],
    domain: "ml",
    category: "scaled",
  },
];
