import { NextResponse } from "next/server";
import { generateImage } from "@/lib/apimodels";

/**
 * GET /api/diag/test-cheapest
 * 用最便宜的模型 flux-2-klein-4b ($0.006) 真实生成一张图，验证 APIMODELS 全链路。
 * 只测文生图，不涉及用户图/积分。
 */
export async function GET() {
  try {
    // 用最便宜的模型 + 极短提示词，成本 ~$0.006
    const urls = await generateImage({
      model: "flux-2-klein-4b",
      prompt: "a small red apple on a white table, product photo",
      resolution: "1K",
    });
    return NextResponse.json({
      ok: true,
      model: "flux-2-klein-4b",
      cost: "~$0.006",
      resultUrl: urls?.[0] || null,
      note: "生成成功！验证 APIMODELS 全链路可跑通",
    });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
