import { LOGO_LEAF, LOGO_TEXT, LOGO_VIEWBOX, WORD_VIEWBOX } from "@/lib/logo-paths";

type Props = { className?: string; title?: string };

/** "sonora." wordmark only (traced from Sonora's own end card). Colour follows `currentColor`. */
export function Wordmark({ className, title = "Sonora" }: Props) {
  return (
    <svg viewBox={WORD_VIEWBOX} className={className} role="img" aria-label={title} fill="currentColor">
      <path d={LOGO_TEXT} fillRule="evenodd" />
    </svg>
  );
}

/** Full emblem: wordmark + سونورا inside the leaf wreath. */
export function Emblem({
  className,
  text = "currentColor",
  leaf = "var(--color-leaf)",
  title = "Sonora Community Café",
}: Props & { text?: string; leaf?: string }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} role="img" aria-label={title}>
      <path d={LOGO_LEAF} fill={leaf} fillRule="evenodd" />
      <path d={LOGO_TEXT} fill={text} fillRule="evenodd" />
    </svg>
  );
}

/** Just the wreath, used as a botanical ornament (like the leaves on their posters). */
export function Wreath({ className, color = "var(--color-sage)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} aria-hidden="true">
      <path d={LOGO_LEAF} fill={color} fillRule="evenodd" />
    </svg>
  );
}
