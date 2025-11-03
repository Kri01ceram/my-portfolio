export default function Footer() {
  return (
    <footer className="border-t border-border bg-background/70 backdrop-blur">
      <div className="mx-auto max-w-[1100px] px-3 sm:px-5 lg:px-6 py-8 text-sm text-foreground/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>© {new Date().getFullYear()} Krishna Singh. All rights reserved.</span>
        <span className="text-xs text-foreground/70">Built with Next.js & Tailwind.</span>
      </div>
    </footer>
  );
}
