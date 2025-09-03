import { ReactNode } from "react";

export default function Section({
  id, title, subtitle, children,
}: { id?: string; title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12 md:py-14">
      <div className="mb-6 sm:mb-7">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
        {subtitle && <p className="mt-1.5 text-slate-500">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
