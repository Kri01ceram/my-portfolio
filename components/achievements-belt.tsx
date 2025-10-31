"use client";

import { achievements } from "@/lib/achievements";
import type { Achievement } from "@/lib/achievements";
import { ExternalLink } from "lucide-react";
import { useMemo } from "react";

/*
  AchievementsBelt: A looping horizontal conveyor that shows titles by default.
  - On hover of the belt, animation pauses.
  - On hover of an item, its details slide down from the title and a proof link appears.
*/
export default function AchievementsBelt({ items = achievements }: { items?: Achievement[] }) {
  const loop = useMemo(() => {
    // Duplicate items to create a seamless loop
    return [...items, ...items];
  }, [items]);

  return (
    <div className="relative overflow-hidden">
      <div
        className="group relative"
        // grouping container to pause animation on hover
      >
        <div
          className="flex gap-4 sm:gap-6 items-stretch [animation:marquee_linear_infinite] hover:[animation-play-state:paused]"
          style={{
            // CSS var not needed; duration fixed for simplicity
            // Tailwind can't define keyframes inline; we rely on a global keyframe name 'marquee'
          }}
        >
          {loop.map((a, i) => (
            <div key={`${a.id}-${i}`} className="shrink-0 w-[280px] sm:w-[320px]">
              <div className="group/item rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-semibold text-slate-900 truncate">{a.title}</div>
                  {a.link && (
                    <a
                      href={a.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="opacity-70 hover:opacity-100 transition"
                      aria-label="Originality / proof link"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                {(a.description || a.date) && (
                  <div className="overflow-hidden max-h-0 group-hover/item:max-h-24 transition-[max-height] duration-400 ease-out">
                    <div className="pt-1 text-xs text-slate-600 -translate-y-1 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-y-0 transition duration-400 ease-out">
                      <div className="text-[11px] text-slate-500">{a.date}</div>
                      <div className="mt-0.5 leading-relaxed">{a.description}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Keyframes definition */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .[animation\\:marquee_linear_infinite] {
          animation-name: marquee;
          animation-duration: 28s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}
