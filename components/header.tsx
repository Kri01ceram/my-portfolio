"use client";

import Link from "next/link";
import ThemeToggle from "./theme-toggle";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#tech", label: "Tech Stack" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-slate-200/50 dark:border-slate-800/50 bg-white/60 dark:bg-slate-950/40">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight hover:opacity-80 transition">
          Krishna Singh
        </Link>
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400 transition"
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 dark:bg-blue-400 transition-all group-hover:w-full"></span>
            </a>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
