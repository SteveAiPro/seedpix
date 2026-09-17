export interface KeywordLandingData {
  /** 唯一 slug，对应 URL 路径，如 "ai-image-generator" */
  slug: string;
  /** 页面 H1 标题（主关键词） */
  title: string;
  /** 页面 meta description + hero 描述 */
  description: string;
  /** 页面主要长尾关键词 */
  keywords: string[];
  /** 关联工具页 slug，渲染为工具网格 */
  toolSlugs: string[];
  /** SEO 内容区（长文段落） */
  sections: { heading: string; paragraphs: string[] }[];
  /** FAQ 区块（长尾词收割机） */
  faqs: { question: string; answer: string }[];
  /**
   * 该页内容最后一次实质性修改的日期（YYYY-MM-DD）。
   * 用于 sitemap 的 lastmod；不填则回退到 CONTENT_BASELINE。
   */
  updatedAt?: string;
}

export const landings: KeywordLandingData[] = [
  {
    slug: "ai-image-generator",
    title: "AI Image Generator - Create Images from Text Free",
    description:
      "Turn words into images with the SeedPix AI image generator. Create art, realistic photos, illustrations, and designs from text in seconds. Free to start.",
    keywords: [
      "ai image generator",
      "ai photo generator",
      "text to image",
      "ai art generator",
      "generate image from text",
      "ai image generator free",
      "text to image ai",
      "create image with ai",
    ],
    toolSlugs: [
      "text-to-image",
      "ai-photo-generator",
      "ai-portrait-generator",
      "ai-photo-enhancer",
      "4k-image-upscaler",
      "background-remover",
    ],
    sections: [
      {
        heading: "What is an AI image generator?",
        paragraphs: [
          "An AI image generator turns a text description into a brand-new image. Instead of drawing, painting, or photographing, you simply type what you want - a photorealistic puppy in a meadow, a neon city at night, a product mockup - and the AI renders it in seconds. SeedPix puts multiple leading generation models behind one simple editor, so you always get the best output for your idea.",
        ],
      },
      {
        heading: "What can you create with SeedPix AI image generator?",
        paragraphs: [
          "The SeedPix AI image generator handles a wide range of creative jobs: realistic photos and portraits, artistic illustrations, product shots and mockups, social media graphics, book covers, game art, and concept designs. Pick a style - photorealistic, anime, 3D render, oil painting, watercolor, flat illustration - and describe your scene. The model follows your prompt and renders with good composition, lighting, and detail.",
        ],
      },
      {
        heading: "Is the SeedPix AI image generator free?",
        paragraphs: [
          "Yes, you can start for free. New users get 5 free credits on signup plus 1 free credit every day, and each generation costs 10 credits. You can try the generator immediately without signing up. When you run out of credits, packs start at $9.99 for 350 credits - a fraction of what other AI art tools charge.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I generate an image from text for free?",
        answer:
          "Type your idea in the SeedPix editor and click generate. The AI renders a high-quality image from your text description in seconds. New users get 5 free credits on signup plus 1 daily credit - no credit card required.",
      },
      {
        question: "What is the best AI image generator?",
        answer:
          "The 'best' depends on your task, which is why SeedPix aggregates multiple leading models in one editor. You can switch between them with the model picker and pick the output you like best for each prompt.",
      },
      {
        question: "Can I use the images commercially?",
        answer:
          "Yes. Images you generate with SeedPix are yours to use commercially - in products, ads, social media, or anywhere else. No watermark is added to your downloads.",
      },
      {
        question: "Do I need to sign up to generate images?",
        answer:
          "You can generate immediately without signing up. Sign up to save your history, claim free credits, and unlock unlimited creating.",
      },
      {
        question: "What image formats are supported?",
        answer: "JPG, PNG, and WebP files up to 20MB are supported for upload, and downloads keep the original aspect ratio.",
      },
      {
        question: "How much does an AI image generation cost?",
        answer:
          "One generation costs 10 credits. Signup gives you 5 free credits plus 1 daily credit, and credit packs start at $9.99 for 350 credits.",
      },
    ],
  },
  {
    slug: "ai-photo-editor-free",
    title: "AI Photo Editor Free - Edit Photos Without Paying",
    description:
      "Edit photos online free with SeedPix AI photo editor. Remove objects and people, change backgrounds, restore old photos, and more. No Photoshop, no watermark.",
    keywords: [
      "ai photo editor free",
      "free ai photo editor",
      "edit photos online free",
      "ai photo editor online",
      "free photo editor no signup",
      "ai photo editing tool",
      "edit photo without photoshop",
      "free online photo editor ai",
    ],
    toolSlugs: [
      "remove-object-from-photo",
      "background-remover",
      "filter-remover",
      "ai-photo-enhancer",
      "photo-restoration",
      "unblur-image",
    ],
    sections: [
      {
        heading: "What can you do with a free AI photo editor?",
        paragraphs: [
          "A modern AI photo editor replaces almost everything you used to need Photoshop for - without the learning curve. Remove unwanted objects or people from a photo, cut out and replace backgrounds, erase filters, restore old damaged photos, unblur shaky shots, enhance quality, and upscale to 4K. You describe the edit in plain words, and the AI does the pixel work for you.",
        ],
      },
      {
        heading: "Why SeedPix is the best free AI photo editor",
        paragraphs: [
          "SeedPix gives you free credits on signup and one free credit every day, so the free tier is actually usable - not a teaser. The editor runs in your browser with no downloads, keeps the exact subject, pose, and framing of your photo, and adds no watermark to results. One click or one sentence does the job that used to take hours in professional software.",
        ],
      },
      {
        heading: "What does 'free' mean at SeedPix?",
        paragraphs: [
          "Free means you can genuinely start without paying: 5 free credits on signup, plus 1 free credit daily. Each edit costs 10 credits. If you need more, credit packs start at $9.99 for 350 credits - there is no subscription and no lock-in. Most casual edits can be covered by the daily free credits alone.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is there a really free AI photo editor?",
        answer:
          "Yes. SeedPix gives new users 5 free credits on signup plus 1 free credit every day. Each edit costs 10 credits, so you can fix several photos for free - no credit card, no subscription.",
      },
      {
        question: "Can I edit photos online without Photoshop?",
        answer:
          "Yes. SeedPix runs entirely in your browser - upload a photo, describe the edit in plain words, and download the result in about 30 seconds. No downloads, no layers, no learning curve.",
      },
      {
        question: "What edits can I make for free?",
        answer:
          "You can remove objects, people, and text, replace backgrounds, remove filters, enhance quality, unblur photos, restore old photos, and upscale to 4K - all within your free credits.",
      },
      {
        question: "Will my edited photos have a watermark?",
        answer:
          "No. SeedPix adds no watermark to any result. The images you edit and download are yours to use, including commercially.",
      },
      {
        question: "Is SeedPix really free without a subscription?",
        answer:
          "Yes. There is no subscription at all. You pay only for credit packs when you want more than your free credits, starting at $9.99 for 350 credits.",
      },
      {
        question: "What image formats are supported?",
        answer: "JPG, PNG, and WebP files up to 20MB are supported, and the output keeps your original aspect ratio.",
      },
    ],
  },
  {
    slug: "ai-image-generator-unlimited",
    title: "AI Image Generator Unlimited - No Sign Up",
    description:
      "Generate unlimited AI images without signup or daily caps. Create art, photos, and designs with no watermark and no restrictions. Free to start.",
    keywords: [
      "ai image generator unlimited",
      "ai image generator no sign up",
      "unlimited ai image generator",
      "ai image generator without signup",
      "ai generator no sign up free",
      "unlimited ai art generator",
      "text to image no signup",
      "ai image generator no restrictions",
    ],
    toolSlugs: [
      "text-to-image",
      "ai-photo-generator",
      "ai-portrait-generator",
      "edit-text-in-image",
      "ai-photo-to-real",
      "photo-text-editor",
    ],
    sections: [
      {
        heading: "Generate images without the usual limits",
        paragraphs: [
          "Most free AI image generators force you to sign up, cap your daily generations, or watermark every result. SeedPix works differently: you can start generating immediately without an account, and there is no hard daily cap on what you create. Just type, generate, and download.",
        ],
      },
      {
        heading: "How SeedPix keeps it unlimited",
        paragraphs: [
          "You can try the generator right away with no signup. When you create an account you get 5 free credits on top of the daily free credit, and every generation costs a flat 10 credits - no hidden tiers, no throttling, no watermark. If you create a lot, packs start at $9.99 for 350 credits, which keeps the cost per image far below other services.",
        ],
      },
      {
        heading: "What you can create with no restrictions",
        paragraphs: [
          "Anything you can describe: photorealistic scenes and portraits, anime and cartoon styles, 3D renders, product mockups, social media graphics, book covers, and concept art. Switch between multiple leading models with one picker and keep the results you like. Your downloads are watermark-free and yours to use commercially.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is there an AI image generator with no sign up?",
        answer:
          "Yes. SeedPix lets you generate images immediately without signing up. Create an account when you want to save history, claim free credits, and get unlimited creating.",
      },
      {
        question: "Is the AI image generator truly unlimited?",
        answer:
          "There are no daily generation caps or restrictions. Every generation costs a flat 10 credits - free credits on signup plus a daily free credit keep it running, and packs start at $9.99 when you want more.",
      },
      {
        question: "Do generated images have a watermark?",
        answer:
          "No. SeedPix adds no watermark to any generated or edited image, and results are yours to use commercially.",
      },
      {
        question: "Can I use the unlimited generator for commercial work?",
        answer:
          "Yes. Images you create with SeedPix can be used commercially in products, ads, social media, and client work.",
      },
      {
        question: "What styles can the generator produce?",
        answer:
          "Photorealistic, anime, cartoon, 3D render, oil painting, watercolor, flat illustration, and more. Pick a style in your prompt and the model follows it.",
      },
      {
        question: "What formats are supported?",
        answer: "JPG, PNG, and WebP files up to 20MB, with the output keeping your original aspect ratio.",
      },
    ],
  },
];

export function getLandingBySlug(slug: string): KeywordLandingData | undefined {
  return landings.find((l) => l.slug === slug);
}
