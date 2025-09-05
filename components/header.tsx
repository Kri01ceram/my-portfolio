"use client";

import Link from "next/link";
import ThemeToggle from "./theme-toggle";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#tech", label: "Tech Stack" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/40 dark:bg-slate-950/25 border-b border-white/20 dark:border-white/10 [mask-image:linear-gradient(to_bottom,black,black,transparent)]">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight text-gradient-brand hover:opacity-90 transition">
          Krishna Singh
        </Link>
        <div className="flex items-center gap-5 sm:gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="group relative text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors duration-200"
            >
              <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,_#60a5fa,_#a78bfa,_#f472b6)] group-hover:opacity-100 opacity-90">
                {link.label}
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-sky-400 via-violet-400 to-rose-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
