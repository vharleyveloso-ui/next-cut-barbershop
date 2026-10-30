import { createFileRoute, Link } from "@tanstack/react-router";
import { fullAddress } from "@/lib/business";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Next Cut Barbershop" },
      { name: "description", content: "Learn how Next Cut Barbershop handles information when you visit our website or contact us." },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
        <Link to="/" className="text-sm text-primary hover:underline">← Back to Next Cut Barbershop</Link>
        <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Next Cut Barbershop</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: October 30, 2026</p>
        <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
          <section><h2 className="mb-2 text-lg font-semibold text-foreground">1. About this policy</h2><p>This Privacy Policy explains how Next Cut Barbershop ("we," "us," or "our") handles information when you visit this website, contact us, or use links and services made available through it. Our business is located at {fullAddress}.</p></section>
          <section><h2 className="mb-2 text-lg font-semibold text-foreground">2. Information you choose to provide</h2><p>If you contact us by phone, email, WhatsApp, or a third-party booking service, you may provide information such as your name, contact details, appointment preferences, and the contents of your message. Please avoid sending sensitive personal information unless it is necessary for your request.</p></section>
          <section><h2 className="mb-2 text-lg font-semibold text-foreground">3. How information is used</h2><p>Information you provide may be used to respond to inquiries, coordinate or manage appointments, provide requested services, communicate changes, and operate and improve our customer service. We do not sell personal information.</p></section>
          <section><h2 className="mb-2 text-lg font-semibold text-foreground">4. Third-party services and links</h2><p>This website may link to or use services operated by third parties, including online booking, maps, social networks, messaging, or review platforms. When you follow those links or use those services, their own privacy policies and terms apply. We do not control how independent providers collect or use information.</p><p className="mt-2">If Google Analytics, advertising tags, or other analytics technologies are enabled on this website in the future, this policy should be updated to describe the specific tools, data collected, purposes, and available consent choices before those tools are used.</p></section>
          <section><h2 className="mb-2 text-lg font-semibold text-foreground">5. Cookies and similar technologies</h2><p>Some website functions or third-party services may use cookies or similar technologies. Your browser may allow you to manage or block cookies. Blocking certain technologies may affect how external services or website features work. We do not make a claim here that a particular analytics or advertising cookie is currently active.</p></section>
          <section><h2 className="mb-2 text-lg font-semibold text-foreground">6. Data retention and security</h2><p>We retain information only for as long as reasonably needed for the purposes described above, to provide services, resolve issues, and meet applicable legal obligations. We use reasonable safeguards, but no method of transmission or storage is completely secure.</p></section>
          <section><h2 className="mb-2 text-lg font-semibold text-foreground">7. Children's privacy</h2><p>This website is intended for a general audience. We do not knowingly request personal information directly from children under 13. A parent or guardian who believes a child has provided information may contact us to request that it be reviewed.</p></section>
          <section><h2 className="mb-2 text-lg font-semibold text-foreground">8. Your choices and privacy requests</h2><p>Depending on where you live, you may have rights to request access to, correction of, or deletion of certain personal information, or to object to certain processing. Contact us and we will review your request under applicable law.</p></section>
          <section><h2 className="mb-2 text-lg font-semibold text-foreground">9. Changes to this policy</h2><p>We may update this policy when our practices or legal requirements change. The "Last updated" date above indicates when the current version was published.</p></section>
          <section><h2 className="mb-2 text-lg font-semibold text-foreground">10. Contact</h2><p>For privacy questions or requests, contact Next Cut Barbershop at <a className="text-primary underline" href="mailto:Nextcut1723@gmail.com">Nextcut1723@gmail.com</a> or visit us at {fullAddress}.</p></section>
        </div>
      </div>
    </main>
  );
}
