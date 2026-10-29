import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Loader2, Wand2 } from "lucide-react";
import { recommendCut, type Recommendation } from "@/lib/recommend.functions";
import { BUSINESS, SERVICES } from "@/lib/business";
import { useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";

export function CutFinder() {
  const { t, language } = useLanguage();
  const run = useServerFn(recommendCut);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<Recommendation | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (text.trim().length < 5 || loading) return;
    setLoading(true);
    setRes(null);
    try {
      setRes(await run({ data: { description: text, language } }));
    } catch {
      setRes({ ok: false, error: "Couldn't get a recommendation. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  const service = res?.ok ? SERVICES.find((s) => s.id === res.serviceId) : null;
  const name = service ? (language === "es" ? service.nameEs : service.name) : "";
  const recommendationEmail = service && res?.ok
    ? `mailto:Nextcut1723@gmail.com?subject=${encodeURIComponent("Haircut recommendation request - Next Cut Barbershop")}&body=${encodeURIComponent([
        "Hi Next Cut Barbershop,",
        "",
        "I'd like to ask about the recommended service.",
        "",
        `What I'm looking for: ${text}`,
        `Recommended service: ${name}`,
        `Price: ${service.price}`,
        `Estimated duration: ${service.minutes} minutes`,
        `Recommended barber: ${res.barber ?? "Any available barber"}`,
        "",
        "Please let me know availability. Thank you!",
      ].join("\\n"))}`
    : "mailto:Nextcut1723@gmail.com";

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={submit} className="card-glow p-5 hover:transform-none">
        <label htmlFor="cut-desc" className="text-sm font-semibold">{t("Describe the cut you want")}</label>
        <textarea
          id="cut-desc" value={text} onChange={(e) => setText(e.target.value)} maxLength={600} rows={4}
          placeholder={t("e.g. Low skin fade, a little longer on top, and clean up my beard line")}
          className="mt-3 w-full resize-none rounded-sm border bg-background p-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
        <Button type="submit" disabled={loading || text.trim().length < 5} className="btn-red mt-4 h-auto whitespace-normal disabled:opacity-50">
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Wand2 className="size-4" />} {t("Get my recommendation")}
        </Button>
      </form>
      <div aria-live="polite" className="flex flex-col justify-center">
        {!res && !loading && <p className="text-muted-foreground">{t("Tell us what you're after and we'll suggest the right service to book.")}</p>}
        {loading && <p className="text-muted-foreground">{t("Thinking about your cut…")}</p>}
        {res && !res.ok && <p className="text-primary">{t(res.error)}</p>}
        {res?.ok && service && (
          <div className="rounded-md border border-primary/60 bg-card p-6">
            <span className="tagline">{t("We recommend")}</span>
            <div className="mt-3 font-display text-2xl">{name}</div>
            <div className="text-sm font-semibold text-primary">{t(service.price)} · {service.minutes} min</div>
            <p className="mt-3 text-sm text-muted-foreground">{res.reason}</p>
            <p className="mt-3 text-sm">{t("Barber")}: <span className="font-semibold">{res.barber ?? t("Any available barber")}</span></p>
            <a href={recommendationEmail} className="btn-red mt-5">{t("Email my recommendation")} <ArrowRight className="size-4" /></a>
          </div>
        )}
      </div>
    </div>
  );
}
