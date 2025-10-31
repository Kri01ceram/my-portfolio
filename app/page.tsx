"use client";

import { motion } from "framer-motion";
import Section from "@/components/section";
import CareerTrain from "@/components/career-train";
import ProjectCard from "@/components/project-card";
import { projects } from "@/lib/projects";
import Image from "next/image";
import { achievements } from "@/lib/achievements";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const cards = [
  {
    title: "Web Development",
    gradient: "bg-gradient-to-r from-sky-600 via-violet-600 to-rose-600",
    techs: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Firebase",
      "PostgreSQL",
      "Framer Motion",
    ],
  },
  {
    title: "ML Engineer",
    gradient: "bg-gradient-to-r from-sky-600 via-violet-600 to-rose-600",
    techs: [
      "Python",
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
      "Matplotlib",
    ],
  },
  {
    title: "DevOps Engineer",
    gradient: "bg-gradient-to-r from-sky-600 via-violet-600 to-rose-600",
    techs: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD", "Linux"],
  },
];

// Tech descriptions for hover tooltips (fallback to generic if missing)
const techInfo: Record<string, string> = {
  "Next.js": "React framework for SSR/SSG and app routing.",
  React: "UI library for building component-based interfaces.",
  TypeScript: "Typed superset of JavaScript for safer code.",
  "Tailwind CSS": "Utility-first CSS framework for rapid UI building.",
  "Node.js": "JavaScript runtime for building backends and tools.",
  Firebase: "Backend services: auth, firestore, hosting, storage.",
  PostgreSQL: "Open-source relational database with strong SQL support.",
  "Framer Motion": "Production-ready animation library for React.",
  Python: "General-purpose language for ML, data, and scripting.",
  NumPy: "N-dimensional arrays and numeric computing.",
  Pandas: "DataFrames and data analysis toolkit.",
  "Scikit-learn": "Classical ML algorithms and utilities.",
  TensorFlow: "Deep learning framework by Google.",
  PyTorch: "Dynamic deep learning framework by Meta.",
  Matplotlib: "Plotting library for Python.",
  Docker: "Containerization for reproducible deployments.",
  Kubernetes: "Orchestrates containers at scale.",
  AWS: "Cloud services platform for compute, storage, and more.",
  Terraform: "Infrastructure as code across multiple providers.",
  "CI/CD": "Automated build, test, and deploy pipelines.",
  Linux: "Operating system powering servers and dev environments.",
};

// (Tech stack simplified: removed 3D/anchor helpers)


export default function HomePage() {
  // Monochrome theme: no 3D/gradient effects here.

  return (
    <>
    {/* HERO */}
  <section className="mx-auto max-w-[1100px] px-3 sm:px-5 lg:px-6 py-14 sm:py-16 lg:py-18">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid items-center gap-8 lg:gap-12 sm:grid-cols-2"
        >
          <div>
            <div className="relative inline-block pb-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900">
                Hi, I&apos;m Krishna Singh
              </h1>
              <span className="pointer-events-none absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-slate-900/20" />
            </div>
            <p className="mt-4 text-base sm:text-lg text-slate-700 max-w-prose">
              Full-stack developer & ML data analyst. I build fast, delightful
              web experiences with Next.js, React, and modern tooling.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 sm:gap-3.5">
              <a href="#projects" className="rounded-xl px-5 py-2.5 bg-slate-900 text-white shadow-sm hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/60">
                View Projects
              </a>
              <a href="#contact" className="rounded-xl px-5 py-2.5 border border-slate-300 hover:bg-slate-50 transition">
                Contact Me
              </a>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[380px] sm:max-w-[420px] md:max-w-[450px] lg:max-w-[480px]">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square select-none"
            >
              <div className="absolute inset-0 rounded-full border-2 border-slate-900/70" />
              <div className="relative h-full w-full rounded-full overflow-hidden shadow-md">
                <Image
                  src="/images/KRISHNA.png"
                  alt="Portrait of Krishna Singh"
                  width={600}
                  height={600}
                  className="object-cover w-full h-full select-none"
                  draggable={false}
                  priority
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* PROJECTS */}
      <Section id="projects" title="Projects" subtitle="A few things I have built recently">
        <div className="mt-4 md:mt-6 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {projects.map((p) => <ProjectCard key={p.title} p={p} />)}
        </div>
      </Section>

      {/* CAREER TRAIN */}
      <Section id="journey" title="Career Journey" subtitle="Ride through milestones from past to present">
        <div className="mt-4 md:mt-6">
          <CareerTrain />
        </div>
      </Section>

      {/* TECH STACK */}
      <Section id="tech" title="Tech Stack" subtitle="Tools I use to ship">
        <div className="mt-4 md:mt-6 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <motion.div key={c.title} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
              <Card className="rounded-2xl group">
                <CardHeader className="border-b">
                  <CardTitle className="text-lg text-slate-900">{c.title}</CardTitle>
                  <CardDescription className="text-xs text-slate-500">Hover to view technologies</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Reveal technologies on hover */}
                  <div className="overflow-hidden max-h-0 group-hover:max-h-64 transition-[max-height] duration-300 ease-out">
                    <div className="mt-3 flex flex-wrap gap-2.5 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300">
                      {c.techs.map((t) => (
                        <Tooltip key={t}>
                          <TooltipTrigger asChild>
                            <span className="inline-flex items-center gap-1 rounded-full border border-input px-3 py-1.5 text-sm bg-white cursor-help">
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                              <span className="text-slate-800">{t}</span>
                            </span>
                          </TooltipTrigger>
                          <TooltipContent sideOffset={6}>{techInfo[t] ?? `About ${t}`}</TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>


      {/* ACHIEVEMENTS */}
      <Section id="achievements" title="Achievements" subtitle="Milestones I'm proud of">
        <div className="mt-4 md:mt-6 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {achievements.map((a) => (
            <motion.div key={a.id} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
              <Card className="rounded-2xl h-full">
                <CardHeader className="border-b">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl">
                      {a.icon ?? "🏆"}
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="text-base sm:text-lg text-slate-900 truncate">{a.title}</CardTitle>
                      <CardDescription className="text-xs">
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 text-slate-700">{a.date}</span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{a.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact" subtitle="Let's build something together">
        <div className="relative">
          <motion.div
            className="relative rounded-3xl border border-slate-300 bg-white shadow-lg overflow-hidden"
            whileHover={{ scale: 1.003 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            <div className="relative p-5 sm:p-6">
              <p className="text-base sm:text-lg text-slate-700">
                <span className="font-semibold">Email:</span> <a className="font-medium underline underline-offset-4 decoration-slate-500/70 hover:decoration-slate-600" href="mailto:0.krishna1120@gmail.com">0.krishna1120@gmail.com</a>
              </p>
              <p className="mt-2.5 text-base sm:text-lg text-slate-700">
                <span className="font-semibold">LinkedIn:</span> <a className="font-medium underline underline-offset-4 decoration-slate-500/70 hover:decoration-slate-600" href="https://www.linkedin.com/in/krishna-singh-172642323/" target="_blank" rel="noreferrer noopener">krishna-singh-172642323</a>
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href="mailto:0.krishna1120@gmail.com" className="rounded-xl px-5 py-2.5 bg-slate-900 text-white shadow-sm hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60">
                  Say Hello
                </a>
                <a href="#projects" className="rounded-xl px-5 py-2.5 border border-slate-300 hover:bg-slate-50 transition">
                  See Projects
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
}