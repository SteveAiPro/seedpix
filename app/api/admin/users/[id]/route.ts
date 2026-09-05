import { NextResponse } from "next/server";
import { getAdminUser, forbidden } from "@/lib/admin";
import { getSupabaseAdmin } from "@/lib/supabase";

interface Ctx {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/admin/users/[id]
 * 管理员：返回某用户的详情（资料 + 积分流水 + 编辑历史）。
 */
export async function GET(req: Request, { params }: Ctx) {
  const adminUser = await getAdminUser(req);
  if (!adminUser) return forbidden();
  const admin = getSupabaseAdmin();
  if (!admin) return NextResponse.json({ error: "not configured" }, { status: 503 });

  const { id } = await params;

  const { data: profile } = await admin
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  const { data: txns } = await admin
    .from("credit_transactions")
    .select("*")
    .eq("user_id", id)
    .order("created_at", { ascending: false })
    .limit(100);

  const { data: edits } = await admin
    .from("edits")
    .select("*")
    .eq("user_id", id)
    .order("created_at", { ascending: false })
    .limit(50);

  if (!profile) {
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  }

  return NextResponse.json({ profile, transactions: txns || [], edits: edits || [] });
}
