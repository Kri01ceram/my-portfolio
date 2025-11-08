"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Section from "@/components/section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cards, techInfo } from "@/lib/tech";

export default function TechStackSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <Section id="tech" title="Tech Stack" subtitle="Tools I use to ship">
      <div className="mt-4 md:mt-6 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, idx) => {
          const isActive = hovered === idx;
          const isDimmed = hovered !== null && hovered !== idx;
          return (
            <motion.div
              key={c.title}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              animate={{
                y: isActive ? -2 : 0,
                scale: isActive ? 1.02 : isDimmed ? 0.985 : 1,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 26, mass: 0.7 }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className={isActive ? "[transform-origin:center]" : ""}
            >
              <Card className={`rounded-2xl group ${isActive ? "ring-1 ring-secondary" : ""}`}>
                <CardHeader className="border-b">
                  <CardTitle className="text-lg text-foreground">{c.title}</CardTitle>
                  <CardDescription className="text-xs text-foreground/60">Hover to view technologies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className={`overflow-hidden transition-[max-height] duration-400 ease-out ${
                      isActive ? "max-h-[420px]" : "max-h-0 group-hover:max-h-64"
                    }`}
                    aria-expanded={isActive}
                  >
                    <div
                      className={`${
                        isActive
                          ? "mt-3 grid grid-cols-2 gap-3 sm:gap-3.5"
                          : "mt-3 flex flex-wrap gap-2.5"
                      } opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 ${
                        isActive ? "opacity-100 translate-y-0" : ""
                      } transition duration-400 ease-out`}
                    >
                      {c.techs.map((t) => (
                        <Tooltip key={t}>
                          <TooltipTrigger asChild>
                            <motion.span
                              whileHover={{ y: -1, scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 140, damping: 24 }}
                              className={`${
                                isActive
                                  ? "inline-flex items-center gap-1.5 rounded-full border border-input px-3.5 py-2 text-[0.95rem] bg-card cursor-help transition-colors duration-200 hover:bg-secondary/30"
                                  : "inline-flex items-center gap-1 rounded-full border border-input px-3 py-1.5 text-sm bg-card cursor-help transition-colors duration-200 hover:bg-secondary/30"
                              }`}
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-foreground transition-colors" />
                              <span className="text-foreground">{t}</span>
                            </motion.span>
                          </TooltipTrigger>
                          <TooltipContent sideOffset={6}>{techInfo[t] ?? `About ${t}`}</TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
