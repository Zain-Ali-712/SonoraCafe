import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree, Gochi_Hand, Noto_Nastaliq_Urdu } from "next/font/google";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Nav } from "@/components/layout/Nav";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], display: "swap" });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"], display: "swap" });
const gochi = Gochi_Hand({ variable: "--font-gochi", weight: "400", subsets: ["latin"], display: "swap" });
const nastaliq = Noto_Nastaliq_Urdu({ variable: "--font-nastaliq", weight: ["400", "700"], subsets: ["arabic"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://sonoracoffeehouse.com"),
  title: "Sonora Community Café · Gulberg III, Lahore",
  description:
    "The community café everyone can call their own. Coffee, conversations & everything in between, on Ghalib Road, Gulberg III, Lahore. Open daily 8 AM to 1 AM.",
  openGraph: {
    title: "Sonora Community Café",
    description: "Coffee, conversations & everything in between. Ghalib Road, Gulberg III, Lahore.",
    images: ["/video/reel-space.jpg"],
    locale: "en_PK",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#4656bd",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${figtree.variable} ${gochi.variable} ${nastaliq.variable}`}
    >
      <head>
        {/* Skip the arch loader before first paint for returning visitors in this session. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('sonora-intro-seen')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro-seen')}catch(e){}",
          }}
        />
      </head>
      <body className="grain min-h-dvh">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-ink px-4 py-2 text-paper focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
