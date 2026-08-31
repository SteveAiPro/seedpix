// Supabase 客户端（惰性初始化，避免未配置时构建报错）
// - 浏览器端用 anon key（RLS 保护）
// - 服务端用 service role key（可绕过 RLS）
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const isSupabaseConfigured =
  !!supabaseUrl && !!supabaseAnonKey && !supabaseUrl.includes("YOUR-PROJECT");

let _supabase: SupabaseClient | null = null;
let _supabaseAdmin: SupabaseClient | null = null;

// 浏览器端客户端（anon key + RLS）
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!_supabase) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _supabase;
}

// 服务端客户端（service role，绕过 RLS，只能在后端用）
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseServiceKey) return null;
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return _supabaseAdmin;
}

// 服务端：从请求中解析用户
export async function getUserFromRequest(req: Request) {
  const admin = getSupabaseAdmin();
  if (!admin) return null;

  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.slice(7);
  const {
    data: { user },
    error,
  } = await admin.auth.getUser(token);
  if (error || !user) return null;
  return user;
}
