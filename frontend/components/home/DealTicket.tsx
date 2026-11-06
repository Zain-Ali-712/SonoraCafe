"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RotateCcw } from "lucide-react";

const END = new Date("2026-11-30T23:59:00+05:00").getTime();

/**
 * Sonora's current offer (IG, 25 Oct 2026): flat 40% off the entire menu, any payment method,
 * no cap, 8–11 AM and 8 PM–12:30 AM, valid until 30 November. Drag the stub to tear it off.
 */
export function DealTicket() {
  const [days, setDays] = useState<number | null>(null);
  const [torn, setTorn] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setDays(Math.ceil((END - Date.now()) / 86_400_000)));
    return () => cancelAnimationFrame(id);
  }, []);

  if (days !== null && days < 0) return null;

  return (
    <section aria-labelledby="deal-title" className="relative px-4 py-16 sm:px-6 lg:py-24">
      <div className="relative mx-auto flex max-w-[1100px] flex-col overflow-visible md:flex-row">
        {/* main ticket */}
        <div className="relative flex-1 overflow-hidden rounded-[26px] bg-note-yellow p-8 text-ink sm:p-12 md:rounded-r-none">
          <span aria-hidden className="absolute -right-10 -top-10 font-display text-[16rem] font-bold leading-none text-ink/[0.06]">
            %
          </span>
          <p className="font-hand text-xl text-berry">no discount cards? no problem.</p>
          <h2 id="deal-title" className="mt-3 font-display text-[clamp(3.4rem,9vw,7.5rem)] font-bold leading-[0.85] tracking-[-0.05em]">
            40% off
            <span className="block text-[0.42em] font-semibold leading-[1.1] tracking-[-0.03em]">the entire menu.</span>
          </h2>
          <div className="mt-8 flex flex-wrap gap-3 text-[15px] font-semibold">
            <span className="rounded-full bg-ink px-4 py-2 text-paper">☀ 8 – 11 AM</span>
            <span className="rounded-full bg-ink px-4 py-2 text-paper">☾ 8 PM – 12:30 AM</span>
          </div>
          <p className="mt-6 max-w-md text-[15px] text-ink/75">
            Any payment method, absolutely no discount cap. Morning coffee runs and late-night catch-ups, until 30 November.
          </p>
        </div>

        {/* perforation */}
        <div aria-hidden className="relative hidden w-0 md:block">
          <span className="absolute -top-4 left-0 size-8 -translate-x-1/2 rounded-full bg-night" />
          <span className="absolute -bottom-4 left-0 size-8 -translate-x-1/2 rounded-full bg-night" />
          <span className="absolute inset-y-6 left-0 border-l-[3px] border-dashed border-ink/25" />
        </div>

        {/* stub */}
        <div className="relative min-h-[220px] md:w-[270px]">
          <AnimatePresence>
            {!torn ? (
              <motion.div
                key="stub"
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.55}
                onDragEnd={(_, info) => {
                  if (Math.hypot(info.offset.x, info.offset.y) > 90) setTorn(true);
                }}
                exit={{ y: 500, x: 120, rotate: 38, opacity: 0, transition: { duration: 0.9, ease: [0.5, 0, 0.75, 0] } }}
                whileDrag={{ rotate: 6, cursor: "grabbing" }}
                className="absolute inset-0 flex cursor-grab touch-none flex-col justify-between rounded-[26px] bg-note-yellow p-8 text-ink md:rounded-l-none"
                style={{ transformOrigin: "0% 0%" }}
              >
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink/60">Admit</p>
                  <p className="mt-1 font-display text-2xl font-semibold">you + whoever you bring</p>
                </div>
                <div>
                  <p className="font-display text-5xl font-bold tabular-nums">{days ?? "··"}</p>
                  <p className="text-sm text-ink/70">{days === 1 ? "day left" : "days left"}</p>
                </div>
                <p className="font-hand text-lg text-berry">drag to tear ✂</p>
              </motion.div>
            ) : (
              <motion.div
                key="kept"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute inset-0 flex flex-col items-start justify-center gap-4 rounded-[26px] border-2 border-dashed border-paper/25 p-8 text-paper md:rounded-l-none"
              >
                <p className="font-hand text-3xl leading-tight text-note-yellow">it&apos;s yours. see you on Ghalib Road ✿</p>
                <button
                  type="button"
                  onClick={() => setTorn(false)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-paper/80 underline underline-offset-4"
                >
                  <RotateCcw className="size-4" /> another one
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
