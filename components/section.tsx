import { ReactNode, useCallback } from "react";

export default function Section({
  id, title, subtitle, children,
}: { id?: string; title: string; subtitle?: ReactNode; children: ReactNode }) {
  const handlePointerMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    target.style.setProperty("--section-mx", `${x}%`);
    target.style.setProperty("--section-my", `${y}%`);
  }, []);

  const handlePointerLeave = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    target.style.setProperty("--section-mx", "50%");
    target.style.setProperty("--section-my", "50%");
  }, []);

  return (
  <section id={id} className="mx-auto max-w-[1100px] px-3 sm:px-5 lg:px-6 py-10 sm:py-12 md:py-14">
      <div
        className="section-shell"
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
      >
        <div className="mb-6 sm:mb-7">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{title}</h2>
          {subtitle && <p className="mt-1.5 text-foreground/70">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
