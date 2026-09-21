import Stripe from "stripe";

export interface PaymentPlan {
  id: "basic" | "pro" | "premium";
  name: string;
  priceCents: number;
  priceFormatted: string;
  credits: number;
  description: string;
}

export const PAYMENT_PLANS: Record<string, PaymentPlan> = {
  basic: {
    id: "basic",
    name: "SeedPix Basic Credit Pack",
    priceCents: 999, // $9.99
    priceFormatted: "$9.99",
    credits: 350,
    description: "350 AI Credits (~35 high-res image edits or generations)",
  },
  pro: {
    id: "pro",
    name: "SeedPix Pro Credit Pack",
    priceCents: 2999, // $29.99
    priceFormatted: "$29.99",
    credits: 1200,
    description: "1200 AI Credits (~120 high-res image edits or generations)",
  },
  premium: {
    id: "premium",
    name: "SeedPix Premium Credit Pack",
    priceCents: 5999, // $59.99
    priceFormatted: "$59.99",
    credits: 3000,
    description: "3000 AI Credits (~300 high-res image edits or generations)",
  },
};

let _stripe: Stripe | null = null;

export function getStripe(): Stripe | null {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey || secretKey.includes("YOUR-STRIPE-KEY")) {
    return null;
  }
  if (!_stripe) {
    _stripe = new Stripe(secretKey, {
      apiVersion: "2024-04-10" as any,
      typescript: true,
    });
  }
  return _stripe;
}

export function isStripeConfigured(): boolean {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  return !!secretKey && !secretKey.includes("YOUR-STRIPE-KEY");
}
