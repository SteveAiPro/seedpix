import type { Metadata } from "next";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing - Simple, Transparent Credit Packages",
  description:
    "Simple, transparent pricing. Choose the package that fits your needs. Free 5 credits to start, no subscription, no credit card needed.",
  alternates: { canonical: "/pricing" },
};

const PLANS = [
  {
    name: "Free",
    price: "$0",
    unit: "one-time",
    desc: "Try SeedPix with a taste of credits.",
    features: [
      "5 free credits on signup",
      "1 free credit daily",
      "Try any tool",
      "No credit card needed",
      "Outputs include watermark",
    ],
    highlighted: false,
    cta: "Sign Up Free",
  },
  {
    name: "Basic",
    price: "$9.99",
    unit: "350 credits · ~70 images",
    desc: "For casual editing projects.",
    features: [
      "350 credits",
      "Generate ~70 images",
      "No watermarks",
      "Commercial use allowed",
      "Standard processing speed",
      "Best for beginners",
    ],
    highlighted: true,
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "$29.99",
    unit: "1200 credits · ~240 images",
    desc: "Best value per credit, for regular users.",
    features: [
      "1200 credits",
      "Generate ~240 images",
      "No watermarks",
      "Commercial use allowed",
      "Priority processing",
      "Best value per credit",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Premium",
    price: "$59.99",
    unit: "3000 credits · ~600 images",
    desc: "For power users and professionals.",
    features: [
      "3000 credits",
      "Generate ~600 images",
      "No watermarks",
      "Commercial use allowed",
      "Priority processing",
      "For heavy workloads",
    ],
    highlighted: false,
    cta: "Get Started",
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 md:text-4xl">
          Simple, Transparent Pricing
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600 md:text-base">
          Choose the package that fits your creative needs. One-time credit
          purchases — no subscription, no recurring fees.
        </p>
      </div>

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
            <button
              className={`mt-6 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                plan.highlighted
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "border border-neutral-300 text-neutral-800 hover:border-blue-400 hover:text-blue-700"
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-neutral-400">
        All paid plans include commercial use rights. Uploads are deleted within
        3 days — your results are yours to keep.
      </p>
    </div>
  );
}
