// Every fact here is sourced in research/scraped-data.md (IG = @drinksonora, TOPIC = creator reels).

export const BRAND = {
  name: "Sonora",
  full: "Sonora Community Café",
  urdu: "سونورا",
  bio: "The community café everyone can call their own.",
  tagline: "coffee, conversations & everything in between",
  address: "49-A-C2 Ghalib Road, Gulberg III, Lahore",
  addressShort: "Ghalib Road, Gulberg III",
  hours: "Mon–Sun · 8 AM – 1 AM",
  instagram: "https://www.instagram.com/drinksonora/",
  handle: "@drinksonora",
  maps: "https://www.google.com/maps/search/?api=1&query=Sonora+Community+Cafe+49-A-C2+Ghalib+Road+Gulberg+III+Lahore",
  followers: "9.6K",
} as const;

export const pkr = (n: number) => `Rs ${n.toLocaleString("en-PK")}`;

/** Sonora's printed Winter Specials card (seen in a creator reel). */
export const WINTER_SPECIALS: { name: string; price: number }[] = [
  { name: "Biscoff Latte", price: 850 },
  { name: "Honey Latte", price: 750 },
  { name: "Spanish Mocha Latte", price: 850 },
  { name: "Spanish Cortado", price: 750 },
  { name: "Pistachio Cold Foam", price: 850 },
  { name: "Cold Foam Americano", price: 699 },
  { name: "Hot Chocolate", price: 790 },
  { name: "Vanilla Frappe", price: 999 },
  { name: "Milk Chocolate Frappe", price: 999 },
  { name: "Matcha Frappe", price: 999 },
];

/** From the kitchen: prices from Sonora's Foodpanda listing (FP) or dated creator posts. */
export const KITCHEN: { name: string; price?: number; note: string; img: string }[] = [
  { name: "Roasted Garlic Linguine", price: 1895, note: "Creamy, garlicky, grilled chicken on the side", img: "/img/food-linguine.webp" },
  { name: "Buttermilk Fried Chicken Sandwich", price: 1550, note: "The one everyone films", img: "/img/food-buttermilk.webp" },
  { name: "Mexican Wrap", price: 1395, note: "Grilled, pressed, with fries", img: "/img/food-wrap.webp" },
  { name: "Dynamite Chicken Fries", price: 1195, note: "Loaded and saucy", img: "/img/food-fries.webp" },
  { name: "Breakfast, from 8 AM", note: "Omelette, toast, yogurt and fruit", img: "/img/food-breakfast.webp" },
  { name: "Chocolate Éclair", note: "“Soft, chocolatey, genuinely so good”", img: "/img/food-eclair.webp" },
  { name: "Spanish Latte", price: 750, note: "Hot or iced, in the red-doodle cup", img: "/img/drink-cups.webp" },
  { name: "Weekday plates", note: "A different dish every weekday", img: "/img/food-weekday.webp" },
];

export const HAPPENINGS = [
  { when: "Sat · 7 Nov · 4–6 PM", title: "Free coffee for NCA & GCU", body: "100 students, a coffee each, completely on us. Pre-register via the link in bio.", tag: "This week" },
  { when: "Every Sunday", title: "A little art. A little music.", body: "Paint-a-canvas afternoons, tote bags, sketchbooks and an open guitar in the corner.", tag: "Weekly" },
  { when: "31 Oct · 4–10 PM", title: "FC 27 knockout", body: "PS5, 1v1, Rs 12,000 in cash prizes. Just don't blame the controller.", tag: "Recap" },
  { when: "Anytime", title: "The private cinema", body: "A projector room for match nights, movie nights and whatever the group decides.", tag: "In-house" },
];

export const POSTERS = [
  { src: "/img/poster-free-nca.webp", alt: "Poster: Free coffee. Yes, actually free. NCA and GCU students, Saturday 7 November, 4 to 6 PM." },
  { src: "/img/poster-40off.webp", alt: "Poster: No discount cards? No problem. Flat 40% off on the entire menu, 8 to 11 AM and 8 PM to 12:30 AM, valid until November 30th." },
  { src: "/img/poster-paint.webp", alt: "Poster: Come through, paint a canvas for us to keep, and your coffee is literally on the house." },
  { src: "/img/poster-fc27.webp", alt: "Poster: Sonora presents the FC27 tournament, PS5 1v1 knockout, 31st October 2026, 4 to 10 PM." },
  { src: "/img/poster-free-lums.webp", alt: "Poster: Free coffee. Yes, actually free. LUMS and LSE students." },
];

/** Short quotes from creators who posted about Sonora (TOPIC). */
export const VOICES = [
  { quote: "Bright, beachy ambiance. It felt like a little summer escape in the middle of the city.", by: "@storiesbyzay", color: "yellow" },
  { quote: "The kind of place where time slows down and conversations last longer.", by: "@diaries_by_s", color: "pink" },
  { quote: "Plus they've a private cinema too, and that made our day extra special.", by: "@ijaz7to1", color: "green" },
  { quote: "Ambiance 5/5. Quantity 5/5. Service 5/5.", by: "@notyouraverag…", color: "orange" },
  { quote: "Spanish cortado: probably one of the very few places in Lahore serving it, and they nailed it.", by: "@diaries_by_s", color: "blue" },
  { quote: "A third space that could keep evolving through art, music, games and community.", by: "@lahorecoffees", color: "yellow" },
] as const;

export const NAV = [
  { href: "/menu", label: "Menu" },
  { href: "/happenings", label: "Happenings" },
  { href: "/the-wall", label: "The Wall" },
  { href: "/visit", label: "Visit" },
] as const;
