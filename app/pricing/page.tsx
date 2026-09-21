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
    <div className="mx-auto max-w-6xl px-4 py-14">
      {/* Schema JSON-LD for Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 md:text-4xl">
          Simple, Transparent Pricing
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600 md:text-base">
          Choose the package that fits your creative needs. One-time credit
          purchases — no subscription traps, no recurring fees.
        </p>
      </div>

      {/* Interactive Pricing Cards with Stripe Checkout */}
      <Suspense
        fallback={
          <div className="flex h-64 items-center justify-center text-sm text-neutral-400">
            Loading credit plans...
          </div>
        }
      >
        <PricingCards />
      </Suspense>

      {/* Trust & Guarantee Banner */}
      <div className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-900">256-Bit SSL</p>
              <p className="text-[11px] text-neutral-500">Secure encrypted checkout</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-2 text-green-600">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-900">Instant Delivery</p>
              <p className="text-[11px] text-neutral-500">Credits credited immediately</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-100 p-2 text-purple-600">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-900">Commercial Rights</p>
              <p className="text-[11px] text-neutral-500">Full ownership on exports</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-amber-100 p-2 text-amber-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-900">Zero Recurring</p>
              <p className="text-[11px] text-neutral-500">No hidden subscription traps</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing FAQ Section */}
      <div className="mt-16 border-t border-neutral-200 pt-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-neutral-900">Frequently Asked Questions</h2>
          <p className="mt-2 text-xs text-neutral-500">
            Everything you need to know about SeedPix credit packages and billing.
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {PRICING_FAQS.map((faq, idx) => (
            <div key={idx} className="rounded-xl border border-neutral-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-neutral-900">{faq.q}</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
