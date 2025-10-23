"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Section from "@/components/section";
import CareerTrain from "@/components/career-train";
import ProjectCard from "@/components/project-card";
import { projects } from "@/lib/projects";
import Image from "next/image";
import { achievements } from "@/lib/achievements";
import type { PointerEvent as ReactPointerEvent } from "react";

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
  // 3D tilt motion values for hero avatar
  const tiltX = useMotionValue(0); // rotateX
  const tiltY = useMotionValue(0); // rotateY
  const rX = useSpring(tiltX, { stiffness: 120, damping: 18, mass: 0.5 });
  const rY = useSpring(tiltY, { stiffness: 120, damping: 18, mass: 0.5 });
  const MAX_TILT = 16; // degrees

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -MAX_TILT; // invert vertical for natural feel
    const ry = ((x / rect.width) - 0.5) * MAX_TILT;
    tiltX.set(rx);
    tiltY.set(ry);
  }

  function resetTilt() {
    tiltX.set(0);
    tiltY.set(0);
  }
  // (Tech stack simplified: removed rotating cards state/effects)

  return (
    <>
      {/* HERO */}
  <section className="mx-auto max-w-[1400px] px-3 sm:px-5 lg:px-6 py-14 sm:py-16 lg:py-18">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid items-center gap-8 lg:gap-12 sm:grid-cols-2"
        >
          <div>
            <div className="relative inline-block pb-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-gradient-brand">
                Hi, I&apos;m Krishna Singh
              </h1>
              <span className="pointer-events-none absolute -bottom-0.5 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-rose-400 opacity-80" />
              <motion.span
                aria-hidden
                className="pointer-events-none absolute -bottom-0.5 left-0 h-[3px] w-16 rounded-full bg-white/60 mix-blend-overlay"
                animate={{ x: ["0%", "100%", "0%"] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-prose">
              Full-stack developer & ML data analyst. I build fast, delightful
              web experiences with Next.js, React, and modern tooling.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 sm:gap-3.5">
              <a href="#projects" className="rounded-xl px-5 py-2.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60">
                View Projects
              </a>
              <a href="#contact" className="rounded-xl px-5 py-2.5 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition">
                Contact Me
              </a>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[380px] sm:max-w-[420px] md:max-w-[450px] lg:max-w-[480px]" style={{ perspective: 1400 }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onPointerMove={handlePointerMove}
              onPointerLeave={resetTilt}
              whileHover={{ scale: 1.035 }}
              className="group relative aspect-square select-none"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Base shadow disc behind (farther back) */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_65%,rgba(0,0,0,0.55),transparent_70%)] blur-2xl opacity-70"
                style={{ transform: "translateZ(-90px) scale(0.94)" }}
              />
              {/* Rotating gradient ring (mid plane) */}
              <motion.div
                aria-hidden
                className="absolute inset-0 rounded-full p-[4px] shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
                style={{
                  background: "conic-gradient(from 0deg, #22d3ee, #3b82f6, #6366f1, #22d3ee)",
                  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  filter: "brightness(1) saturate(1.05)",
                  transform: "translateZ(0px)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                whileHover={{ filter: "brightness(1.25) saturate(1.25)" }}
              />
              {/* Glow aura that intensifies on hover */}
              <div
                aria-hidden
                className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-500 blur-2xl"
                style={{
                  background: "radial-gradient(circle at 50% 50%, rgba(56,189,248,0.55), rgba(99,102,241,0.25) 45%, transparent 70%)",
                  transform: "translateZ(-40px)",
                }}
              />
              {/* Parallax highlight */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-70 transition duration-700"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0) 60%)",
                  mixBlendMode: "overlay",
                  transform: "translateZ(70px) rotateZ(0.0001deg)",
                }}
              />
              {/* Image container (front plane) */}
              <motion.div
                className="relative h-full w-full rounded-full overflow-hidden shadow-xl shadow-sky-900/10 ring-1 ring-white/20 dark:ring-white/10"
                style={{
                  rotateX: rX,
                  rotateY: rY,
                  transformStyle: "preserve-3d",
                  transform: "translateZ(55px)",
                }}
              >
                <Image
                  src="/images/KRISHNA.png"
                  alt="Portrait of Krishna Singh"
                  width={600}
                  height={600}
                  className="object-cover w-full h-full select-none"
                  draggable={false}
                  priority
                />
                {/* Inner subtle depth ring */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18), rgba(255,255,255,0) 65%)",
                    mixBlendMode: "soft-light",
                  }}
                />
              </motion.div>
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
            <div key={c.title} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 backdrop-blur shadow-md hover:shadow-xl transition">
              <div className="p-5">
                <div className={`text-lg font-bold bg-clip-text text-transparent ${c.gradient}`}>
                  {c.title}
                </div>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {c.techs.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 rounded-full border border-slate-200 dark:border-slate-600 px-3 py-1.5 text-sm bg-white/80 dark:bg-slate-800/70 backdrop-blur">
                      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500" />
                      <span className="text-slate-700 dark:text-slate-200">{t}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>


      {/* ACHIEVEMENTS */}
      <Section id="achievements" title="Achievements" subtitle="Milestones I'm proud of">
        <div className="mt-4 md:mt-6 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {achievements.map((a) => (
            <div key={a.id} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 backdrop-blur shadow-md hover:shadow-xl transition">
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{a.icon ?? "🏆"}</div>
                  <div>
                    <div className="text-lg font-bold text-slate-900 dark:text-slate-100">{a.title}</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">{a.date}</div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-700/90 dark:text-slate-300/90">{a.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact" subtitle="Let's build something together">
    <div className="relative">
          <motion.div
      className="relative rounded-3xl border border-white/30 dark:border-white/10 bg-white/50 dark:bg-slate-900/30 backdrop-blur-xl overflow-hidden shadow-2xl"
      whileHover={{ scale: 1.005 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            {/* Static subtle outline (no rotating beam) */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10 dark:ring-white/10" />

            {/* Background gradient wash to match brand */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400/8 via-violet-400/8 to-rose-400/8 dark:from-sky-400/4 dark:via-violet-400/4 dark:to-rose-400/4 rounded-3xl" />

            {/* Floating glow */}
            <motion.div
              className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-sky-400/25 blur-3xl"
              animate={{ x: [0, 25, -10, 0], y: [0, -15, 20, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Subtle grid (theme-aware) */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-30 hidden dark:block [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-30 dark:hidden [background-image:linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative p-5 sm:p-6">
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200">
                <span className="text-gradient-brand">Email:</span> <a className="font-medium underline underline-offset-4 decoration-sky-500/70 hover:decoration-sky-500" href="mailto:0.krishna1120@gmail.com">0.krishna1120@gmail.com</a>
              </p>
              <p className="mt-2.5 text-base sm:text-lg text-slate-700 dark:text-slate-200">
                <span className="text-gradient-brand">LinkedIn:</span> <a className="font-medium underline underline-offset-4 decoration-violet-500/70 hover:decoration-violet-500" href="https://www.linkedin.com/in/krishna-singh-172642323/" target="_blank" rel="noreferrer noopener">krishna-singh-172642323</a>
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href="mailto:0.krishna1120@gmail.com" className="rounded-xl px-5 py-2.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60">
                  Say Hello
                </a>
                <a href="#projects" className="rounded-xl px-5 py-2.5 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition">
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