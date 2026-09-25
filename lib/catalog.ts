export interface CatalogItem {
  slug: string;
  title: string;
  description: string;
  category: "model" | "aitool" | "style";
  badge?: string;
  tagline: string;
  systemPrompt: string;
  examplePrompt: string;
  beforeImage?: string;
  afterImage?: string;
  features: string[];
  faqs: { question: string; answer: string }[];
}

export const AI_MODELS: CatalogItem[] = [
  {
    slug: "gpt-image-2-5",
    title: "GPT Image 2.5 - Next-Gen AI Image Editor & Generator Free",
    description: "Experience GPT Image 2.5 online free. Create and edit hyper-realistic images with natural language instructions, photorealistic textures, and zero watermarks.",
    category: "model",
    badge: "New",
    tagline: "Ultra-fast generation with perfect text rendering & human anatomy",
    systemPrompt: "You are GPT Image 2.5 engine. Generate or edit the image with photorealistic precision, cinematic lighting, accurate hands/eyes, and seamless consistency.",
    examplePrompt: "A hyper-realistic studio portrait with soft golden lighting, 8k resolution, shot on 85mm lens",
    beforeImage: "/showcase/before-try-new-look.webp",
    afterImage: "/showcase/after-try-new-look.webp",
    features: ["Natural language instruction following", "Flawless text generation inside images", "Studio-grade realistic human portraits", "Fast 2-second cloud inference"],
    faqs: [
      { question: "What is GPT Image 2.5?", answer: "GPT Image 2.5 is the latest generation multimodal image model designed for high-fidelity photo generation and instruction-based editing." },
      { question: "Is GPT Image 2.5 free to try on SeedPix?", answer: "Yes! SeedPix provides free credits upon sign-in so you can experience GPT Image 2.5 without a subscription." }
    ]
  },
  {
    slug: "gpt-image-2",
    title: "GPT Image 2 - High Fidelity AI Image Generation",
    description: "Generate breathtaking images with GPT Image 2. Exceptional prompt comprehension, vivid color dynamics, and crystal-clear image editing.",
    category: "model",
    tagline: "Industry standard for creative prompt adherence and sharp details",
    systemPrompt: "You are GPT Image 2 model. Faithfully render the user's creative concept with vivid saturation, sharp focal planes, and realistic lighting.",
    examplePrompt: "Cinematic photograph of a futuristic city with neon lights and flying vehicles at dusk",
    beforeImage: "/showcase/before-linkedin-headshot.webp",
    afterImage: "/showcase/after-linkedin-headshot.webp",
    features: ["Vivid artistic dynamic range", "Complex multi-subject compositions", "Style fidelity across diverse artistic mediums"],
    faqs: [
      { question: "How does GPT Image 2 compare to version 2.5?", answer: "GPT Image 2 is ultra-stable for fantasy and artistic compositions, while 2.5 adds enhanced photorealism and in-image typography." }
    ]
  },
  {
    slug: "nanobanana-2",
    title: "NanoBanana 2 - Lightweight Fast AI Photo Editing",
    description: "NanoBanana 2 delivers lightning-fast photo editing and retouching in under 2 seconds. Lightweight, efficient, and precise.",
    category: "model",
    badge: "Fast",
    tagline: "Instantaneous photo transformations with zero lag",
    systemPrompt: "You are NanoBanana 2 photo engine. Perform high-speed edits, face retouches, and object removals instantly.",
    examplePrompt: "Fix blurry photo, remove haze, sharpen skin details and upscale",
    features: ["Sub-2s inference latency", "Optimal for mobile and quick photo fixes", "Zero watermark downloads"],
    faqs: [{ question: "Is NanoBanana 2 free?", answer: "Yes, NanoBanana 2 is free to use on SeedPix with daily bonus credits." }]
  },
  {
    slug: "nanobanana-pro",
    title: "NanoBanana Pro - Professional Resolution AI Photo Suite",
    description: "NanoBanana Pro offers 4K ultra-definition generation and deep neural retouching for professional creators and e-commerce stores.",
    category: "model",
    badge: "Ultra",
    tagline: "Professional-grade commercial image enhancement",
    systemPrompt: "You are NanoBanana Pro. Generate 4K high-density outputs with flawless micro-textures and commercial lighting.",
    examplePrompt: "Commercial product photography of a luxury perfume bottle on wet black marble with dramatic lighting",
    features: ["4K raw resolution output", "Commercial usage rights included", "Advanced background and texture synthesis"],
    faqs: [{ question: "Can I use NanoBanana Pro outputs commercially?", answer: "Yes! All images created with NanoBanana Pro come with full commercial rights." }]
  },
  {
    slug: "grok-imagine",
    title: "Grok Imagine - Unfiltered Creative AI Generation",
    description: "Unleash your visual imagination with Grok Imagine. Uncapped creative perspectives, bold artistic choices, and rapid text-to-image synthesis.",
    category: "model",
    badge: "Creative",
    tagline: "Uncensored visual freedom and dynamic realism",
    systemPrompt: "You are Grok Imagine. Produce bold, visually captivating images with cinematic color palettes and dynamic angles.",
    examplePrompt: "Cyberpunk street samurai walking through rainy Tokyo alleyway, neon reflections, cinematic moody atmosphere",
    features: ["Broad aesthetic versatility", "Dynamic action and motion rendering", "Rich dramatic lighting"],
    faqs: [{ question: "What makes Grok Imagine unique?", answer: "It captures edgy, bold, and dynamic artistic concepts with outstanding stylistic flair." }]
  },
  {
    slug: "seedream-5",
    title: "Seedream 5.0 - Next-Gen E-commerce & Portrait AI",
    description: "Seedream 5.0 is the premier engine for fashion shoots, product photography, and realistic portrait creation.",
    category: "model",
    tagline: "Flawless skin tones and studio lighting for digital fashion",
    systemPrompt: "You are Seedream 5.0. Specialize in hyper-realistic apparel, human facial micro-textures, and high-fashion styling.",
    examplePrompt: "High-end fashion editorial shoot, model wearing beige wool trench coat, soft natural sunlight",
    features: ["Realistic skin pores and hair strands", "Accurate fabric folds and textures", "Commercial catalog quality"],
    faqs: [{ question: "Who should use Seedream 5.0?", answer: "Ideal for fashion brands, influencers, photographers, and e-commerce store owners." }]
  },
  {
    slug: "seedream-5-lite",
    title: "Seedream 5.0 Lite - Quick Fashion & Avatar Generator",
    description: "Fast-loading lightweight edition of Seedream 5.0. Quick avatar transformations and instant outfit changes.",
    category: "model",
    tagline: "Quick fashion try-on and profile updates",
    systemPrompt: "You are Seedream 5.0 Lite. Render fast portrait adjustments and fashion swaps.",
    examplePrompt: "Turn photo into professional corporate headshot with navy blazer",
    features: ["Fast rendering", "Low credit cost", "Great for social avatars"],
    faqs: [{ question: "Is Seedream 5.0 Lite free?", answer: "Yes, it is designed for rapid experimentation and avatar creation." }]
  }
];

