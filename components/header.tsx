"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/site";

const links = [
  { href: "#home", label: "Home" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

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
    setOpen(false);
  };

  useEffect(() => {
    if (!onHome) {
      setActiveId("");
      return;
    }

    const sectionIds = links.map((link) => link.href.replace("#", ""));
    const updateActiveSection = () => {
      const offset = 120;
      let currentId = sectionIds[0] ?? "";

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        const top = element.getBoundingClientRect().top + window.scrollY;
        if (window.scrollY + offset >= top) {
          currentId = id;
        }
      }

      setActiveId(currentId);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [onHome]);

  useEffect(() => {
    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.metaKey || ev.ctrlKey || ev.altKey) return;

      const target = ev.target as HTMLElement | null;
      const isTypingField =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable;
      if (isTypingField) return;

      const key = ev.key.toLowerCase();
      if (key === "g") {
        window.open(site.links.github, "_blank", "noopener,noreferrer");
      }
      if (key === "r") {
        window.open(site.resumeUrl, "_blank", "noopener,noreferrer");
      }
      if (key === "e") {
        window.location.href = `mailto:${site.email}`;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onClickAway = (ev: MouseEvent | TouchEvent) => {
      const target = ev.target as Node | null;
      if (!target) return;
      if (panelRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") setOpen(false);
    };
    const onResize = () => setOpen(false);
    document.addEventListener("mousedown", onClickAway);
    document.addEventListener("touchstart", onClickAway);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("mousedown", onClickAway);
      document.removeEventListener("touchstart", onClickAway);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  // Prevent background scroll when the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <nav className="mx-auto max-w-[1200px] px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm sm:text-base font-medium tracking-tight text-foreground hover:opacity-80 transition"
          aria-label="Krishna Singh's Portfolio"
        >
          Hello, I'm <span className="font-bold">Krishna Singh</span>
        </Link>
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const linkId = link.href.replace("#", "");
            const isActive = onHome && activeId === linkId;
            // On the home page, use smooth scrolling to in-page anchors.
            if (onHome) {
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="relative inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {link.label}
                  <motion.span
                    className="absolute inset-x-3 -bottom-0.5 h-px origin-center rounded-full bg-foreground/70"
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  />
                </motion.a>
              );
            }
            // On other pages (e.g., /hire, /projects), link back to home with hash.
            return (
              <Link
                key={link.href}
                href={`/${link.href}`}
                className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium text-foreground/80 hover:text-foreground border border-transparent hover:border-border hover:bg-accent transition-colors"
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle Menu"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card hover:bg-accent transition"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          ref={buttonRef}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu backdrop (click to close) */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-[60] bg-background/85 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-border bg-background/95 backdrop-blur relative z-[70]"
            id="mobile-menu"
            ref={panelRef}
          >
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-3.5">
              <div className="flex flex-col gap-2">
                {links.map((link) =>
                  onHome ? (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="rounded-xl px-4 py-2 text-sm font-medium text-foreground/85 hover:text-foreground hover:bg-accent"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={`/${link.href}`}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-4 py-2 text-sm font-medium text-foreground/85 hover:text-foreground hover:bg-accent"
                    >
                      {link.label}
                    </Link>
                  )
                )}
                <div className="rounded-xl border border-border bg-card px-4 py-3 text-xs text-muted-foreground">
                  Shortcuts: <span className="font-medium text-foreground">G</span> GitHub, <span className="font-medium text-foreground">E</span> email, <span className="font-medium text-foreground">R</span> resume.
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
