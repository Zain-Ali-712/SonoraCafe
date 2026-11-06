"use client";

import { motion } from "motion/react";
import clsx from "clsx";
import type { RefObject } from "react";

export const NOTE_BG = {
  yellow: "bg-note-yellow",
  pink: "bg-note-pink",
  green: "bg-note-green",
  orange: "bg-note-orange",
  blue: "bg-note-blue",
} as const;
export type NoteColor = keyof typeof NOTE_BG;

type Props = {
  children: React.ReactNode;
  color: NoteColor;
  rotate?: number;
  className?: string;
  bounds: RefObject<HTMLElement | null>;
  z?: number;
  onLift?: () => void;
  delay?: number;
  /** Controlled entrance (hero). Leave undefined to enter when scrolled into view. */
  show?: boolean;
  sign?: string;
  size?: "sm" | "lg";
};

/** A draggable sticky note, the way guests leave them on Sonora's cup wall. */
export function StickyNote({ children, color, rotate = 0, className, bounds, z = 1, onLift, delay = 0, show, sign, size = "sm" }: Props) {
  const target = { opacity: 1, scale: 1, rotate, y: 0 };
  return (
    <motion.div
      drag
      dragConstraints={bounds}
      dragElastic={0.12}
      dragTransition={{ power: 0.25, timeConstant: 260 }}
      onPointerDown={onLift}
      initial={{ opacity: 0, scale: 0.6, rotate: rotate - 18, y: 30 }}
      animate={show === undefined ? undefined : show ? target : undefined}
      whileInView={show === undefined ? target : undefined}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay, type: "spring", stiffness: 160, damping: 14 }}
      whileHover={{ scale: 1.04 }}
      whileDrag={{ scale: 1.08, rotate: 0, cursor: "grabbing", boxShadow: "0 30px 40px -18px rgb(30 33 71 / 0.5)" }}
      style={{ zIndex: z }}
      className={clsx(
        "note absolute cursor-grab touch-none select-none rounded-[3px] p-4",
        size === "sm"
          ? "w-[150px] text-[17px] leading-[1.15] sm:w-[172px] sm:text-[19px]"
          : "w-[230px] p-5 text-[19px] leading-[1.2] sm:w-[270px] sm:text-[22px]",
        NOTE_BG[color],
        className,
      )}
    >
      {children}
      {sign && <span className="mt-2 block text-right text-[14px] opacity-60">— {sign}</span>}
    </motion.div>
  );
}
