import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/supabase";
import { getCredits, claimDailyCredits } from "@/lib/credits";

/**
 * GET /api/credits?claim_daily=1
 * 查询积分余额，可选触发每日签到
 */
export async function GET(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const claimDaily = url.searchParams.get("claim_daily") === "1";

  const credits = claimDaily
    ? await claimDailyCredits(user.id)
    : await getCredits(user.id);

  return NextResponse.json({ credits, userId: user.id, claimed: claimDaily });
}
