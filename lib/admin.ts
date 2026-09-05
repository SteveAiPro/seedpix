import { NextResponse } from "next/server";
import { getUserFromRequest, getSupabaseAdmin } from "./supabase";

/**
 * 校验请求是否为管理员，是则返回 user，否则返回 null（调用方应直接返回 403）。
 * admin 状态存在 public.users.is_admin（service role 查，绕过 RLS）。
 */
export async function getAdminUser(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) return null;

  const admin = getSupabaseAdmin();
  if (!admin) return null;

  const { data } = await admin
    .from("users")
    .select("is_admin")
    .eq("id", user.id)
    .single();
  if (!data?.is_admin) return null;
  return user;
}

/** 快捷返回 403 JSON */
export function forbidden() {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
