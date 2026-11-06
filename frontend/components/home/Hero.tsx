"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { ArrowDown, MapPin, Moon, Plus, Sun, Sunrise, Sunset } from "lucide-react";
import clsx from "clsx";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { BRAND } from "@/lib/brand";
import { Wreath } from "@/components/brand/Logo";
import { LoopVideo } from "@/components/media/LoopVideo";
import { useMoment } from "@/components/layout/useMoment";
import Image from "next/image";
import { StickyNote, type NoteColor } from "./StickyNote";
import { onIntroDone } from "./intro";

const LINE_1 = ["the", "community"];
const LINE_2 = ["café", "everyone", "can"];

const SEED_NOTES: { text: string; color: NoteColor; rotate: number; pos: string; sign?: string }[] = [
  {
    text: "coffee, conversations & everything in between",
    color: "yellow",
    rotate: -7,
    pos: "right-[3%] top-[640px] lg:right-auto lg:left-[44%] lg:top-[14%]",
  },
  {
    text: "Sundays at Sonora: a little art, a little music.",
    color: "pink",
    rotate: 6,
    pos: "hidden lg:block lg:right-[2%] lg:top-[56%]",
  },
  {
    text: "free coffee. yes, actually free. NCA & GCU · Sat 4–6",
    color: "green",
    rotate: -4,
    pos: "hidden lg:block lg:left-[50%] lg:top-[76%]",
  },
  {
    text: "there's a lot more to Sonora than what's on the menu",
    color: "blue",
    rotate: 4,
    pos: "hidden lg:block lg:right-[3%] lg:top-[15%]",
  },
];

const MINE_SLOTS = [
  "left-[4%] top-[440px] lg:left-[58%] lg:top-[42%]",
  "left-[30%] top-[560px] lg:left-[40%] lg:top-[60%]",
  "left-[8%] top-[680px] lg:left-[70%] lg:top-[78%]",
];
const MINE_COLORS: NoteColor[] = ["orange", "pink", "yellow"];
const STORE = "sonora-my-notes";

const PHASE_ICON = { morning: Sunrise, day: Sun, evening: Sunset, late: Moon, closed: Moon };

