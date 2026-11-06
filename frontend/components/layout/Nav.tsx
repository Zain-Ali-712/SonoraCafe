"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import { Wordmark, Wreath } from "@/components/brand/Logo";
import { BRAND, NAV } from "@/lib/brand";
import { useMoment } from "./useMoment";

const MENU_LINKS = [...NAV, { href: "/order", label: "Order" }];

export function OpenChip({ className }: { className?: string }) {
  const m = useMoment();
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-ink/10 bg-white/60 px-3 py-1.5 text-[12px] font-medium tracking-tight text-ink",
        className,
      )}
      aria-live="polite"
    >
      <span className="relative flex size-2">
        <span
          className={clsx(
            "absolute inset-0 rounded-full",
            m?.open ? "animate-ping bg-emerald-500/60" : "bg-transparent",
          )}
        />
        <span className={clsx("relative size-2 rounded-full", m ? (m.open ? "bg-emerald-500" : "bg-berry") : "bg-ink/20")} />
      </span>
      {m ? m.status : "8 AM – 1 AM daily"}
    </span>
  );
}

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 240 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 transition-transform duration-700 ease-[var(--ease-out-expo)] sm:px-5 sm:pt-4",
          hidden && !open ? "-translate-y-[130%]" : "translate-y-0",
        )}
      >
        <nav
          aria-label="Main"
          className={clsx(
            "flex w-full max-w-[1320px] items-center justify-between gap-3 rounded-full py-2 pl-5 pr-2 transition-[background-color,box-shadow,backdrop-filter] duration-500",
            scrolled || open
              ? "bg-paper/85 shadow-[0_10px_40px_-18px_rgb(30_33_71/0.45)] ring-1 ring-ink/5 backdrop-blur-xl"
              : "bg-paper/92 shadow-[0_14px_40px_-22px_rgb(10_12_50/0.6)] ring-1 ring-white/30 backdrop-blur-xl",
          )}
        >
          <Link href="/" aria-label="Sonora home" className="group flex items-center gap-2 text-peri">
            <Wordmark className="h-7 w-auto transition-transform duration-500 group-hover:-rotate-3 sm:h-8" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="group block rounded-full px-4 py-2 text-[15px] font-medium text-ink"
                >
                  <span className="relative block h-6 overflow-hidden leading-6">
                    <span className="block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-full">
                      {n.label}
                    </span>
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-full block font-hand text-[18px] leading-6 text-berry transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-full"
                    >
                      {n.label}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <span className="hidden min-[400px]:block">
              <OpenChip />
            </span>
            <Link
              href="/order"
              className="group hidden items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-paper transition-colors hover:bg-berry sm:inline-flex"
            >
              Order
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative flex size-11 items-center justify-center rounded-full bg-peri text-paper lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span className={clsx("absolute h-0.5 w-5 rounded bg-current transition-transform duration-500", open ? "rotate-45" : "-translate-y-1")} />
              <span className={clsx("absolute h-0.5 w-5 rounded bg-current transition-transform duration-500", open ? "-rotate-45" : "translate-y-1")} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-peri px-6 pb-8 pt-28 text-paper lg:hidden"
            initial={{ clipPath: "inset(100% 0% 0% 0% round 50% 50% 0 0)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0% round 0% 0% 0 0)" }}
            exit={{ clipPath: "inset(100% 0% 0% 0% round 50% 50% 0 0)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Wreath className="pointer-events-none absolute -right-24 bottom-10 w-[130%] max-w-none opacity-15" color="#fff" />
            <ul className="relative flex flex-col gap-1">
              {MENU_LINKS.map((n, i) => (
                <motion.li
                  key={n.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between border-b border-paper/20 py-3 font-display text-5xl font-semibold tracking-tight"
                  >
                    {n.label}
                    <span className="font-hand text-base text-note-yellow">soon</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="relative mt-auto flex flex-col gap-3 text-sm text-paper/80">
              <OpenChip className="w-fit border-paper/20 bg-paper/10 text-paper" />
              <p>{BRAND.address}</p>
              <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="w-fit underline underline-offset-4">
                {BRAND.handle}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