export const AI_TOOLS: CatalogItem[] = [
  {
    slug: "photo-upscaler",
    title: "AI Photo Upscaler - Upscale Images to 4K/8K Free Online",
    description: "Upscale low-resolution photos to crystal-clear 4K and 8K with AI. Restore fine details, remove blur and pixelation without quality loss.",
    category: "aitool",
    tagline: "Zero blur, zero compression artifacts, pure HD clarity",
    systemPrompt: "Upscale the input image to 4x resolution. Reconstruct micro-details, hair follicles, textiles, and sharp edges while preserving natural aesthetics.",
    examplePrompt: "Upscale 4x, sharpen fine details, denoise background and enhance face",
    beforeImage: "/showcase/before-save-blink-photo.webp",
    afterImage: "/showcase/after-save-blink-photo.webp",
    features: ["2x, 4x, 8x magnification", "AI neural detail reconstruction", "Bulk batch upscaling support", "No watermark"],
    faqs: [
      { question: "How does the AI photo upscaler work?", answer: "Unlike traditional bicubic scaling, our deep convolutional networks infer and synthesize missing micro-pixels, turning low-res images into native high-definition." }
    ]
  },
  {
    slug: "upscale-image-to-4k",
    title: "Upscale Image to 4K - Online 4K Photo Enhancer",
    description: "Convert 720p or 1080p images to ultra-high 4K resolution (3840x2160). Perfect for wallpaper, wall prints, and high-DPI displays.",
    category: "aitool",
    tagline: "Print-ready 300 DPI 4K resolution in seconds",
    systemPrompt: "Upscale to exact 4K resolution with high-frequency edge sharpening and realistic noise removal.",
    examplePrompt: "Upscale to 4K resolution with crisp lines and vibrant color contrast",
    features: ["Print-ready DPI conversion", "Face detail sharpening", "Instant download in PNG/JPG"],
    faqs: [{ question: "Will upscaled 4K photos look blurry?", answer: "No! The neural network reconstructs sharp lines and genuine textures rather than just stretching pixels." }]
  },
  {
    slug: "fix-blurry-photos",
    title: "Fix Blurry Photos Online - AI Motion Blur & Focus Corrector",
    description: "Fix blurry photos caused by camera shake, out-of-focus lenses, or motion blur. Recover sharp facial features and clean edges instantly.",
    category: "aitool",
    tagline: "Turn ruined blurry shots into clear memories",
    systemPrompt: "Deconvolve motion blur and refocus out-of-focus subjects. Reconstruct clean pupils, sharp hair, and precise silhouettes.",
    examplePrompt: "Remove motion blur and restore sharp focus on subject face",
    features: ["Motion blur deconvolution", "Out-of-focus lens correction", "Facial feature sharpening"],
    faqs: [{ question: "Can it fix extremely blurry photos?", answer: "Yes, our neural model is trained on diverse motion-blur patterns to recover recognizable subjects." }]
  },
  {
    slug: "gfpgan-face-enhancement",
    title: "GFPGAN Face Enhancement - Restore Blurry Faces Free",
    description: "State-of-the-art GFPGAN AI face restoration. Rebuild clear eyes, realistic skin, teeth, and hair from old, compressed, or blurry photos.",
    category: "aitool",
    tagline: "Industry-leading facial detail reconstruction",
    systemPrompt: "Apply GFPGAN generative facial prior restoration. Reconstruct photorealistic eyes, skin texture, and mouth features with zero distortion.",
    examplePrompt: "Enhance facial details with GFPGAN, restore sharp eyes and natural skin",
    features: ["Photorealistic eye and iris restoration", "Natural skin texture preservation", "Instant 1-click enhancement"],
    faqs: [{ question: "What is GFPGAN?", answer: "GFPGAN (Generative Facial Prior GAN) uses pre-trained facial features to hallucinate realistic, lifelike details on degraded face photos." }]
  },
  {
    slug: "batch-hd-upscaler",
    title: "Batch HD Upscaler - Upscale Multiple Images Simultaneously",
    description: "Process up to 50 photos at once with our Batch HD Upscaler. Save hours of manual editing for e-commerce, catalogs, and photo archives.",
    category: "aitool",
    tagline: "Scale your workflow with high-speed batch enhancement",
    systemPrompt: "Batch upscale all selected images to HD resolution uniformly.",
    examplePrompt: "Batch upscale to high definition with balanced color enhancement",
    features: ["Bulk upload up to 50 photos", "Parallel cloud processing", "One-click ZIP download"],
    faqs: [{ question: "How many images can I upscale at once?", answer: "You can batch process dozens of images simultaneously with full credit transparency." }]
  },
  {
    slug: "video-upscaler",
    title: "AI Video Upscaler - Upscale Video to 4K 60FPS",
    description: "Enhance video resolution from 1080p to 4K with temporal coherence. Remove video noise, artifacts, and increase clarity.",
    category: "aitool",
    tagline: "Cinematic 4K video resolution enhancement",
    systemPrompt: "Enhance video frames with temporal consistency and 4K super-resolution.",
    examplePrompt: "Upscale video to 4K with frame stabilization and noise reduction",
    features: ["Frame-to-frame temporal coherence", "Artifact & compression removal", "MP4 and WebM support"],
    faqs: [{ question: "Does it support long videos?", answer: "Yes, video clips can be uploaded and processed in high-speed cloud clusters." }]
  },
  {
    slug: "colorize-photo",
    title: "Colorize Photo - Turn Black & White Photos into Color Free",
    description: "Bring historical black and white photos to life with natural, realistic AI colorization. Accurate skin tones, clothing, and background colors.",
    category: "aitool",
    tagline: "Breathe vibrant historical colors into vintage memories",
    systemPrompt: "Analyze the grayscale photo and predict realistic historical color palettes for human skin, period clothing, foliage, and sky.",
    examplePrompt: "Colorize vintage black and white photo with authentic historical colors",
    beforeImage: "/showcase/before-passport-photo.webp",
    afterImage: "/showcase/after-passport-photo.webp",
    features: ["Historical color intelligence", "Natural flesh and hair hues", "One-click instant colorization"],
    faqs: [{ question: "How does the AI know what colors to use?", answer: "The AI is trained on millions of color/grayscale image pairs and understands context like military uniforms, foliage, and vintage dyes." }]
  },
  {
    slug: "fix-scratched-photos",
    title: "Fix Scratched Photos - AI Scratch & Tear Removal",
    description: "Erase scratches, tears, dust, and physical creases from scanned old photographs seamlessly without leaving marks.",
    category: "aitool",
    tagline: "Restore damaged heirlooms back to pristine condition",
    systemPrompt: "Detect and inpaint all physical scratches, surface cracks, and dust marks seamlessly.",
    examplePrompt: "Remove all surface scratches and tears, restore smooth photo paper texture",
    features: ["Automatic scratch detection", "Seamless texture inpainting", "Preserves original subject details"],
    faqs: [{ question: "Does it work on badly ripped photos?", answer: "Yes, the AI detects missing areas and reconstructs the image using surrounding visual cues." }]
  },
  {
    slug: "fix-creased-photos",
    title: "Fix Creased Photos - Remove Fold Marks & Cracks Online",
    description: "Remove folding lines, crease marks, and paper cracks from damaged family pictures with advanced AI restoration.",
    category: "aitool",
    tagline: "Smooth out fold lines and paper creases effortlessly",
    systemPrompt: "Erase fold creases, paper fissures, and restore continuous image texture.",
    examplePrompt: "Remove center crease fold and paper cracks seamlessly",
    features: ["Deep inpainting along fold trajectories", "Shadow and highlight equalization", "100% automated"],
    faqs: [{ question: "Will fixing creases blur the faces underneath?", answer: "No, the neural model specifically isolates fold damage and preserves facial anatomy." }]
  },
  {
    slug: "fix-water-damaged-photos",
    title: "Fix Water Damaged Photos - Restore Stained & Faded Pictures",
    description: "Repair water stains, mildew spots, liquid discoloration, and washed-out pigments on vintage photos with AI inpainting.",
    category: "aitool",
    tagline: "Erase water rings, stains, and pigment fading",
    systemPrompt: "Remove water marks, moisture stains, and color bleeding while revitalizing contrast.",
    examplePrompt: "Remove water stain blotches and restore true color saturation",
    features: ["Liquid stain neutralization", "Pigment restoration", "Texture smoothing"],
    faqs: [{ question: "Can it fix faded color from water exposure?", answer: "Yes, it normalizes local contrast and recovers original hue balances." }]
  },
  {
    slug: "fix-yellowed-photos",
    title: "Fix Yellowed Photos - AI Old Photo De-Yellowing",
    description: "Correct age-induced paper yellowing and acid oxidation. Restore clean whites, balanced contrasts, and natural skin tones.",
    category: "aitool",
    tagline: "Reverse decades of oxidation and paper aging",
    systemPrompt: "Correct sepia shift and chemical yellowing, rebalance white point and neutral grays.",
    examplePrompt: "Remove yellow tint, restore neutral white balance and original contrast",
    features: ["Automatic color temperature correction", "Paper oxidation reversal", "Crisp monochrome or full-color outputs"],
    faqs: [{ question: "Why do old photos turn yellow?", answer: "Sunlight and acidic paper degrade chemicals over time. Our AI reverses this color temperature shift." }]
  },
  {
    slug: "make-ai-photo-realistic",
    title: "Make AI Photo Realistic - Remove Plastic AI Look",
    description: "Convert synthetic Midjourney, DALL-E, or Stable Diffusion renders into authentic, lifelike photographs with natural imperfections.",
    category: "aitool",
    tagline: "Eliminate the telltale synthetic shine from AI art",
    systemPrompt: "Infuse realistic camera sensor noise, subtle skin pores, organic lighting falloff, and natural imperfections to eliminate AI plasticity.",
    examplePrompt: "Make AI image look like an authentic raw DSLR photograph with natural skin pores and realistic lighting",
    features: ["Organic skin pore generation", "DSLR lens blur & chromatic aberration", "Eliminates waxy plastic sheen"],
    faqs: [{ question: "Why do AI photos look fake?", answer: "AI models often over-smooth skin and create uncanny symmetry. SeedPix injects realistic micro-textures to pass the eye test." }]
  },
  {
    slug: "remove-ai-look",
    title: "Remove AI Look - AI to Genuine Human Photo Converter",
    description: "Strip the synthetic, artificial airbrushed look from AI images. Add authentic grain, genuine expressions, and real-world camera lighting.",
    category: "aitool",
    tagline: "Transform AI portraits into believable real-world photos",
    systemPrompt: "Demote AI glossiness, introduce realistic film grain, organic shadows, and camera lens characteristics.",
    examplePrompt: "Remove AI smoothness and make portrait look taken by a real camera",
    features: ["Authentic depth of field", "Real-world skin blemishes & pores", "Natural lighting calibration"],
    faqs: [{ question: "Can this fool AI detectors?", answer: "By introducing genuine sensor noise and organic textures, images frequently appear far more natural to both humans and detectors." }]
  }
];

