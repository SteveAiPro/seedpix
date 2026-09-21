import type { Metadata } from "next";
import Link from "next/link";
import { Check, ShieldCheck, Zap, Award, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing - Simple, Transparent Credit Packages | SeedPix",
  description:
    "Simple, transparent pricing. 10 free credits on sign up. One-time credit packages with no recurring subscription traps. 100% commercial use rights.",
  alternates: { canonical: "/pricing" },
};

const PLANS = [
  {
    name: "Free",
    price: "$0",
    unit: "one-time",
    desc: "Enough for your first edit, on the house.",
    features: [
      "10 free credits on signup",
      "1 free credit daily",
      "Every tool unlocked",
      "No credit card needed",
      "Watermark-free output",
    ],
    highlighted: false,
    cta: "Sign Up Free",
    href: "/sign-up",
  },
  {
    name: "Basic",
    price: "$9.99",
    unit: "350 credits · ~35 images",
    desc: "For casual editing projects.",
    features: [
      "350 credits",
      "Generate ~35 images",
      "No watermarks",
      "Commercial use allowed",
      "Standard processing speed",
      "Best for beginners",
    ],
    highlighted: true,
    cta: "Get Started",
    href: "/sign-up?plan=basic",
  },
  {
    name: "Pro",
    price: "$29.99",
    unit: "1200 credits · ~120 images",
    desc: "Best value per credit, for regular users.",
    features: [
      "1200 credits",
      "Generate ~120 images",
      "No watermarks",
      "Commercial use allowed",
      "Priority processing",
      "Best value per credit",
    ],
    highlighted: false,
    cta: "Get Started",
    href: "/sign-up?plan=pro",
  },
  {
    name: "Premium",
    price: "$59.99",
    unit: "3000 credits · ~300 images",
    desc: "For power users and professionals.",
    features: [
      "3000 credits",
      "Generate ~300 images",
      "No watermarks",
      "Commercial use allowed",
      "Priority processing",
      "For heavy workloads",
    ],
    highlighted: false,
    cta: "Get Started",
    href: "/sign-up?plan=premium",
  },
];

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

      {/* Pricing Cards */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col rounded-2xl border p-6 ${
              plan.highlighted
                ? "border-blue-600 bg-blue-50/50 shadow-sm"
                : "border-neutral-200 bg-white"
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                Best Value
              </span>
            )}
            <h2 className="text-lg font-bold text-neutral-900">{plan.name}</h2>
            <p className="mt-2 text-xs text-neutral-500">{plan.desc}</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-neutral-900">{plan.price}</span>
              <span className="text-xs text-neutral-500">{plan.unit}</span>
            </div>
            <ul className="mt-5 flex-1 space-y-2.5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-neutral-600">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-600" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={plan.href}
              className={`mt-6 inline-block w-full rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition ${
                plan.highlighted
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                  : "border border-neutral-300 bg-white text-neutral-800 hover:border-blue-400 hover:text-blue-700"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

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
