import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight, Phone, Star, Scissors, Smile, Package, CalendarCheck, Users, DoorOpen, Baby, ShieldCheck,
  Instagram, Facebook, MapPin, Clock, Music2, ChevronLeft, ChevronRight, Menu, X, Navigation, MessageCircle, ReceiptText,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BUSINESS, BARBERS, GALLERY, PROMOTIONS, fullAddress } from "@/lib/business";
import { CutFinder } from "@/components/CutFinder";
import { ServiceMenu } from "@/components/ServiceMenu";
import { PriceList } from "@/components/PriceList";
import { LanguageProvider, useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";

const B = BUSINESS;
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BarberShop",
  name: B.name,
  telephone: "+1-407-610-7845",
  image: B.heroImage,
  address: { "@type": "PostalAddress", streetAddress: B.street, addressLocality: B.city, addressRegion: B.region, postalCode: B.zip, addressCountry: "US" },
  openingHoursSpecification: B.hours.map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.schema, opens: h.opens, closes: h.closes })),
  sameAs: [B.instagram, B.facebook, B.tiktok].filter(Boolean),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Next Cut Barbershop — Barbers in Orlando, FL | Book Online" },
      { name: "description", content: `Fades, scissor cuts, beard work and kids cuts at Next Cut Barbershop, ${fullAddress}. Walk-ins welcome. Book online.` },
      { property: "og:title", content: "Next Cut Barbershop — Orlando, FL" },
      { property: "og:description", content: "Sharp cuts. Clean lines. Every time. Book your next cut online." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: B.heroImage },
      { name: "twitter:image", content: B.heroImage },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});

const nav: [string, string][] = [
  ["Home", "#home"], ["Services", "#services"], ["Barbers", "#barbers"],
  ["Gallery", "#gallery"], ["Reviews", "#reviews"], ["Location", "#location"],
];

function Logo() {
  const { t } = useLanguage();
  return (
    <a href="#home" className="flex flex-col leading-none" aria-label={t("Next Cut Barbershop home")}>
      <span className="font-display whitespace-nowrap text-base tracking-normal sm:text-2xl">
        NEXT<Star className="mx-0.5 inline size-4 -translate-y-0.5 fill-primary text-primary" />CUT
      </span>
      <span className="mt-1 text-[0.5rem] tracking-[0.3em] text-muted-foreground sm:text-[0.55rem] sm:tracking-[0.6em]">BARBERSHOP</span>
    </a>
  );
}

function Socials() {
  const { t } = useLanguage();
  const items = [
    [B.instagram, "Instagram", Instagram], [B.tiktok, "TikTok", Music2], [B.facebook, "Facebook", Facebook],
  ].filter(([u]) => u) as [string, string, typeof Instagram][];
  return (
    <div className="flex gap-4">
      {items.map(([u, l, I]) => <a key={l} href={u} {...ext} aria-label={`${t("Next Cut on")} ${l}`} className="grid size-10 place-items-center rounded-full border transition hover:border-primary hover:text-primary"><I className="size-4" /></a>)}
    </div>
  );
}

function Head({ tag, title, sub }: { tag: string; title: string; sub?: string }) {
  const { t } = useLanguage();
  return (
    <div>
      <span className="tagline">{t(tag)}</span>
      <h2 className="mt-3 font-display text-3xl md:text-4xl">{t(title)}</h2>
      {sub && <p className="mt-2 text-muted-foreground">{t(sub)}</p>}
    </div>
  );
}

function Lightbox({ index, onClose, onMove }: { index: number; onClose: () => void; onMove: (d: number) => void }) {
  const { t } = useLanguage();
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight") onMove(1); if (e.key === "ArrowLeft") onMove(-1); };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose, onMove]);
  const g = GALLERY[index];
  if (!g) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={t("Photo viewer")} className="fixed inset-0 z-[60] grid place-items-center bg-background/95 p-4" onClick={onClose}>
      <img src={g.src} alt={t(g.alt)} className="max-h-[85vh] max-w-full rounded-md object-contain" onClick={(e) => e.stopPropagation()} />
      <Button variant="ghost" onClick={onClose} aria-label={t("Close photo")} className="btn-outline absolute top-4 right-4 p-2"><X className="size-5" /></Button>
      <Button variant="ghost" onClick={(e) => { e.stopPropagation(); onMove(-1); }} aria-label={t("Previous photo")} className="btn-outline absolute left-3 p-2"><ChevronLeft className="size-5" /></Button>
      <Button variant="ghost" onClick={(e) => { e.stopPropagation(); onMove(1); }} aria-label={t("Next photo")} className="btn-outline absolute right-3 p-2"><ChevronRight className="size-5" /></Button>
    </div>
  );
}

