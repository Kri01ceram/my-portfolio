"use client";

import { Github, ExternalLink } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  repo?: string;
};

export default function ProjectCard({ p }: { p: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    x.set(nx);
    y.set(ny);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="h-full [perspective:1200px]">
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY }}
        className="group relative h-full rounded-3xl border border-white/10 dark:border-white/5 bg-white/5 dark:bg-white/5/5 shadow-2xl overflow-hidden will-change-transform"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
      >
        {/* Glow gradient border */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl p-[1.5px]">
          <motion.div
            className="h-full w-full rounded-[inherit]"
            style={{
              background:
                "conic-gradient(from 90deg at 50% 50%, rgba(56,189,248,0.85), rgba(59,130,246,0.85), rgba(99,102,241,0.85), rgba(56,189,248,0.85))",
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "1.5px",
            }}
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Inner surface */}
  <div className="relative rounded-[inherit] bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-slate-900/50 dark:via-slate-900/30 backdrop-blur-xl h-full">
          {/* Floating glow blob */}
          <motion.div
            className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-sky-400/25 blur-3xl"
            animate={{ x: [0, 20, -10, 0], y: [0, -10, 15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Subtle grid */}
          <div className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-15 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:22px_22px]" />

          {/* Content */}
          <div className="relative p-5 sm:p-6 h-full flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight bg-clip-text text-transparent bg-[linear-gradient(90deg,_#22d3ee,_#3b82f6,_#6366f1)]">
                {p.title}
              </h3>
              <div className="flex items-center gap-2">
                {p.repo && (
                  <motion.a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="GitHub"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition"
                  >
                    <Github className="h-4.5 w-4.5 text-slate-700 dark:text-slate-200" />
                  </motion.a>
                )}
                {p.link && (
                  <motion.a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Live"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition"
                  >
                    <ExternalLink className="h-4.5 w-4.5 text-slate-700 dark:text-slate-200" />
                  </motion.a>
                )}
              </div>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-slate-700/90 dark:text-slate-300/90">
              {p.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2.5 mt-auto">
              {p.tags.map((t) => (
                <motion.span
                  key={t}
                  whileHover={{ y: -2 }}
                  className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs text-slate-700 dark:text-slate-200 backdrop-blur [box-shadow:inset_0_1px_0_0_rgba(255,255,255,.12)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-400" />
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Corner accents */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-3 top-3 h-10 w-10 rounded-xl bg-gradient-to-br from-sky-400/20 to-fuchsia-400/20 blur-xl" />
          <div className="absolute right-3 bottom-3 h-10 w-10 rounded-xl bg-gradient-to-br from-violet-400/20 to-amber-400/20 blur-xl" />
        </div>
      </motion.div>
    </div>
  );
}