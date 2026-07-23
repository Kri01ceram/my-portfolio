"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { site } from "@/lib/site";

const developerAscii = [
  "      .--.",
  "     |o_o |",
  "     |:_/ |",
  "    //   \\\\",
  "   (|     | )",
  "  /'\\_   _/\\",
  "  \\___)=(___/",
  "",

].join("\n");

const PROFILE = {
  firstName: "Krishna",
  lastName: "Singh",
  mission:
    "I build reliable, high-performing products with thoughtful UX and clean engineering.",
  availability: "Available for work",
  location: "Based in India",
  resumeUrl: site.resumeUrl,
  links: site.links,
  currently: {
    role: "Full‑Stack Developer",
    company: "Freelance",
    companyLocation: "Remote",
    duration: "2024 — Present",
  },
  skills: ["MERN", "DevOPs", "Next.js", "Firebase", "SQL", "AI-Engineering"],
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

          <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl leading-[0.95] font-light tracking-tight">
            <span className="group relative inline-block text-foreground" tabIndex={0}>
              <span className="inline-flex cursor-help items-center gap-2">
                {PROFILE.firstName}
                <span className="sr-only"> summary about education and hobbies</span>
              </span>
              <span className="pointer-events-none absolute left-0 top-full z-20 mt-3 w-[min(22rem,80vw)] origin-top-left rounded-2xl border border-border bg-background/95 p-4 text-left text-sm leading-relaxed text-muted-foreground opacity-0 shadow-xl backdrop-blur transition duration-200 group-hover:opacity-100 group-focus:opacity-100">
                B.Tech CSE focused on software engineering, systems, and applied ML. Outside work, I like building side projects, exploring new tools, and listening to music.
              </span>
            </span>
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
              rel="noreferrer noopener"
              download
              className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground/90 transition hover:bg-accent"
            >
              <Download className="mr-2 h-4 w-4" /> Download Resume
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

          <p className="mt-4 text-xs text-muted-foreground">
            Shortcuts: <span className="font-medium text-foreground">G</span> GitHub, <span className="font-medium text-foreground">E</span> email, <span className="font-medium text-foreground">R</span> resume.
          </p>
        </div>

        <div className="flex items-center">
          <div className="w-full rounded-3xl border border-border bg-card p-6 sm:p-7">
            
            <pre className="mt-4 overflow-x-auto rounded-2xl border border-border bg-background p-4 text-xs leading-5 text-foreground/80">{developerAscii}</pre>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                BUILD
              </span>
              <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                SHIP
              </span>
              <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                REPEAT
              </span>
            </div>

            <Link
              href="#experience"
              className="mt-5 inline-flex items-center gap-2 text-sm text-foreground/90 underline underline-offset-4 decoration-border hover:decoration-foreground/50"
            >
              View Experience <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
