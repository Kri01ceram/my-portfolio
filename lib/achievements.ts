export type Achievement = {
  id: string;
  title: string;
  date: string; // e.g., "Jun 2023"
  description: string;
  location?: string;
  icon?: string; // emoji or icon name
};

export const achievements: Achievement[] = [
  {
    id: "start",
    title: "Started Coding Journey",
    date: "2019",
    description: "Wrote my first programs and fell in love with building things.",
    icon: "🚂",
  },
  {
    id: "intern-ml",
    title: "ML Internship",
    date: "2021",
    description: "Explored classical ML, built data pipelines and model baselines.",
    icon: "🧠",
  },
  {
    id: "open-source",
    title: "Open Source Contributions",
    date: "2022",
    description: "Contributed to community tooling and UI libraries.",
    icon: "🌟",
  },
  {
    id: "ship-portfolio",
    title: "Shipped v1 Portfolio",
    date: "2023",
    description: "Designed and deployed my first Next.js portfolio site.",
    icon: "🚀",
  },
  {
    id: "ml-project",
    title: "Credit Risk Detection",
    date: "2024",
    description: "Delivered an end-to-end model and dashboard for insights.",
    icon: "📊",
  },
];
