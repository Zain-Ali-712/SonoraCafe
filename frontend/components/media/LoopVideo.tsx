"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Props = {
  /** Base name in /public/video, e.g. "reel-space" (uses .mp4 + .jpg poster). */
  name: string;
  className?: string;
  label?: string;
  /** Playback speed; clips are already slowed, so keep this near 1. */
  rate?: number;
  /** Load eagerly (hero). */
  priority?: boolean;
  /** Force pause (e.g. a parent hover state). */
  paused?: boolean;
};

/**
 * Muted ambient loop. Loads only when near the viewport, pauses offscreen,
 * and stays on the poster frame for reduced-motion users.
 */
export function LoopVideo({ name, className, label, rate = 1, priority = false, paused = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(priority);
  const [inView, setInView] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting) setNear(true);
      },
      { rootMargin: "120px 0px", threshold: 0.05 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !near) return;
    v.playbackRate = rate;
    if (inView && !paused && !reduce) v.play().catch(() => {});
    else v.pause();
  }, [near, inView, paused, reduce, rate]);

  return (
    <video
      ref={ref}
      src={near && !reduce ? `/video/${name}.mp4` : undefined}
      poster={`/video/${name}.jpg`}
      muted
      loop
      playsInline
      preload={priority ? "auto" : "metadata"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      onLoadedData={(e) => {
        e.currentTarget.playbackRate = rate;
        if (inView && !paused && !reduce) e.currentTarget.play().catch(() => {});
      }}
      className={clsx("h-full w-full object-cover", className)}
    />
  );
}