function useDepth(mx: MotionValue<number>, my: MotionValue<number>, dx: number, dy: number) {
  return {
    x: useTransform(mx, (v) => v * dx),
    y: useTransform(my, (v) => v * dy),
  };
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [z, setZ] = useState<number[]>([1, 2, 3, 4, 5, 6, 7]);
  const [mine, setMine] = useState<string[]>([]);
  const [writing, setWriting] = useState(false);
  const [draft, setDraft] = useState("");
  const moment = useMoment();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });
  const back = useDepth(mx, my, -16, -12);
  const main = useDepth(mx, my, 10, 8);
  const front = useDepth(mx, my, 28, 20);
  const tilt = useTransform(mx, (v) => v * 4);

  useEffect(() => onIntroDone(() => setReady(true)), []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        const s = JSON.parse(localStorage.getItem(STORE) || "[]");
        if (Array.isArray(s)) setMine(s.filter((x) => typeof x === "string").slice(-3));
      } catch {}
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const lift = (i: number) => setZ((prev) => prev.map((v, k) => (k === i ? Math.max(...prev) + 1 : v)));

  const pin = (e: React.FormEvent) => {
    e.preventDefault();
    const t = draft.trim().slice(0, 70);
    if (!t) return;
    const next = [...mine, t].slice(-3);
    setMine(next);
    setDraft("");
    setWriting(false);
    try {
      localStorage.setItem(STORE, JSON.stringify(next));
    } catch {}
  };

  useGSAP(
    () => {
      if (!ready) return;
      const reduce = prefersReducedMotion();
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo("[data-word]", { y: 0, yPercent: 115, rotate: 4 }, { y: 0, yPercent: 0, rotate: 0, duration: 1.5, stagger: 0.06 }, 0)
        .fromTo("[data-arch]", { y: 140, opacity: 0, scale: 0.92 }, { y: 0, opacity: 1, scale: 1, duration: 1.8, stagger: 0.12 }, 0.1)
        .fromTo("[data-fade]", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.08 }, 0.55)
        .fromTo("[data-scribble]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, 1.0);
      if (reduce) tl.progress(1);

      if (reduce) return;
      // Desktop only: on phones the copy sits below the arches and is still being read.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.to("[data-hero-copy]", {
          yPercent: -18,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-arches]", {
          yPercent: 12,
          scale: 0.94,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root, dependencies: [ready] },
  );

  const PhaseIcon = moment ? PHASE_ICON[moment.phase] : Sun;

  return (
    <section
      ref={root}
      id="top"
      aria-label="Welcome to Sonora"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        rawX.set(((e.clientX - r.left) / r.width) * 2 - 1);
        rawY.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#4656bd] px-4 pb-14 pt-28 text-paper sm:px-6 lg:pt-28"
    >
      {/* Footer-style backdrop: Sonora periwinkle with their leaf wreath, kept quiet so the copy reads first */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(70% 60% at 85% 20%, rgb(120 138 222 / 0.55), transparent 70%), radial-gradient(60% 55% at 0% 100%, rgb(30 33 110 / 0.55), transparent 70%), linear-gradient(160deg, #5466cc 0%, #4656bd 45%, #3a47a6 100%)",
        }}
      />
      <Wreath className="pointer-events-none absolute -right-[16%] -top-[22%] -z-10 w-[85vw] max-w-[1150px] rotate-6 opacity-[0.11]" color="#fff" />
      <Wreath className="pointer-events-none absolute -bottom-[38%] -left-[24%] -z-10 w-[70vw] max-w-[900px] -rotate-[30deg] opacity-[0.07]" color="#fff" />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-16 right-[-4%] -z-10 select-none font-urdu text-[clamp(10rem,26vw,24rem)] leading-none text-white/[0.06]"
      >
        {BRAND.urdu}
      </span>

      <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-7">
        {/* Copy */}
        <div data-hero-copy className="relative z-10 lg:col-span-7 lg:row-start-1 lg:self-end">
          <p
            data-fade
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-[13px] font-medium text-paper ring-1 ring-white/20 opacity-0 backdrop-blur-sm"
          >
            <MapPin className="size-3.5 text-note-yellow" />
            {BRAND.addressShort} · Lahore
          </p>

          <h1 className="font-display text-[clamp(2.7rem,5.6vw,5.9rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-paper [text-shadow:0_2px_30px_rgb(20_24_80/0.25)]">
            <span className="sr-only">The community café everyone can call their own.</span>
            <span aria-hidden className="block">
              {LINE_1.map((w) => (
                <span key={w} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0">
                  <span data-word className="inline-block" style={{ transform: "translateY(115%)" }}>
                    {w}
                  </span>
                </span>
              ))}
            </span>
            <span aria-hidden className="block">
              {LINE_2.map((w) => (
                <span key={w} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <span data-word className="inline-block" style={{ transform: "translateY(115%)" }}>
                    {w}
                  </span>
                </span>
              ))}
            </span>
            <span aria-hidden className="block">
              <span className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                <span data-word className="inline-block" style={{ transform: "translateY(115%)" }}>
                  call
                </span>
              </span>
              <span className="relative inline-block w-fit text-note-yellow">
                <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <span
                    data-word
                    style={{ transform: "translateY(115%)" }}
                    className="inline-block font-hand font-normal tracking-[-0.02em]"
                  >
                    their own.
                  </span>
                </span>
                <svg
                  viewBox="0 0 420 40"
                  className="absolute -bottom-[0.06em] left-0 h-[0.32em] w-full overflow-visible"
                  fill="none"
                  aria-hidden
                >
                  <path
                    data-scribble
                    pathLength={1}
                    d="M4 26 C 90 8, 190 34, 282 18 S 390 10, 414 22"
                    stroke="var(--color-note-pink)"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray="1"
                    strokeDashoffset="1"
                  />
                </svg>
              </span>
            </span>
          </h1>
        </div>

        {/* Arches */}
        <div className="relative lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-center">
          <div data-hero-arches className="relative mx-auto aspect-[1/1.08] w-full max-w-[540px] [perspective:1200px]">
            <motion.div style={back} className="absolute left-0 top-0 w-[44%]">
              <div data-arch className="opacity-0">
                <div className="arch relative aspect-[3/4.3] w-full shadow-[0_30px_60px_-30px_rgb(10_12_50/0.7)] ring-[6px] ring-paper">
                  <Image
                    src="/img/space-wall-hd.webp"
                    alt="Sonora's wall of signed cups and sticky notes"
                    fill
                    priority
                    sizes="(min-width: 1024px) 240px, 44vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-2 text-center font-hand text-[17px] text-paper/80">the cup wall ↑</p>
              </div>
            </motion.div>

            <motion.div style={{ ...main, rotateY: tilt }} className="absolute right-0 top-[8%] w-[62%]">
              <div data-arch className="opacity-0">
                <div className="arch aspect-[3/4.25] w-full bg-night shadow-[0_50px_90px_-40px_rgb(10_12_50/0.8)] ring-[8px] ring-paper">
                  <LoopVideo
                    name="reel-space"
                    priority
                    label="Inside Sonora: the glowing glass-block bar, the backlit leaf arch and the private cinema"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div style={front} className="absolute bottom-[2%] left-[10%] w-[36%]">
              <div data-arch className="opacity-0">
                <div className="arch aspect-[3/4] w-full shadow-[0_40px_70px_-30px_rgb(30_33_71/0.7)] ring-[6px] ring-paper">
                  <LoopVideo name="reel-sundays" priority label="Sundays at Sonora: painting, sketching and live guitar" />
                </div>
              </div>
            </motion.div>

            <span className="absolute -right-1 bottom-[4%] hidden rotate-[-5deg] font-hand text-xl text-note-yellow sm:block" data-fade>
              sundays ↙
            </span>
          </div>

          {/* Pin your own note */}
          <div data-fade className="relative z-20 mt-6 flex justify-center opacity-0 lg:justify-end">
            {writing ? (
              <form
                onSubmit={pin}
                className="flex w-full max-w-sm items-center gap-2 rounded-full bg-white/80 p-1.5 pl-4 shadow-lg ring-1 ring-ink/10"
              >
                <label htmlFor="note" className="sr-only">
                  Your note for the wall
                </label>
                <input
                  id="note"
                  autoFocus
                  maxLength={70}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="write something for the wall…"
                  className="min-w-0 flex-1 bg-transparent font-hand text-lg text-ink outline-none placeholder:text-ink/40"
                />
                <button type="submit" className="rounded-full bg-berry px-4 py-2 text-sm font-semibold text-paper">
                  Pin it
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setWriting(true)}
                className="group inline-flex items-center gap-2 rounded-full bg-note-yellow px-5 py-2.5 font-hand text-lg text-ink shadow-[0_10px_20px_-10px_rgb(30_33_71/0.5)] transition-transform hover:-rotate-2 hover:scale-105"
              >
                <Plus className="size-4 transition-transform duration-500 group-hover:rotate-90" />
                pin your own note
              </button>
            )}
          </div>
        </div>

        <div data-hero-copy className="relative z-10 lg:col-span-7 lg:row-start-2 lg:-mt-4">
          <p data-fade className="max-w-[34rem] text-pretty text-[17px] leading-relaxed text-paper/90 opacity-0 sm:text-lg">
            Coffee, conversations &amp; everything in between. Paint on Sundays, jam in the corner, a private cinema down the hall, and a
            whole wall of sticky notes left by everyone who&apos;s pulled up a chair.
          </p>

          <div data-fade className="mt-8 flex flex-wrap items-center gap-3 opacity-0">
            <a
              href="#happenings"
              className="group inline-flex items-center gap-2 rounded-full bg-note-yellow px-6 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:bg-paper"
            >
              See what&apos;s on
              <ArrowDown className="size-4 transition-transform duration-500 group-hover:translate-y-0.5" />
            </a>
            <a
              href="#visit"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold text-paper ring-1 ring-white/35 transition-colors hover:bg-white/10"
            >
              Find us on Ghalib Road
            </a>
          </div>

          {/* Live: what is happening at Sonora right now (Lahore time) */}
          <div data-fade className="terrazzo mt-8 flex max-w-md items-center gap-4 rounded-2xl p-4 pr-5 text-ink shadow-[0_20px_40px_-24px_rgb(10_12_50/0.7)] opacity-0">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ink text-note-yellow">
              <PhaseIcon className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-2/70">
                Right now at Sonora {moment && <span className="tabular-nums text-berry">· {moment.clock}</span>}
              </p>
              <p className="mt-0.5 text-[15px] font-medium leading-snug text-ink">
                {moment ? moment.now : "Open every day, 8 AM till 1 AM."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Draggable notes across the whole hero */}
      {SEED_NOTES.map((n, i) => (
        <StickyNote
          key={n.text}
          color={n.color}
          rotate={n.rotate}
          className={n.pos}
          bounds={root}
          z={10 + z[i]}
          onLift={() => lift(i)}
          show={ready}
          delay={1.1 + i * 0.12}
        >
          {n.text}
        </StickyNote>
      ))}
      {mine.map((t, i) => (
        <StickyNote
          key={`${i}-${t}`}
          color={MINE_COLORS[i % MINE_COLORS.length]}
          rotate={i % 2 ? 5 : -5}
          className={MINE_SLOTS[i % MINE_SLOTS.length]}
          bounds={root}
          z={10 + z[4 + i]}
          onLift={() => lift(4 + i)}
          show={ready}
          sign="you"
        >
          {t}
        </StickyNote>
      ))}

      <a
        href="#third-space"
        data-fade
        className={clsx(
          "absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[12px] font-medium uppercase tracking-[0.2em] text-paper/70 opacity-0 lg:flex",
        )}
      >
        <span className="flex h-10 w-6 justify-center rounded-t-full rounded-b-md border border-white/40 pt-2">
          <span className="h-2 w-0.5 animate-bounce rounded-full bg-white/70" />
        </span>
        scroll, slowly
      </a>
    </section>
  );
}
