"use client";

import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  repo?: string;
};

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="group relative h-full rounded-3xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg overflow-hidden"
    >
      <div className="relative p-5 sm:p-6 h-full flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {p.title}
          </h3>
          <div className="flex items-center gap-2">
            {p.repo && (
              <motion.a
                href={p.repo}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
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
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                <ExternalLink className="h-4.5 w-4.5 text-slate-700 dark:text-slate-200" />
              </motion.a>
            )}
          </div>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-slate-800/90 dark:text-slate-300/90">
          {p.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2.5 mt-auto">
          {p.tags.map((t) => (
            <motion.span
              key={t}
              whileHover={{ y: -2 }}
              className="inline-flex items-center gap-1 rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-2.5 py-1 text-xs text-slate-800 dark:text-slate-200"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-slate-500 dark:bg-slate-400" />
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}