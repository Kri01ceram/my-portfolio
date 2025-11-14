"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Section from "@/components/section";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cards, techInfo, techLogos } from "@/lib/tech";

export default function TechStackSection() {
  const floatVariants = useMemo(
    () => [
      {
        animate: { y: [-6, 6, -6], rotate: [-1, 1, -1] },
        transition: { duration: 10, repeat: Infinity, ease: [0.6, 0, 0.4, 1] as const },
      },
      {
        animate: { y: [-4, 4, -4], rotate: [0.5, -0.5, 0.5] },
        transition: { duration: 12, repeat: Infinity, ease: [0.6, 0, 0.4, 1] as const },
      },
      {
        animate: { y: [-8, 5, -8], rotate: [-0.8, 0.8, -0.8] },
        transition: { duration: 9, repeat: Infinity, ease: [0.6, 0, 0.4, 1] as const },
      },
    ],
    []
  );

  return (
    <Section id="tech" title="Tech Stack" subtitle="Tools I use to ship">
      <div className="relative mt-6 md:mt-10">
        <div className="relative overflow-hidden rounded-[36px] border border-white/8 bg-card/75 px-5 py-6 shadow-[0_30px_80px_rgba(6,10,16,0.55)] sm:px-7 sm:py-8">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.06),transparent_55%),radial-gradient(circle_at_78%_28%,rgba(0,255,255,0.12),transparent_60%),radial-gradient(circle_at_50%_90%,rgba(0,0,0,0.45),transparent_65%)] opacity-80"
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 via-transparent to-transparent" aria-hidden />

          {/* Mobile carousel */}
          <div className="relative -mx-5 mb-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:hidden">
            {cards.map((card, index) => {
              const animation = floatVariants[index % floatVariants.length];
              return (
                <motion.article
                  key={card.title}
                  className="group relative isolate flex min-w-[82%] max-w-[82%] snap-start flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-card/85 p-4 shadow-[0_18px_44px_rgba(7,12,20,0.45)] transition-all duration-400 hover:border-primary/40 hover:bg-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  animate={animation.animate}
                  transition={animation.transition}
                >
                  <CardContent card={card} index={index} />
                </motion.article>
              );
            })}
          </div>

          {/* Desktop grid */}
          <div className="relative hidden flex-wrap items-stretch gap-5 sm:flex xl:gap-6">
            {cards.map((card, index) => {
              const animation = floatVariants[index % floatVariants.length];
              return (
                <motion.article
                  key={card.title}
                  className="group relative isolate flex w-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-card/80 p-5 shadow-[0_22px_50px_rgba(7,12,20,0.45)] transition-all duration-400 hover:border-primary/45 hover:bg-card sm:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  animate={animation.animate}
                  transition={animation.transition}
                >
                  <CardContent card={card} index={index} />
                </motion.article>
              );
            })}
          </div>
        </div>
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
      <header className="relative z-10 flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-secondary/70">
            <span className="text-sm font-semibold text-foreground/80">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground sm:text-xl">{card.title}</h3>
            <div className="mt-1 flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-foreground/45">
              <span className="inline-flex h-1 w-1 rounded-full bg-primary/70" />
              Stack
            </div>
          </div>
        </div>
        <span className="rounded-full border border-white/10 bg-secondary/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.28em] text-foreground/60">Live</span>
      </header>

      <div className="relative z-10 grid grid-cols-2 gap-3 pt-4">
        {card.techs.map((tech) => {
          const logo = techLogos[tech];
          return (
            <Tooltip key={tech}>
              <TooltipTrigger asChild>
                <motion.div
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 160, damping: 20 }}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-secondary/60 px-3 py-2 transition duration-300 hover:border-primary/45 hover:bg-secondary/80"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/80">
                    {logo ? (
                      <Image src={logo} alt={tech} width={20} height={20} className="h-5 w-5 object-contain" />
                    ) : (
                      <span className="text-xs font-semibold text-foreground/70">{tech.charAt(0)}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground/90">{tech}</p>
                  </div>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent sideOffset={6}>{techInfo[tech] ?? `About ${tech}`}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </>
  );
}
