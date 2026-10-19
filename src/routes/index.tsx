import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight, Phone, Star, Scissors, Smile, Package, CalendarCheck, Users, DoorOpen, Baby, ShieldCheck,
  Instagram, Facebook, MapPin, Clock, Music2, ChevronLeft, ChevronRight, Menu,
} from "lucide-react";
import { useRef, useState } from "react";

const IMG = "https://nextcutpro.com/wp-content/uploads/2026/05/";
const HERO = IMG + "WhatsApp-Image-2026-05-29-at-7.32-2.jpg";
const INTERIOR = IMG + "194860800_4100891979977577_1968845463827463481_n.jpg";
const BOOK = "https://squareup.com/appointments/book/BV32J23P8XBXG";
const IG = "https://www.instagram.com/nextcut1_official/";
const PHONE = "tel:+14076107845";
const MAPS = "https://maps.google.com/?q=1723+W+Oak+Ridge+Rd,+Orlando,+FL+32809";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Next Cut Barbershop — Sharp Cuts in Orlando, FL" },
      { name: "description", content: "Precision fades, beard work, kids cuts and designs at Next Cut Barbershop, 1723 W Oak Ridge Rd, Orlando. Book online." },
      { property: "og:title", content: "Next Cut Barbershop — Orlando" },
      { property: "og:description", content: "Sharp cuts. Clean lines. Every time. Book your next cut online." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: HERO },
      { name: "twitter:image", content: HERO },
    ],
  }),
  component: Index,
});

const nav = [
  ["HOME", "#home"], ["SERVIÇOS", "#servicos"], ["BARBEIROS", "#barbeiros"],
  ["GALERIA", "#galeria"], ["AVALIAÇÕES", "#avaliacoes"], ["LOCALIZAÇÃO", "#localizacao"],
];

const barbers = [
  ["ALEX", "Master Barber", "Alex.webp"], ["ANYEL", "Barber", "Anyel.webp"], ["ADDIS", "Barber", "Addis.webp"],
  ["ZAPATA", "Barber", "Zapata.webp"], ["ABEL", "Barber", "Abel.webp"], ["TITO", "Barber", "Tito.webp"],
];

const gallery = [
  ["nextcut_hair9.jpeg", "ALEX"], ["nextcut_hair10.jpeg", "ANYEL"], ["nextcut_hair7.jpeg", "ADDIS"],
  ["WhatsApp-Image-2026-05-29-at-1.49.06-PM.jpeg", "ZAPATA"], ["nextcut_hair4.jpeg", "ABEL"],
  ["WhatsApp-Image-2026-05-29-at-1.48.31-PM.jpeg", "TITO"],
];

const reviews = [
  ["Best barbershop in Orlando! Clean place, great vibes and amazing cuts. 100% recommend!", "Daniel S."],
  ["The team is professional and always delivers. My go-to barbershop!", "Marcus T."],
  ["Great service, clean environment and the best fade I've ever had.", "James R."],
];

function Logo() {
  return (
    <a href="#home" className="flex flex-col leading-none">
      <span className="font-display text-2xl tracking-tight">
        NEXT<Star className="mx-0.5 inline size-4 -translate-y-0.5 fill-primary text-primary" />CUT
      </span>
      <span className="mt-1 text-[0.55rem] tracking-[0.6em] text-muted-foreground">BARBERSHOP</span>
    </a>
  );
}

function Socials() {
  return (
    <div className="flex gap-4">
      <a href={IG} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-primary"><Instagram className="size-5" /></a>
      <a href="#" aria-label="TikTok" className="hover:text-primary"><Music2 className="size-5" /></a>
      <a href="#" aria-label="Facebook" className="hover:text-primary"><Facebook className="size-5" /></a>
    </div>
  );
}

function Rating({ small }: { small?: boolean }) {
  return (
    <div className={`rounded-md border bg-background/80 text-center backdrop-blur ${small ? "px-3 py-2" : "px-5 py-4"}`}>
      <div className={`font-display ${small ? "text-xl" : "text-3xl"}`}>4.9 <Star className="inline size-4 -translate-y-1 fill-foreground" /></div>
      <div className="text-[0.6rem] tracking-widest text-muted-foreground">ON BOOKSY</div>
      {!small && <div className="mt-2 font-semibold">booksy</div>}
    </div>
  );
}

