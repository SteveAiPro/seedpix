import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ShieldCheck, Zap, Award, Lock } from "lucide-react";
import PricingCards from "./PricingCards";

export const metadata: Metadata = {
  title: "Pricing - Simple, Transparent Credit Packages | SeedPix",
  description:
    "Simple, transparent pricing. 10 free credits on sign up. One-time credit packages with no recurring subscription traps. 100% commercial use rights.",
  alternates: { canonical: "/pricing" },
};

const PRICING_FAQS = [
  {
    q: "Do purchased credits ever expire?",
    a: "No. Your purchased credits remain in your account balance indefinitely until you consume them. There is no expiration date.",
  },
  {
    q: "Is this a monthly subscription or a one-time purchase?",
    a: "Every paid package is a 100% one-time purchase. We do not set up recurring subscriptions, auto-renewals, or surprise charges.",
  },
  {
    q: "Can I use the images I edit or generate for commercial purposes?",
    a: "Yes. All paid packages include full worldwide commercial usage rights. You own your creations for client work, print-on-demand, e-commerce, and advertising.",
  },
  {
    q: "Can I test the tools before paying anything?",
    a: "Absolutely. When you create an account, you receive 10 free credits immediately with zero payment info required. Plus, you get 1 free credit daily.",
  },
  {
    q: "What payment methods are supported?",
    a: "We accept all major international credit and debit cards (Visa, Mastercard, American Express) processed through secure 256-bit encrypted checkout.",
  },
];

export default function PricingPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PRICING_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 text-white">
      {/* Schema JSON-LD for Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mb-12 text-center">
        <h1 className="text-3xl font-extrabold text-white md:text-5xl tracking-tight">
          Simple, Transparent Pricing
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-white/70">
          Choose the package that fits your creative needs. One-time credit
          purchases — no subscription traps, no recurring fees.
        </p>
      </div>

      {/* Interactive Pricing Cards with Stripe Checkout */}
      <Suspense
        fallback={
          <div className="flex h-64 items-center justify-center text-sm text-white/40">
            Loading credit plans...
          </div>
        }
      >
        <PricingCards />
      </Suspense>

      {/* Trust & Guarantee Banner */}
      <div className="mt-14 rounded-3xl border border-white/10 bg-[#13131A] p-6 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#FFE525]/10 p-2.5 text-[#FFE525]">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">256-Bit SSL</p>
              <p className="text-[11px] text-white/50">Secure encrypted checkout</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#42FF41]/10 p-2.5 text-[#42FF41]">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Instant Delivery</p>
              <p className="text-[11px] text-white/50">Credits credited immediately</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#FFE525]/10 p-2.5 text-[#FFE525]">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Commercial Rights</p>
              <p className="text-[11px] text-white/50">Full ownership on exports</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#42FF41]/10 p-2.5 text-[#42FF41]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Zero Recurring</p>
              <p className="text-[11px] text-white/50">No hidden subscription traps</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing FAQ Section */}
      <div className="mt-16 border-t border-white/5 pt-14">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Frequently Asked Questions</h2>
          <p className="mt-2 text-xs text-white/50">
            Everything you need to know about SeedPix credit packages and billing.
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {PRICING_FAQS.map((faq, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-[#13131A] p-5">
              <h3 className="text-sm font-bold text-white">{faq.q}</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/70">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
