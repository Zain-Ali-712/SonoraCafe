"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { NOTE_BG, type NoteColor } from "./StickyNote";

type Cell =
  | { k: "photo"; src: string; alt: string; stuck?: { text: string; color: NoteColor } }
  | { k: "cup"; text: string; ink?: string }
  | { k: "note"; text: string; color: NoteColor };

const cup = (n: number, stuck?: { text: string; color: NoteColor }): Cell => ({
  k: "photo",
  src: `/img/wall/cup${String(n).padStart(2, "0")}.webp`,
  alt: "A paper cup signed and doodled on by a guest, in one of Sonora's cubbies",
  stuck,
});
const photo = (name: string, alt: string): Cell => ({ k: "photo", src: `/img/wall/${name}.webp`, alt });
const NOTES_A = photo("notes-a", "Neon sticky notes covering the cubbies");
const NOTES_B = photo("notes-b", "Sticky notes stuck between signed cups");
const NOTES_C = photo("notes-c", "A corner of the sticky-note wall");
const LAMP_A = photo("lamp-a", "Glowing cup lamps on the wall");
const LAMP_B = photo("lamp-b", "Coloured cup lamps casting light upward");

// Real cups and notes cropped from photos of the wall; only a few drawn ones mixed in.
const ROWS: Cell[][] = [
  [cup(1), cup(5), NOTES_A, cup(9), cup(2, { text: "hi sonora ♡", color: "yellow" }), LAMP_A, cup(7), { k: "cup", text: "sunday regular", ink: "var(--color-peri)" }, cup(11), NOTES_B, cup(4), cup(10), cup(6), cup(12)],
  [cup(3), NOTES_C, cup(8), cup(12), { k: "note", text: "coffee is just an excuse ☺", color: "pink" }, cup(1), LAMP_B, cup(5, { text: "see you sunday!!", color: "green" }), cup(9), NOTES_A, cup(2), cup(7), cup(11), cup(4)],
  [NOTES_B, cup(10), cup(4), cup(6, { text: "paint day ✿", color: "orange" }), cup(3), cup(8), { k: "cup", text: "late night crew", ink: "var(--color-berry)" }, NOTES_C, cup(12), LAMP_A, cup(1), cup(5), cup(9), cup(2)],
];

/** Hand-drawn cup, used sparingly between the real ones. */
function DrawnCup({ text, ink = "var(--color-cup)" }: { text: string; ink?: string }) {
  return (
    <div className="flex h-full items-end justify-center pb-[10%]">
      <div className="relative w-[64%] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 group-hover:-rotate-3">
        <svg viewBox="0 0 60 80" className="w-full drop-shadow-[0_8px_6px_rgb(40_25_10/0.35)]" aria-hidden>
          <path d="M5 6h50l-6.5 72h-37z" fill="#fbf8f2" />
          <ellipse cx="30" cy="6" rx="25" ry="3.2" fill="#e9e2d6" />
          <path d="M8 40c8-6 14 6 22-2s14 4 22-1" stroke={ink} strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </svg>
        <span className="absolute inset-x-[-12%] top-[24%] -rotate-6 text-center font-hand text-[14px] leading-none sm:text-[15px]" style={{ color: ink }}>
          {text}
        </span>
      </div>
    </div>
  );
}

function CellView({ c, i }: { c: Cell; i: number }) {
  return (
    <div className="group relative aspect-[2/3] w-[27vw] shrink-0 sm:w-[17vw] lg:w-[9.4vw] lg:max-w-[150px]">
      {/* the cubby: back wall + shadow from the shelf above */}
      <div className="absolute inset-0 overflow-hidden rounded-[2px] bg-gradient-to-b from-[#8e7a62] via-[#a8937a] to-[#b19c82]">
        {c.k === "photo" && (
          <Image
            src={c.src}
            alt={c.alt}
            fill
            sizes="(min-width: 1024px) 150px, (min-width: 640px) 17vw, 27vw"
            className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
          />
        )}
        {c.k === "cup" && <DrawnCup text={c.text} ink={c.ink} />}
        {c.k === "note" && (
          <div className="flex h-full items-center justify-center p-[12%]">
            <div
              className={clsx("note relative w-full p-2.5 text-[14px] leading-tight transition-transform duration-500 group-hover:-rotate-2 sm:text-[15px]", NOTE_BG[c.color])}
              style={{ rotate: `${(i % 5) - 2}deg` }}
            >
              {c.text}
            </div>
          </div>
        )}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 shadow-[inset_0_16px_18px_-8px_rgb(45_30_15/0.55),inset_9px_0_12px_-9px_rgb(45_30_15/0.45),inset_-9px_0_12px_-9px_rgb(45_30_15/0.45),inset_0_-4px_6px_-4px_rgb(255_245_225/0.35)]"
        />
      </div>
      {c.k === "photo" && c.stuck && (
        <div
          className={clsx("note absolute -bottom-2 -right-3 z-10 w-[78%] rotate-[6deg] p-2 text-[13px] leading-tight sm:text-[14px]", NOTE_BG[c.stuck.color])}
        >
          {c.stuck.text}
        </div>
      )}
    </div>
  );
}

/** Sonora's cubby wall, built from photos of the real thing; rows drift in opposite directions as you scroll. */
export function TheWall() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-row]").forEach((row, i) => {
        const dir = i % 2 ? 1 : -1;
        gsap.fromTo(
          row,
          { xPercent: dir > 0 ? -20 : -2 },
          { xPercent: dir > 0 ? -2 : -20, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 } },
        );
      });
      gsap.from("[data-wall-head] > *", {
        y: 60,
        opacity: 0,
        duration: 1.3,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-wall-head]", start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="the-wall" aria-labelledby="wall-title" className="relative overflow-hidden bg-paper-2 py-24 lg:py-32">
      <div data-wall-head className="mx-auto mb-14 flex max-w-[1320px] flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-hand text-2xl text-berry">the wall</p>
          <h2 id="wall-title" className="mt-2 max-w-[14ch] font-display text-[clamp(2.6rem,6.4vw,5.8rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-ink">
            Every cup on this wall has a name.
          </h2>
        </div>
        <div className="max-w-sm">
          <p className="text-[17px] leading-relaxed text-ink-2">
            Floor to ceiling, wooden cubbies hold the cups guests sign, and the gaps fill up with neon sticky notes. It&apos;s the
            most photographed corner in the café, and it&apos;s still growing.
          </p>
          <Link href="/the-wall" className="group mt-5 inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-berry decoration-2 underline-offset-[6px]">
            Leave yours on the wall
            <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
          </Link>
        </div>
      </div>

      {/* the cubby frame: pale taupe wood, thick shelves, thin dividers */}
      <div className="relative -rotate-[1.2deg] scale-[1.03] bg-gradient-to-b from-[#d3c4ad] via-[#c9b89f] to-[#bfad93] px-0 py-[14px] shadow-[0_40px_70px_-30px_rgb(60_40_20/0.55)]">
        <div className="flex flex-col gap-[16px]">
          {ROWS.map((row, r) => (
            <div key={r} data-row className="flex w-max gap-[11px] border-b-[3px] border-[#e2d6c2]/70 pb-0">
              {row.map((c, i) => (
                <CellView key={i} c={c} i={i + r} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
