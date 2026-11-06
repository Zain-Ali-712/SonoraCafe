"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { KITCHEN, WINTER_SPECIALS, pkr } from "@/lib/brand";
import { Wreath } from "@/components/brand/Logo";
import { LoopVideo } from "@/components/media/LoopVideo";

function Ribbon({ reverse = false, offset = 0 }: { reverse?: boolean; offset?: number }) {
  const items = [...WINTER_SPECIALS.slice(offset), ...WINTER_SPECIALS.slice(0, offset)];
  const run = (dup: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={dup || undefined}>
      {items.map((d) => (
        <span key={d.name} className="flex shrink-0 items-baseline gap-3 px-6 sm:px-8">
          <span className="font-hand uppercase tracking-wide">{d.name}</span>
          <span className="font-display text-[0.5em] font-semibold tabular-nums text-note-yellow">{d.price}</span>
          <span className="ml-6 text-[0.45em] text-paper/40 sm:ml-8">✿</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="flex w-max text-[clamp(2rem,4.8vw,4.3rem)] leading-none text-paper">
      <div className="marquee-track flex" style={{ ["--marquee-dur" as string]: "130s", animationDirection: reverse ? "reverse" : "normal" }}>
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}

/**
 * Winter Specials, straight off their raspberry card: hand-lettered drinks and prices drift
 * behind the espresso-pour window. One stage, no split columns.
 */
function Specials() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-pour]",
        { y: 90, rotate: -9, scale: 0.9 },
        { y: 0, rotate: -3, scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: 0.8 } },
      );
      gsap.fromTo(
        "[data-sticker]",
        { rotate: -30, scale: 0.7 },
        { rotate: 8, scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: 0.8 } },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} id="menu" aria-labelledby="specials-title" className="relative overflow-hidden bg-berry py-14 text-paper lg:py-16">
      <Wreath className="pointer-events-none absolute -left-[12%] -top-[40%] w-[60vw] max-w-[820px] opacity-[0.1]" color="#fff" />
      <Wreath className="pointer-events-none absolute -bottom-[45%] -right-[10%] w-[55vw] max-w-[760px] rotate-180 opacity-[0.08]" color="#fff" />

      <div className="relative px-4 text-center sm:px-6">
        <p className="font-hand text-xl text-note-yellow sm:text-2xl">on the counter this winter</p>
        <h2 id="specials-title" className="mt-1 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
          Warm cups, cold foam.
        </h2>
      </div>

      {/* stage */}
      <div className="relative mt-6 h-[min(470px,118vw)] sm:h-[min(470px,72vw)]">
        <div className="absolute inset-x-0 top-[22%] -rotate-2 opacity-95 hover:[&_.marquee-track]:[animation-play-state:paused]">
          <Ribbon />
        </div>
        <div className="absolute inset-x-0 top-[58%] rotate-1 opacity-95 hover:[&_.marquee-track]:[animation-play-state:paused]">
          <Ribbon reverse offset={5} />
        </div>

        <div data-pour className="absolute left-1/2 top-1/2 z-10 w-[min(250px,52vw)] -translate-x-1/2 -translate-y-1/2">
          <div className="arch aspect-[3/4.2] bg-night ring-[7px] ring-paper shadow-[0_50px_80px_-30px_rgb(60_0_25/0.75)]">
            <LoopVideo name="clip-pour" label="Espresso poured over cold milk in a Sonora cup" />
          </div>
          <div className="note absolute -right-[22%] top-[8%] w-[132px] rotate-6 bg-note-green p-3 text-[17px] leading-tight sm:-right-[30%]">
            Spanish latte · Rs 750
          </div>
          <div data-sticker className="absolute -bottom-[6%] -left-[26%] size-[34%] min-w-[96px] overflow-hidden rounded-full ring-[5px] ring-paper sm:-left-[32%]">
            <Image src="/img/drink-cups.webp" alt="A hot coffee and an iced mocha in Sonora cups" fill sizes="140px" className="object-cover" />
          </div>
          <p className="absolute -bottom-12 left-1/2 w-max -translate-x-1/2 font-hand text-lg text-paper/85">espresso over cold milk, slowly</p>
        </div>
      </div>

      {/* readable list (the ribbons are decorative) */}
      <ul className="relative mx-auto mt-14 flex max-w-4xl flex-wrap justify-center gap-2 px-4 sm:px-6">
        {WINTER_SPECIALS.map((d) => (
          <li key={d.name} className="rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-medium ring-1 ring-white/15 sm:text-[14px]">
            {d.name} <span className="tabular-nums text-note-yellow">· {d.price}</span>
          </li>
        ))}
      </ul>
      <p className="relative mt-4 text-center text-[13px] text-paper/65">Prices in PKR, from the Winter Specials card on the counter.</p>
    </section>
  );
}

function Kitchen() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-dish]", {
        y: 60,
        opacity: 0,
        duration: 1.1,
        stagger: 0.06,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="kitchen-title" className="paper relative px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-[1000px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-hand text-xl text-berry sm:text-2xl">in-house kitchen</p>
            <h2 id="kitchen-title" className="mt-1 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-ink">
              From the kitchen.
            </h2>
          </div>
          <Link href="/menu" className="group inline-flex shrink-0 items-center gap-1.5 font-semibold text-ink underline decoration-berry decoration-2 underline-offset-[6px]">
            Full menu
            <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {KITCHEN.map((d) => (
            <article key={d.name} data-dish className="group">
              <div className="relative aspect-[4/4.7] overflow-hidden rounded-t-[999px] rounded-b-[18px] bg-paper-3 ring-1 ring-ink/5">
                <Image
                  src={d.img}
                  alt={d.name}
                  fill
                  sizes="(min-width: 1024px) 240px, (min-width: 640px) 31vw, 46vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.08]"
                />
                {d.price && (
                  <span className="absolute bottom-3 left-3 rounded-full bg-paper/90 px-2.5 py-1 text-[12px] font-semibold tabular-nums text-ink backdrop-blur">
                    {pkr(d.price)}
                  </span>
                )}
              </div>
              <h3 className="mt-3 font-display text-[1.02rem] font-semibold leading-tight tracking-[-0.01em] text-ink sm:text-[1.1rem]">{d.name}</h3>
              <p className="mt-0.5 text-[13.5px] leading-snug text-ink-2">{d.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Menu() {
  return (
    <>
      <Specials />
      <Kitchen />
    </>
  );
}
