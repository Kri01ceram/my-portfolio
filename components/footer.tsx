export default function Footer() {
  return (
    <footer className="border-t border-slate-200/50 dark:border-slate-800/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 text-sm text-slate-500">
        © {new Date().getFullYear()} Krishna Singh. All rights reserved.
      </div>
    </footer>
  );
}