export const STYLE_TOOLS: CatalogItem[] = [
  {
    slug: "photo-to-ghibli",
    title: "Photo to Ghibli - Turn Photos into Studio Ghibli Anime Style",
    description: "Transform your photos into enchanting Hayao Miyazaki and Studio Ghibli aesthetic illustrations with lush greenery, painterly skies, and warm nostalgia.",
    category: "style",
    tagline: "Nostalgic watercolor scenery and whimsical anime charm",
    systemPrompt: "Transform the input photo into a hand-painted Studio Ghibli anime style scene. Use lush green landscapes, puffy white clouds against cerulean skies, painterly watercolor brush strokes, and whimsical nostalgic warmth.",
    examplePrompt: "Studio Ghibli style, hand-painted anime landscape, lush grass, fluffy summer clouds, warm sunny day",
    features: ["Hand-painted anime aesthetics", "Iconic Ghibli blue skies and fluffy clouds", "Warm nostalgic color grading"],
    faqs: [{ question: "Can I convert portraits to Ghibli style?", answer: "Yes! Both landscape photos and portraits will be reimagined as classic hand-drawn Ghibli characters." }]
  },
  {
    slug: "photo-to-anime",
    title: "Photo to Anime - Turn Photos into Japanese Anime Art",
    description: "Convert any portrait, selfie, or landscape into high-quality modern Japanese anime art with expressive eyes, clean line art, and vibrant colors.",
    category: "style",
    tagline: "Become an anime protagonist in one click",
    systemPrompt: "Redraw the photo as high-quality modern Japanese anime art. Emphasize stylized expressive eyes, sharp ink lineart, and vibrant cel-shading.",
    examplePrompt: "Modern Japanese anime style, cel-shaded illustration, clean line art, expressive eyes",
    features: ["Crisp anime cel shading", "Expressive character eyes", "Retains your distinctive hair and features"],
    faqs: [{ question: "Will it still look like me?", answer: "Yes, our algorithm retains your face shape, hairstyle, and pose while translating features into anime proportions." }]
  },
  {
    slug: "photo-to-cartoon",
    title: "Photo to Cartoon - 3D & 2D Cartoon Avatar Maker",
    description: "Turn your photos into fun 3D animated or 2D cartoon avatars. Perfect for profile pictures, stickers, and social media avatars.",
    category: "style",
    tagline: "Vibrant animated 3D cartoon avatars",
    systemPrompt: "Transform the subject into an adorable animated 3D cartoon character with smooth studio lighting and playful expressive charm.",
    examplePrompt: "3D animated cartoon character style, smooth shading, cute expressive features, Pixar vibes",
    features: ["Pixar & Disney inspired 3D stylization", "Playful vibrant color palettes", "High-res output for avatars"],
    faqs: [{ question: "Is this good for Discord and social avatars?", answer: "Absolutely! It's one of our most popular styles for YouTube, Discord, and Instagram profile pictures." }]
  },
  {
    slug: "photo-to-oil-painting",
    title: "Photo to Oil Painting - Classic Fine Art Canvas Filter",
    description: "Convert your pictures into museum-quality classical oil paintings with rich impasto textures, palette knife strokes, and timeless Renaissance lighting.",
    category: "style",
    tagline: "Museum-worthy fine art on canvas",
    systemPrompt: "Render the photo as a classical fine art oil painting on textured canvas. Incorporate visible brush strokes, impasto paint depth, and chiaroscuro dramatic lighting.",
    examplePrompt: "Classical oil painting on canvas, visible brush strokes, rich warm colors, Rembrandt lighting",
    features: ["Authentic canvas texture simulation", "Rich oil paint gloss & stroke relief", "Timeless artistic atmosphere"],
    faqs: [{ question: "Can I print this on real canvas?", answer: "Yes, download the full resolution image and print it directly onto canvas for stunning home decor." }]
  },
  {
    slug: "photo-to-watercolor",
    title: "Photo to Watercolor - Soft Painterly Watercolor Effect",
    description: "Transform photos into delicate watercolor paintings with soft color washes, fluid pigment gradients, and rough paper bleeding effects.",
    category: "style",
    tagline: "Fluid, ethereal watercolor artistry",
    systemPrompt: "Convert photo into a delicate watercolor painting with translucent pigment washes, wet-on-wet paint bleeding, and subtle splatter on cold-press paper.",
    examplePrompt: "Soft watercolor painting, pastel color washes, artistic paint drips, cold-press paper texture",
    features: ["Delicate wet-on-wet paint effects", "Organic paper grain integration", "Soft artistic color bleeding"],
    faqs: [{ question: "Does it work well for pet photos?", answer: "Pet portraits in watercolor look especially heartwarming and artistic." }]
  },
  {
    slug: "photo-to-vintage",
    title: "Photo to Vintage - 70s, 80s & 90s Retro Film Effect",
    description: "Give your photos authentic vintage 35mm film aesthetics with nostalgic warm grain, light leaks, chromatic aberration, and Kodak color grading.",
    category: "style",
    tagline: "Golden era 35mm analog film nostalgia",
    systemPrompt: "Apply authentic 1980s 35mm vintage film photography styling with subtle grain, gentle light leaks, analog color shifts, and warm faded blacks.",
    examplePrompt: "Vintage 35mm film photograph, 1980s retro aesthetic, subtle film grain, Kodak Portra colors, soft golden hour light leak",
    features: ["Authentic Kodak/Fuji film stock simulation", "Natural analog grain and light leaks", "Timeless aesthetic nostalgia"],
    faqs: [{ question: "Is this better than simple filters?", answer: "Yes, our AI synthesizes physical lens optics, depth of field, and film grain rather than just slapping on a color tint." }]
  }
];

export function getCatalogItemBySlug(slug: string): CatalogItem | undefined {
  const all = [...AI_MODELS, ...AI_TOOLS, ...STYLE_TOOLS];
  return all.find((item) => item.slug === slug);
}
