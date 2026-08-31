// 积分管理逻辑
// 表结构见 supabase/schema.sql
import { getSupabaseAdmin } from "./supabase";

export const CREDIT_PRICES = {
  // 每次 AI 处理消耗的 credits
  PER_EDIT: 10,
  // 新用户注册赠送
  SIGNUP_BONUS: 5,
  // 每日签到赠送
  DAILY_BONUS: 1,
} as const;

/**
 * 读取用户当前积分余额
 */
export async function getCredits(userId: string): Promise<number> {
  const admin = getSupabaseAdmin();
  if (!admin) return 0;
  const { data, error } = await admin
    .from("users")
    .select("credits")
    .eq("id", userId)
    .single();

  if (error || !data) return 0;
  return (data.credits as number) ?? 0;
}

/**
 * 扣减积分（带余额校验，防止负数）
 * @returns 成功返回新余额，失败返回 null
 */
export async function deductCredits(
  userId: string,
  amount: number
): Promise<number | null> {
  const admin = getSupabaseAdmin();
  if (!admin) return null;

  // 原子操作：先查再扣（生产建议用 schema.sql 的 decrement RPC 函数）
  const current = await getCredits(userId);
  if (current < amount) return null;

  const { data: updated, error } = await admin
    .from("users")
    .update({ credits: current - amount })
    .eq("id", userId)
    .select("credits")
    .single();

  if (error || !updated) return null;
  return (updated.credits as number) ?? null;
}

/**
 * 增加积分并记录交易流水
 */
export async function addCredits(
  userId: string,
  amount: number,
  type: "signup" | "daily" | "purchase" | "refund",
  refId?: string
): Promise<boolean> {
  const admin = getSupabaseAdmin();
  if (!admin) return false;

  const { data: user, error: uerr } = await admin
    .from("users")
    .select("credits")
    .eq("id", userId)
    .single();
  if (uerr || !user) return false;

  const newBalance = ((user.credits as number) ?? 0) + amount;

  const { error: uerr2 } = await admin
    .from("users")
    .update({ credits: newBalance })
    .eq("id", userId);
  if (uerr2) return false;

  const { error: terr } = await admin.from("credit_transactions").insert({
    user_id: userId,
    amount,
    type,
    ref_id: refId,
  });
  if (terr) return false;

  return true;
}

/**
 * 每日签到：跨天补发每日积分
 */
export async function claimDailyCredits(userId: string): Promise<number> {
  const admin = getSupabaseAdmin();
  if (!admin) return 0;

  const { data: user, error } = await admin
    .from("users")
    .select("credits, last_daily_claim")
    .eq("id", userId)
    .single();
  if (error || !user) return 0;

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const lastClaim = user.last_daily_claim
    ? String(user.last_daily_claim).slice(0, 10)
    : null;

  if (lastClaim === today) return (user.credits as number) ?? 0; // 今天已领

  const newBalance = ((user.credits as number) ?? 0) + CREDIT_PRICES.DAILY_BONUS;
  const { error: uerr } = await admin
    .from("users")
    .update({ credits: newBalance, last_daily_claim: today })
    .eq("id", userId);
  if (uerr) return (user.credits as number) ?? 0;

  await admin.from("credit_transactions").insert({
    user_id: userId,
    amount: CREDIT_PRICES.DAILY_BONUS,
    type: "daily",
  });

  return newBalance;
}
