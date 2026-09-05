import { NextResponse } from "next/server";
import { getAdminUser, forbidden } from "@/lib/admin";
import { getSupabaseAdmin } from "@/lib/supabase";

/**
 * GET /api/admin/users
 * 管理员：返回全部用户列表（含积分、注册时间、是否 admin、编辑次数）。
 */
export async function GET(req: Request) {
  const adminUser = await getAdminUser(req);
  if (!adminUser) return forbidden();
  const admin = getSupabaseAdmin();
  if (!admin) return NextResponse.json({ error: "not configured" }, { status: 503 });

  const { data: users, error } = await admin
    .from("users")
    .select("id, email, credits, is_admin, created_at, last_daily_claim")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 附带每个用户的编辑次数
  const { data: allEdits } = await admin
    .from("edits")
    .select("user_id");

  const countMap: Record<string, number> = {};
  (allEdits || []).forEach((r: { user_id: string }) => {
    const k = String(r.user_id);
    countMap[k] = (countMap[k] || 0) + 1;
  });

  return NextResponse.json({
    users: (users || []).map((u: Record<string, unknown>) => ({
      id: u.id,
      email: u.email,
      credits: u.credits,
      is_admin: !!u.is_admin,
      created_at: u.created_at,
      last_daily_claim: u.last_daily_claim,
      edit_count: countMap[String(u.id)] || 0,
    })),
  });
}