function Index() {
  return <LanguageProvider><Page /></LanguageProvider>;
}

function Page() {
  const { t, language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [lb, setLb] = useState<number | null>(null);
  const [pricesOpen, setPricesOpen] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => track.current?.scrollBy({ left: d * 280, behavior: "smooth" });
  const team = useRef<HTMLElement>(null);
  const [teamVisible, setTeamVisible] = useState(false);
  useEffect(() => {
    const element = team.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { setTeamVisible(true); observer.disconnect(); }
    }, { threshold: 0.08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const wa = B.whatsapp ? `https://wa.me/${B.whatsapp}?text=${encodeURIComponent(B.whatsappText)}` : "";

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <Logo />
          <nav className="hidden gap-5 xl:flex" aria-label={t("Main")}>
            {nav.map(([l, h]) => <a key={h} href={h} className="pb-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase transition hover:text-primary">{t(l)}</a>)}
          </nav>
          <div className="flex items-center gap-2 sm:gap-4">
            <div role="group" aria-label={t("Language / Idioma")} className="flex shrink-0 gap-0.5">
              {(["en", "es"] as const).map((code) => <Button key={code} variant={language === code ? "default" : "ghost"} size="sm" onClick={() => setLanguage(code)} aria-pressed={language === code} aria-label={code === "en" ? "English" : "Español"} className="h-10 px-2">{code.toUpperCase()}</Button>)}
            </div>
            <Button variant="outline" className="btn-outline hidden lg:inline-flex" onClick={() => setPricesOpen(true)}><ReceiptText className="size-4" />{t("Prices")}</Button>
            <a href={B.phoneHref} className="hidden items-center gap-2 text-sm font-semibold md:flex"><Phone className="size-4" />{B.phoneDisplay}</a>
            <a href={B.bookingUrl} {...ext} className="btn-red hidden sm:inline-flex">{t("Book now")} <ArrowRight className="size-4" /></a>
            <Button variant="ghost" className="grid size-11 place-items-center xl:hidden" onClick={() => setOpen(!open)} aria-label={t(open ? "Close menu" : "Open menu")} aria-expanded={open}>{open ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {open && (
          <nav className="flex flex-col border-t px-5 py-3 xl:hidden" aria-label={t("Mobile")}>
            {nav.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="py-3 text-sm font-semibold tracking-wider uppercase">{t(l)}</a>)}
            <button type="button" onClick={() => { setOpen(false); setPricesOpen(true); }} className="flex items-center gap-2 py-3 text-left text-sm font-semibold tracking-wider uppercase"><ReceiptText className="size-4 text-primary" />{t("Prices")}</button>
            <a href={B.phoneHref} className="flex items-center gap-2 py-3 text-sm font-semibold"><Phone className="size-4 text-primary" />{B.phoneDisplay}</a>
            <div className="border-t py-3"><Socials /></div>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden border-b">
        <img src={B.heroImage} alt={t("Barber finishing a fade at Next Cut Barbershop in Orlando")} width={1600} height={1000} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[70%_30%]" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="reveal relative mx-auto max-w-7xl px-5 py-20 md:py-32">
          <span className="tagline">{t("Barbershop · Orlando, FL")}</span>
          <h1 className="mt-5 font-display text-[2rem] leading-[1.1] sm:text-4xl md:text-6xl">
            {t("Sharp cuts.")}<br />{t("Clean lines.")}<br />
            <span className="font-script text-[2.5rem] text-primary sm:text-5xl md:text-7xl">{t("Every time.")}</span>
          </h1>
          <p className="mt-6 max-w-md text-muted-foreground">{t("Next Cut Barbershop is Orlando's spot for fades, scissor cuts, beard work and kids cuts. Book online in a minute or walk right in.")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={B.bookingUrl} {...ext} className="btn-red">{t("Book now")} <ArrowRight className="size-4" /></a>
            <a href={B.mapsUrl} {...ext} className="btn-outline bg-background/40"><Navigation className="size-4" />{t("Get directions")}</a>
            <Button asChild variant="outline" className="btn-outline h-auto whitespace-normal bg-background/40"><a href="#services"><Scissors className="size-4" />{t("Prices & cut examples")}</a></Button>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4 text-primary" />{fullAddress}</p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-20 border-b">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Head tag="Services & prices" title="What we do" />
            <a href={B.bookingUrl} {...ext} className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase hover:text-primary"><CalendarCheck className="size-4 text-primary" />{t("See full menu & book")}</a>
          </div>
          <ServiceMenu onPhoto={setLb} />
          {PROMOTIONS.length > 0 && (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {PROMOTIONS.map((p) => (
                <div key={p.days + p.text} className="rounded-md border border-primary/60 bg-card p-5">
                  <div className="text-xs font-semibold tracking-wider text-primary uppercase">{p.days}</div>
                  <div className="mt-1 font-semibold">{p.text} — <span className="text-primary">{p.price}</span></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* AI CUT FINDER */}
      <section id="cut-finder" className="scroll-mt-20 border-b">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <Head tag="Not sure what to book?" title="Find your cut" sub="Describe the look you want and our style assistant suggests the right service." />
          <div className="mt-8"><CutFinder /></div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="border-b">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 [&>*]:min-w-0 [&_h2]:break-words lg:grid-cols-[1fr_1.3fr_1fr]">
          <div className="reveal">
            <Head tag="About Next Cut" title="More than a barbershop." />
            <p className="mt-6 text-muted-foreground">{t("We're not just cutting hair \u2014 we're building confidence. At Next Cut, you get skilled barbers, a clean shop and a premium experience from the moment you walk in.")}</p>
            <a href="#barbers" className="btn-outline mt-8">{t("Meet the team")} <ArrowRight className="size-4" /></a>
          </div>
          <img src={B.interiorImage} alt={t("Inside Next Cut Barbershop")} width={1200} height={900} loading="lazy" className="reveal aspect-[4/3] w-full rounded-md border object-cover" />
          <ul className="space-y-7 lg:border-l lg:pl-8">
            {[
              [Users, `${BARBERS.length} ${t("barbers")}`, "Experienced. Professional."],
              [DoorOpen, "Walk-ins welcome", "No appointment needed."],
              [Baby, "Family friendly", "All ages. All styles."],
              [ShieldCheck, "Premium grooming", "Because you deserve the best."],
            ].map(([Icon, label, description]: any) => (
              <li key={label} className="reveal flex items-center gap-4">
                <div className="grid size-11 shrink-0 place-items-center rounded-full border bg-card"><Icon className="size-5" /></div>
                <div><div className="text-sm font-semibold uppercase">{t(label)}</div><div className="text-sm text-muted-foreground">{t(description)}</div></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TEAM */}
      <section ref={team} id="barbers" className={`scroll-mt-20 border-b ${teamVisible ? "team-in-view" : ""}`}>
        <div className="mx-auto max-w-7xl px-5 py-20">
          <Head tag="Meet the barbers" title="Our team" sub="Different styles. Same standard. Choose your barber in the booking app." />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
            {BARBERS.map((b) => (
              <div key={b.name} className="barber-card card-glow flex flex-col overflow-hidden p-2.5 sm:p-3">
                <img src={b.photo} alt={`${b.name}, ${t("barber at Next Cut")}`} width={400} height={500} loading="lazy" className="aspect-[4/5] w-full rounded-sm bg-muted object-cover object-top" />
                <div className="mt-3 font-semibold">{b.name}</div>
                <div className="text-[0.65rem] text-muted-foreground uppercase">{t("Barber")}</div>
                <a href={b.bookingUrl ?? B.bookingUrl} {...ext} className="btn-outline mt-3 min-h-11 w-full flex-wrap gap-1 px-1 py-2.5 text-center text-[0.62rem] tracking-normal">{t("Book with")} {b.name}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="scroll-mt-20 border-b">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 [&>*]:min-w-0 lg:grid-cols-[1fr_3fr]">
          <div>
            <Head tag="Our work" title="Gallery" sub="Real cuts from our chairs. Tap a photo to view it." />
            <a href={B.instagram} {...ext} className="btn-outline mt-6"><Instagram className="size-4" />{t("More on Instagram")}</a>
            <a href={B.tiktok} {...ext} className="btn-outline mt-3"><Music2 className="size-4" />{t("Follow on TikTok")}</a>
          </div>
          <div>
            <div ref={track} className="flex snap-x gap-4 overflow-x-auto pb-2 [scrollbar-width:none]">
              {GALLERY.map((g, i) => (
                <Button variant="ghost" key={g.src} onClick={() => setLb(i)} aria-label={`${t("View photo")}: ${t(g.alt)}`} className="card-glow relative h-auto w-56 shrink-0 snap-start overflow-hidden whitespace-normal p-0 text-left sm:w-60">
                  <img src={g.src} alt={t(g.alt)} width={480} height={600} loading="lazy" className="aspect-[4/5] w-full bg-muted object-cover" />
                  <div className="absolute inset-0 bg-bottom-overlay" />
                  <div className="absolute bottom-3 left-3 text-xs font-semibold tracking-wider uppercase">{t(g.tag)}</div>
                </Button>
              ))}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => scroll(-1)} aria-label={t("Scroll gallery left")} className="btn-outline p-2.5"><ChevronLeft className="size-4" /></Button>
              <Button variant="ghost" onClick={() => scroll(1)} aria-label={t("Scroll gallery right")} className="btn-outline p-2.5"><ChevronRight className="size-4" /></Button>
            </div>
          </div>
        </div>
      </section>
      {lb !== null && <Lightbox index={lb} onClose={() => setLb(null)} onMove={(d) => setLb((lb + d + GALLERY.length) % GALLERY.length)} />}

      {/* REVIEWS */}
      <section id="reviews" className="scroll-mt-20 border-b">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-20 lg:grid-cols-[2fr_1fr]">
          <div className="reveal">
            <Head tag="Client reviews" title="What our clients say" sub="Read what real customers say about Next Cut on Google — and leave your own after your cut." />
            <a href={B.reviewsUrl} {...ext} className="btn-red mt-8"><Star className="size-4 fill-current" />{t("Read our Google reviews")}</a>
          </div>
          <div className="relative min-h-56 overflow-hidden rounded-md border">
            <img src={GALLERY[0]?.src} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-bottom-overlay" />
            <div className="relative flex h-full min-h-56 flex-col justify-end p-6 text-right">
              <div className="font-display text-2xl leading-tight">{t("REAL PEOPLE.")}<br />{t("REAL RESULTS.")}</div>
              <div className="mt-2 text-xs tracking-[0.3em] text-primary">#NEXTCUT</div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="scroll-mt-20 border-b">
        <div className="mx-auto grid max-w-7xl [&>*]:min-w-0 lg:grid-cols-[1fr_1.4fr_1fr_1fr]">
          <img src={B.interiorImage} alt={t("Next Cut Barbershop storefront area")} loading="lazy" className="h-56 w-full object-cover lg:h-full" />
          <div className="px-6 py-10">
            <span className="tagline">{t("Ready for your next cut?")}</span>
            <h2 className="mt-3 font-display text-xl sm:text-2xl md:text-3xl">{t("Book your appointment")}</h2>
            <p className="mt-1 text-muted-foreground">{t("Online booking or walk-ins welcome.")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={B.bookingUrl} {...ext} className="btn-red">{t("Book now")} <ArrowRight className="size-4" /></a>
              <a href={B.phoneHref} className="btn-outline"><Phone className="size-4" />{B.phoneDisplay}</a>
            </div>
          </div>
          <div className="border-t px-6 py-10 lg:border-t-0 lg:border-l">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase"><MapPin className="size-4 text-primary" />{t("Our location")}</div>
            <address className="mt-3 text-sm text-muted-foreground not-italic">{B.street},<br />{B.city}, {B.region} {B.zip}</address>
            <a href={B.mapsUrl} {...ext} className="btn-outline mt-6"><Navigation className="size-4" />{t("Get directions")}</a>
          </div>
          <div className="border-t px-6 py-10 lg:border-t-0 lg:border-l">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase"><Clock className="size-4 text-primary" />{t("Opening hours")}</div>
            <dl className="mt-3 space-y-1 text-sm">
              {B.hours.map((h) => <div key={h.days} className="flex justify-between gap-4"><dt className="text-muted-foreground">{t(h.days)}</dt><dd>{h.time}</dd></div>)}
            </dl>
            <div className="mt-6"><Socials /></div>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between">
        <Logo />
        <a href={B.phoneHref} className="flex items-center gap-2 text-sm"><Phone className="size-4 text-primary" />{B.phoneDisplay}</a>
        <a href={B.mapsUrl} {...ext} className="flex items-center gap-2 text-sm hover:text-primary"><MapPin className="size-4 text-primary" />{fullAddress}</a>
        <Socials />
        <p className="text-xs text-muted-foreground">© 2026 Next Cut Barbershop.<br />{t("All rights reserved.")}</p>
      </footer>

      {/* Mobile sticky actions */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_auto_auto_auto] gap-2 border-t bg-background/95 p-3 backdrop-blur lg:hidden">
        <a href={B.bookingUrl} {...ext} className="btn-red justify-center">{t("Book now")} <ArrowRight className="size-4" /></a>
        <Button variant="outline" className="btn-outline px-3.5" onClick={() => setPricesOpen(true)} aria-label={t("All prices")}><ReceiptText className="size-4" /></Button>
        <a href={B.mapsUrl} {...ext} aria-label={t("Get directions")} className="btn-outline px-3.5"><Navigation className="size-4" /></a>
        <a href={B.phoneHref} aria-label={`${t("Call")} ${B.phoneDisplay}`} className="btn-outline px-3.5"><Phone className="size-4" /></a>
      </div>
      {wa && (
        <a href={wa} {...ext} aria-label={t("Chat with Next Cut on WhatsApp")} className="fixed right-4 bottom-20 z-40 grid size-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow lg:bottom-6">
          <MessageCircle className="size-5" />
        </a>
      )}
    </div>
  );
}
