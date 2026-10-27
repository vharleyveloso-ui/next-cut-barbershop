import { ArrowRight, Clock } from "lucide-react";
import { BUSINESS, SERVICES, GALLERY } from "@/lib/business";
import { useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";

// Give every service its own existing gallery photo. The first card uses the bald man with beard photo (gallery index 5).
const CUT_PHOTOS_BY_SERVICE: Record<string, number> = {
  "shape-beard": 5,
  "kids-regular": 1,
  "haircut-eyebrows-beard": 9,
  "haircut-beard": 0,
  "design": 2,
  "beard": 8,
  "buzz": 7,
};

export function ServiceMenu({ onPhoto, onBook }: { onPhoto: (index: number) => void; onBook: (serviceId: string) => void }) {
  const { language, t } = useLanguage();
  return <>
    <div id="cut-examples" className="mt-8 grid scroll-mt-24 grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {SERVICES.map((s) => {
        const gi = CUT_PHOTOS_BY_SERVICE[s.id] ?? 7;
        const g = GALLERY[gi];
        return <article key={s.id} data-service={s.id} className="card-glow flex min-w-0 flex-col overflow-hidden">
          {g && <Button variant="ghost" onClick={() => onPhoto(gi)} aria-label={`${t("View photo")}: ${t(g.alt)}`} className="relative h-auto w-full overflow-hidden whitespace-normal rounded-none p-0">
            <img src={g.src} alt={t(g.alt)} loading="lazy" width={480} height={600} className="aspect-[4/5] w-full bg-muted object-cover" />
          </Button>}
          <div className="flex flex-1 flex-col p-3.5 sm:p-4">
            <h3 className="text-[13px] font-semibold sm:text-[15px]">{language === "es" ? s.nameEs : s.name}</h3>
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="size-3" />{s.minutes === 60 ? t("1 hr") : `${s.minutes} ${t("minutes")}`}</p>
            <span className="mt-3 text-right font-display text-lg text-primary sm:text-xl">{s.amount === null ? t("Price varies") : s.price}</span>
            <Button type="button" onClick={() => onBook(s.id)} className="btn-red mt-4 h-auto min-h-11 w-full justify-center whitespace-normal px-2 text-xs sm:text-sm">
              {t("Book this service")} <ArrowRight className="size-4 shrink-0" />
            </Button>
          </div>
        </article>;
      })}
    </div>
    <Button asChild className="btn-red mt-8 h-auto whitespace-normal"><a href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(BUSINESS.whatsappText)}`} target="_blank" rel="noopener noreferrer">{t("Book now")}<ArrowRight className="size-4" /></a></Button>
  </>;
}
