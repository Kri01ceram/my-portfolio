"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Section from "@/components/section";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cards, techInfo, techLogos } from "@/lib/tech";

const BG_GRADIENTS = [
  "from-cyan-500/35 via-transparent to-fuchsia-500/35",
  "from-fuchsia-600/30 via-transparent to-violet-500/30",
  "from-cyan-400/30 via-transparent to-blue-500/30",
];

export default function TechStackSection() {
  const layers = useMemo(
    () =>
      Array.from({ length: 3 }).map((_, i) => ({
        id: i,
        className: `absolute inset-0 rounded-[42px] bg-gradient-to-br ${BG_GRADIENTS[i]} blur-3xl opacity-60 mix-blend-screen`,
      })),
    []
  );

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
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-[46px] border border-white/8 bg-gradient-to-br from-white/12 via-white/6 to-transparent [box-shadow:0_10px_60px_rgba(0,255,255,0.12)]" aria-hidden />
        <div className="absolute inset-0 -z-20 rounded-[46px] bg-gradient-to-br from-cyan-500/15 via-transparent to-fuchsia-500/15 blur-2xl" aria-hidden />
        {layers.map((l) => (
          <div key={l.id} className={l.className} aria-hidden />
        ))}

        <div className="relative overflow-hidden rounded-[40px] border border-white/12 bg-white/[0.02] px-5 py-6 sm:px-7 sm:py-8 backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(0,255,255,0.18),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(255,0,255,0.16),transparent_60%),radial-gradient(circle_at_60%_85%,rgba(151,71,255,0.18),transparent_60%)] opacity-80" aria-hidden />
          <div className="absolute inset-6 hidden rounded-[36px] border border-white/8 bg-white/[0.02] shadow-[0_60px_120px_-60px_rgba(0,255,255,0.25)] sm:block" aria-hidden />

          {/* Mobile carousel */}
          <div className="relative -mx-5 mb-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:hidden">
            {cards.map((card, index) => {
              const animation = floatVariants[index % floatVariants.length];
              return (
                <motion.article
                  key={card.title}
                  className="group relative isolate flex min-w-[82%] max-w-[82%] snap-start flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-2xl transition-all duration-400 hover:border-cyan-300/60 hover:shadow-[0_40px_60px_-45px_rgba(0,255,255,0.65)]"
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
                  className="group relative isolate flex w-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-3xl transition-all duration-400 hover:border-cyan-300/60 hover:shadow-[0_50px_70px_-45px_rgba(0,255,255,0.7)] sm:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  animate={animation.animate}
                  transition={animation.transition}
                >
                  <div className="absolute inset-x-8 top-0 h-24 rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
                  <div className="absolute -left-16 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-cyan-400/18 blur-3xl transition-all duration-500 group-hover:translate-x-6" aria-hidden />
                  <div className="absolute -right-16 top-0 h-40 w-40 rounded-full bg-fuchsia-500/22 blur-3xl transition-all duration-500 group-hover:-translate-y-4" aria-hidden />
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
      <header className="relative z-10 flex items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-inner shadow-white/30">
            <span className="text-lg font-semibold text-cyan-200">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white sm:text-xl">{card.title}</h3>
            <div className="mt-1 flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-white/45">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
              Stack
            </div>
          </div>
        </div>
        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.28em] text-white/70">Live</span>
      </header>

      <div className="relative z-10 grid grid-cols-2 gap-3 pt-2">
        {card.techs.map((tech) => {
          const logo = techLogos[tech];
          return (
            <Tooltip key={tech}>
              <TooltipTrigger asChild>
                <motion.div
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 160, damping: 20 }}
                  className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition duration-300 hover:border-cyan-400/70 hover:bg-white/[0.1] hover:shadow-[0_25px_45px_-30px_rgba(0,255,255,0.75)]"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 shadow-inner shadow-cyan-400/40">
                    {logo ? (
                      <Image src={logo} alt={tech} width={24} height={24} className="h-6 w-6 object-contain" />
                    ) : (
                      <span className="text-sm font-semibold text-cyan-200">{tech.charAt(0)}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white/90">{tech}</p>
                  </div>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent sideOffset={6}>{techInfo[tech] ?? `About ${tech}`}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/15 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-80" aria-hidden />
    </>
  );
}
