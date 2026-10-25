import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { BARBERS, SERVICES } from "./business";

export type Recommendation =
  | { ok: true; serviceId: string; barber: string | null; reason: string }
  | { ok: false; error: string };

export const recommendCut = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ description: z.string().trim().min(5).max(600), language: z.enum(["en", "es"]).default("en") }).parse(d))
  .handler(async ({ data }): Promise<Recommendation> => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { ok: false, error: "The style assistant isn't configured yet." };
    const { createOpenAI } = await import("@ai-sdk/openai");
    const { streamText } = await import("ai");
    const openai = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey: key,
      headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });
    const barbers = BARBERS.map((b) => `${b.name}: ${b.specialties.length ? b.specialties.join(", ") : "no specialties listed"}`).join("\n");
    const services = SERVICES.map((s) => `${s.id}: ${s.name} (${s.price}; ${s.note})`).join("\n");
    try {
      const result = streamText({
        model: openai.responses("openai/gpt-6-astra"),
        maxRetries: 0,
        system: `You are the booking helper for Next Cut Barbershop in Orlando. Pick the single best service for the client's described haircut.
Services:\n${services}\nBarbers and confirmed specialties:\n${barbers}
Only recommend a barber whose listed specialties clearly match; otherwise barber must be null. Never invent specialties.
Reply with ONLY JSON: {"serviceId": string, "barber": string|null, "reason": string (max 2 short sentences, in ${data.language === "es" ? "Spanish" : "English"})}`,
        prompt: data.description,
        providerOptions: { openai: { forceReasoning: true, reasoningEffort: "low", reasoningSummary: "auto", store: false, include: ["reasoning.encrypted_content"] } },
      });
      const text = await result.text;
      const parsed = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));
      const service = SERVICES.find((s) => s.id === parsed.serviceId) ?? SERVICES[0];
      const barber = BARBERS.find((b) => b.name === parsed.barber && b.specialties.length)?.name ?? null;
      return { ok: true, serviceId: service.id, barber, reason: String(parsed.reason ?? "").slice(0, 300) };
    } catch (e: any) {
      const status = e?.statusCode ?? e?.status;
      console.error("recommendCut failed", status, e?.message);
      if (status === 429) return { ok: false, error: "Too many requests right now — please try again in a minute." };
      if (status === 402 || status === 403) return { ok: false, error: "The style assistant is temporarily unavailable." };
      return { ok: false, error: "Couldn't get a recommendation. Please try again." };
    }
  });
