import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/supabase";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getCredits } from "@/lib/credits";

/**
 * GET /api/me
 * 返回当前登录用户的关键信息（含 is_admin）—— service role 查，避免 RLS 循环。
 */
export async function GET(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = getSupabaseAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Backend not configured" }, { status: 503 });
  }

  const { data: profile } = await admin
    .from("users")
    .select("email, is_admin")
    .eq("id", user.id)
    .single();

  const credits = await getCredits(user.id);

  return NextResponse.json({
    id: user.id,
    email: profile?.email ?? user.email ?? null,
    is_admin: !!profile?.is_admin,
    credits,
  });
}
