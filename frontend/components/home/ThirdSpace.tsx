"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { LoopVideo } from "@/components/media/LoopVideo";

const STORY =
  "Sonora began as an idea before it was a building: a third space that keeps evolving through art, music, games and community. An old, difficult structure just off MM Alam Road, turned into somewhere you can stay all day.";

const FACTS = [
  { big: "8 AM → 1 AM", small: "Open every single day" },
  { big: "49-A-C2", small: "Ghalib Road, Gulberg III" },
  { big: "In-house", small: "Kitchen, from breakfast on" },
  { big: "1 cinema", small: "A private projector room" },
];

/** The founder's idea, inked in word by word as you scroll, between two slow arch clips. */
export function ThirdSpace() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set("[data-w]", { opacity: 1 });
        return;
      }
      gsap.fromTo(
        "[data-w]",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: { trigger: "[data-story]", start: "top 78%", end: "bottom 45%", scrub: true },
        },
      );
      gsap.fromTo("[data-float='l']", { yPercent: 30 }, { yPercent: -30, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo("[data-float='r']", { yPercent: -10, rotate: 4 }, { yPercent: 40, rotate: -3, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from("[data-fact]", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-facts]", start: "top 85%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="third-space" aria-labelledby="third-space-title" className="paper relative overflow-hidden px-4 pb-24 pt-32 sm:px-6 lg:pb-36 lg:pt-44">
      <div data-float="l" className="pointer-events-none absolute left-[2%] top-[12%] hidden w-[15vw] max-w-[230px] md:block">
        <div className="arch aspect-[3/4.2] ring-[6px] ring-white shadow-xl">
          <LoopVideo name="clip-brushes" label="Paintbrushes in Sonora cups before a Sunday session" />
        </div>
        <p className="mt-2 text-center font-hand text-lg text-ink-2">brushes ready</p>
      </div>
      <div data-float="r" className="pointer-events-none absolute right-[3%] top-[30%] hidden w-[17vw] max-w-[260px] md:block">
        <div className="arch aspect-[3/4.2] ring-[6px] ring-white shadow-xl">
          <LoopVideo name="clip-guitar" label="Someone playing guitar under the backlit leaf mural" />
        </div>
        <p className="mt-2 text-center font-hand text-lg text-ink-2">someone always brings a guitar</p>
      </div>

      <div className="relative mx-auto max-w-[860px] text-center">
        <p className="font-hand text-2xl text-berry">a third space, by Hassan Naeem</p>
        <h2 id="third-space-title" className="sr-only">
          More than a coffee spot
        </h2>
        <p
          data-story
          aria-label={STORY}
          className="mt-6 font-display text-[clamp(1.9rem,4.2vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.03em] text-ink"
        >
          {STORY.split(" ").map((w, i) => (
            <span key={i} aria-hidden data-w className="inline-block whitespace-pre opacity-[0.12]">
              {w}{" "}
            </span>
          ))}
        </p>
        <p className="mx-auto mt-8 max-w-xl text-[17px] leading-relaxed text-ink-2">
          &ldquo;We want to be more than just a coffee spot. We want to be <em className="font-hand text-xl not-italic text-peri">your</em> spot.&rdquo;
        </p>
      </div>

      {/* mobile clips */}
      <div className="mt-14 grid grid-cols-2 gap-4 md:hidden">
        <div className="arch aspect-[3/4.2] ring-4 ring-white">
          <LoopVideo name="clip-brushes" label="Paintbrushes in Sonora cups" />
        </div>
        <div className="arch mt-10 aspect-[3/4.2] ring-4 ring-white">
          <LoopVideo name="clip-guitar" label="Live guitar at Sonora" />
        </div>
      </div>

      <dl data-facts className="relative mx-auto mt-20 grid max-w-[1100px] grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-ink/10 ring-1 ring-ink/10 lg:mt-28 lg:grid-cols-4">
        {FACTS.map((f) => (
          <div key={f.big} data-fact className="flex flex-col gap-1 bg-paper/95 p-6 sm:p-8">
            <dt className="order-2 text-[14px] text-ink-2">{f.small}</dt>
            <dd className="order-1 font-display text-[clamp(1.5rem,2.6vw,2.2rem)] font-semibold tracking-[-0.03em] text-ink">{f.big}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
