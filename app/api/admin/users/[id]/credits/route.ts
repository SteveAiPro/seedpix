import { NextResponse } from "next/server";
import { getAdminUser, forbidden } from "@/lib/admin";
import { getSupabaseAdmin } from "@/lib/supabase";

interface Ctx {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/admin/users/[id]/credits
 * body: { amount: number, reason?: string }
 * amount>0 增加，amount<0 扣减。扣减后不能为负。
 */
export async function POST(req: Request, { params }: Ctx) {
  const adminUser = await getAdminUser(req);
  if (!adminUser) return forbidden();
  const admin = getSupabaseAdmin();
  if (!admin) return NextResponse.json({ error: "not configured" }, { status: 503 });

  const { id } = await params;
  const { amount, reason } = await req.json().catch(() => ({}));

  if (typeof amount !== "number" || !Number.isInteger(amount) || amount === 0) {
    return NextResponse.json({ error: "amount must be a non-zero integer" }, { status: 400 });
  }

  const { data: user } = await admin.from("users").select("credits").eq("id", id).single();
  if (!user) return NextResponse.json({ error: "user not found" }, { status: 404 });

  const current = user.credits ?? 0;
  const next = current + amount;
  if (next < 0) {
    return NextResponse.json({ error: "resulting credits cannot be negative" }, { status: 400 });
  }

  const { error: upErr } = await admin.from("users").update({ credits: next }).eq("id", id);
  if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 });

  await admin.from("credit_transactions").insert({
    user_id: id,
    amount,
    type: "refund", // 管理员手动调整标记为 refund 类
    ref_id: reason ? `admin:${reason}` : "admin:manual",
  });

  return NextResponse.json({ ok: true, newCredits: next });
}