function Head({ tag, title, sub }: { tag: string; title: string; sub?: string }) {
  return (
    <div>
      <span className="tagline">{tag}</span>
      <h2 className="mt-3 font-display text-3xl uppercase md:text-4xl">{title}</h2>
      {sub && <p className="mt-2 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Index() {
  const [open, setOpen] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => track.current?.scrollBy({ left: d * 280, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <Logo />
          <nav className="hidden gap-7 lg:flex">
            {nav.map(([l, h], i) => (
              <a key={h} href={h} className={`pb-1 text-xs font-semibold tracking-wider transition hover:text-primary ${i === 0 ? "border-b-2 border-primary" : "text-muted-foreground"}`}>{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <a href={PHONE} className="hidden items-center gap-2 text-sm font-semibold md:flex"><Phone className="size-4" />(407) 610-7845</a>
            <a href={BOOK} target="_blank" rel="noreferrer" className="btn-red hidden sm:inline-flex">Book now <ArrowRight className="size-4" /></a>
            <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu"><Menu /></button>
          </div>
        </div>
        {open && (
          <nav className="flex flex-col gap-4 border-t px-5 py-5 lg:hidden">
            {nav.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="text-sm font-semibold tracking-wider">{l}</a>)}
            <a href={BOOK} className="btn-red w-fit">Book now <ArrowRight className="size-4" /></a>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden border-b">
        <img src={HERO} alt="Barber fading a client at Next Cut" className="absolute inset-0 h-full w-full object-cover object-[70%_30%]" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 md:py-36">
          <span className="tagline">Premium barbershop</span>
          <h1 className="mt-5 font-display text-5xl leading-[0.95] uppercase md:text-7xl">
            Sharp cuts.<br />Clean lines.<br />
            <span className="font-script text-6xl italic tracking-wide text-primary md:text-8xl">Every time.</span>
          </h1>
          <p className="mt-6 max-w-md text-muted-foreground">Precision fades, beard work, kids cuts and detailed designs. The Next Cut team is here to keep you looking your best.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={BOOK} target="_blank" rel="noreferrer" className="btn-red">Book now <ArrowRight className="size-4" /></a>
            <a href="#servicos" className="btn-outline">View services</a>
          </div>
        </div>
        <div className="absolute right-6 bottom-6 hidden md:block"><Rating /></div>
      </section>

      {/* STATS */}
      <section id="servicos" className="border-b">
        <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [Scissors, "HAIRCUTS", "Clean. Sharp. Professional.", "FROM $27"],
            [Smile, "BEARD", "Defined. Clean. Fresh.", "FROM $13"],
            [Package, "COMBOS", "Haircut + Beard", "FROM $40"],
          ].map(([Icon, t, s, p]: any) => (
            <div key={t} className="flex items-center gap-4 border-b px-6 py-7 sm:border-r lg:border-b-0">
              <div className="grid size-14 shrink-0 place-items-center rounded-full border border-primary/60 text-primary"><Icon className="size-6" /></div>
              <div><div className="font-bold tracking-wide">{t}</div><div className="text-xs uppercase text-muted-foreground">{s}</div><div className="mt-1 text-sm font-bold text-primary">{p}</div></div>
            </div>
          ))}
          <a href={BOOK} target="_blank" rel="noreferrer" className="group flex items-center gap-4 px-6 py-7 transition hover:bg-card">
            <CalendarCheck className="size-10 shrink-0 text-primary" />
            <div className="flex-1"><div className="font-bold tracking-wide">BOOK YOUR APPOINTMENT</div><div className="text-xs uppercase text-muted-foreground">Quick. Easy. Online.</div></div>
            <ArrowRight className="size-5 text-primary transition group-hover:translate-x-1" />
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="border-b">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-[1fr_1.3fr_1fr]">
          <div>
            <Head tag="About Next Cut" title="More than a barbershop." />
            <p className="mt-6 text-muted-foreground">We're not just cutting hair — we're building confidence. At Next Cut, you get top-tier barbers, a clean environment and a premium experience from the moment you walk in.</p>
            <a href="#barbeiros" className="btn-outline mt-8">Our story <ArrowRight className="size-4" /></a>
          </div>
          <img src={INTERIOR} alt="Next Cut barbershop interior" className="aspect-[4/3] w-full rounded-md border object-cover" />
          <ul className="space-y-7 lg:border-l lg:pl-8">
            {[
              [Users, "12+ BARBERS", "Experienced. Professional."],
              [DoorOpen, "WALK-INS WELCOME", "No appointment needed."],
              [Baby, "FAMILY FRIENDLY", "All ages. All styles."],
              [ShieldCheck, "PREMIUM GROOMING", "Because you deserve the best."],
            ].map(([Icon, t, s]: any) => (
              <li key={t} className="flex items-center gap-4">
                <div className="grid size-11 shrink-0 place-items-center rounded-full border bg-card"><Icon className="size-5" /></div>
                <div><div className="text-sm font-bold">{t}</div><div className="text-sm text-muted-foreground">{s}</div></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TEAM */}
      <section id="barbeiros" className="border-b">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Head tag="Meet the barbers" title="Our team" sub="Different styles. Same standard." />
            <a href={BOOK} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-bold tracking-wider hover:text-primary">BOOK WITH YOUR BARBER <ArrowRight className="size-4 text-primary" /></a>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {barbers.map(([n, r, f]) => (
              <div key={n} className="card-glow overflow-hidden p-3">
                <img src={IMG + f} alt={`${n}, ${r} at Next Cut`} loading="lazy" className="aspect-[4/5] w-full rounded-sm object-cover" />
                <div className="mt-3 flex items-start justify-between">
                  <div><div className="font-bold">{n}</div><div className="text-[0.65rem] uppercase text-muted-foreground">{r}</div></div>
                  <a href={IG} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-primary"><Instagram className="size-4" /></a>
                </div>
                <a href={BOOK} target="_blank" rel="noreferrer" className="btn-outline mt-3 w-full px-2 py-2">Book now <ArrowRight className="size-3" /></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="galeria" className="border-b">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-[1fr_3fr]">
          <div>
            <Head tag="Our work" title="Gallery" sub="Real cuts. Real people. Real results." />
            <a href={IG} target="_blank" rel="noreferrer" className="btn-outline mt-6">View gallery <ArrowRight className="size-4" /></a>
          </div>
          <div className="relative">
            <div ref={track} className="flex snap-x gap-4 overflow-x-auto pb-2 [scrollbar-width:none]">
              {gallery.map(([f, b]) => (
                <div key={f} className="card-glow relative w-60 shrink-0 snap-start overflow-hidden">
                  <img src={IMG + f} alt={`Haircut by ${b}`} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                  <div className="absolute inset-0 bg-bottom-overlay" />
                  <div className="absolute bottom-3 left-3"><div className="text-sm font-bold">{b}</div><div className="text-[0.6rem] uppercase text-muted-foreground">Master Barber</div></div>
                  <Instagram className="absolute right-3 bottom-4 size-4" />
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => scroll(-1)} aria-label="Previous" className="btn-outline p-2"><ChevronLeft className="size-4" /></button>
              <button onClick={() => scroll(1)} aria-label="Next" className="btn-outline p-2"><ChevronRight className="size-4" /></button>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="avaliacoes" className="border-b">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[3fr_1fr]">
          <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <Head tag="Client reviews" title="What our clients say" />
              <Rating small />
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {reviews.map(([t, a]) => (
                <div key={a} className="card-glow p-6">
                  <div className="flex gap-1 text-primary">{[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-primary" />)}</div>
                  <p className="mt-4 text-sm text-muted-foreground">"{t}"</p>
                  <div className="mt-5 text-sm font-bold">{a}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-64 overflow-hidden rounded-md border">
            <img src={IMG + "nextcut_hair4.jpeg"} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-bottom-overlay" />
            <div className="relative flex h-full flex-col justify-end p-6 text-right">
              <div className="font-display text-2xl leading-tight">REAL PEOPLE.<br />REAL RESULTS.</div>
              <div className="mt-2 text-xs tracking-[0.3em] text-primary">#NEXTCUT</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="localizacao" className="border-b">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[1fr_1.4fr_1fr_1fr]">
          <img src={INTERIOR} alt="Next Cut shop" className="h-56 w-full object-cover lg:h-full" />
          <div className="px-6 py-10">
            <span className="tagline">Ready for your next cut?</span>
            <h2 className="mt-3 font-display text-2xl md:text-3xl">BOOK YOUR APPOINTMENT</h2>
            <p className="mt-1 text-muted-foreground">Quick. Easy. Online.</p>
            <a href={BOOK} target="_blank" rel="noreferrer" className="btn-red mt-6">Book now <ArrowRight className="size-4" /></a>
          </div>
          <div className="border-t px-6 py-10 lg:border-t-0 lg:border-l">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider"><MapPin className="size-4 text-primary" />OUR LOCATION</div>
            <p className="mt-3 text-sm text-muted-foreground">1723 W Oak Ridge Rd,<br />Orlando, FL 32809</p>
            <a href={MAPS} target="_blank" rel="noreferrer" className="btn-outline mt-6">Get directions <ArrowRight className="size-4" /></a>
          </div>
          <div className="border-t px-6 py-10 lg:border-t-0 lg:border-l">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider"><Clock className="size-4 text-primary" />OPENING HOURS</div>
            <p className="mt-3 text-sm text-muted-foreground">Mon - Sat: 9:00 AM - 8:00 PM<br />Sun: 9:00 AM - 6:00 PM</p>
            <div className="mt-6"><Socials /></div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between">
        <Logo />
        <a href={PHONE} className="flex items-center gap-2 text-sm"><Phone className="size-4 text-primary" />(407) 610-7845</a>
        <div className="flex items-center gap-2 text-sm"><MapPin className="size-4 text-primary" />1723 W Oak Ridge Rd, Orlando, FL 32809</div>
        <div><div className="mb-2 text-[0.6rem] tracking-[0.3em] text-muted-foreground">FOLLOW US</div><Socials /></div>
        <p className="text-xs text-muted-foreground">© 2026 Next Cut Barbershop.<br />All rights reserved.</p>
      </footer>
    </div>
  );
}
