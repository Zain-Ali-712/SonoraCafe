"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { BRAND, NAV } from "@/lib/brand";
import { Wordmark, Wreath } from "@/components/brand/Logo";

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-big]",
        { clipPath: "inset(100% 0% 0% 0%)", yPercent: 20 },
        { clipPath: "inset(0% 0% 0% 0%)", yPercent: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top 85%", end: "bottom bottom", scrub: 0.6 } },
      );
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="relative overflow-hidden bg-peri px-4 pb-8 pt-20 text-paper sm:px-6">
      <Wreath className="pointer-events-none absolute -right-[18%] -top-[30%] w-[80vw] max-w-[1100px] opacity-[0.14]" color="#fff" />
      <div className="relative mx-auto max-w-[1320px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="max-w-sm font-display text-3xl font-semibold leading-tight tracking-[-0.03em]">{BRAND.bio}</p>
            <p className="mt-4 font-hand text-xl text-note-yellow">Brewed for you.</p>
          </div>
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-paper/60">Find us</p>
            <p className="mt-3 text-[15px] leading-relaxed">
              49-A-C2 Ghalib Road
              <br />
              Gulberg III, Lahore
              <br />
              Mon–Sun · 8 AM – 1 AM
            </p>
            <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="mt-3 inline-block text-[15px] underline underline-offset-4">
              {BRAND.handle}
            </a>
          </div>
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-paper/60">Pages</p>
            <ul className="mt-3 flex flex-col gap-1.5 text-[15px]">
              {[...NAV, { href: "/order", label: "Order" }, { href: "/cinema", label: "The cinema" }].map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="group inline-flex items-center gap-2 hover:text-note-yellow">
                    {n.label}
                    <span className="rounded-full bg-paper/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">soon</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div data-big className="mt-16 text-paper">
          <Wordmark className="w-full" />
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-paper/20 pt-6 text-[13px] text-paper/70 sm:flex-row sm:items-center">
          <p>© 2026 Sonora Community Café · Lahore</p>
          <p className="font-urdu text-lg leading-loose">{BRAND.urdu}</p>
        </div>
      </div>
    </footer>
  );
}
