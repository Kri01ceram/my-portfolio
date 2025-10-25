"use client";

import { motion } from "framer-motion";
import Section from "@/components/section";
import CareerTrain from "@/components/career-train";
import ProjectCard from "@/components/project-card";
import { projects } from "@/lib/projects";
import Image from "next/image";
import { achievements } from "@/lib/achievements";

const cards = [
  {
    title: "Web Development",
    gradient: "bg-gradient-to-r from-sky-600 via-violet-600 to-rose-600",
    techs: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Firebase", "PostgreSQL", "Framer Motion"],
  },
  {
    title: "ML Engineer",
    gradient: "bg-gradient-to-r from-sky-600 via-violet-600 to-rose-600",
    techs: ["Python", "NumPy", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch", "Matplotlib"],
  },
  {
    title: "DevOps Engineer",
    gradient: "bg-gradient-to-r from-sky-600 via-violet-600 to-rose-600",
    techs: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD", "Linux"],
  },
];

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
        <div className="mt-4 md:mt-6 grid gap-5 sm:gap-6 sm:grid-cols-2 items-stretch">
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
            <motion.div
              key={c.title}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="group relative rounded-2xl border border-slate-300 bg-white shadow-sm hover:shadow-lg"
            >
              {/* top accent (neutral) */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-slate-900/10" />
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-slate-900">
                    {c.title}
                  </div>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/5 text-slate-600">•</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {c.techs.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1.5 text-sm bg-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                      <span className="text-slate-800">{t}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>


      {/* ACHIEVEMENTS */}
      <Section id="achievements" title="Achievements" subtitle="Milestones I'm proud of">
        <div className="mt-4 md:mt-6 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {achievements.map((a) => (
            <motion.div
              key={a.id}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative rounded-2xl border border-slate-300 bg-white shadow-sm hover:shadow-lg"
            >
              {/* left accent bar (neutral) */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-2xl bg-slate-900/10" />
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/5 text-xl">
                    {a.icon ?? "🏆"}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-lg font-bold text-slate-900 truncate">{a.title}</div>
                      <span className="text-xs px-2 py-1 rounded-md bg-slate-900/5 text-slate-700 whitespace-nowrap">{a.date}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-800/90">
                      {a.description}
                    </p>
                  </div>
                </div>
              </div>
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