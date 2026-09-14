import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { landings } from "@/lib/landings";

const BASE = "https://seedpix.org";

/**
 * 内容基线日期：页面没有单独标注 updatedAt 时使用。
 *
 * 注意：这里**不能**用 `new Date()`。
 * sitemap.ts 在构建时求值，`new Date()` 会变成构建时间，导致 21 个 URL 的
 * lastmod 完全相同、且每次部署都"全部刚更新过"——Google 会判定该字段不可信
 * 并直接忽略，等于白扔了"这页有更新，快来重抓"的信号。
 *
 * 正确做法：改完某一页的内容后，在 lib/tools.ts / lib/landings.ts 对应条目上
 * 写 `updatedAt: "YYYY-MM-DD"`。没有标注的页面回退到这个基线日期。
 */
const CONTENT_BASELINE = "2026-09-05";

function lastMod(updatedAt?: string): Date {
  return new Date(updatedAt ?? CONTENT_BASELINE);
}

export default function sitemap(): MetadataRoute.Sitemap {
  // 首页 —— canonical 解析为 https://seedpix.org/，这里保持带斜杠一致
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/`,
      lastModified: lastMod(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/ai-photo-tools`,
      lastModified: lastMod(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // 词族 landing 页（扛大词）
  const landingPages: MetadataRoute.Sitemap = landings.map((l) => ({
    url: `${BASE}/${l.slug}`,
    lastModified: lastMod(l.updatedAt),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 工具长尾页矩阵
  const toolPages: MetadataRoute.Sitemap = tools.map((t) => ({
    url: `${BASE}/${t.slug}`,
    lastModified: lastMod(t.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...landingPages, ...toolPages];
}
