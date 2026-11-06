"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { Play } from "lucide-react";

type Item = { cap: string; alt: string } & ({ img: string; video?: undefined } | { video: string; img?: undefined });

// Real photos (Google Maps uploads + reel stills) with only a few clips, which play on hover.
const ITEMS: Item[] = [
  { img: "/img/space-bar.webp", cap: "the bar, after 8", alt: "The glass-block bar glowing purple" },
  { img: "/img/food-buttermilk.webp", cap: "buttermilk fried chicken", alt: "Buttermilk fried chicken sandwich held up to the camera" },
  { video: "clip-cinema", cap: "the cinema room", alt: "The private cinema room with a projector" },
  { img: "/img/space-lamps-hd.webp", cap: "cup lamps", alt: "Coloured cup lamps glowing on a white wall" },
  { img: "/img/food-table.webp", cap: "lunch, sorted", alt: "Burger, fries and drinks on a terrazzo table" },
  { video: "clip-guitar", cap: "jam corner", alt: "Live guitar under the backlit leaf mural" },
  { img: "/img/drink-cups.webp", cap: "hot or iced", alt: "A hot coffee and an iced mocha in Sonora cups" },
  { img: "/img/space-seating.webp", cap: "a quiet corner", alt: "Cane chairs around a terrazzo table" },
  { img: "/img/food-eclair.webp", cap: "the éclair", alt: "A chocolate éclair on a celadon plate" },
  { video: "clip-mural", cap: "the leaf arch", alt: "The backlit leaf arch with the Sonora logo" },
  { img: "/img/space-corridor.webp", cap: "the long wall", alt: "The corridor beside the cubby wall of cups and notes" },
  { img: "/img/food-weekday.webp", cap: "a different dish every weekday", alt: "A plated dish under warm light" },
];

function Tile({ item, dup }: { item: Item; dup: boolean }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div
      className="arch relative aspect-[3/4.3] bg-night-2 ring-[4px] ring-paper/90 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/item:scale-[1.06] group-hover/item:-rotate-1"
      onPointerEnter={(e) => e.pointerType === "mouse" && item.video && setPlaying(true)}
      onPointerLeave={() => setPlaying(false)}
    >
      <Image
        src={item.img ?? `/video/${item.video}.jpg`}
        alt={dup ? "" : item.alt}
        fill
        sizes="(min-width: 1024px) 17vw, (min-width: 640px) 30vw, 52vw"
        className="object-cover"
      />
      {item.video && playing && (
        <video src={`/video/${item.video}.mp4`} autoPlay muted loop playsInline aria-hidden className="absolute inset-0 h-full w-full object-cover" />
      )}
      {item.video && !playing && (
        <span className="absolute bottom-4 left-1/2 flex size-9 -translate-x-1/2 items-center justify-center rounded-full bg-paper/85 text-ink backdrop-blur">
          <Play className="size-4 translate-x-px fill-current" />
        </span>
      )}
    </div>
  );
}

/** "A look at life around here." An unhurried film strip of real photos; clips bloom on hover. */
export function LifeReel() {
  const strip = (dup: boolean) => (
    <ul className="flex shrink-0 items-end gap-5 pr-5 sm:gap-7 sm:pr-7" aria-hidden={dup || undefined}>
      {ITEMS.map((c, i) => (
        <li
          key={c.cap}
          className={clsx(
            "group/item w-[52vw] shrink-0 transition-opacity duration-700 group-hover/strip:opacity-45 hover:!opacity-100 sm:w-[30vw] lg:w-[17vw]",
            i % 2 ? "mb-10" : "mb-0",
          )}
        >
          <Tile item={c} dup={dup} />
          <p className="mt-3 text-center font-hand text-lg text-paper/80">{c.cap}</p>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-labelledby="life-title" className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto mb-14 max-w-[1320px] px-4 sm:px-6">
        <p className="font-hand text-2xl text-note-yellow">a look at life around here</p>
        <h2 id="life-title" className="mt-2 max-w-[16ch] font-display text-[clamp(2.6rem,6.4vw,5.8rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-paper">
          There&apos;s a lot more to Sonora than the menu.
        </h2>
      </div>
      <div className="group/strip flex w-max hover:[&>*]:[animation-play-state:paused]">
        <div className="marquee-track flex" style={{ ["--marquee-dur" as string]: "110s" }}>
          {strip(false)}
          {strip(true)}
        </div>
      </div>
    </section>
  );
}
