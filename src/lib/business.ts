// Single source of truth for Next Cut business info.
// Update values here when the client confirms them; items marked PENDING are awaiting confirmation.
// Photos live in public/photos/ so the site works on any host (Lovable, Vercel, custom domain).
const b0027 = "/photos/barber-0027.jpg";
const b0030 = "/photos/barber-0030.jpg";
const b0033 = "/photos/barber-0033.jpg";
const b0036 = "/photos/barber-0036.jpg";
const b0039 = "/photos/barber-0039.jpg";
const b0042 = "/photos/barber-0042.jpg";
const b0045 = "/photos/barber-0045.jpg";
const b0048 = "/photos/barber-0048.jpg";
const b0051 = "/photos/barber-0051.jpg";
const b0053 = "/photos/barber-0053.jpg";
const mello = "/photos/mello.jpg";
const c45 = "/photos/cut-0045.jpg";
const c48 = "/photos/cut-0048.jpg";
const c49 = "/photos/cut-0049.jpg";
const c62 = "/photos/cut-0062.jpg";
const c63 = "/photos/cut-0063.jpg";
const c64 = "/photos/cut-0064.jpg";
const c65 = "/photos/cut-0065.jpg";
const c66 = "/photos/cut-0066.jpg";
const c67 = "/photos/cut-0067.jpg";
const shop0050 = "/photos/shop-0050.jpg";
const shop0047 = "/photos/shop-0047.jpg";
const shop0043 = "/photos/shop-0043.jpg";
const shop0044 = "/photos/shop-0044.jpg";
const shop0046 = "/photos/shop-0046.jpg";

const WP = "https://nextcutpro.com/wp-content/uploads/2026/05/";

export const BUSINESS = {
  name: "Next Cut Barbershop",
  phoneDisplay: "(407) 610-7845",
  phoneHref: "tel:+14076107845",
  street: "1723 W Oak Ridge Rd",
  city: "Orlando",
  region: "FL",
  zip: "32809",
  bookingUrl: "https://squareup.com/appointments/book/BV32J23P8XBXG",
  mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Next+Cut+Barbershop,+1723+W+Oak+Ridge+Rd,+Orlando,+FL+32809",
  reviewsUrl: "https://www.google.com/maps/search/?api=1&query=Next+Cut+Barbershop+1723+W+Oak+Ridge+Rd+Orlando+FL",
  instagram: "https://www.instagram.com/nextcut1_official/",
  whatsappText: "Hi Next Cut! I'd like to book a cut. What times are available?",
  facebook: "", // PENDING: official URL
  tiktok: "https://www.tiktok.com/@nextcut1",
  whatsapp: "14077616338",
  hours: [
    { days: "Mon – Sat", time: "9:00 AM – 8:00 PM", schema: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "20:00" },
    { days: "Sunday", time: "9:00 AM – 6:00 PM", schema: ["Sunday"], opens: "09:00", closes: "18:00" }, // PENDING: brief said 10 AM
  ],
  heroImage: WP + "WhatsApp-Image-2026-05-29-at-7.32-2.jpg",
  interiorImage: WP + "194860800_4100891979977577_1968845463827463481_n.jpg",
};

export const fullAddress = `${BUSINESS.street}, ${BUSINESS.city}, ${BUSINESS.region} ${BUSINESS.zip}`;

// Confirmed client menu, October 24, 2026. Null amounts explicitly mean variable pricing.
export type Service = { id: string; name: string; nameEs: string; amount: number | null; minutes: number; price: string; note: string };
const menu = (id: string, name: string, nameEs: string, amount: number | null, minutes: number): Service => ({
  id, name, nameEs, amount, minutes, price: amount === null ? "Price varies" : `$${amount.toFixed(2)}`, note: `${minutes} min`,
});
export const SERVICES = [
  menu("buzz", "Haircut, Eyebrow, Beard", "Corte, cejas y barba", 45, 45),
  menu("shape-beard", "Shape Up & beard hot towel", "Perfilado y barba con toalla caliente", 25, 30),
  menu("kids-regular", "Regular Haircut", "Corte regular", 30, 30),

  menu("haircut-beard", "Haircuts & Beard", "Corte y barba", 40, 30),
  menu("design", "Design", "Diseño", 10, 15),
  menu("beard", "V-Cut", "V-Cut", 35, 15),

];

// PENDING: Tuesday/Wednesday promotions — add here once confirmed, e.g. { days: "Tue & Wed", text: "...", price: "$..." }
export const PROMOTIONS: { days: string; text: string; price: string }[] = [];

// specialties: leave empty until the client confirms what each barber is known for.
export const BARBERS: { name: string; photo: string; specialties: string[]; bookingUrl?: string }[] = [
  { name: "Alex", photo: WP + "Alex.webp", specialties: [] },
  { name: "Anyel", photo: b0045, specialties: [] },
  { name: "Addis", photo: b0042, specialties: [] },
  { name: "Mello", photo: mello, specialties: [] },
  { name: "Abel", photo: b0033, specialties: [] },
  { name: "Edgar", photo: b0048, specialties: [] },
  { name: "Deyker", photo: b0027, specialties: [] },
  { name: "Jordan", photo: b0030, specialties: [] },
  { name: "Oscar", photo: b0036, specialties: [] },
  { name: "Jefferson", photo: b0039, specialties: [] },
  { name: "Emílio", photo: b0051, specialties: [] },
  { name: "Zapata", photo: b0053, specialties: [] },
];

export const GALLERY: { src: string; alt: string; tag: string }[] = [
  { src: shop0046, alt: "Textured haircut with a fade and sharply shaped beard at Next Cut", tag: "Fade + Beard" },
  { src: shop0043, alt: "Kid's haircut with a textured fringe and skin fade at Next Cut", tag: "Kids Cut" },
  { src: shop0047, alt: "Kid's fade with two shaved design lines at Next Cut", tag: "Kids + Design" },
  { src: shop0044, alt: "Next Cut Barbershop interior with barbers serving customers", tag: "Inside Next Cut" },
  { src: shop0050, alt: "Barbers working on haircuts and beard grooming inside Next Cut", tag: "In the shop" },
  { src: c63, alt: "Skin fade with full sculpted beard", tag: "Fade + Beard" },
  { src: c45, alt: "Kid's low fade with freehand design", tag: "Kids + Design" },
  { src: c48, alt: "Fresh haircut at Next Cut", tag: "Haircut" },
  { src: c49, alt: "Fresh haircut at Next Cut", tag: "Haircut" },
  { src: c62, alt: "Fresh haircut at Next Cut", tag: "Haircut" },
  { src: c64, alt: "Fresh haircut at Next Cut", tag: "Haircut" },
  { src: c65, alt: "Fresh haircut at Next Cut", tag: "Haircut" },
  { src: c66, alt: "Fresh haircut at Next Cut", tag: "Haircut" },
  { src: c67, alt: "Fresh haircut at Next Cut", tag: "Haircut" },
];
