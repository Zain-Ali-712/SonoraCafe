"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { Starfield } from "./Starfield";

const MOON = {
  background: [
    "radial-gradient(circle at 62% 30%, rgb(176 166 134 / 0.4) 0 6%, transparent 9%)",
    "radial-gradient(circle at 38% 62%, rgb(176 166 134 / 0.32) 0 9%, transparent 13%)",
    "radial-gradient(circle at 70% 66%, rgb(176 166 134 / 0.28) 0 4%, transparent 7%)",
    "radial-gradient(circle at 30% 30%, rgb(176 166 134 / 0.22) 0 3%, transparent 6%)",
    "radial-gradient(circle at 34% 32%, #fffdf3 0%, #f3ebcf 42%, #dcd0a8 72%, #b8ab84 100%)",
  ].join(","),
  boxShadow:
    "inset -22px -14px 36px rgb(30 30 70 / 0.5), 0 0 60px 16px rgb(255 244 210 / 0.25), 0 0 180px 70px rgb(150 165 255 / 0.12)",
};

/**
 * Sonora is open till 1 AM, so the page falls into a deep night sky: a short dusk,
 * a lit moon and a real 3D starfield that stays behind everything after dark.
 */
export function AfterDark({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-moon]",
        { yPercent: 120, scale: 0.85 },
        { yPercent: -30, scale: 1, ease: "none", scrollTrigger: { trigger: "[data-dusk]", start: "top bottom", end: "bottom top", scrub: true } },
      );
      gsap.fromTo(
        "[data-dusk-line]",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: "[data-dusk]", start: "center 75%" } },
      );
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative bg-night text-paper">
      {/* stars follow you through the whole night section */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="sticky top-0 h-[100svh] w-full">
          <Starfield className="h-full w-full" />
          <span className="shooting-star left-[18%] top-[14%] [animation-delay:3s]" />
          <span className="shooting-star left-[62%] top-[8%] [animation-delay:11s]" />
        </div>
      </div>

      <div
        data-dusk
        className="relative flex h-[90vh] min-h-[520px] items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, var(--color-paper) 0%, #dccbcf 9%, #9a8fbd 21%, #4a4688 34%, #1b1c4d 48%, rgb(8 9 31 / 0.9) 64%, rgb(8 9 31 / 0) 100%)",
        }}
      >
        <div
          data-moon
          aria-hidden
          className="absolute right-[12%] top-[30%] size-[clamp(84px,11vw,170px)] rounded-full"
          style={MOON}
        />
        <p data-dusk-line className="relative mt-[18vh] max-w-[18ch] px-6 text-center font-hand text-[clamp(2rem,5vw,4rem)] leading-[1.05] text-paper">
          8 PM. the bar starts to glow.
        </p>
      </div>

      {/* faint glass-block glow rising from below */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[70vh] h-[80vh] bg-[radial-gradient(50%_40%_at_50%_50%,rgb(61_139_255/0.14),transparent_75%)]" />

      <div className="relative">{children}</div>

      <div
        aria-hidden
        className="relative h-[45vh] min-h-[280px]"
        style={{ background: "linear-gradient(180deg, rgb(8 9 31 / 0) 0%, #232766 38%, #8f86bb 68%, #dccbcf 86%, var(--color-paper) 100%)" }}
      />
    </div>
  );
}
