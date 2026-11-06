"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { BRAND } from "@/lib/brand";

const ITEMS = ["coffee", "conversations", "& everything in between", BRAND.urdu, "paint", "play", "stay late"];

function Leaf() {
  return (
    <svg viewBox="0 0 24 24" className="mx-6 size-6 shrink-0 text-note-yellow sm:mx-10 sm:size-8" aria-hidden>
      <path d="M12 2c4 4 6 8 6 11a6 6 0 1 1-12 0c0-3 2-7 6-11Z" fill="currentColor" />
      <path d="M12 7v13" stroke="var(--color-berry)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** A tilted raspberry band (their Winter Specials card colour) that speeds up with scroll velocity. */
export function Ticker() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = root.current?.querySelector<HTMLElement>("[data-track]");
      if (!track) return;
      const loop = gsap.to(track, { xPercent: -50, duration: 42, ease: "none", repeat: -1 });
      if (prefersReducedMotion()) {
        loop.pause();
        return;
      }
      let target = 1;
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          target = gsap.utils.clamp(-6, 6, 1 + self.getVelocity() / 260) || 1;
          gsap.to(loop, { timeScale: target, duration: 0.25, overwrite: true });
          gsap.to(loop, { timeScale: target < 0 ? -1 : 1, duration: 1.6, delay: 0.25, ease: "power2.out" });
        },
      });
    },
    { scope: root },
  );

  const row = (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((t) => (
        <span key={t} className="flex items-center">
          <span
            className={
              t === BRAND.urdu
                ? "font-urdu text-[clamp(2rem,4.6vw,4rem)] leading-[1.6]"
                : "font-display text-[clamp(2.2rem,5.2vw,4.6rem)] font-semibold tracking-[-0.03em]"
            }
          >
            {t}
          </span>
          <Leaf />
        </span>
      ))}
    </div>
  );

  return (
    <div ref={root} className="relative z-10 -my-6 overflow-hidden py-10" aria-label={BRAND.tagline}>
      <div className="-rotate-2 scale-105 bg-berry py-3 text-paper shadow-[0_20px_40px_-20px_rgb(194_24_91/0.6)] sm:py-4">
        <div data-track className="flex w-max" aria-hidden>
          {row}
          {row}
        </div>
      </div>
    </div>
  );
}
