"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#tech", label: "Tech Stack" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const onHire = pathname?.startsWith("/hire");
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
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border [mask-image:linear-gradient(to_bottom,black,black,transparent)]">
      <nav className="mx-auto max-w-[1100px] px-3 sm:px-5 lg:px-6 py-3.5 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight text-foreground hover:opacity-80 transition">
          Krishna Singh
        </Link>
        <div className="flex items-center gap-5 sm:gap-6">
          {links.map((link) => {
            // On the home page, use smooth scrolling to in-page anchors.
            if (onHome) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="group relative text-sm font-medium text-foreground/90 hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-current/60 transition-all duration-300 group-hover:w-full"></span>
                </a>
              );
            }
            // On other pages (e.g., /hire, /projects), link back to home with hash.
            return (
              <Link
                key={link.href}
                href={`/${link.href}`}
                className="group relative text-sm font-medium text-foreground/90 hover:text-foreground transition-colors duration-200"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-current/60 transition-all duration-300 group-hover:w-full"></span>
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
      </nav>
    </header>
  );
}
