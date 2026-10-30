import { createFileRoute, Link } from "@tanstack/react-router";
import { BUSINESS, fullAddress } from "@/lib/business";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Next Cut Barbershop" },
      { name: "description", content: "Website terms for Next Cut Barbershop in Orlando, Florida." },
    ],
  }),
  component: TermsOfService,
});

function TermsOfService() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
        <Link to="/" className="text-sm text-primary hover:underline">← Back to Next Cut Barbershop</Link>
        <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Next Cut Barbershop</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Terms of Service</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: October 30, 2026</p>
        <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
          <section><h2 className="mb-2 text-lg font-semibold text-foreground">1. Acceptance and website use</h2><p>By accessing this website, you agree to these Terms of Service. If you do not agree, please do not use the website. You may use the website only for lawful purposes and in a way that does not interfere with its operation or other visitors.</p></section>
          <section><h2 className="mb-2 text-lg font-semibold text-foreground">2. Information on this website</h2><p>Website content is provided for general information about Next Cut Barbershop, its services, location, and ways to contact or book with us. We make reasonable efforts to keep information current, but service details, prices, promotions, staff availability, and business hours may change. Please confirm current details with the shop before relying on them.</p></section>
          <section><h2 className="mb-2 text-lg font-semibold text-foreground">3. Appointments and third-party booking</h2><p>Appointment requests and bookings may be handled through third-party services or direct communications such as WhatsApp or telephone. A link on this website may take you to a provider's platform, where that provider's terms and policies apply. An appointment is subject to confirmation and availability by the shop. Please contact us directly about cancellations, rescheduling, late arrivals, or booking questions.</p></section>
          <section><h2 className="mb-2 text-lg font-semibold text-foreground">4. Prices and services</h2><p>Prices and service descriptions displayed on the website are provided as a guide and may change without notice. Some services may require a consultation or have variable pricing. The shop will clarify applicable pricing before providing a service.</p></section>
          <section><h2 className="mb-2 text-lg font-semibold text-foreground">5. Intellectual property</h2><p>Unless otherwise indicated, website text, design, graphics, and other materials are owned by or used with permission by Next Cut Barbershop. You may not copy, reproduce, distribute, or commercially exploit website materials without prior written permission, except as permitted by law.</p></section>
          <section><h2 className="mb-2 text-lg font-semibold text-foreground">6. Third-party websites</h2><p>This website may contain links to third-party websites and services, including booking, maps, social media, messaging, and review platforms. We provide these links for convenience and are not responsible for their content, availability, policies, or practices.</p></section>
          <section><h2 className="mb-2 text-lg font-semibold text-foreground">7. Disclaimer and limitation</h2><p>This website is provided on an "as is" and "as available" basis. To the extent permitted by applicable law, Next Cut Barbershop disclaims warranties relating to uninterrupted availability, error-free operation, and the accuracy or completeness of website content. Nothing in these terms limits rights or remedies that cannot legally be limited.</p></section>
          <section><h2 className="mb-2 text-lg font-semibold text-foreground">8. Changes to these terms</h2><p>We may update these terms from time to time. The "Last updated" date above indicates when the current version was published. Continued use of the website after an update means you accept the revised terms to the extent permitted by law.</p></section>
          <section><h2 className="mb-2 text-lg font-semibold text-foreground">9. Governing law</h2><p>These terms are governed by the laws applicable in the State of Florida, United States, without regard to conflict-of-law rules, subject to any mandatory consumer protections that apply.</p></section>
          <section><h2 className="mb-2 text-lg font-semibold text-foreground">10. Contact</h2><p>For questions about these terms, contact Next Cut Barbershop at <a className="text-primary underline" href="mailto:Nextcut1723@gmail.com">Nextcut1723@gmail.com</a> or visit us at {fullAddress}.</p></section>
        </div>
      </div>
    </main>
  );
}
