"use client";

import { useRef, useState } from "react";
import { VOICES } from "@/lib/brand";
import { StickyNote } from "./StickyNote";

const SPOTS = [
  "left-[3%] top-[3%] lg:left-[3%] lg:top-[9%]",
  "right-[3%] top-[18%] lg:left-[27%] lg:right-auto lg:top-[3%]",
  "left-[5%] top-[35%] lg:left-[51%] lg:top-[11%]",
  "right-[4%] top-[52%] lg:right-[3%] lg:top-[4%]",
  "left-[4%] top-[68%] lg:left-[15%] lg:top-[54%]",
  "right-[5%] top-[83%] lg:left-[60%] lg:right-auto lg:top-[56%]",
];
const TILT = [-6, 4, -3, 7, 3, -5];

/** What people posted after visiting: short quotes from creator reels, on notes you can move around. */
export function Voices() {
  const board = useRef<HTMLDivElement>(null);
  const [z, setZ] = useState(VOICES.map((_, i) => i + 1));
  const lift = (i: number) => setZ((p) => p.map((v, k) => (k === i ? Math.max(...p) + 1 : v)));

  return (
    <section aria-labelledby="voices-title" className="relative px-4 pb-28 pt-10 sm:px-6">
      <div className="mx-auto max-w-[1320px]">
        <p className="font-hand text-2xl text-note-yellow">overheard on the internet</p>
        <h2 id="voices-title" className="mt-2 font-display text-[clamp(2.2rem,5vw,4.4rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-paper">
          People keep posting about it.
        </h2>
        <div ref={board} className="relative mt-10 h-[1100px] rounded-[28px] border border-dashed border-paper/15 sm:h-[900px] lg:h-[620px]">
          {VOICES.map((v, i) => (
            <StickyNote key={i} color={v.color} rotate={TILT[i]} className={SPOTS[i]} size="lg" bounds={board} z={z[i]} onLift={() => lift(i)} sign={v.by} delay={i * 0.06}>
              &ldquo;{v.quote}&rdquo;
            </StickyNote>
          ))}
          <p className="pointer-events-none absolute bottom-5 right-6 font-hand text-lg text-paper/40">go on, move them around</p>
        </div>
      </div>
    </section>
  );
}
