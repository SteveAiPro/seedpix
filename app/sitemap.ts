import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { landings } from "@/lib/landings";
import { blogPosts } from "@/lib/blogPosts";
import { AI_MODELS, AI_TOOLS, STYLE_TOOLS } from "@/lib/catalog";

const BASE = "https://seedpix.org";
const CONTENT_BASELINE = "2026-09-25";

function lastMod(updatedAt?: string): Date {
  return new Date(updatedAt ?? CONTENT_BASELINE);
}

export default function sitemap(): MetadataRoute.Sitemap {
  // 首页与多语言主页 —— 与页面 canonical 保持一致
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: lastMod(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE}/es`,
      lastModified: lastMod(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE}/pt`,
      lastModified: lastMod(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE}/ja`,
      lastModified: lastMod(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE}/zh`,
      lastModified: lastMod(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE}/ai-photo-tools`,
      lastModified: lastMod(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/pricing`,
      lastModified: lastMod(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE}/about`,
      lastModified: lastMod(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/privacy`,
      lastModified: lastMod(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/terms`,
      lastModified: lastMod(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/blog`,
      lastModified: lastMod(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  // 模型落地页矩阵
  const modelPages: MetadataRoute.Sitemap = AI_MODELS.map((m) => ({
    url: `${BASE}/${m.slug}`,
    lastModified: lastMod(),
    changeFrequency: "weekly",
    priority: 0.95,
  }));

  // AI 增强与上采样工具页矩阵 (/aitools/*)
  const aiToolPages: MetadataRoute.Sitemap = AI_TOOLS.map((t) => ({
    url: `${BASE}/aitools/${t.slug}`,
    lastModified: lastMod(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 风格迁移页矩阵 (/styles/*)
  const stylePages: MetadataRoute.Sitemap = STYLE_TOOLS.map((s) => ({
    url: `${BASE}/styles/${s.slug}`,
    lastModified: lastMod(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 词族 landing 页（扛大词）
  const landingPages: MetadataRoute.Sitemap = landings.map((l) => ({
    url: `${BASE}/${l.slug}`,
    lastModified: lastMod(l.updatedAt),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 博客与权威指南矩阵 (E-E-A-T)
  const postPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: lastMod(p.updatedAt),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 工具长尾页矩阵
  const toolPages: MetadataRoute.Sitemap = tools.map((t) => ({
    url: `${BASE}/${t.slug}`,
    lastModified: lastMod(t.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...modelPages,
    ...landingPages,
    ...postPages,
    ...toolPages,
    ...aiToolPages,
    ...stylePages,
  ];
}
