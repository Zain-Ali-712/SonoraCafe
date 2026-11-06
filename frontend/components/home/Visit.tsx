"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { BRAND } from "@/lib/brand";
import { OpenChip } from "@/components/layout/Nav";
import { useMoment } from "@/components/layout/useMoment";

function Instagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Visit() {
  const root = useRef<HTMLElement>(null);
  const m = useMoment();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-facade]",
        { clipPath: "inset(40% 20% 0% 20% round 999px 999px 24px 24px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 999px 999px 24px 24px)",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 85%", end: "top 20%", scrub: 0.8 },
        },
      );
      gsap.to("[data-sticker]", { rotate: 360, duration: 40, ease: "none", repeat: -1 });
      gsap.fromTo("[data-kb]", { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="visit" aria-labelledby="visit-title" className="paper relative px-4 pb-28 pt-6 sm:px-6 lg:pb-36">
      <div className="mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-6">
          <div data-facade className="arch relative mx-auto aspect-[3/3.6] w-full max-w-[560px] shadow-[0_50px_80px_-40px_rgb(30_33_71/0.55)]">
            <Image
              data-kb
              src="/img/space-facade-dusk.webp"
              alt="Sonora's curved white façade at dusk, the blue sonora sign lit up"
              fill
              sizes="(min-width: 1024px) 560px, 92vw"
              className="object-cover object-[50%_40%]"
            />
          </div>
          <div data-sticker className="absolute -bottom-6 right-[4%] size-[120px] overflow-hidden rounded-full ring-[6px] ring-paper sm:size-[150px]">
            <Image src="/img/space-creature.webp" alt="Sonora's crimson coral-creature wall decal" fill sizes="150px" className="object-cover" />
          </div>
        </div>

        <div className="lg:col-span-6 lg:pl-8">
          <p className="font-hand text-2xl text-berry">see you at 8 AM</p>
          <h2 id="visit-title" className="mt-2 font-display text-[clamp(2.8rem,6.8vw,6rem)] font-semibold leading-[0.88] tracking-[-0.045em] text-ink">
            Pull up a chair.
          </h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ink-2">
            Look for the curved white front and the blue <span className="font-hand text-xl text-peri">sonora.</span> sign, just
            off MM Alam Road in Gulberg III.
          </p>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-[24px] bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-2">
            <div className="bg-paper p-6">
              <dt className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-2/70">
                <MapPin className="size-4 text-berry" /> Address
              </dt>
              <dd className="mt-2 text-[17px] font-medium leading-snug text-ink">
                49-A-C2 Ghalib Road,
                <br />
                Block C2, Gulberg III, Lahore
              </dd>
            </div>
            <div className="bg-paper p-6">
              <dt className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-2/70">
                <Clock className="size-4 text-berry" /> Hours
              </dt>
              <dd className="mt-2 text-[17px] font-medium leading-snug text-ink">
                Every day
                <br />8 AM – 1 AM
              </dd>
              <dd className="mt-3">
                <OpenChip />
              </dd>
            </div>
          </dl>
          {m && <p className="mt-4 text-[14px] text-ink-2">It&apos;s {m.clock} in Lahore. {m.now}</p>}

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={BRAND.maps}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-semibold text-paper transition-colors hover:bg-peri"
            >
              Get directions
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
            </a>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold text-ink ring-1 ring-ink/15 transition-colors hover:bg-white/70"
            >
              <Instagram className="size-4" /> {BRAND.handle}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
