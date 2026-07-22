import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-10 text-sm text-muted-foreground flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
        <span>© 2026 Krishna Singh. All rights reserved.</span>
        <span>Last updated: {site.lastUpdated}</span>
      </div>
    </footer>
  );
}
