// Single source of truth for Next Cut business info.
// Update values here when the client confirms them; items marked PENDING are awaiting confirmation.
import b0027 from "@/assets/barbers/b0027.jpg.asset.json";
import b0030 from "@/assets/barbers/b0030.jpg.asset.json";
import b0033 from "@/assets/barbers/b0033.jpg.asset.json";
import b0036 from "@/assets/barbers/b0036.jpg.asset.json";
import b0039 from "@/assets/barbers/b0039.jpg.asset.json";
import b0042 from "@/assets/barbers/b0042.jpg.asset.json";
import b0045 from "@/assets/barbers/b0045.jpg.asset.json";
import b0048 from "@/assets/barbers/b0048.jpg.asset.json";
import b0051 from "@/assets/barbers/b0051.jpg.asset.json";
import b0053 from "@/assets/barbers/b0053.jpg.asset.json";
import mello from "@/assets/barbers/mello.jpg.asset.json";
import c45 from "@/assets/gallery/cut-0045.jpg.asset.json";
import c48 from "@/assets/gallery/cut-0048.jpg.asset.json";
import c49 from "@/assets/gallery/cut-0049.jpg.asset.json";
import c62 from "@/assets/gallery/cut-0062.jpg.asset.json";
import c63 from "@/assets/gallery/cut-0063.jpg.asset.json";
import c64 from "@/assets/gallery/cut-0064.jpg.asset.json";
import c65 from "@/assets/gallery/cut-0065.jpg.asset.json";
import c66 from "@/assets/gallery/cut-0066.jpg.asset.json";
import c67 from "@/assets/gallery/cut-0067.jpg.asset.json";

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
  facebook: "", // PENDING: official URL
  tiktok: "", // PENDING: official URL
  whatsapp: "", // PENDING: verified WhatsApp number, digits only e.g. "14075551234"
  hours: [
    { days: "Mon – Sat", time: "9:00 AM – 8:00 PM", schema: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "20:00" },
    { days: "Sunday", time: "9:00 AM – 6:00 PM", schema: ["Sunday"], opens: "09:00", closes: "18:00" }, // PENDING: brief said 10 AM
  ],
  heroImage: WP + "WhatsApp-Image-2026-05-29-at-7.32-2.jpg",
  interiorImage: WP + "194860800_4100891979977577_1968845463827463481_n.jpg",
};

export const fullAddress = `${BUSINESS.street}, ${BUSINESS.city}, ${BUSINESS.region} ${BUSINESS.zip}`;

// PENDING: prices below come from the original brief and differ from the old site ($30 haircut, $15 beard). Confirm with client.
export const SERVICES = [
  { id: "haircut", name: "Haircut", note: "Fades, tapers, scissor cuts", price: "From $27" },
  { id: "beard", name: "Beard", note: "Line-up, trim & shaping", price: "From $13" },
  { id: "combo", name: "Haircut + Beard", note: "The full refresh", price: "From $40" },
  { id: "kids", name: "Kids Cut", note: "All ages welcome", price: null },
  { id: "design", name: "Hair Design", note: "Custom lines & art", price: null },
] as const;

// PENDING: Tuesday/Wednesday promotions — add here once confirmed, e.g. { days: "Tue & Wed", text: "...", price: "$..." }
export const PROMOTIONS: { days: string; text: string; price: string }[] = [];

// specialties: leave empty until the client confirms what each barber is known for.
export const BARBERS: { name: string; photo: string; specialties: string[]; bookingUrl?: string }[] = [
  { name: "Alex", photo: WP + "Alex.webp", specialties: [] },
  { name: "Anyel", photo: b0045.url, specialties: [] },
  { name: "Addis", photo: b0042.url, specialties: [] },
  { name: "Mello", photo: mello.url, specialties: [] },
  { name: "Abel", photo: b0033.url, specialties: [] },
  { name: "Edgar", photo: b0048.url, specialties: [] },
  { name: "Deyker", photo: b0027.url, specialties: [] },
  { name: "Jordan", photo: b0030.url, specialties: [] },
  { name: "Oscar", photo: b0036.url, specialties: [] },
  { name: "Emílio", photo: b0039.url, specialties: [] },
  { name: "Jefferson", photo: b0051.url, specialties: [] },
  { name: "Zapata", photo: b0053.url, specialties: [] },
];

export const GALLERY: { src: string; alt: string; tag: string }[] = [
  { src: c63.url, alt: "Skin fade with full sculpted beard", tag: "Fade + Beard" },
  { src: c45.url, alt: "Kid's low fade with freehand design", tag: "Kids + Design" },
  { src: c48.url, alt: "Fresh haircut at Next Cut", tag: "Haircut" },
  { src: c49.url, alt: "Fresh haircut at Next Cut", tag: "Haircut" },
  { src: c62.url, alt: "Fresh haircut at Next Cut", tag: "Haircut" },
  { src: c64.url, alt: "Fresh haircut at Next Cut", tag: "Haircut" },
  { src: c65.url, alt: "Fresh haircut at Next Cut", tag: "Haircut" },
  { src: c66.url, alt: "Fresh haircut at Next Cut", tag: "Haircut" },
  { src: c67.url, alt: "Fresh haircut at Next Cut", tag: "Haircut" },
];
