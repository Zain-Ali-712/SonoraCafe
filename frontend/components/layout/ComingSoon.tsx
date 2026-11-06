import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Emblem } from "@/components/brand/Logo";

/** The only content on every page except home. */
export function ComingSoon({ title }: { title: string }) {
  return (
    <main id="main" className="paper relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-32 text-center">
      <Emblem className="w-[min(320px,70vw)]" text="var(--color-ink)" />
      <p className="mt-10 font-hand text-2xl text-berry">{title}</p>
      <h1 className="mt-2 font-display text-[clamp(3rem,10vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-ink">
        Coming soon.
      </h1>
      <Link
        href="/"
        className="group mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-peri"
      >
        <ArrowLeft className="size-4 transition-transform duration-500 group-hover:-translate-x-1" />
        Back home
      </Link>
    </main>
  );
}
