// 积分管理逻辑
// 表结构见 supabase/schema.sql
import { getSupabaseAdmin } from "./supabase";

export const CREDIT_PRICES = {
  // 每次 AI 处理消耗的 credits
  PER_EDIT: 10,
  // 新用户注册赠送（必须 >= PER_EDIT，否则新用户第一次编辑必定 402）
  SIGNUP_BONUS: 10,
  // 每日签到赠送
  DAILY_BONUS: 1,
} as const;

/**
 * 配置不变量检查：非零的注册赠送额度必须至少覆盖一次完整操作。
 *
 * 为什么需要这个检查：2026-09 曾出现 SIGNUP_BONUS = 5 < PER_EDIT = 10，
 * 结果是每个新用户注册后第一次点生成必定 402，转化率归零，且失败完全静默
 * （edits 表只在成功后写入，后台看起来「没人用过」而不是「所有人都失败了」）。
 * 而「5 free credits」这句话当时散落在全站约 35 处文案里，没有任何机制
 * 校验它是否成立。这个检查就是那条缺失的防线。
 *
 * 允许 SIGNUP_BONUS = 0（不提供免费额度是合法的商业选择）；
 * 只拦截「给了，但给的买不起一次操作」这种必然导致 100% 失败的情况。
 */
if (
  CREDIT_PRICES.SIGNUP_BONUS > 0 &&
  CREDIT_PRICES.SIGNUP_BONUS < CREDIT_PRICES.PER_EDIT
) {
  throw new Error(
    `[credits] 配置错误：SIGNUP_BONUS (${CREDIT_PRICES.SIGNUP_BONUS}) 小于 ` +
      `PER_EDIT (${CREDIT_PRICES.PER_EDIT})。新用户会拿到一笔永远花不出去的积分，` +
      `每次操作都会以 402 失败。请调整 lib/credits.ts 中的常量，` +
      `并同步更新 supabase/schema.sql 的 handle_new_user() 触发器。`
  );
}

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
