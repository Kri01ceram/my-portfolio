"use client";

import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/section";
import CareerTrain from "@/components/career-train";
// import ProjectCard from "@/components/project-card";
// import { projects } from "@/lib/projects";
import Image from "next/image";
import { achievements } from "@/lib/achievements";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import AchievementsBelt from "@/components/achievements-belt";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

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
  const [hovered, setHovered] = useState<number | null>(null);
  // Initial splash loader (client-side) to show an animation while heavy bundles hydrate.
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fade out shortly after hydration; adjust timeout if you want longer display.
    const t = setTimeout(() => setLoading(false), 900); // ~0.9s
    return () => clearTimeout(t);
  }, []);

  return (
    <>
    {/* INITIAL LOADER OVERLAY */}
    <AnimatePresence>
      {loading && (
        <motion.div
          key="initial-loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          aria-label="Loading"
        >
          <motion.div
            className="h-14 w-14 rounded-full border-4 border-foreground/20 border-t-foreground animate-spin"
            aria-hidden="true"
          />
          <motion.p
            className="mt-6 text-sm font-medium tracking-wide text-foreground/70"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            Preparing experience…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
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
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-foreground">
                Hi, I&apos;m Krishna Singh
              </h1>
              <span className="pointer-events-none absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-foreground/20" />
            </div>
            <p className="mt-4 text-base sm:text-lg text-foreground/80 max-w-prose">
              Full-stack developer & ML data analyst. I build fast, delightful
              web experiences with Next.js, React, and modern tooling.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 sm:gap-3.5">
              <a href="#projects" className="rounded-xl px-5 py-2.5 bg-primary text-primary-foreground shadow-sm hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60">
                View Projects
              </a>
              <a href="#contact" className="rounded-xl px-5 py-2.5 border border-input hover:bg-secondary/30 transition">
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
              <div className="absolute inset-0 rounded-full border-2 border-foreground/70" />
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
      <Section id="projects" title="Projects" subtitle="Explore by domain">
        <div className="mt-4 md:mt-6 grid gap-5 sm:gap-6 sm:grid-cols-2 items-stretch">
          <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 220, damping: 20 }}>
            <Card className="rounded-2xl group">
              <CardHeader className="border-b">
                <CardTitle className="text-lg text-foreground">Web Development</CardTitle>
                <CardDescription className="text-xs text-foreground/60">Applications, backends, and UI work</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/projects/web" className="inline-flex items-center gap-2 rounded-xl border border-input px-4 py-2 bg-card hover:bg-secondary/30 transition">View Web Projects →</Link>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 220, damping: 20 }}>
            <Card className="rounded-2xl group">
              <CardHeader className="border-b">
                <CardTitle className="text-lg text-foreground">Machine Learning</CardTitle>
                <CardDescription className="text-xs text-foreground/60">Models, pipelines, and data science</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/projects/ml" className="inline-flex items-center gap-2 rounded-xl border border-input px-4 py-2 bg-card hover:bg-secondary/30 transition">View ML Projects →</Link>
              </CardContent>
            </Card>
          </motion.div>
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
          {cards.map((c, idx) => {
            const isActive = hovered === idx;
            const isDimmed = hovered !== null && hovered !== idx;
            return (
              <motion.div
                key={c.title}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                animate={{
                  y: isActive ? -2 : 0,
                  scale: isActive ? 1.02 : isDimmed ? 0.985 : 1,
                }}
                transition={{ type: "spring", stiffness: 120, damping: 26, mass: 0.7 }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className={isActive ? "[transform-origin:center]" : ""}
              >
                <Card className={`rounded-2xl group ${isActive ? "ring-1 ring-secondary" : ""}`}>
                  <CardHeader className="border-b">
                    <CardTitle className="text-lg text-foreground">{c.title}</CardTitle>
                    <CardDescription className="text-xs text-foreground/60">Hover to view technologies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Expanded technologies on hover */}
                    <div
                      className={`overflow-hidden transition-[max-height] duration-400 ease-out ${
                        isActive ? "max-h-[420px]" : "max-h-0 group-hover:max-h-64"
                      }`}
                      aria-expanded={isActive}
                    >
                      <div
                        className={`${
                          isActive
                            ? "mt-3 grid grid-cols-2 gap-3 sm:gap-3.5"
                            : "mt-3 flex flex-wrap gap-2.5"
                        } opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 ${
                          isActive ? "opacity-100 translate-y-0" : ""
                        } transition duration-400 ease-out`}
                      >
                        {c.techs.map((t) => (
                          <Tooltip key={t}>
                            <TooltipTrigger asChild>
                              <motion.span
                                whileHover={{ y: -1, scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 140, damping: 24 }}
                                className={`${
                                  isActive
                                    ? "inline-flex items-center gap-1.5 rounded-full border border-input px-3.5 py-2 text-[0.95rem] bg-card cursor-help transition-colors duration-200 hover:bg-secondary/30"
                                    : "inline-flex items-center gap-1 rounded-full border border-input px-3 py-1.5 text-sm bg-card cursor-help transition-colors duration-200 hover:bg-secondary/30"
                                }`}
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-foreground transition-colors" />
                                <span className="text-foreground">{t}</span>
                              </motion.span>
                            </TooltipTrigger>
                            <TooltipContent sideOffset={6}>{techInfo[t] ?? `About ${t}`}</TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Section>


      {/* ACHIEVEMENTS */}
      <Section id="achievements" title="Achievements" subtitle="Hover to pause and see details">
        <div className="mt-4 md:mt-6">
          <AchievementsBelt items={achievements} />
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact" subtitle="Let's build something together">
        <div className="relative">
          <motion.div
            className="relative rounded-3xl border border-input bg-card shadow-lg overflow-hidden"
            whileHover={{ scale: 1.003 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            <div className="relative p-5 sm:p-6">
              <div className="grid gap-6 sm:grid-cols-2 items-start">
                {/* Left: CTAs */}
                <div className="space-y-4">
                  <p className="text-base sm:text-lg text-foreground/80">
                    Prefer email for fastest response. I’m also available on LinkedIn and GitHub.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href="mailto:0.krishna1120@gmail.com" className="rounded-xl px-5 py-2.5 bg-primary text-primary-foreground shadow-sm hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60">
                      Say Hello
                    </a>
                    <Link href="/hire" className="rounded-xl px-5 py-2.5 border border-input hover:bg-secondary/30 transition">
                      Hire Me
                    </Link>
                    <a href="#projects" className="rounded-xl px-5 py-2.5 border border-input hover:bg-secondary/30 transition">
                      See Projects
                    </a>
                  </div>
                </div>

                {/* Right: Contact details list */}
                {/* <div className="rounded-xl border border-input bg-card overflow-hidden">
                  <ul className="divide-y divide-border">
                    <li className="flex items-center gap-3 p-3">
                      <Mail className="h-4 w-4" />
                      <a href="mailto:0.krishna1120@gmail.com" className="text-sm font-medium underline underline-offset-4 decoration-foreground/70 hover:decoration-foreground">
                        0.krishna1120@gmail.com
                      </a>
                    </li>
                    <li className="flex items-center gap-3 p-3">
                      <Linkedin className="h-4 w-4" />
                      <a href="https://www.linkedin.com/in/krishna-singh-172642323/" target="_blank" rel="noreferrer noopener" className="text-sm font-medium underline underline-offset-4 decoration-foreground/70 hover:decoration-foreground">
                        linkedin.com/in/krishna-singh-172642323
                      </a>
                    </li>
                    <li className="flex items-center gap-3 p-3">
                      <Github className="h-4 w-4" />
                      <a href="https://github.com/Kri01ceram" target="_blank" rel="noreferrer noopener" className="text-sm font-medium underline underline-offset-4 decoration-foreground/70 hover:decoration-foreground">
                        github.com/Kri01ceram
                      </a>
                    </li>
                    <li className="flex items-center gap-3 p-3">
                      <Instagram className="h-4 w-4" />
                      <a href="https://www.instagram.com/" target="_blank" rel="noreferrer noopener" className="text-sm font-medium underline underline-offset-4 decoration-foreground/70 hover:decoration-foreground">
                        instagram.com/your-handle
                      </a>
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
          </motion.div>
          {/* Icons row below the contact box */}
          <div className="mt-4 flex items-center justify-center gap-4 sm:gap-6">
            <a
              href="mailto:0.krishna1120@gmail.com"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-input bg-card hover:bg-secondary/30 transition"
              aria-label="Email"
              title="Email"
            >
              <Mail className="h-5 w-5 text-foreground" />
            </a>
            <a
              href="https://www.linkedin.com/in/krishna-singh-172642323/"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-input bg-card hover:bg-secondary/30 transition"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-foreground" />
            </a>
            <a
              href="https://github.com/Kri01ceram"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-input bg-card hover:bg-secondary/30 transition"
              aria-label="GitHub"
              title="GitHub"
            >
              <Github className="h-5 w-5 text-foreground" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-input bg-card hover:bg-secondary/30 transition"
              aria-label="Instagram"
              title="Instagram"
            >
              <Instagram className="h-5 w-5 text-foreground" />
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}