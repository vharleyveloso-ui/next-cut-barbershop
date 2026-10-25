import { ArrowRight, Clock, Scissors } from "lucide-react";
import { BUSINESS, SERVICES, GALLERY } from "@/lib/business";
import { useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";

export function ServiceMenu({ onPhoto }: { onPhoto: (index: number) => void }) {
  const { language, t } = useLanguage();
  const examples = [0, 1, 5, 6];
  return <>
    <div className="mt-8 grid gap-x-10 lg:grid-cols-2">
      {SERVICES.map((s) => <div key={s.id} data-service={s.id} className="flex min-w-0 items-start justify-between gap-4 border-b py-4">
        <div className="min-w-0"><h3 className="text-sm font-semibold">{language === "es" ? s.nameEs : s.name}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="size-3" />{s.minutes === 60 ? t("1 hr") : `${s.minutes} min`}</p>
        </div>
        <span className="shrink-0 text-right text-sm font-semibold text-primary">{s.amount === null ? t("Price varies") : s.price}</span>
      </div>)}
    </div>
    <div id="cut-examples" className="mt-12 scroll-mt-24">
      <h3 className="flex items-center gap-2 font-display text-xl"><Scissors className="size-5 text-primary" />{t("Cut examples")}</h3>
      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        {examples.map((index) => { const g = GALLERY[index]; if (!g) return null; return <Button key={g.src} variant="ghost" onClick={() => onPhoto(index)} aria-label={`${t("View photo")}: ${t(g.alt)}`} className="card-glow relative h-auto w-full overflow-hidden whitespace-normal p-0">
          <img src={g.src} alt={t(g.alt)} loading="lazy" width={480} height={600} className="aspect-[4/5] w-full object-cover" />
          <span className="absolute inset-0 bg-bottom-overlay" />
          <span className="absolute right-3 bottom-3 left-3 text-left text-xs font-semibold uppercase">{t(g.tag)}</span>
        </Button>; })}
      </div>
      <Button asChild className="btn-red mt-6 h-auto whitespace-normal"><a href={BUSINESS.bookingUrl} target="_blank" rel="noopener noreferrer">{t("Book now")}<ArrowRight className="size-4" /></a></Button>
    </div>
  </>;
}