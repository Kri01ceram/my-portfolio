"use client";

import { motion } from "framer-motion";
import Section from "@/components/section";
import ProjectCard from "@/components/project-card";
import { projects } from "@/lib/projects";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid gap-6 sm:grid-cols-2 items-center"
        >
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Hi, I’m Krishna Singh
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Full-stack developer & ML data analyst. I build fast, delightful
              web experiences with Next.js, React, and modern tooling.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#projects" className="rounded-2xl px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                View Projects
              </a>
              <a href="#contact" className="rounded-2xl px-4 py-2 border border-slate-300 dark:border-slate-700">
                Contact Me
              </a>
            </div>
          </div>
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="aspect-square rounded-2xl overflow-hidden shadow-inner"
          >
            <Image
              src="/images/KRISHNA.jpg"  // 👈 put your picture in public/images/
              alt="My Picture"
              width={400}
    height={400}
    className="object-cover w-full h-full"
  />
</motion.div>
        </motion.div>
      </section>

      {/* PROJECTS */}
      <Section id="projects" title="Projects" subtitle="A few things I have built recently">
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((p) => <ProjectCard key={p.title} p={p} />)}
        </div>
      </Section>

      {/* TECH */}
      <Section id="tech" title="Tech Stack" subtitle="Tools I use to ship">
        <ul className="grid gap-3 sm:grid-cols-3 text-sm">
          {[
            "Next.js", "React", "TypeScript", "Tailwind CSS",
            "Node.js", "Prisma", "PostgreSQL",
            "Framer Motion", "Vercel",
          ].map((t) => (
            <li key={t} className="rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-2">
              {t}
            </li>
          ))}
        </ul>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact" subtitle="Let’s build something together">
        <p className="text-slate-600 dark:text-slate-300">
          Email: <a className="underline" href="mailto:0.krishna1120@gmail.com">0.krishna1120@gmail.com</a>
        </p>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          LinkedIn: <a className="underline" href="https://www.linkedin.com/in/krishna-singh-172642323/" target="_blank">krishna-singh-172642323</a>
        </p>
      </Section>
    </>
  );
}
