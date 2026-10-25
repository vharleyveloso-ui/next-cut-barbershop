import { useEffect, useRef } from "react";
import { ArrowRight, Clock, ReceiptText, X } from "lucide-react";
import { BUSINESS, SERVICES } from "@/lib/business";
import { useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

// Full price list opened from the navbar, the mobile menu and the mobile action bar.
// It reads the same SERVICES array the services section uses, so prices never diverge.
export function PriceList({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { language, t } = useLanguage();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="price-list-title"
      className="fixed inset-0 z-[70] flex items-end justify-center bg-background/85 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-xl border bg-card sm:max-h-[80vh] sm:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b px-5 py-4">
          <div>
            <span className="tagline">{t("Full price list")}</span>
            <h3 id="price-list-title" className="mt-2 font-display text-xl sm:text-2xl">{t("All prices")}</h3>
          </div>
          <Button ref={closeRef as never} variant="ghost" onClick={onClose} aria-label={t("Close price list")} className="btn-outline shrink-0 p-2">
            <X className="size-5" />
          </Button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5">
          <ul>
            {SERVICES.map((s) => (
              <li key={s.id} data-price-row={s.id} className="flex min-w-0 items-start justify-between gap-4 border-b py-3.5">
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold">{language === "es" ? s.nameEs : s.name}</h4>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3" />{s.minutes === 60 ? t("1 hr") : `${s.minutes} min`}
                  </p>
                </div>
                <span className="shrink-0 text-right text-sm font-semibold text-primary">
                  {s.amount === null ? t("Price varies") : s.price}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t px-5 py-4">
          <a href={BUSINESS.bookingUrl} {...ext} className="btn-red">{t("Book now")} <ArrowRight className="size-4" /></a>
          <Button asChild variant="outline" className="btn-outline"><a href="#cut-examples" onClick={onClose}><ReceiptText className="size-4" />{t("See cut examples")}</a></Button>
        </div>
      </div>
    </div>
  );
}
