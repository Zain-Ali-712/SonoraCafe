"use client";

import { useEffect, useState } from "react";
import { getMoment, type Moment } from "@/lib/time";

/** Live Lahore time + open status. `null` until mounted so prerendered HTML never shows a stale clock. */
export function useMoment(): Moment | null {
  const [m, setM] = useState<Moment | null>(null);
  useEffect(() => {
    const tick = () => setM(getMoment());
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, []);
  return m;
}
