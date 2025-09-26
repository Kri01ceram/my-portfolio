export default function Footer() {
  return (
    <footer className="border-t border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-950/20 backdrop-blur">
      <div className="mx-auto max-w-[1400px] px-3 sm:px-5 lg:px-6 py-8 text-sm text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>© {new Date().getFullYear()} Krishna Singh. All rights reserved.</span>
        <span className="text-xs text-slate-400 dark:text-slate-500">Built with Next.js & Tailwind.</span>
      </div>
    </footer>
  );
}
