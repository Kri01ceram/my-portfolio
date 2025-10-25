import { ReactNode } from "react";

export default function Section({
  id, title, subtitle, children,
}: { id?: string; title: string; subtitle?: ReactNode; children: ReactNode }) {
  return (
  <section id={id} className="mx-auto max-w-[1100px] px-3 sm:px-5 lg:px-6 py-10 sm:py-12 md:py-14">
      <div className="mb-6 sm:mb-7">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">{title}</h2>
        {subtitle && <p className="mt-1.5 text-slate-600">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
