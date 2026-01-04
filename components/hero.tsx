"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PROFILE = {
  firstName: "Krishna",
  lastName: "Singh",
  mission:
    "I build reliable, high-performing products with thoughtful UX and clean engineering.",
  availability: "Available for work",
  location: "Based in India",
  resumeUrl: "/resume.pdf",
  links: {
    github: "https://github.com/Kri01ceram",
    linkedin: "https://www.linkedin.com/in/krishna-singh-172642323/",
    leetcode: "https://leetcode.com/",
  },
  currently: {
    role: "Full‑Stack Developer",
    company: "Independent",
    companyLocation: "Remote",
    duration: "2024 — Present",
  },
  skills: ["Flutter", "React", "Next.js", "Firebase", "Supabase", "GCP"],
};

export default function Hero() {
  return (
    <section id="home" className="mx-auto max-w-[1200px] px-4 sm:px-6 py-14 sm:py-18">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid gap-10 lg:grid-cols-2 lg:gap-14"
      >
        <div className="flex flex-col justify-center">
          <p className="text-xs tracking-[0.28em] text-muted-foreground">PORTFOLIO / 2025</p>

          <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl leading-[0.95] font-light tracking-tight">
            <span className="block text-foreground">{PROFILE.firstName}</span>
            <span className="block text-foreground/75">{PROFILE.lastName}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
            {PROFILE.mission}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
              {PROFILE.availability}
            </span>
            <span className="h-4 w-px bg-border" aria-hidden />
            <span>{PROFILE.location}</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={PROFILE.resumeUrl}
              target="_blank"
              className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground/90 transition hover:bg-accent"
            >
              Resume
            </Link>
            <Link
              href={PROFILE.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground/90 transition hover:bg-accent"
            >
              GitHub
            </Link>
            <Link
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground/90 transition hover:bg-accent"
            >
              LinkedIn
            </Link>
            <Link
              href={PROFILE.links.leetcode}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground/90 transition hover:bg-accent"
            >
              LeetCode
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-full rounded-3xl border border-border bg-card p-6 sm:p-7">
            <p className="text-xs tracking-[0.28em] text-muted-foreground">CURRENTLY</p>
            <h2 className="mt-3 text-2xl font-normal text-foreground">{PROFILE.currently.role}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {PROFILE.currently.company} · {PROFILE.currently.companyLocation}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{PROFILE.currently.duration}</p>

            <Link
              href="#experience"
              className="mt-5 inline-flex items-center gap-2 text-sm text-foreground/90 underline underline-offset-4 decoration-border hover:decoration-foreground/50"
            >
              View Experience <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="mt-6 flex flex-wrap gap-2">
              {PROFILE.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
