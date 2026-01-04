import { ReactNode } from "react";

export default function Section({
  id, title, subtitle, children,
}: { id?: string; title: string; subtitle?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-[1200px] px-4 sm:px-6 py-14 sm:py-18">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-foreground">{title}</h2>
          {subtitle && <p className="mt-2 max-w-2xl text-sm sm:text-base text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}
