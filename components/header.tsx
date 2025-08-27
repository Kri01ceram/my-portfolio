"use client";

import Link from "next/link";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-slate-200/50 dark:border-slate-800/50 bg-white/60 dark:bg-slate-950/40">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-lg">
          <span className="rounded-2xl px-2 py-1 bg-slate-900 text-white dark:bg-white dark:text-slate-900">
            KS
          </span>{" "}
          Krishna Singh
        </Link>
        <div className="flex items-center gap-2">
          <a href="#projects" className="text-sm hover:underline">Projects</a>
          <a href="#tech" className="text-sm hover:underline">Tech</a>
          <a href="#contact" className="text-sm hover:underline">Contact</a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
