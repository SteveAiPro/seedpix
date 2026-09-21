import type { Locale, LocaleInfo, Dictionary } from "./types";

export const LOCALES: LocaleInfo[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇧🇷" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "zh", name: "Chinese", nativeName: "简体中文", flag: "🇨🇳" },
];

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    locale: "en",
    seo: {
      title: "SeedPix - Free AI Photo Editor Online (No Sign Up & No Watermark)",
      description:
        "100% Free AI photo editor online with no sign up and no restrictions. Remove objects, remove watermarks, upscale to 4K, edit text in images by typing — powered by leading AI models.",
      keywords: [
        "ai photo editor free",
        "ai photo editor no sign up",
        "ai photo editor no restrictions",
        "free ai photo editor online",
        "gemini ai photo editor",
        "remove object from photo",
        "remove background free",
        "photo restoration online",
      ],
    },
    nav: {
      editor: "AI Photo Editor",
      tools: "Tools",
      pricing: "Pricing",
      blog: "Blog & Guides",
      signIn: "Sign In",
      signOut: "Sign out",
      getCredits: "Get 5 Free Credits",
    },
    faqs: [
      {
        q: "Do I need to sign up to use the SeedPix AI photo editor?",
        a: "No. You can open the editor and try several edits without creating an account. Signing up simply unlocks your free daily credits and lets you save your work.",
      },
      {
        q: "What file formats does the AI photo editor accept?",
        a: "SeedPix accepts JPG, PNG, and WebP files up to 20 MB. PNG is best when you need a transparent background.",
      },
      {
        q: "Will my edited photo have a watermark?",
        a: "No. Every image you download from SeedPix is free of watermarks and can be used commercially, so you can use the results in products, listings, and marketing.",
      },
      {
        q: "Can I remove an object from a photo without Photoshop?",
        a: "Yes - that is one of the most popular SeedPix tools. Upload the photo, click Remove objects, and the AI erases the unwanted element and fills the gap with realistic background.",
      },
      {
        q: "How is SeedPix different from other AI photo editors?",
        a: "SeedPix combines a free-form text editor with dedicated one-click tools in a single place, so you can remove objects, remove backgrounds, restore old photos, upscale to 4K, and remove AI filters without switching apps or paying multiple subscriptions.",
      },
    ],
    hero: {
      trendBadge: "🔥 2026 Trending • Zero Sign Up • No Watermark • 4K Output",
      titleMain: "Free AI Photo Editor Online —",
      titleGradient: "Edit Photos by Typing",
      subtitle:
        "Instant photo editing with zero friction. Remove unwanted objects, erase watermarks, restore old portraits, and upscale to 4K — completely free, no account needed.",
      badges: {
        free: "100% Free to Try",
        noSignUp: "No Sign Up Required",
        noWatermark: "No Watermark",
        hd4k: "4K Ultra-HD Upscale",
        credits: "5 Free Credits to Start",
      },
      popularLabel: "Popular:",
      popularTags: [
        { label: "🔥 RSP Viral Prompts", href: "/rsp-editing-ai-photo-prompts" },
        { label: "✨ No Sign Up Editor", href: "/ai-photo-editor-no-sign-up" },
        { label: "⚡ No Restrictions", href: "/ai-photo-editor-no-restrictions" },
        { label: "🚀 Gemini AI Editor", href: "/gemini-ai-photo-editor" },
        { label: "🎯 Remove Objects", href: "/remove-object-from-photo" },
        { label: "🪄 Remove Background", href: "/background-remover" },
      ],
    },
    trendingSection: {
      title: "Explore Trending Ways to Edit & Create",
      badge: "100% Free • No Sign Up",
      tryWorkflow: "Try this workflow →",
    },
    featuresSection: {
      title: "Hot Features — the tools people reach for most",
      subtitle: "Pick one to start editing. 100+ AI tools, all in one place.",
      moreFeatures: "More features",
    },
    sliderSection: {
      title: "See the difference — drag to compare",
      subtitle: "Real SeedPix edits. Slide the handle to see each photo before and after the AI does its work.",
    },
    footer: {
      tagline: "100% Free AI photo editor online. Edit photos by typing — no Photoshop skills needed.",
      trending: "Trending",
      editTools: "Edit Tools",
      enhanceTools: "Enhance Tools",
      watermark: "Watermark",
      generateTools: "Generate Tools",
      rights: "All rights reserved.",
    },
  },
  es: {
    locale: "es",
    seo: {
      title: "SeedPix - Editor de Fotos IA Gratis Online (Sin Registro y Sin Marca de Agua)",
      description:
        "Editor de fotos con inteligencia artificial 100% gratis y sin registro. Elimina objetos, borra marcas de agua, mejora fotos a 4K y restaura imágenes con solo escribir.",
      keywords: [
        "editor de fotos ia gratis",
        "editor de fotos sin registrarse",
        "borrar objetos de fotos con ia",
        "quitar fondo gratis",
        "restaurar fotos antiguas ia",
        "editor de imagenes ia online",
      ],
    },
    nav: {
      editor: "Editor de Fotos IA",
      tools: "Herramientas",
      pricing: "Precios",
      blog: "Blog y Guías",
      signIn: "Iniciar sesión",
      signOut: "Cerrar sesión",
      getCredits: "5 Créditos Gratis",
    },
    faqs: [
      {
        q: "¿Necesito registrarme para usar el editor de fotos con IA de SeedPix?",
        a: "No. Puedes abrir el editor y probar varias ediciones sin crear una cuenta. Registrarte solo desbloquea tus créditos diarios gratuitos y te permite guardar tu historial.",
      },
      {
        q: "¿Qué formatos de archivo admite el editor de fotos con IA?",
        a: "SeedPix admite archivos JPG, PNG y WebP de hasta 20 MB. PNG es ideal si necesitas un fondo transparente.",
      },
      {
        q: "¿Mi foto editada tendrá alguna marca de agua?",
        a: "No. Todas las imágenes que descargas de SeedPix están 100% libres de marcas de agua y pueden usarse comercialmente en productos, tiendas y marketing.",
      },
      {
        q: "¿Puedo eliminar objetos de una foto sin saber Photoshop?",
        a: "Sí, es una de las funciones más populares. Sube la foto, describe o selecciona el elemento no deseado y la IA lo borrará rellenando el fondo de forma realista.",
      },
      {
        q: "¿En qué se diferencia SeedPix de otros editores de fotos con IA?",
        a: "SeedPix combina un editor conversacional por texto con más de 100 herramientas dedicadas en un solo lugar, permitiéndote borrar objetos, quitar fondos, restaurar fotos y escalar a 4K sin suscripciones forzadas.",
      },
    ],
    hero: {
      trendBadge: "🔥 Tendencia 2026 • Sin Registro • Sin Marca de Agua • Salida 4K",
      titleMain: "Editor de Fotos IA Gratis Online —",
      titleGradient: "Edita Fotos Escribiendo",
      subtitle:
        "Edición fotográfica instantánea sin fricción. Elimina objetos no deseados, borra marcas de agua, restaura retratos antiguos y amplía a 4K, totalmente gratis y sin cuenta.",
      badges: {
        free: "100% Gratis para Probar",
        noSignUp: "Sin Registro Requerido",
        noWatermark: "Sin Marca de Agua",
        hd4k: "Escalado 4K Ultra-HD",
        credits: "5 Créditos Gratis al Iniciar",
      },
      popularLabel: "Popular:",
      popularTags: [
        { label: "🔥 Prompts Virales RSP", href: "/rsp-editing-ai-photo-prompts" },
        { label: "✨ Editor Sin Registro", href: "/ai-photo-editor-no-sign-up" },
        { label: "⚡ Sin Restricciones", href: "/ai-photo-editor-no-restrictions" },
        { label: "🚀 Editor Gemini IA", href: "/gemini-ai-photo-editor" },
        { label: "🎯 Eliminar Objetos", href: "/remove-object-from-photo" },
        { label: "🪄 Quitar Fondo", href: "/background-remover" },
      ],
    },
    trendingSection: {
      title: "Explora Formas Populares de Editar y Crear",
      badge: "100% Gratis • Sin Registro",
      tryWorkflow: "Probar este flujo →",
    },
    featuresSection: {
      title: "Funciones Populares — las herramientas más utilizadas",
      subtitle: "Elige una para comenzar. Más de 100 herramientas de IA en un solo lugar.",
      moreFeatures: "Más funciones",
    },
    sliderSection: {
      title: "Mira la diferencia — desliza para comparar",
      subtitle: "Ediciones reales de SeedPix. Desliza la barra para ver el antes y después del trabajo de la IA.",
    },
    footer: {
      tagline: "Editor de fotos con IA 100% gratis online. Edita fotos escribiendo sin saber Photoshop.",
      trending: "Tendencias",
      editTools: "Edición",
      enhanceTools: "Mejora",
      watermark: "Marca de agua",
      generateTools: "Generación",
      rights: "Todos los derechos reservados.",
    },
  },
  pt: {
    locale: "pt",
    seo: {
      title: "SeedPix - Editor de Fotos com IA Grátis Online (Sem Cadastro e Sem Marca d'Água)",
      description:
        "Editor de fotos com inteligência artificial 100% grátis e sem cadastro. Remova objetos, tire marcas d'água, aprimore fotos para 4K e restaure retratos digitando.",
      keywords: [
        "editor de fotos com ia grátis",
        "editor de fotos sem cadastro",
        "remover objetos de fotos ia",
        "remover fundo grátis",
        "restaurar fotos antigas ia",
        "editor de imagens com ia",
      ],
    },
    nav: {
      editor: "Editor de Fotos IA",
      tools: "Ferramentas",
      pricing: "Preços",
      blog: "Blog e Guias",
      signIn: "Entrar",
      signOut: "Sair",
      getCredits: "Ganhar 5 Créditos Grátis",
    },
    faqs: [
      {
        q: "Preciso me cadastrar para usar o editor de fotos IA do SeedPix?",
        a: "Não. Você pode abrir o editor e testar várias edições imediatamente sem criar uma conta. O cadastro serve apenas para desbloquear seus créditos diários gratuitos e salvar seus trabalhos.",
      },
      {
        q: "Quais formatos de arquivo são suportados?",
        a: "O SeedPix suporta arquivos JPG, PNG e WebP de até 20 MB. O formato PNG é o mais indicado quando você precisa de fundo transparente.",
      },
      {
        q: "Minhas fotos editadas terão marca d'água?",
        a: "Não. Todas as imagens baixadas do SeedPix são 100% livres de marcas d'água e podem ser usadas comercialmente em anúncios, lojas virtuais e redes sociais.",
      },
      {
        q: "Posso remover objetos de fotos sem entender de Photoshop?",
        a: "Sim, essa é uma das ferramentas mais populares do SeedPix. Basta carregar a imagem e a IA remove o elemento indesejado preenchendo o fundo de forma natural.",
      },
      {
        q: "Qual é o diferencial do SeedPix em relação a outros editores de IA?",
        a: "O SeedPix reúne um editor por comandos em linguagem natural e centenas de ferramentas dedicadas em um só lugar, permitindo remover objetos, restaurar fotos e fazer upscale para 4K sem mensalidades caras.",
      },
    ],
    hero: {
      trendBadge: "🔥 Tendência 2026 • Sem Cadastro • Sem Marca d'Água • 4K",
      titleMain: "Editor de Fotos com IA Grátis Online —",
      titleGradient: "Edite Fotos Digitando",
      subtitle:
        "Edição instantânea de fotos sem complicação. Remova objetos indesejados, apague marcas d'água, restaure fotos antigas e amplie para 4K — sem necessidade de conta.",
      badges: {
        free: "100% Grátis para Testar",
        noSignUp: "Sem Cadastro Obrigatório",
        noWatermark: "Sem Marca d'Água",
        hd4k: "Aprimoramento 4K Ultra-HD",
        credits: "5 Créditos Grátis para Começar",
      },
      popularLabel: "Popular:",
      popularTags: [
        { label: "🔥 Prompts Virais RSP", href: "/rsp-editing-ai-photo-prompts" },
        { label: "✨ Editor Sem Cadastro", href: "/ai-photo-editor-no-sign-up" },
        { label: "⚡ Sem Restrições", href: "/ai-photo-editor-no-restrictions" },
        { label: "🚀 Editor Gemini IA", href: "/gemini-ai-photo-editor" },
        { label: "🎯 Remover Objetos", href: "/remove-object-from-photo" },
        { label: "🪄 Remover Fundo", href: "/background-remover" },
      ],
    },
    trendingSection: {
      title: "Explore Modos Populares de Editar e Criar",
      badge: "100% Grátis • Sem Cadastro",
      tryWorkflow: "Testar este fluxo →",
    },
    featuresSection: {
      title: "Recursos em Destaque — as ferramentas mais buscadas",
      subtitle: "Escolha uma para começar. Mais de 100 ferramentas de IA em um só lugar.",
      moreFeatures: "Mais recursos",
    },
    sliderSection: {
      title: "Veja a diferença — arraste para comparar",
      subtitle: "Edições reais com SeedPix. Arraste o controle para ver cada foto antes e depois da IA.",
    },
    footer: {
      tagline: "Editor de fotos com IA 100% grátis online. Edite fotos digitando sem precisar de Photoshop.",
      trending: "Tendências",
      editTools: "Edição",
      enhanceTools: "Aprimoramento",
      watermark: "Marca d'água",
      generateTools: "Geração",
      rights: "Todos os direitos reservados.",
    },
  },
  ja: {
    locale: "ja",
    seo: {
      title: "SeedPix - 無料AI写真編集ツール（登録不要・透かしなし）",
      description:
        "完全無料・登録不要のオンラインAI写真編集ツール。文字を入力するだけで不要な人や物の消去、透かし削除、4K高画質化、古い写真の修復が簡単に完了します。",
      keywords: [
        "AI写真編集 無料",
        "登録不要 写真編集 AI",
        "写真 不要なもの 消す AI",
        "背景 透過 無料",
        "画像 高画質化 4K",
        "古い写真 修復 AI",
      ],
    },
    nav: {
      editor: "AI写真編集",
      tools: "ツール一覧",
      pricing: "料金プラン",
      blog: "ブログ・ガイド",
      signIn: "ログイン",
      signOut: "ログアウト",
      getCredits: "無料5クレジット獲得",
    },
    faqs: [
      {
        q: "SeedPixのAI写真編集ツールを使うのに会員登録は必要ですか？",
        a: "いいえ、会員登録は不要です。ブラウザ上でエディターを開いて、アカウントを作成することなくすぐに写真の編集・生成をお試しいただけます。",
      },
      {
        q: "対応している画像ファイル形式と最大サイズは？",
        a: "最大20MBまでのJPG、PNG、WebP形式に対応しています。透過背景が必要な画像にはPNG形式をおすすめします。",
      },
      {
        q: "編集・ダウンロードした写真に透かし（ウォーターマーク）は入りますか？",
        a: "いいえ。SeedPixで編集・ダウンロードしたすべての画像は完全透かしなしです。商用利用も可能で、広告やECサイト、SNSにも安心してご利用いただけます。",
      },
      {
        q: "Photoshopなどの専門知識がなくても不要なものを消せますか？",
        a: "はい、最も人気のある機能の一つです。写真をアップロードして消したい対象を指定するだけで、AIが背景を自然に補完しながらきれいに消去します。",
      },
      {
        q: "SeedPixが他のAI写真編集ツールと異なる点は何ですか？",
        a: "自然な言葉で指示できる自由編集機能に加え、不要物消去、背景透過、写真修復、4K超解像度化など100以上の専用ツールを1箇所に集約。高額なサブスクなしでお使いいただけます。",
      },
    ],
    hero: {
      trendBadge: "🔥 2026年最新トレンド • 登録不要 • 透かしなし • 4K出力",
      titleMain: "無料オンラインAI写真編集 —",
      titleGradient: "言葉を入力するだけで編集",
      subtitle:
        "アカウント作成不要で今すぐ体験。不要なものの消去、透かし削除、古い写真の修復、4K超解像度アップスケールが、誰でも直感的に実行できます。",
      badges: {
        free: "100% 無料でお試し",
        noSignUp: "会員登録不要",
        noWatermark: "透かし（ウォーターマーク）なし",
        hd4k: "4KウルトラHD高画質化",
        credits: "初回5クレジット無料",
      },
      popularLabel: "人気ツール:",
      popularTags: [
        { label: "🔥 RSP人気プロンプト", href: "/rsp-editing-ai-photo-prompts" },
        { label: "✨ 登録不要エディター", href: "/ai-photo-editor-no-sign-up" },
        { label: "⚡ 制限なしエディター", href: "/ai-photo-editor-no-restrictions" },
        { label: "🚀 Gemini搭載AI編集", href: "/gemini-ai-photo-editor" },
        { label: "🎯 オブジェクト消去", href: "/remove-object-from-photo" },
        { label: "🪄 背景透過・削除", href: "/background-remover" },
      ],
    },
    trendingSection: {
      title: "人気の編集・作成スタイルを見る",
      badge: "完全無料 • 登録不要",
      tryWorkflow: "この機能を使う →",
    },
    featuresSection: {
      title: "注目の人気機能 — 最も選ばれているAIツール",
      subtitle: "選んですぐに編集可能。100以上の専用AIツールをひとつに。",
      moreFeatures: "すべてのツールを見る",
    },
    sliderSection: {
      title: "違いを体験 — スライダーでBefore/Afterを比較",
      subtitle: "SeedPixの実例。スライダーをドラッグして、AIによる処理前後の変化をご確認ください。",
    },
    footer: {
      tagline: "完全無料のオンラインAI写真編集。Photoshop不要で、言葉を入力するだけで誰でもプロ級編集。",
      trending: "トレンド",
      editTools: "編集ツール",
      enhanceTools: "高画質化・修復",
      watermark: "透かし消去",
      generateTools: "画像生成",
      rights: "無断転載を禁じます。",
    },
  },
  zh: {
    locale: "zh",
    seo: {
      title: "SeedPix - 免费在线AI图片照片编辑器（免登录・无水印）",
      description:
        "100%免费在线AI修图神器，无需注册登录，无水印导出。文字对话式消除路人杂物、去水印、老照片翻新修复、4K超清画质增强，由顶尖视觉大模型驱动。",
      keywords: [
        "AI图片编辑器免费",
        "免登录修图软件",
        "AI消除路人杂物",
        "一键抠图透明背景",
        "老照片超清修复",
        "4K图片画质提升",
        "去水印免费在线",
      ],
    },
    nav: {
      editor: "AI照片编辑",
      tools: "功能工具箱",
      pricing: "价格方案",
      blog: "博客与指南",
      signIn: "登录",
      signOut: "退出登录",
      getCredits: "免费领取 5 点数",
    },
    faqs: [
      {
        q: "使用 SeedPix AI 照片编辑器需要注册账号吗？",
        a: "完全不需要。您可以直接在浏览器中打开编辑器并立即开始修图，无需注册或绑定任何个人信息。注册仅用于保存历史记录及领取每日赠送点数。",
      },
      {
        q: "支持上传哪些图片格式和多大体积？",
        a: "支持最大 20MB 的 JPG、PNG 和 WebP 格式。需要透明背景时建议优先使用 PNG 格式导出。",
      },
      {
        q: "下载的处理后图片会有水印吗？支持商用吗？",
        a: "绝无任何水印。通过 SeedPix 编辑或生成的所有图像均归您所有，100% 支持商业用途，可直接用于电商上架、社交媒体或广告宣传。",
      },
      {
        q: "零 Photoshop 基础也可以一键消除照片路人吗？",
        a: "是的，这是最受欢迎的核心功能。只需上传照片并涂抹或文字说明消除对象，AI 扩散模型即可在几秒钟内无痕移除并逼真重绘背景。",
      },
      {
        q: "SeedPix 与其他 AI 修图软件相比有什么优势？",
        a: "SeedPix 将自然语言对话修图与 100+ 专属一键式功能矩阵深度整合，无需在多个软件间来回切换，更无强制性自动续费订阅陷阱，随用随修。",
      },
    ],
    hero: {
      trendBadge: "🔥 2026 最新爆款 • 免注册登录 • 无水印导出 • 4K超高清",
      titleMain: "免费在线 AI 照片编辑器 —",
      titleGradient: "打字说话即可一键修图",
      subtitle:
        "零门槛即开即用的智能修图体验。一键消除路人与杂物、清除水印、老旧破损照片超清翻新、画质超分提升至 4K，完全免费且无需账号。",
      badges: {
        free: "100% 免费试用",
        noSignUp: "无需注册登录",
        noWatermark: "无水印高清导出",
        hd4k: "4K 超高清画质",
        credits: "新手立赠 5 点数",
      },
      popularLabel: "热门推荐:",
      popularTags: [
        { label: "🔥 RSP爆款提示词库", href: "/rsp-editing-ai-photo-prompts" },
        { label: "✨ 免注册修图神器", href: "/ai-photo-editor-no-sign-up" },
        { label: "⚡ 无限制自由编辑", href: "/ai-photo-editor-no-restrictions" },
        { label: "🚀 Gemini视觉AI", href: "/gemini-ai-photo-editor" },
        { label: "🎯 智能路人消除", href: "/remove-object-from-photo" },
        { label: "🪄 一键抠图换背景", href: "/background-remover" },
      ],
    },
    trendingSection: {
      title: "探索热门创作与修图工作流",
      badge: "完全免费 • 免登录",
      tryWorkflow: "立即体验此功能 →",
    },
    featuresSection: {
      title: "热门主打功能 — 用户最常用的 AI 工具",
      subtitle: "挑选即可立刻上手，一站式集成 100+ 专属专业修图工具。",
      moreFeatures: "查看更多工具",
    },
    sliderSection: {
      title: "效果眼见为实 — 左右拖拽滑动对比",
      subtitle: "SeedPix 真实生成案例。拖动滑块即可直观查看 AI 智能修复与增强前后的巨大反差。",
    },
    footer: {
      tagline: "100% 免费在线 AI 修图平台。打字即可修图，无需任何 Photoshop 门槛。",
      trending: "热门趋势",
      editTools: "编辑工具",
      enhanceTools: "画质修复",
      watermark: "去水印",
      generateTools: "AI生成",
      rights: "版权所有，保留一切权利。",
    },
  },
};

export function getDictionary(locale: Locale = "en"): Dictionary {
  return dictionaries[locale] || dictionaries.en;
}
