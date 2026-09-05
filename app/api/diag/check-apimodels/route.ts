import { NextResponse } from "next/server";
import { getAccountBalance } from "@/lib/apimodels";

/**
 * GET /api/diag/check-apimodels
 * 诊断 APIMODELS key 是否有效（生产用 Vercel 云端环境变量）。
 * 返回 base_url(脱敏) + 余额 + 配置状态。不调用生成，仅查余额验证 key。
 */
export async function GET() {
  const baseUrl = process.env.APIMODELS_BASE_URL || "https://api.apimodels.app/v1";
  const hasKey = !!process.env.APIMODELS_API_KEY;
  const keyMasked = process.env.APIMODELS_API_KEY
    ? process.env.APIMODELS_API_KEY.slice(0, 6) + "..." + process.env.APIMODELS_API_KEY.slice(-4)
    : "(empty)";

  if (!hasKey) {
    return NextResponse.json({
      ok: false,
      baseUrl,
      keyMasked,
      error: "APIMODELS_API_KEY not set in this environment",
    });
  }

  try {
    const balance = await getAccountBalance();
    return NextResponse.json({
      ok: true,
      baseUrl,
      keyMasked,
      balance,
      note: "APIMODELS key 有效，账户余额如上",
    });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      baseUrl,
      keyMasked,
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
