"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform, type PanInfo } from "motion/react";
import { ArrowRight } from "lucide-react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { HAPPENINGS, POSTERS } from "@/lib/brand";
import { LoopVideo } from "@/components/media/LoopVideo";

const TILT = [-4, 3, -2, 5, -6];

/** Sonora's real event posters, stacked like they are pinned at the counter. Fling the top one to see the next. */
function PosterDeck() {
  const [order, setOrder] = useState(POSTERS.map((_, i) => i));
  const x = useMotionValue(0);
  const rot = useTransform(x, [-300, 300], [-18, 18]);
  const deck = useRef<HTMLDivElement>(null);
  const hold = useRef(false);
  const busy = useRef(false);

  const next = (dir = 1) => {
    if (busy.current) return;
    busy.current = true;
    animate(x, dir * 520, { duration: 0.45, ease: [0.4, 0, 1, 1] }).then(() => {
      setOrder((o) => [...o.slice(1), o[0]]);
      x.jump(0);
      busy.current = false;
    });
  };

  // Auto-advance like a slow slideshow; pauses on hover, while dragging and when off screen.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let inView = false;
    const io = new IntersectionObserver(([e]) => (inView = e.isIntersecting), { threshold: 0.3 });
    if (deck.current) io.observe(deck.current);
    const id = window.setInterval(() => {
      if (inView && !hold.current && !document.hidden) next(1);
    }, 4500);
    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 110 || Math.abs(info.velocity.x) > 600) next(Math.sign(info.offset.x || 1));
    else animate(x, 0, { type: "spring", stiffness: 300, damping: 26 });
  };

  return (
    <div
      ref={deck}
      className="relative mx-auto w-full max-w-[440px]"
      onPointerEnter={() => (hold.current = true)}
      onPointerLeave={() => (hold.current = false)}
    >
      <div className="relative aspect-[4/5]">
        {order
          .slice(0, 4)
          .reverse()
          .map((idx, k, arr) => {
            const depth = arr.length - 1 - k; // 0 = top
            const p = POSTERS[idx];
            const top = depth === 0;
            return (
              <motion.div
                key={idx}
                className="absolute inset-0 touch-pan-y"
                style={top ? { x, rotate: rot, zIndex: 10 } : { zIndex: 10 - depth }}
                animate={top ? undefined : { scale: 1 - depth * 0.05, y: depth * 18, rotate: TILT[idx] }}
                initial={false}
                transition={{ type: "spring", stiffness: 200, damping: 24 }}
                drag={top ? "x" : false}
                dragSnapToOrigin={false}
                onDragEnd={top ? onEnd : undefined}
                whileDrag={{ cursor: "grabbing", scale: 1.02 }}
              >
                <div className={`relative h-full w-full overflow-hidden rounded-[18px] bg-paper shadow-[0_40px_60px_-30px_rgb(0_0_0/0.8)] ring-1 ring-white/20 ${top ? "cursor-grab" : ""}`}>
                  <Image src={p.src} alt={top ? p.alt : ""} fill sizes="440px" className="pointer-events-none object-cover" draggable={false} />
                </div>
              </motion.div>
            );
          })}
      </div>
      <div className="mt-8 flex items-center justify-between">
        <p className="font-hand text-lg text-lilac">flips on its own · fling to skip</p>
        <button
          type="button"
          onClick={() => next(1)}
          className="group inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-note-yellow"
        >
          Next poster
          <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

export function Happenings() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-hap]", {
        x: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-haps]", start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="happenings" aria-labelledby="hap-title" className="relative px-4 pb-24 pt-10 text-paper sm:px-6 lg:pb-36">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-16 max-w-3xl">
          <p className="font-hand text-2xl text-note-yellow">something&apos;s always on</p>
          <h2 id="hap-title" className="mt-2 font-display text-[clamp(2.6rem,6.4vw,5.8rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
            Sundays at Sonora.
            <span className="block text-lilac">And most other days.</span>
          </h2>
        </div>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <PosterDeck />
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-6 sm:grid-cols-[1fr_200px]">
              <ul data-haps className="flex flex-col divide-y divide-paper/10 border-y border-paper/10">
                {HAPPENINGS.map((h) => (
                  <li key={h.title} data-hap className="group grid gap-1 py-6 sm:grid-cols-[150px_1fr] sm:gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="w-fit rounded-full bg-paper/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-note-yellow">
                        {h.tag}
                      </span>
                      <span className="text-[14px] text-paper/60">{h.when}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] transition-colors group-hover:text-note-pink">{h.title}</h3>
                      <p className="mt-1.5 max-w-md text-[15px] leading-relaxed text-paper/70">{h.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="hidden sm:block">
                <div className="arch sticky top-28 aspect-[3/4.4] ring-[5px] ring-paper/90">
                  <LoopVideo name="clip-paint" label="Guests painting at a Sonora session" />
                </div>
                <p className="mt-3 text-center font-hand text-lg text-paper/70">paint day, Oct</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
