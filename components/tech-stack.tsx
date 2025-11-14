"use client";

import { motion } from "framer-motion";
import Section from "@/components/section";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cards, techInfo } from "@/lib/tech";

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 + index * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  }),
} as const;

export default function TechStackSection() {
  return (
    <Section id="tech" title="Tech Stack" subtitle="Tools I use to ship">
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card, index) => (
          <motion.article
            key={card.title}
            className="group relative overflow-hidden rounded-3xl border border-white/8 bg-card/80 p-6 shadow-[0_22px_60px_rgba(7,12,20,0.28)] backdrop-blur transition-all duration-300 hover:border-primary/40 hover:shadow-[0_32px_80px_rgba(7,12,20,0.35)]"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            custom={index}
            whileHover={{ translateY: -8 }}
          >
            <span
              aria-hidden
              className={`pointer-events-none absolute inset-x-7 top-0 h-px bg-gradient-to-r ${card.gradient}`}
            />
            <CardContent card={card} index={index} />
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

type TechCardProps = {
  card: (typeof cards)[number];
  index: number;
};

function CardContent({ card, index }: TechCardProps) {
  return (
    <>
      <header className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-foreground/45">Capability {String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-3 text-xl font-semibold text-foreground sm:text-2xl">{card.title}</h3>
        </div>
        <span className="rounded-full border border-white/10 bg-secondary/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.26em] text-foreground/60">
          Core
        </span>
      </header>

      <p className="mt-4 text-sm leading-relaxed text-foreground/70">{card.description}</p>

      <div className="relative z-10 mt-6 flex flex-wrap gap-2">
        {card.techs.map((tech) => (
          <Tooltip key={tech}>
            <TooltipTrigger asChild>
              <span className="inline-flex">
                <Badge
                  variant="outline"
                  className="border-white/15 bg-secondary/50 px-3 py-1 text-xs font-medium text-foreground/80 transition-colors duration-200 hover:border-primary/40 hover:bg-secondary/70 hover:text-foreground"
                >
                  {tech}
                </Badge>
              </span>
            </TooltipTrigger>
            <TooltipContent sideOffset={6} className="max-w-[220px] text-xs leading-relaxed">
              {techInfo[tech] ?? `About ${tech}`}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </>
  );
}
