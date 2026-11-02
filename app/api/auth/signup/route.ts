import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

/**
 * 简单内存级 IP 限速：每小时每 IP 最多 8 次注册。
 * 注：Vercel serverless 每个实例独立计数，不完美但足以挡住脚本批量注册的绝大部分。
 */
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 8;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || rec.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_PER_WINDOW;
}

/** Cloudflare Turnstile 服务端校验；未配置 SECRET 时降级放行 */
async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  if (!turnstileSecret) return true;
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: turnstileSecret, response: token, remoteip: ip }),
    });
    const data = await res.json();
    return !!data.success;
  } catch {
    return false;
  }
}

/**
 * POST /api/auth/signup
 * 邮箱注册代理：Turnstile 校验 + IP 限速 + 转发 Supabase signUp。
 * 注册赠送积分由数据库触发器（on_auth_user_created）发放，与调用路径无关。
 */
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many sign-up attempts from this network. Please try again later." },
      { status: 429 }
    );
  }

  let body: { email?: string; password?: string; turnstileToken?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password ?? "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 6) {
    return NextResponse.json(
      { error: "Please provide a valid email and a password of at least 6 characters." },
      { status: 400 }
    );
  }

  const humanVerified = await verifyTurnstile(body.turnstileToken, ip);
  if (!humanVerified) {
    return NextResponse.json(
      { error: "Human verification failed or expired. Please retry the verification widget." },
      { status: 403 }
    );
  }

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("YOUR-PROJECT")) {
    return NextResponse.json({ error: "Auth is not configured." }, { status: 503 });
  }

  const origin = req.headers.get("origin") || new URL(req.url).origin;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${origin}/` },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // 未开启邮箱强制验证时 Supabase 会直接返回 session，回传给客户端建立登录态
  return NextResponse.json({
    hasSession: !!data.session,
    session: data.session
      ? { access_token: data.session.access_token, refresh_token: data.session.refresh_token }
      : null,
  });
}
