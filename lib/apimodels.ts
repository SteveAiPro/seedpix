// APIMODELS 聚合 API 客户端
// 官方文档: https://apimodels.app/zh/docs/image
// 端点: POST /api/v1/images/generations (异步任务) + GET 轮询
// 认证: Authorization: Bearer <key>
// 图生图: 传 image_base64 / image_url 自动路由为编辑模式

export const MODELS = {
  "gpt-image-2": { id: "gpt-image-2", name: "GPT Image 2", resolution: "1K" },
  "gpt-image-2.5": { id: "gpt-image-2", name: "GPT Image 2.5", resolution: "1K" },
  "nanobanana-2": { id: "nanobanana2", name: "NanoBanana 2", resolution: "1K" },
  "nanobanana-pro": { id: "nanobananapro", name: "NanoBanana Pro", resolution: "1K" },
  "seedream-5": { id: "doubao-seedream-5-0-260128", name: "Seedream 5.0", resolution: "1K" },
  "seedream-5-lite": { id: "doubao-seedream-5-0-260128", name: "Seedream 5.0 Lite", resolution: "1K" },
  "qwen3-image": { id: "qwen3-image", name: "Qwen Image 3.0", resolution: "1K" },
  "grok-imagine": { id: "grok-imagine-image", name: "Grok Imagine", resolution: "1K" },
} as const;

export type ModelId = keyof typeof MODELS;

interface CreateImageTaskParams {
  model: string;
  prompt: string;
  /** base64 参考图（图生图/编辑），和 imageUrl 二选一 */
  imageBase64?: string;
  imageMimeType?: string;
  /** 参考图 URL */
  imageUrl?: string;
  aspectRatio?: string;
  resolution?: string;
  outputFormat?: "png" | "jpeg" | "webp";
  callbackUrl?: string;
}

interface TaskResponse {
  code: number;
  msg: string;
  data: {
    taskId?: string;
    state?: "pending" | "processing" | "completed" | "failed";
    resultUrls?: string[];
    failMsg?: string;
    retryable?: boolean;
  };
}

const BASE_URL = process.env.APIMODELS_BASE_URL || "https://api.apimodels.app/v1";
const API_KEY = process.env.APIMODELS_API_KEY || "";

function headers() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };
}

/**
 * 创建图片生成/编辑任务
 */
export async function createImageTask(
  params: CreateImageTaskParams
): Promise<TaskResponse> {
  const body: Record<string, unknown> = {
    model: params.model,
    prompt: params.prompt,
  };

  if (params.imageBase64) {
    body.image_base64 = params.imageBase64;
    body.image_mime_type = params.imageMimeType || "image/jpeg";
  } else if (params.imageUrl) {
    body.image_url = params.imageUrl;
  }

  if (params.aspectRatio) body.aspect_ratio = params.aspectRatio;
  if (params.resolution) body.resolution = params.resolution;
  if (params.outputFormat) body.output_format = params.outputFormat;
  if (params.callbackUrl) body.callback_url = params.callbackUrl;

  const res = await fetch(`${BASE_URL}/images/generations`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body),
  });

  return (await res.json()) as TaskResponse;
}

/**
 * 轮询任务状态直到完成或失败
 * @param taskId 任务 ID
 * @param maxAttempts 最大轮询次数（每次间隔 2.5s）
 */
export async function pollImageTask(
  taskId: string,
  maxAttempts = 20
): Promise<TaskResponse["data"]> {
  for (let i = 0; i < maxAttempts; i++) {
    const res = await fetch(
      `${BASE_URL}/images/generations?task_id=${encodeURIComponent(taskId)}`,
      { headers: headers() }
    );
    const json = (await res.json()) as TaskResponse;

    if (json.data.state === "completed" || json.data.state === "failed") {
      return json.data;
    }
    // 每 2.5 秒轮询一次（官方建议 2-3 秒）
    await new Promise((r) => setTimeout(r, 2500));
  }
  return { taskId, state: "failed", failMsg: "Polling timeout" };
}

/**
 * 一站式：创建任务 + 轮询到完成
 * 返回生成图片 URL 列表，失败返回 null
 */
export async function generateImage(
  params: CreateImageTaskParams
): Promise<string[] | null> {
  const created = await createImageTask(params);
  if (!created.data.taskId) {
    throw new Error(`Failed to create task: ${created.msg || created.code}`);
  }
  const result = await pollImageTask(created.data.taskId);
  if (result.state !== "completed" || !result.resultUrls?.length) {
    throw new Error(result.failMsg || "Generation failed");
  }
  return result.resultUrls;
}

/**
 * 查询账户余额
 */
export async function getAccountBalance(): Promise<number> {
  const res = await fetch(`${BASE_URL}/balance`, { headers: headers() });
  const json = (await res.json()) as { data?: { balance?: number } };
  return json.data?.balance ?? 0;
}
