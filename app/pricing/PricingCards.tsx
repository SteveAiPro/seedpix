"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Loader2, Sparkles, AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react";
import { useAuth, getAccessToken } from "@/lib/auth-client";

interface PlanItem {
  id: "free" | "basic" | "pro" | "premium";
  name: string;
  price: string;
  unit: string;
  desc: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

const PLANS: PlanItem[] = [
  {
    id: "free",
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
  },
  {
    id: "basic",
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
    cta: "Buy Basic Pack",
  },
  {
    id: "pro",
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
    cta: "Buy Pro Pack",
  },
  {
    id: "premium",
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
    cta: "Buy Premium Pack",
  },
];

export default function PricingCards() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();

  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const paymentStatus = searchParams?.get("payment");

  async function handleBuy(planId: string) {
    if (planId === "free") {
      router.push("/sign-up");
      return;
    }

    if (!user) {
      router.push(`/sign-up?redirect=/pricing&plan=${planId}`);
      return;
    }

    setLoadingPlan(planId);
    setErrorMessage(null);

    try {
      const token = await getAccessToken();
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan: planId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to initiate checkout");
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Missing checkout URL from server");
      }
    } catch (err: any) {
      console.error("[PricingCards] Checkout error:", err);
      setErrorMessage(err?.message || "Checkout failed. Please try again.");
      setLoadingPlan(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Payment Success Alert */}
      {paymentStatus === "success" && (
        <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/80 p-5 text-emerald-900 shadow-sm flex items-start gap-3">
          <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-base text-emerald-950">
              Payment Successful! Your Credits Have Been Added.
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-emerald-800 leading-relaxed">
              Thank you for supporting SeedPix. Your account balance has been updated immediately. Start editing or generating high-resolution images now!
            </p>
            <div className="mt-3">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800"
              >
                Launch AI Photo Editor →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Payment Cancelled Alert */}
      {paymentStatus === "cancelled" && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-amber-900 text-xs sm:text-sm flex items-center gap-2.5">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
          <span>
            Checkout was cancelled. Your card has not been charged. You can resume whenever you are ready.
          </span>
        </div>
      )}

      {/* Error Message Alert */}
      {errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-900 text-xs sm:text-sm flex items-center gap-2.5">
          <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Pricing Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((plan) => {
          const isLoading = loadingPlan === plan.id;
          return (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl border p-6 transition-all duration-300 ${
                plan.highlighted
                  ? "border-[#FFE525]/60 bg-[#16161F] shadow-[0_0_35px_-5px_rgba(255,229,37,0.25)] ring-1 ring-[#FFE525]/40"
                  : "border-white/10 bg-[#13131A] hover:border-white/20 hover:shadow-lg"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-[#FFE525] px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-black shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-4">
                <p className="text-base font-bold text-white">{plan.name}</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold tracking-tight text-white">
                    {plan.price}
                  </span>
                  <span className="text-xs text-white/40">USD</span>
                </div>
                <p className="mt-1 text-xs font-bold text-[#FFE525]">{plan.unit}</p>
                <p className="mt-2 text-xs text-white/60">{plan.desc}</p>
              </div>

              <ul className="mb-6 flex-1 space-y-2.5 border-t border-white/5 pt-4 text-xs text-white/70">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 shrink-0 text-[#FFE525]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {plan.id === "free" ? (
                <Link
                  href="/sign-up"
                  className="block w-full rounded-xl border border-white/10 bg-white/5 py-2.5 text-center text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  {plan.cta}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => handleBuy(plan.id)}
                  disabled={isLoading}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                    plan.highlighted
                      ? "sparkpix-btn text-black"
                      : "border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Connecting Stripe...</span>
                    </>
                  ) : (
                    <span>{user ? `Buy ${plan.name}` : plan.cta}</span>
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
