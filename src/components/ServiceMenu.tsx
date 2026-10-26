import { ArrowRight, Clock } from "lucide-react";
import { BUSINESS, SERVICES, GALLERY } from "@/lib/business";
import { useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";

// Gallery indexes that show real cuts (not shop interiors), cycled across the menu.
const CUT_PHOTOS = [0, 1, 2, 5, 6, 7, 8, 9, 10, 11, 12, 13];

export function ServiceMenu({ onPhoto }: { onPhoto: (index: number) => void }) {
  const { language, t } = useLanguage();
  return <>
    <div id="cut-examples" className="mt-8 grid scroll-mt-24 grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {SERVICES.map((s, i) => {
        const gi = CUT_PHOTOS[i % CUT_PHOTOS.length];
        const g = GALLERY[gi];
        return <article key={s.id} data-service={s.id} className="card-glow flex min-w-0 flex-col overflow-hidden">
          {g && <Button variant="ghost" onClick={() => onPhoto(gi)} aria-label={`${t("View photo")}: ${t(g.alt)}`} className="relative h-auto w-full overflow-hidden whitespace-normal rounded-none p-0">
            <img src={g.src} alt={t(g.alt)} loading="lazy" width={480} height={600} className="aspect-[4/5] w-full bg-muted object-cover" />
          </Button>}
          <div className="flex flex-1 flex-col p-3.5 sm:p-4">
            <h3 className="text-sm font-semibold sm:text-base">{language === "es" ? s.nameEs : s.name}</h3>
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="size-3" />{s.minutes === 60 ? t("1 hr") : `${s.minutes} ${t("minutes")}`}</p>
            <span className="mt-3 text-right font-display text-lg text-primary sm:text-xl">{s.amount === null ? t("Price varies") : s.price}</span>
          </div>
        </article>;
      })}
    </div>
    <Button asChild className="btn-red mt-8 h-auto whitespace-normal"><a href={BUSINESS.bookingUrl} target="_blank" rel="noopener noreferrer">{t("Book now")}<ArrowRight className="size-4" /></a></Button>
  </>;
}
