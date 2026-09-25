// 1:1 SparkPix Showcase Catalog Data for SeedPix
export interface ShowcaseCase {
  id: string;
  tier: 'profile' | 'magic' | 'style' | 'memories' | 'fun' | 'moments';
  href: string;
  title: string;
  titleZh: string;
  subtitle: string;
  prompt: string;
  beforeImage?: string;
  afterImage?: string;
}

export interface ShowcaseTier {
  id: 'profile' | 'magic' | 'style' | 'memories' | 'fun' | 'moments';
  title: string;
  titleZh: string;
  subtitle: string;
  tone: 'sepia' | 'neutral' | 'purple' | 'lime';
  layout: 'carousel' | 'grid';
  cardVariant: 'slider' | 'pip' | 'single' | 'hover';
  cardAspect?: string;
  order: number;
  more?: {
    title: string;
    subtitle: string;
    href: string;
    fullWidth?: boolean;
  };
}

export const SHOWCASE_TIERS: ShowcaseTier[] = [
  {
    id: 'magic',
    title: 'Magic Powerful Photo Editor',
    titleZh: '万能修图(7 大能力)',
    subtitle: 'One sentence. Any structural change. Swap background, change pose, relight the scene, add or remove anything.',
    tone: 'neutral',
    layout: 'carousel',
    cardVariant: 'slider',
    order: 1,
  },
  {
    id: 'profile',
    title: 'Generate Great Headshots & Profile Photos',
    titleZh: '头像与个人照',
    subtitle: 'Turn any casual selfie into a polished portrait — LinkedIn, dating, passport, or just a better you.',
    tone: 'sepia',
    layout: 'carousel',
    cardVariant: 'slider',
    order: 2,
  },
  {
    id: 'style',
    title: 'Style Transformer',
    titleZh: '风格转换',
    subtitle: 'Transform any photo to any style — Ghibli, anime, oil painting, watercolor, vintage, and more.',
    tone: 'purple',
    layout: 'grid',
    cardVariant: 'single',
    cardAspect: 'aspect-[2/1]',
    order: 3,
    more: {
      title: 'More Styles',
      subtitle: '20+ artistic effects',
      href: '/styles/photo-to-ghibli',
    },
  },
  {
    id: 'memories',
    title: 'Restore Old, Scratched, Damaged Photos',
    titleZh: '老照片修复',
    subtitle: 'Colorize, repair, sharpen and de-blur faded family albums. Bring decades-old prints back to life.',
    tone: 'neutral',
    layout: 'grid',
    cardVariant: 'single',
    cardAspect: 'aspect-[2/1]',
    order: 4,
    more: {
      title: 'More Restoration',
      subtitle: 'Bring any old photo back',
      href: '/photo-restoration',
      fullWidth: true,
    },
  },
  {
    id: 'fun',
    title: 'Just for Fun & Creativity',
    titleZh: '创意趣味',
    subtitle: 'Make the stuff that goes viral — yourself as a Disney character, your pet as renaissance royalty.',
    tone: 'lime',
    layout: 'carousel',
    cardVariant: 'hover',
    order: 5,
  },
  {
    id: 'moments',
    title: 'Travel & Events',
    titleZh: '旅行与活动',
    subtitle: 'Save the moment, lose what shouldn’t be in it — tourists, ex-partners, date stamps, accidental blinks.',
    tone: 'neutral',
    layout: 'carousel',
    cardVariant: 'slider',
    order: 6,
  },
];

