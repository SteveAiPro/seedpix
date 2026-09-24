import { NextResponse } from "next/server";
import { getUserFromRequest, getSupabaseAdmin } from "@/lib/supabase";
import { deductCredits, getCredits, CREDIT_PRICES } from "@/lib/credits";
import { generateImage, MODELS, type ModelId } from "@/lib/apimodels";

export const maxDuration = 120; // 轮询最多 ~50s，Vercel hobby 允许 60s

export async function POST(req: Request) {
  try {
    // 1. 认证
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const admin = getSupabaseAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: "Backend not configured" },
        { status: 503 }
      );
    }

    // 2. 解析请求体
    const body = await req.json();
    const { prompt, imageBase64, imageMimeType, model = "gpt-image-2", aspectRatio, resolution } = body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 2) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }
    if (!(model in MODELS)) {
      return NextResponse.json({ error: `Unsupported model: ${model}` }, { status: 400 });
    }

    // 3. 校验积分
    const credits = await getCredits(user.id);
    if (credits < CREDIT_PRICES.PER_EDIT) {
      return NextResponse.json(
        { error: "Insufficient credits", credits, required: CREDIT_PRICES.PER_EDIT },
        { status: 402 }
      );
    }

    // 4. 调用 APIMODELS 生成
    const modelId = MODELS[model as ModelId].id;
    let resultUrls: string[] | null = null;
    let base64Data: string | undefined = undefined;
    let mimeType = imageMimeType || "image/jpeg";

    if (imageBase64) {
      base64Data = imageBase64;
      if (imageBase64.startsWith("data:")) {
        const parts = imageBase64.split(",");
        base64Data = parts[1];
        const match = parts[0].match(/data:(.*?);/);
        if (match) mimeType = match[1];
      }
    }

    try {
      resultUrls = await generateImage({
        model: modelId,
        prompt,
        imageBase64: base64Data,
        imageMimeType: mimeType,
        aspectRatio,
        resolution: resolution || MODELS[model as ModelId]?.resolution || "1K",
      });
    } catch (genErr) {
      // 生成失败不扣费（官方保证）
      const msg = genErr instanceof Error ? genErr.message : "Generation failed";
      return NextResponse.json({ error: msg }, { status: 502 });
    }

    if (!resultUrls) {
      return NextResponse.json({ error: "Generation failed" }, { status: 502 });
    }

    // 5. 扣积分（生成成功才扣）
    const newBalance = await deductCredits(user.id, CREDIT_PRICES.PER_EDIT);
    if (newBalance === null) {
      return NextResponse.json({ error: "Failed to deduct credits" }, { status: 500 });
    }

    // 6. 记录编辑历史
    await admin.from("edits").insert({
      user_id: user.id,
      prompt,
      model,
      cost_credits: CREDIT_PRICES.PER_EDIT,
      result_url: resultUrls[0],
    });

    return NextResponse.json({
      success: true,
      resultUrls,
      creditsRemaining: newBalance,
    });
  } catch (err) {
    console.error("[edit] error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 }
    );
  }
}
