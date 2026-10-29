import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";

export function CutFinder() {
  const { t } = useLanguage();
  const [text, setText] = useState("");

  const recommendationEmail = `mailto:Nextcut1723@gmail.com?subject=${encodeURIComponent("Haircut request - Next Cut Barbershop")}&body=${encodeURIComponent([
    "Hi Next Cut Barbershop,",
    "",
    "I'd like to ask about this haircut:",
    "",
    text.trim(),
    "",
    "Please let me know which service fits best and what appointment times are available.",
    "Thank you!",
  ].join("\n"))}`;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={(e) => { e.preventDefault(); if (text.trim().length >= 5) window.location.href = recommendationEmail; }} className="card-glow p-5 hover:transform-none">
        <label htmlFor="cut-desc" className="text-sm font-semibold">{t("Describe the cut you want")}</label>
        <textarea
          id="cut-desc" value={text} onChange={(e) => setText(e.target.value)} maxLength={600} rows={4}
          placeholder={t("e.g. Low skin fade, a little longer on top, and clean up my beard line")}
          className="mt-3 w-full resize-none rounded-sm border bg-background p-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
        <Button type="submit" disabled={text.trim().length < 5} className="btn-red mt-4 h-auto whitespace-normal disabled:opacity-50">
          <Mail className="size-4" /> {t("Email my haircut request")} <ArrowRight className="size-4" />
        </Button>
      </form>
      <div className="flex flex-col justify-center" aria-live="polite">
        <p className="text-muted-foreground">{t("Describe the haircut you want, then send your request directly to our email. We'll help you choose the right service.")}</p>
        <p className="mt-4 text-sm text-muted-foreground">{t("Your email app will open with your message ready to send.")}</p>
      </div>
    </div>
  );
}
