import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/sign-in", "/sign-up", "/admin/"],
      },
      // AI Crawlers for GEO (Generative Engine Optimization) & LLM Citation
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "anthropic-ai",
          "Claude-Web",
          "PerplexityBot",
          "Google-Extended",
          "FacebookBot",
          "Meta-ExternalAgent",
          "Bytespider",
          "CCBot",
          "cohere-ai",
        ],
        allow: "/",
        disallow: ["/api/", "/sign-in", "/sign-up", "/admin/"],
      },
    ],
    sitemap: "https://seedpix.org/sitemap.xml",
  };
}
