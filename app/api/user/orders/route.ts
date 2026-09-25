import { NextResponse } from "next/server";
import { getUserFromRequest, getSupabaseAdmin } from "@/lib/supabase";
import { getCredits } from "@/lib/credits";

export async function GET(req: Request) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admin = getSupabaseAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    // 1. 获取用户信息
    const { data: profile } = await admin
      .from("users")
      .select("id, email, credits, created_at, last_daily_claim")
      .eq("id", user.id)
      .single();

    const credits = await getCredits(user.id);

    // 2. 获取用户交易流水（包括购买、签到、注册、消费等）
    const { data: transactions } = await admin
      .from("credit_transactions")
      .select("id, amount, type, ref_id, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);

    // 3. 获取生成历史
    const { data: edits } = await admin
      .from("edits")
      .select("id, prompt, model, cost_credits, result_url, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(30);

    // 4. 解析充值订单
    const orders = (transactions || [])
      .filter((t) => t.type === "purchase")
      .map((t) => {
        let planName = "Credit Package";
        let price = "$9.99";

        if (t.amount >= 3000) {
          planName = "Premium Pack (3000 Credits)";
          price = "$59.99";
        } else if (t.amount >= 1200) {
          planName = "Pro Pack (1200 Credits)";
          price = "$29.99";
        } else {
          planName = `Basic Pack (${t.amount} Credits)`;
          price = "$9.99";
        }

        return {
          id: t.id,
          planName,
          credits: t.amount,
          price,
          status: "Paid",
          stripeSessionId: t.ref_id || null,
          createdAt: t.created_at,
        };
      });

    return NextResponse.json({
      user: {
        id: user.id,
        email: profile?.email || user.email,
        credits,
        createdAt: profile?.created_at || user.created_at,
      },
      orders,
      transactions: transactions || [],
      edits: edits || [],
    });
  } catch (err: any) {
    console.error("[api/user/orders] Error fetching orders:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