export const RAW_CASES: ShowcaseCase[] = [
  // Profile Tier
  {
    id: 'linkedin-headshot',
    tier: 'profile',
    href: '/ai-linkedin-headshot-generator',
    title: 'LinkedIn Headshot',
    titleZh: 'LinkedIn 职业头像',
    subtitle: 'A professional portrait from any casual selfie.',
    prompt: 'Generate a professional LinkedIn headshot, formal attire, clean neutral background, natural confident smile',
  },
  {
    id: 'try-new-look',
    tier: 'profile',
    href: '/ai-hairstyle-changer',
    title: 'Try a New Hairstyle',
    titleZh: '试新发型 / 发色',
    subtitle: 'See yourself with different hair before committing to the salon.',
    prompt: 'Change hair color to blonde and switch to a short bob style',
  },
  {
    id: 'profile-dating-female',
    tier: 'profile',
    href: '/dating-profile-photo',
    title: 'Dating Profile Glow-Up',
    titleZh: '约会照升级(女)',
    subtitle: 'Turn an awkward selfie into the photo that makes people stop swiping.',
    prompt: 'Editorial dating profile photo with golden-hour side lighting, natural confident smile, cinematic background blur',
  },
  {
    id: 'profile-dating-male',
    tier: 'profile',
    href: '/dating-profile-photo',
    title: 'Dating Profile (Male)',
    titleZh: '约会照升级(男)',
    subtitle: 'Turn a flat indoor selfie into a confident, well-lit portrait.',
    prompt: 'Editorial portrait, natural outdoor light, relaxed confident posture, slightly blurred cinematic background',
  },
  {
    id: 'passport-photo',
    tier: 'profile',
    href: '/passport-photo-maker',
    title: 'Passport & Visa Photo',
    titleZh: '证件照(护照 / 签证)',
    subtitle: 'Multi-country regulation-compliant ID photos from a phone selfie.',
    prompt: 'Passport photo, plain white background, neutral facial expression, head centered and front-facing',
  },

  // Moments Tier
  {
    id: 'remove-photobombers',
    tier: 'moments',
    href: '/remove-tourists-from-photo',
    title: 'Remove the Crowd',
    titleZh: '去掉路人 / 游客',
    subtitle: 'Just you and the landmark — no tourists, strangers, or accidental photobombers.',
    prompt: 'Remove all background tourists and pedestrians, keep the couple and the Trevi Fountain intact',
  },
  {
    id: 'remove-ex-from-photo',
    tier: 'moments',
    href: '/remove-ex-from-photo',
    title: 'Remove an Ex',
    titleZh: '去掉前任',
    subtitle: 'Reclaim a photo you love by removing someone you don’t.',
    prompt: 'Remove the person on the left, naturally fill in the background',
  },
  {
    id: 'save-blink-photo',
    tier: 'moments',
    href: '/open-closed-eyes-ai',
    title: 'Open Closed Eyes',
    titleZh: '救活闭眼合影',
    subtitle: 'Rescue group photos where one person blinked at the worst moment.',
    prompt: 'Open the eyes of the person on the far right, keep all other expressions identical',
  },
  {
    id: 'remove-watermark',
    tier: 'moments',
    href: '/remove-date-stamp-from-photo',
    title: 'Remove Date Stamps & Watermarks',
    titleZh: '去日期戳 / 水印',
    subtitle: 'Clean off date stamps, embedded text, watermarks and stickers.',
    prompt: 'Remove the orange date stamp in the bottom right corner',
  },

  // Memories Tier
  {
    id: 'colorize-memories',
    tier: 'memories',
    href: '/aitools/colorize-photo',
    title: 'Colorize Black & White',
    titleZh: '黑白照片上色',
    subtitle: 'See your grandparents in color for the first time.',
    prompt: 'Colorize this 1960s family photo with natural, realistic tones',
    afterImage: '/showcases/photo-restoration.webp',
  },
  {
    id: 'rescue-old-photos',
    tier: 'memories',
    href: '/aitools/fix-scratched-photos',
    title: 'Repair Scratches & Tears',
    titleZh: '修复划痕 / 撕裂',
    subtitle: 'Fix decades of damage — scratches, creases, missing corners.',
    prompt: 'Restore this damaged old photo, repair scratches and missing edges while keeping the original atmosphere',
    afterImage: '/showcases/scrathed-photo.webp',
  },
  {
    id: 'unblur-photo',
    tier: 'memories',
    href: '/unblur-image',
    title: 'Unblur Old Photos',
    titleZh: '模糊照片变清晰',
    subtitle: 'Sharpen blurry photos that are too precious to lose.',
    prompt: 'Sharpen this blurry photo, recover facial details naturally',
    afterImage: '/showcases/unblur-oldphoto.webp',
  },
  {
    id: 'improve-old-resolution',
    tier: 'memories',
    href: '/aitools/photo-upscaler',
    title: 'Make Low-Res HD',
    titleZh: '低清变高清',
    subtitle: 'Scale up tiny, pixelated old scans into something printable.',
    prompt: 'Upscale this low-resolution photo to 4× clarity while preserving the natural texture',
    afterImage: '/showcases/restoration-old-photo-low-resolution.webp',
  },
  {
    id: 'fix-water-damaged',
    tier: 'memories',
    href: '/aitools/fix-water-damaged-photos',
    title: 'Fix Water Damage',
    titleZh: '修复水渍',
    subtitle: 'Restore photos that survived a flood, a leaky album, or worse.',
    prompt: 'Remove water staining and discoloration, restore the original tones',
    afterImage: '/showcases/restoration-old-photo-water-damaged.webp',
  },
  {
    id: 'restore-faded-photos',
    tier: 'memories',
    href: '/aitools/restore-faded-photos',
    title: 'Restore Faded Photos',
    titleZh: '修复褪色',
    subtitle: 'Bring back the rich tones lost to decades of sun, time, and aging paper.',
    prompt: 'Restore the original colors of this faded photo, recover natural skin tones and contrast',
    afterImage: '/showcases/restoration-old-photo-fade.webp',
  },

  // Magic Tier
  {
    id: 'swap-background',
    tier: 'magic',
    href: '/background-remover',
    title: 'Background Swap',
    titleZh: '换背景',
    subtitle: 'Send yourself anywhere — beach, studio, primeval forest, Tokyo street.',
    prompt: 'Change the background to a misty primeval forest with dappled morning light',
  },
  {
    id: 'change-outfit-color',
    tier: 'magic',
    href: '/change-outfit-ai',
    title: 'Change Outfit',
    titleZh: '换衣服(颜色 / 款式)',
    subtitle: 'Swap clothes — color, material, even full outfit changes.',
    prompt: "Change the woman's top to a dusty rose pink cotton t-shirt",
  },
  {
    id: 'change-pose',
    tier: 'magic',
    href: '/change-pose-ai',
    title: 'Change Pose & Expression',
    titleZh: '改姿势 / 表情',
    subtitle: 'Reorient the subject, fix expressions, change the gaze direction.',
    prompt: 'Have her turn to face the camera with a natural confident smile',
  },
  {
    id: 'reframe-photo',
    tier: 'magic',
    href: '/reframe-photo-ai',
    title: 'Reframe & Expand',
    titleZh: '扩画布 / 改构图',
    subtitle: 'Extend the canvas, change the aspect ratio, recompose the shot.',
    prompt: 'Extend this portrait photo into a 16:9 landscape, naturally continuing the scene',
  },
  {
    id: 'add-accessories',
    tier: 'magic',
    href: '/add-objects-to-photo',
    title: 'Add Objects',
    titleZh: '添加物体(墨镜 / 帽子)',
    subtitle: 'Hand the AI a noun and watch it appear — sunglasses, hats, props.',
    prompt: 'Add a pair of classic black aviator sunglasses',
  },
  {
    id: 'remove-objects-generic',
    tier: 'magic',
    href: '/object-remover',
    title: 'Remove Anything',
    titleZh: '删物体(电线 / 招牌)',
    subtitle: 'Power lines, signage, fences, reflections — gone in one sentence.',
    prompt: 'Remove the power lines and the parked car from the background',
  },
  {
    id: 'relight-scene',
    tier: 'magic',
    href: '/relight-photo-ai',
    title: 'Relight the Scene',
    titleZh: '重打光(黄金时刻 / 棚拍)',
    subtitle: 'Replace harsh indoor light with golden hour, studio, or moody window light.',
    prompt: 'Replace the overhead office lighting with warm golden-hour light from the left',
  },

  // Style Tier
  {
    id: 'turn-into-painting',
    tier: 'style',
    href: '/styles/photo-to-van-gogh',
    title: 'Oil Painting',
    titleZh: '油画风(梵高)',
    subtitle: 'Reimagined in the visible brushwork and color of an oil painting.',
    prompt: 'Transform this photo into a Van Gogh Starry Night oil painting style',
  },
  {
    id: 'photo-to-ghibli',
    tier: 'style',
    href: '/styles/photo-to-ghibli',
    title: 'Studio Ghibli',
    titleZh: '宫崎骏 Ghibli 风',
    subtitle: 'The soft watercolor warmth of a Miyazaki scene.',
    prompt: 'Transform this photo into Studio Ghibli anime style, soft hand-painted backgrounds',
  },
  {
    id: 'photo-to-anime',
    tier: 'style',
    href: '/styles/photo-to-anime',
    title: 'Anime',
    titleZh: '动漫风',
    subtitle: 'Crisp lines, vivid color, your photo as an anime cel.',
    prompt: 'Transform into modern anime style, clean line art, vivid colors',
  },
  {
    id: 'photo-to-watercolor',
    tier: 'style',
    href: '/styles/photo-to-watercolor',
    title: 'Watercolor',
    titleZh: '水彩风',
    subtitle: 'The soft bleeds and paper grain of a watercolor painting.',
    prompt: 'Transform into a watercolor painting, soft color bleeds, visible paper texture',
  },
  {
    id: 'photo-to-vintage',
    tier: 'style',
    href: '/styles/photo-to-vintage',
    title: 'Vintage Film',
    titleZh: '复古胶片风',
    subtitle: 'The grain, palette, and edge fade of a 1970s color print.',
    prompt: 'Transform into a 1970s vintage film photograph, warm faded tones, visible grain',
  },

  // Fun Tier
  {
    id: 'pet-royal-portrait',
    tier: 'fun',
    href: '/pet-royal-portrait',
    title: 'Pet Royal Portrait',
    titleZh: '宠物贵族画像',
    subtitle: 'Your dog or cat reimagined as renaissance royalty.',
    prompt: 'Transform pet into a 17th-century Flemish royal oil portrait with a small crown and ermine robes',
  },
  {
    id: 'photo-to-disney',
    tier: 'fun',
    href: '/styles/photo-to-disney',
    title: 'You as a Disney Character',
    titleZh: '变 Disney 角色',
    subtitle: 'Yourself reimagined in the Disney animated film style.',
    prompt: 'Transform into a Disney animated character, soft 2D animation style',
  },
  {
    id: 'photo-to-pixar',
    tier: 'fun',
    href: '/styles/photo-to-pixar',
    title: 'You as a Pixar Character',
    titleZh: '变 Pixar 3D 角色',
    subtitle: 'Stylized 3D, big expressive eyes, the Pixar treatment.',
    prompt: 'Transform into a Pixar 3D animated character, stylized expressive features',
    beforeImage: '/showcase/before-photo-to-comic-hero.webp',
  },
  {
    id: 'photo-to-comic-hero',
    tier: 'fun',
    href: '/styles/photo-to-comic',
    title: 'Comic Book Hero',
    titleZh: '变漫画英雄',
    subtitle: 'You, but with a graphic novel cover treatment.',
    prompt: 'Transform into a modern comic book illustration, bold ink lines, dramatic colors',
  },
  {
    id: 'you-as-renaissance',
    tier: 'fun',
    href: '/you-as-renaissance-portrait',
    title: 'Renaissance Portrait',
    titleZh: '变文艺复兴肖像',
    subtitle: 'Yourself as an oil portrait that belongs in a museum.',
    prompt: 'Transform into a 16th-century Flemish renaissance oil portrait, chiaroscuro lighting, formal pose',
  },
];

export const SHOWCASE_CASES: ShowcaseCase[] = RAW_CASES.map((c) => ({
  ...c,
  beforeImage: c.beforeImage ?? `/showcase/before-${c.id}.webp`,
  afterImage: c.afterImage ?? `/showcase/after-${c.id}.webp`,
}));

export function getCasesForTier(tierId: string): ShowcaseCase[] {
  return SHOWCASE_CASES.filter((c) => c.tier === tierId);
}
