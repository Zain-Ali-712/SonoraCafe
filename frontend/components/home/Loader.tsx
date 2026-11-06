"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Emblem } from "@/components/brand/Logo";
import { introAlreadySeen, markIntroDone } from "./intro";

/**
 * The façade moment: a cream arch rises, the emblem settles, then the arch lifts away
 * like walking through Sonora's curved front door. Once per session, < 2 s.
 */
export function Loader() {
  const [show, setShow] = useState(true);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    const seen = introAlreadySeen() || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!seen) document.documentElement.style.overflow = "hidden";
    const t = window.setTimeout(
      () => {
        if (seen) {
          setSkip(true);
          markIntroDone();
        }
        setShow(false);
      },
      seen ? 0 : 1850,
    );
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = "";
        markIntroDone();
      }}
    >
      {show && (
        <motion.div
          key="loader"
          data-loader
          aria-hidden
          className="fixed inset-0 z-[80] flex items-end justify-center bg-ink"
          initial={false}
          exit={{ opacity: skip ? 0 : 1, transition: { duration: skip ? 0 : 0.9 } }}
          style={skip ? { visibility: "hidden" } : undefined}
        >
          <motion.div
            className="paper relative flex h-[86svh] w-[min(560px,88vw)] items-center justify-center"
            style={{ borderRadius: "999px 999px 0 0" }}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-120%", borderRadius: "999px 999px 999px 999px", transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] } }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ scale: 0.82, opacity: 0, rotate: -4 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.45, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="w-[72%]"
            >
              <Emblem text="var(--color-ink)" />
            </motion.div>
            <motion.p
              className="absolute bottom-10 font-hand text-lg text-berry"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              pull up a chair…
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
