export interface ToolPageData {
  /** 唯一 slug，对应 URL 路径，如 "remove-object-from-photo" */
  slug: string;
  /** 页面 H1 标题（主关键词） */
  title: string;
  /** 页面 meta description */
  description: string;
  /** 短描述，用于卡片/列表 */
  shortDescription: string;
  /** 分类：remove / enhance / edit / style / generate */
  category: string;
  /** 每张图消耗 credits */
  credits: number;
  /** 编辑器提示词模板，{prompt} 会被用户输入替换 */
  systemPrompt: string;
  /** 默认用户提示词（用户可直接点"用这个"） */
  examplePrompt: string;
  /** 页面主要长尾关键词 */
  keywords: string[];
  /** FAQ 区块（长尾词收割机） */
  faqs: { question: string; answer: string }[];
  /**
   * 该页内容最后一次实质性修改的日期（YYYY-MM-DD）。
   * 用于 sitemap 的 lastmod；不填则回退到 CONTENT_BASELINE。
   * 改完这页的正文/FAQ 后请顺手更新，让 Google 拿到真实的“这页变了”信号。
   */
  updatedAt?: string;
  /** 对比表（可选）：第一列是维度 */
  comparison?: { name: string; rows: string[] }[];
  /** 使用步骤 */
  steps?: { title: string; description: string }[];
  /** 功能亮点 */
  features?: string[];
  /** Before/After 演示（拖动对比） */
  demos?: {
    title: string;
    description: string;
    image?: string;
    beforeImage?: string;
    afterImage?: string;
    beforeFilter?: string;
    afterFilter?: string;
  }[];
}

export const toolCategories = {
  remove: "Remove",
  enhance: "Enhance & Upscale",
  edit: "Edit",
  style: "Style Transfer",
  generate: "Generate",
  watermark: "Watermark",
} as const;
