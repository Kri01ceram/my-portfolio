import type { Project } from "@/components/project-card";

export const projects: Project[] = [
  {
    title: "Metube",
    description: "Video streaming and watching platform with recommender system for excellent UX",
    tags: ["Node.js", "React", "Express", "NEonDB", "Prisma", "typescript"],
    domain: "web/ml",
    category: "valuable",
    repo: "https://github.com/Kri01ceram/metube",
  },
  {
    title: "CABSHARENITR",
    description: "Ride-sharing app for the NIT Rourkela community to share cabs and fares.",
    tags: ["Next.js", "tRPC/REST", "Firebase", "Gemini-Api", "Auth"],
    domain: "web",
    category: "scaled",
    link: "project-cabshare.vercel.app",
    repo: "https://github.com/Kri01ceram/project-cabshare",
  },
  {
    title: "Credit Risk Detection Model",
    description: "Supervised learning model trained on real-world bank data to assess borrower risk. Includes feature engineering, model comparison, and explainability to support underwriting decisions.",
    tags: ["Python", "Pandas", "Scikit-learn", "XGBoost", "EDA"],
    domain: "ml",
    category: "valuable",
    repo: "https://github.com/Kri01ceram/Credit-Risk-DEtection",
  },
  // {
  //   title: "Portfolio Site",
  //   description: "Personal portfolio built with Next.js app router and Tailwind.",
  //   tags: ["Next.js", "TypeScript", "Tailwind"],
  //   domain: "web",
  //   link: "https://your-demo-link.example",
  //   repo: "https://github.com/your/repo",
  // },
  {
    title: "Socio",
    description: "MERN stack social media app with real-time chat, notifications, and media sharing.",
    tags: ["MongoDB", "Express", "React", "Node.js","inngest","imagekit.io"],
    domain: "web",
    category: "practice",
    
    repo: "https://github.com/Kri01ceram/socio",
  },
  
];
