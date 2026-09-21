import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/supabase";
import { getStripe, PAYMENT_PLANS } from "@/lib/stripe";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://seedpix.org";

export async function POST(req: Request) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json(
        { error: "Please sign in to proceed with purchase." },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { plan: planId } = body;

    const plan = PAYMENT_PLANS[planId as keyof typeof PAYMENT_PLANS];
    if (!plan) {
      return NextResponse.json(
        { error: "Invalid credit package selected." },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json(
        {
          error:
            "Payment gateway is currently in maintenance or being configured. Please contact support.",
        },
        { status: 503 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: plan.name,
              description: plan.description,
              images: [`${SITE_URL}/og-image.png`],
            },
            unit_amount: plan.priceCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      client_reference_id: user.id,
      customer_email: user.email,
      metadata: {
        userId: user.id,
        planId: plan.id,
        credits: String(plan.credits),
      },
      success_url: `${SITE_URL}/pricing?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/pricing?payment=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("[api/checkout] Error creating checkout session:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
