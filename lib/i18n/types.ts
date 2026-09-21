export type Locale = "en" | "es" | "pt" | "ja" | "zh";

export interface LocaleInfo {
  code: Locale;
  name: string;
  nativeName: string;
  flag: string;
}

export interface Dictionary {
  locale: Locale;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  nav: {
    editor: string;
    tools: string;
    pricing: string;
    blog: string;
    signIn: string;
    signOut: string;
    getCredits: string;
  };
  faqs?: { q: string; a: string }[];
  hero: {
    trendBadge: string;
    titleMain: string;
    titleGradient: string;
    subtitle: string;
    badges: {
      free: string;
      noSignUp: string;
      noWatermark: string;
      hd4k: string;
      credits: string;
    };
    popularLabel: string;
    popularTags: { label: string; href: string }[];
  };
  trendingSection: {
    title: string;
    badge: string;
    tryWorkflow: string;
  };
  featuresSection: {
    title: string;
    subtitle: string;
    moreFeatures: string;
  };
  sliderSection: {
    title: string;
    subtitle: string;
  };
  footer: {
    tagline: string;
    trending: string;
    editTools: string;
    enhanceTools: string;
    watermark: string;
    generateTools: string;
    rights: string;
  };
}
