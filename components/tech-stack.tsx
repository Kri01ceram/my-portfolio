"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Section from "@/components/section";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cards, techInfo, techLogos } from "@/lib/tech";

const BG_GRADIENTS = [
  "from-cyan-500/40 via-transparent to-fuchsia-500/40",
  "from-fuchsia-600/35 via-transparent to-cyan-400/40",
  "from-cyan-400/35 via-transparent to-violet-500/35",
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

  return (
    <Section id="tech" title="Tech Stack" subtitle="Tools I use to ship">
      <div className="relative mt-4 md:mt-8">
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-[46px] border border-white/5 bg-gradient-to-br from-white/10 via-white/5 to-transparent [box-shadow:0_10px_60px_rgba(0,255,255,0.08)]" aria-hidden />
        <div className="absolute inset-0 -z-20 rounded-[46px] bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10 blur-2xl" aria-hidden />
        {layers.map((l) => (
          <div key={l.id} className={l.className} aria-hidden />
        ))}

        <div className="relative rounded-[40px] border border-white/10 bg-white/[0.02] p-5 sm:p-8 backdrop-blur-xl">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((card, index) => (
              <motion.article
                key={card.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-4 sm:p-6 backdrop-blur-2xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_40px_60px_-45px_rgba(0,255,255,0.65)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute inset-x-8 top-0 h-24 rounded-full bg-gradient-to-br from-white/12 via-transparent to-transparent blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
                <header className="relative z-10 flex items-center gap-3 pb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-inner shadow-white/30">
                    <span className="text-lg font-semibold text-cyan-200">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white sm:text-xl">{card.title}</h3>
                  </div>
                </header>

                <div className="relative z-10 grid grid-cols-2 gap-3 pt-2 sm:grid-cols-2">
                  {card.techs.map((tech) => {
                    const logo = techLogos[tech];
                    return (
                      <Tooltip key={tech}>
                        <TooltipTrigger asChild>
                          <motion.div
                            whileHover={{ y: -4, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 150, damping: 22 }}
                            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition duration-300 hover:border-cyan-400/60 hover:bg-white/[0.08] hover:shadow-[0_20px_35px_-25px_rgba(0,255,255,0.7)]"
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
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
