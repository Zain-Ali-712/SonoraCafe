// Sonora is open Mon–Sun, 8 AM – 1 AM (IG bio). 40% off runs 8–11 AM and 8 PM–12:30 AM until 30 Nov 2026 (IG).

export type Moment = {
  open: boolean;
  /** "4:12 PM" in Lahore */
  clock: string;
  /** Short status for chips, e.g. "Open · till 1 AM" */
  status: string;
  /** What is going on right now, one line. */
  now: string;
  /** Part of the day: drives tiny accents in the hero. */
  phase: "morning" | "day" | "evening" | "late" | "closed";
};

const DEAL_END = Date.UTC(2026, 10, 30, 19, 0); // 30 Nov 2026, 23:59 PKT ≈ 19:00 UTC (PKT is UTC+5)

export function lahoreParts(d = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  const [h, m] = fmt.format(d).split(":").map(Number);
  return { h, m, mins: h * 60 + m };
}

export function getMoment(d = new Date()): Moment {
  const { h, m, mins } = lahoreParts(d);
  const clock = `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
  const open = mins >= 8 * 60 || mins < 60; // 08:00 → 01:00
  const deal = d.getTime() < DEAL_END && ((mins >= 8 * 60 && mins < 11 * 60) || mins >= 20 * 60 || mins < 30);

  if (!open) {
    return { open, clock, status: "Closed · opens 8 AM", now: "Lights are off on Ghalib Road. Doors open again at 8 AM.", phase: "closed" };
  }
  const status = "Open · till 1 AM";
  if (mins >= 8 * 60 && mins < 11 * 60)
    return { open, clock, status, now: deal ? "Morning coffee run: 40% off the entire menu till 11 AM." : "Breakfast is on, and the first pour of the day.", phase: "morning" };
  if (mins >= 11 * 60 && mins < 17 * 60)
    return { open, clock, status, now: "Lunch plates out, sticky notes going up on the wall.", phase: "day" };
  if (mins >= 17 * 60 && mins < 20 * 60)
    return { open, clock, status, now: "Golden hour on the terrazzo. Grab a corner, stay a while.", phase: "evening" };
  return { open, clock, status, now: deal ? "Late-night catch-ups: 40% off the entire menu till 12:30 AM." : "The bar is glowing blue. Late-night catch-ups till 1 AM.", phase: "late" };
}
