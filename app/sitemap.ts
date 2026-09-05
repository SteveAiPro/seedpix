import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { landings } from "@/lib/landings";

const BASE = "https://seedpix.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 首页
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${BASE}/ai-photo-tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // 词族 landing 页（扛大词）
  const landingPages: MetadataRoute.Sitemap = landings.map((l) => ({
    url: `${BASE}/${l.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 工具长尾页矩阵
  const toolPages: MetadataRoute.Sitemap = tools.map((t) => ({
    url: `${BASE}/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...landingPages, ...toolPages];
}
