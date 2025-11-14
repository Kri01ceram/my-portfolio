"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#tech", label: "Tech Stack" },
  { href: "#contact", label: "Get in Touch" },
];

export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const onHire = pathname?.startsWith("/hire");
  const [open, setOpen] = useState(false);
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
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border [mask-image:linear-gradient(to_bottom,black,black,transparent)]">
      <nav className="mx-auto max-w-[1100px] px-3 sm:px-5 lg:px-6 py-3.5 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight text-foreground hover:opacity-80 transition" aria-label="Krishna — ML and Web Portfolio">
          KRI · ML/WEB
        </Link>
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2 sm:gap-3">
          {links.map((link) => {
            // On the home page, use smooth scrolling to in-page anchors.
            if (onHome) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium text-foreground/90 hover:text-foreground border border-transparent hover:border-input hover:bg-secondary/30 transition-colors"
                >
                  {link.label}
                </a>
              );
            }
            // On other pages (e.g., /hire, /projects), link back to home with hash.
            return (
              <Link
                key={link.href}
                href={`/${link.href}`}
                className="inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium text-foreground/90 hover:text-foreground border border-transparent hover:border-input hover:bg-secondary/30 transition-colors"
              >
                {link.label}
              </Link>
            );
          })}
          {onHire ? (
            <Link href="/">
              <Button className="h-9 px-4 rounded-xl">Home</Button>
            </Link>
          ) : (
            <Link href="/hire">
              <Button className="h-9 px-4 rounded-xl">Hire Me</Button>
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle Menu"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-input bg-card hover:bg-secondary/30 transition"
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
            className="md:hidden border-b border-border bg-background/95 backdrop-blur-xl relative z-[70]"
            id="mobile-menu"
            ref={panelRef}
          >
            <div className="mx-auto max-w-[1100px] px-3 sm:px-5 lg:px-6 py-3.5">
              <div className="flex flex-col gap-2">
                {links.map((link) =>
                  onHome ? (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="rounded-xl px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/30"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={`/${link.href}`}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/30"
                    >
                      {link.label}
                    </Link>
                  )
                )}
                <div className="pt-1">
                  {onHire ? (
                    <Link href="/" onClick={() => setOpen(false)}>
                      <Button className="w-full h-10 rounded-xl">Home</Button>
                    </Link>
                  ) : (
                    <Link href="/hire" onClick={() => setOpen(false)}>
                      <Button className="w-full h-10 rounded-xl">Hire Me</Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
