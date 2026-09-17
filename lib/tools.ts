import type { ToolPageData } from "./types";

export const tools: ToolPageData[] = [
  {
    slug: "filter-remover",
    title: "AI Filter Remover - Remove Any Filter Free",
    description:
      "Remove any AI filter from your photos for free. Restore the original photo from matcha, anime, cartoon, and other AI filters with one click. No signup needed.",
    shortDescription: "Remove matcha, anime & any AI filter from photos",
    category: "remove",
    credits: 10,
    systemPrompt:
      "You are an AI photo restoration engine. The user uploaded a photo that has an AI filter applied on top of a real photo. Remove the filter effect completely and reconstruct the realistic original photo underneath: restore natural skin tones, real hair texture, true colors, and realistic lighting. Keep the exact same subject, pose, framing, and composition. Do not just reduce saturation - regenerate realistic pixels.",
    examplePrompt: "Remove the filter and restore my original photo",
    keywords: [
      "filter remover",
      "ai filter remover",
      "remove filter from photo",
      "remove ai filter",
      "filter remover ai",
      "how to remove filter from photo",
      "remove matcha filter",
      "ai remove filter",
    ],
    faqs: [
      {
        question: "How does the AI filter remover work?",
        answer:
          "Our AI filter remover analyzes your photo and detects the filter effect applied on top of the original image. It then reconstructs the realistic photo underneath by regenerating natural skin tones, textures, and colors while keeping the same subject, pose, and composition.",
      },
      {
        question: "Can I remove any AI filter for free?",
        answer:
          "Yes, you get 5 free credits when you sign up, plus 1 free credit every day. Each filter removal costs 10 credits. The first removal requires a credit package, starting at $9.99 for 350 credits.",
      },
      {
        question: "What types of filters can be removed?",
        answer:
          "Our tool can remove most AI-generated filters including matcha filter, anime style, cartoon effect, oil painting, watercolor, and other artistic filters. It works best when the filter preserves the original photo structure.",
      },
      {
        question: "Do I need the original photo?",
        answer:
          "No. The AI reconstructs the realistic photo directly from the filtered image itself. This works even when the original file was never saved or was deleted.",
      },
      {
        question: "Is the filter remover free without signup?",
        answer:
          "You can try the tool immediately without signing up. To save your results and get free credits, sign up - new users receive 5 free credits plus 1 free credit daily.",
      },
      {
        question: "What image formats are supported?",
        answer:
          "We support JPG, PNG, and WebP files up to 20MB. The output keeps the aspect ratio of your uploaded image.",
      },
    ],
    comparison: [
      {
        name: "sparkpix filter remover",
        rows: [
          "Just the filtered image",
          "About 30 seconds",
          "Yes, keeps pose & framing",
          "Free to start",
        ],
      },
      {
        name: "Ask for the original photo",
        rows: [
          "Someone who still has the original file",
          "Depends on response time",
          "Yes",
          "Free, if they answer",
        ],
      },
      {
        name: "Manual color correction",
        rows: [
          "Filtered image + Photoshop skills",
          "Hours per photo",
          "No - filter is not just a color cast",
          "Photoshop from $22.99/month",
        ],
      },
    ],
    steps: [
      {
        title: "Upload the filtered photo",
        description: "Drop your filtered image into the tool. JPG, PNG, or WebP up to 20MB.",
      },
      {
        title: "Click Remove Filter",
        description: "One click, no prompt writing. The AI handles the rest automatically.",
      },
      {
        title: "Download the original",
        description: "Get a natural-looking photo in about 30 seconds.",
      },
    ],
    demos: [
      {
        title: "Matcha filter → original photo",
        description: "Drag the slider to see the filter removed and the real photo restored.",
        beforeImage: "/demos/before-photo-to-anime.webp",
        afterImage: "/demos/after-photo-to-anime.webp",
      },
      {
        title: "Watermark → clean image",
        description: "Remove embedded watermarks and logos seamlessly.",
        beforeImage: "/demos/before-remove-watermark.webp",
        afterImage: "/demos/after-remove-watermark.webp",
      },
    ],
  },
  {
    slug: "remove-matcha-filter",
    title: "Remove Matcha Filter - Restore the Real Photo",
    description:
      "Remove the viral matcha filter from photos and get the original back. AI reconstructs the real photo underneath the green liquid art. No original file needed.",
    shortDescription: "Reverse the viral matcha filter trend",
    category: "remove",
    credits: 10,
    systemPrompt:
      "You are an AI photo restoration engine specialized in reversing the matcha filter trend. The user uploaded a matcha-style liquid art image (green liquid sculpture effect). Reconstruct the realistic photo underneath: restore natural skin, real hair, true-to-life colors and lighting. Keep the exact subject, pose, framing, and composition of the matcha image. Remove the green color cast, liquid surface texture, and illustration-like rendering style completely.",
    examplePrompt: "Turn my matcha art back into a real photo",
    keywords: [
      "remove matcha filter",
      "matcha filter remover",
      "how to remove matcha filter",
      "matcha trend filter",
      "remove the matcha filter",
      "matcha filter remover free",
      "how to remove matcha filter tiktok",
      "unmatcha photo",
    ],
    faqs: [
      {
        question: "What is the matcha filter?",
        answer:
          "The matcha filter is a viral AI art trend that turns ordinary photos into matcha-style liquid art: the subject looks sculpted from flowing green matcha with creamy foam swirls. It spread across TikTok, Instagram, and X in 2026.",
      },
      {
        question: "How do I remove the matcha filter from a photo?",
        answer:
          "Upload your matcha image and click one button. Our AI reads the preserved structure (pose, framing, facial proportions) and re-generates the realistic photograph underneath.",
      },
      {
        question: "Can I remove the matcha filter without the original photo?",
        answer:
          "Yes, that's the main use case. The tool reconstructs the realistic photo directly from the matcha image itself - no original file, no reference photo, no manual masking.",
      },
      {
        question: "Will the result look exactly like my original photo?",
        answer:
          "The output is an AI reconstruction, not a pixel-perfect recovery. Facial structure, pose, and composition carry over, so the result usually looks convincingly like the same photo. Clearly structured portraits give the best results.",
      },
      {
        question: "How much does it cost to remove a matcha filter?",
        answer:
          "One matcha filter removal costs 10 credits. Signing up gives you 5 free credits, which covers a start on other tools. Packs start at $9.99 for 350 credits.",
      },
      {
        question: "What formats are supported?",
        answer:
          "JPG, PNG, and WebP files up to 20MB. Uploads are deleted within 3 days; your results are yours to keep.",
      },
    ],
    demos: [
      {
        title: "Matcha art → real photo",
        description: "The green liquid effect is reversed, restoring natural skin and colors.",
        beforeImage: "/demos/before-photo-to-ghibli.webp",
        afterImage: "/demos/after-photo-to-ghibli.webp",
      },
    ],
  },
  {
    slug: "edit-text-in-image",
    title: "Edit Text in Image - Add or Change Text Free",
    description:
      "Edit text in images online for free. Add, remove, or change text in any photo with AI - no Photoshop needed. Keep the original font and style automatically.",
    shortDescription: "Add, remove or change text in any image",
    category: "edit",
    credits: 10,
    systemPrompt:
      "You are an AI image text editor. The user wants to edit text in their image. Follow their instruction: add, remove, or change text while preserving the original image quality, font style, colors, and lighting. Make the edit look natural and seamless.",
    examplePrompt: "Change the text in this image to 'Hello World' keeping the same font",
    keywords: [
      "edit text in image",
      "edit text on image",
      "photo text editor",
      "edit photo text",
      "change text in picture",
      "free web based image text editor",
      "remove text from image",
      "add text to image online",
    ],
    faqs: [
      {
        question: "How do I edit text in an image online for free?",
        answer:
          "Upload your image, type the new text or describe the edit, and our AI does the rest. It preserves the original font style, size, and placement automatically.",
      },
      {
        question: "Can I edit text without Photoshop?",
        answer:
          "Yes. Our AI text editor works entirely in your browser. No downloads, no layers, no learning curve - just type what you want.",
      },
      {
        question: "Can the AI keep the original font and size?",
        answer:
          "Yes. The AI analyzes the existing text style and matches the font, size, color, and position when you make changes, so the result looks natural.",
      },
      {
        question: "Can I remove text from an image?",
        answer:
          "Yes, you can remove text, watermarks, dates, or captions from any image. The AI fills in the background naturally.",
      },
      {
        question: "Can I change the date stamp or timestamp text in a picture?",
        answer:
          "Yes. Upload a photo with a date stamp, timestamp, or camera watermark, and describe the new date text you want. The AI rewrites it while keeping the original font and style.",
      },
      {
        question: "What image formats are supported?",
        answer: "JPG, PNG, and WebP files up to 20MB.",
      },
      {
        question: "Is editing text in images free?",
        answer:
          "You get 5 free credits on signup plus 1 free daily credit. Text editing costs 10 credits per image. Credit packs start at $9.99.",
      },
    ],
    demos: [
      {
        title: "Change text while keeping the font",
        description: "Edit, add, or remove text in any image while preserving the original style.",
        beforeImage: "/demos/before-reframe-photo.webp",
        afterImage: "/demos/after-reframe-photo.webp",
      },
    ],
  },
  {
    slug: "remove-person-from-photo",
    title: "Remove Person from Photo Free - AI Object Removal",
    description:
      "Remove people from photos online for free with AI. Erase tourists, photobombers, or ex-partners from any photo in seconds. No Photoshop needed.",
    shortDescription: "Erase people from photos in one click",
    category: "remove",
    credits: 10,
    systemPrompt:
      "You are an AI photo inpainting engine. Remove the person(s) the user specifies from the photo and fill in the background naturally using context-aware generation. Preserve lighting, shadows, and texture so the result looks like the person was never there.",
    examplePrompt: "Remove the person on the left from this photo",
    keywords: [
      "remove person from photo",
      "remove people from photo",
      "remove person from photo online free",
      "remove someone from photo",
      "remove people from picture",
      "how to remove person from photo",
      "erase person from photo",
      "remove photobomber",
    ],
    faqs: [
      {
        question: "How do I remove a person from a photo online for free?",
        answer:
          "Upload your photo and tell the AI who to remove (or let it detect people). The AI erases the person and fills in the background naturally in seconds.",
      },
      {
        question: "Can I remove people from photos without Photoshop?",
        answer:
          "Yes. Our AI inpainting engine does the work automatically - no layers, masks, or selection tools needed.",
      },
      {
        question: "Can I remove tourists or photobombers from travel photos?",
        answer:
          "Yes, this is the most common use case. Remove crowds, tourists, and accidental photobombers from your vacation photos.",
      },
      {
        question: "Does it work on group photos?",
        answer:
          "Yes. You can remove one or multiple people from group photos. The AI preserves the remaining people and fills in gaps naturally.",
      },
      {
        question: "Can I remove multiple people from a photo at once?",
        answer:
          "Yes. Describe who to remove (e.g. 'remove everyone except the bride') or let the AI detect people, and it will erase all of them while keeping the scene intact.",
      },
      {
        question: "Is it really free?",
        answer:
          "You get 5 free credits on signup plus 1 daily credit. Removal costs 10 credits per photo. Packs start at $9.99 for 350 credits.",
      },
      {
        question: "What formats are supported?",
        answer: "JPG, PNG, and WebP files up to 20MB.",
      },
    ],
    demos: [
      {
        title: "Remove people from travel photos",
        description: "Erase tourists and photobombers while keeping the scene intact.",
        beforeImage: "/demos/before-remove-photobombers.webp",
        afterImage: "/demos/after-remove-photobombers.webp",
      },
    ],
  },
  {
    slug: "remove-object-from-photo",
    title: "Remove Object from Photo Free - AI Object Remover",
    description:
      "Remove unwanted objects from photos online for free. Erase text, watermarks, power lines, reflections, and any clutter with AI in seconds.",
    shortDescription: "Erase any unwanted object from photos",
    category: "remove",
    credits: 10,
    systemPrompt:
      "You are an AI object removal engine. Remove the object(s) the user specifies from the photo and fill in the background naturally. Preserve lighting, shadows, and perspective so the result looks untouched.",
    examplePrompt: "Remove the power lines from this photo",
    keywords: [
      "remove object from photo",
      "object remover",
      "ai object remover",
      "remove object from image",
      "remove unwanted objects from photo",
      "object remover ai",
      "remove clutter from photo",
      "ai remove object",
    ],
    faqs: [
      {
        question: "How do I remove an object from a photo online for free?",
        answer:
          "Upload your photo, describe the object to remove (or use the brush), and the AI erases it and fills the space naturally.",
      },
      {
        question: "What objects can be removed?",
        answer:
          "Almost anything: text, watermarks, power lines, reflections, shadows, tattoos, people, cars, and general clutter.",
      },
      {
        question: "Can I remove text or watermarks from images?",
        answer:
          "Yes. The AI detects the text or watermark area and regenerates the background underneath seamlessly.",
      },
      {
        question: "Does it work on product photos?",
        answer:
          "Yes. Clean up product photos for Amazon, Etsy, or Shopify by removing reflections, shadows, and clutter.",
      },
      {
        question: "Is object removal free?",
        answer:
          "You get 5 free credits on signup plus 1 daily credit. Removal costs 10 credits per photo.",
      },
      {
        question: "What formats are supported?",
        answer: "JPG, PNG, and WebP files up to 20MB.",
      },
    ],
    demos: [
      {
        title: "Remove clutter from photos",
        description: "Power lines, reflections, and unwanted objects disappear seamlessly.",
        beforeImage: "/demos/before-remove-objects-generic.webp",
        afterImage: "/demos/after-remove-objects-generic.webp",
      },
    ],
  },
  {
    slug: "gemini-watermark-remover",
    title: "Gemini Watermark Remover - Remove It Free",
    description:
      "Remove the Gemini AI watermark and logo from your images online free. Clean Gemini-generated photos without losing quality. No signup needed.",
    shortDescription: "Remove Gemini AI watermark & logo",
    category: "watermark",
    credits: 10,
    systemPrompt:
      "You are an AI watermark removal engine. Remove the Gemini AI watermark, logo, or SynthID badge from the image completely. Reconstruct the underlying pixels so the image looks clean and untouched, preserving original quality, texture, and colors. Only remove watermarks the user is authorized to remove.",
    examplePrompt: "Remove the Gemini watermark from this image",
    keywords: [
      "gemini watermark remover",
      "remove gemini watermark",
      "gemini logo remover",
      "free gemini watermark remover",
      "gemini ai watermark remover",
      "remove gemini logo from image",
      "gemini watermark remover online",
    ],
    faqs: [
      {
        question: "How do I remove the Gemini watermark from an image?",
        answer:
          "Upload your Gemini-generated image and click one button. The AI detects the watermark or logo and reconstructs the underlying pixels seamlessly.",
      },
      {
        question: "Is there a free Gemini watermark remover?",
        answer:
          "You get 5 free credits on signup plus 1 daily credit. Watermark removal costs 10 credits per image.",
      },
      {
        question: "Can I remove the Gemini logo without losing quality?",
        answer:
          "Yes. The AI regenerates the watermarked area pixel by pixel, preserving the original image quality, texture, and colors.",
      },
      {
        question: "Does it work on photos with multiple watermarks?",
        answer:
          "Yes, the AI can detect and remove multiple watermarks or logos in a single pass.",
      },
      {
        question: "What formats are supported?",
        answer: "JPG, PNG, and WebP files up to 20MB.",
      },
      {
        question: "Is it legal to remove watermarks?",
        answer:
          "Use this tool only on images you generated yourself or have rights to edit. Removing watermarks from others' copyrighted content may violate terms of service.",
      },
    ],
    demos: [
      {
        title: "Clean AI-generated images",
        description: "Remove the Gemini watermark and logo without losing quality.",
        beforeImage: "/demos/before-remove-watermark.webp",
        afterImage: "/demos/after-remove-watermark.webp",
      },
    ],
  },
  {
    slug: "unblur-image",
    title: "Unblur Image Free - Fix Blurry Photos with AI",
    description:
      "Unblur images online for free with AI. Fix blurry, out-of-focus, or shaky photos instantly. No signup needed, no quality loss.",
    shortDescription: "Fix blurry photos instantly with AI",
    category: "enhance",
    credits: 10,
    systemPrompt:
      "You are an AI photo deblurring engine. Sharpen the blurry image, restore lost details, reduce noise, and fix motion blur or out-of-focus areas. Keep natural skin texture and avoid over-sharpening artifacts.",
    examplePrompt: "Unblur this photo and make it sharp",
    keywords: [
      "unblur image",
      "unblur image online free",
      "unblur photo",
      "fix blurry photo",
      "unblur image free online no signup",
      "sharpen blurry image",
      "fix out of focus photo",
      "deblur image ai",
    ],
    faqs: [
      {
        question: "How do I unblur an image online for free?",
        answer:
          "Upload your blurry photo and click one button. Our AI sharpens the image, restores detail, and reduces noise in seconds.",
      },
      {
        question: "Can I unblur images without signing up?",
        answer:
          "You can try immediately. To save results and get free credits, sign up for 5 free credits plus 1 daily credit.",
      },
      {
        question: "Can the AI fix motion blur?",
        answer:
          "Yes. The AI detects and corrects motion blur, out-of-focus areas, and compression artifacts.",
      },
      {
        question: "Will unblurring reduce image quality?",
        answer:
          "No. The AI reconstructs missing detail instead of just applying a sharpening filter, so the result looks natural.",
      },
      {
        question: "What formats are supported?",
        answer: "JPG, PNG, and WebP files up to 20MB.",
      },
      {
        question: "How much does it cost?",
        answer:
          "Unblurring costs 10 credits per image. Free credits on signup + daily credit included.",
      },
    ],
    demos: [
      {
        title: "Blurry old photo → sharp",
        description: "Motion blur and out-of-focus areas are fixed instantly.",
        beforeImage: "/demos/unblur-oldphoto.webp",
        afterImage: "/demos/photo-restoration.webp",
      },
    ],
  },
  {
    slug: "4k-image-upscaler",
    title: "4K Image Upscaler - Upscale Photos Free",
    description:
      "Upscale images to 4K resolution online free with AI. Enhance image quality, sharpness, and detail without losing quality. No Photoshop needed.",
    shortDescription: "Upscale any image to 4K quality",
    category: "enhance",
    credits: 10,
    systemPrompt:
      "You are an AI image upscaling engine. Upscale the image to 4K resolution, enhancing sharpness and detail. Reconstruct fine textures naturally without introducing artifacts or plastic-looking results.",
    examplePrompt: "Upscale this photo to 4K resolution",
    keywords: [
      "4k image upscaler",
      "4k enhancer",
      "upscale image to 4k",
      "image upscaler 4k free",
      "4k photo enhancer",
      "enhance image to 4k",
      "photo in 4k",
      "4k resolution",
    ],
    faqs: [
      {
        question: "How do I upscale an image to 4K online for free?",
        answer:
          "Upload your image and click one button. The AI upscales it to 4K resolution while enhancing detail and sharpness.",
      },
      {
        question: "Will upscaling reduce quality?",
        answer:
          "No. AI upscaling reconstructs missing detail instead of just stretching pixels, so the result looks sharper, not blurrier.",
      },
      {
        question: "Can I upscale photos for printing?",
        answer:
          "Yes. Our 4K upscaler is perfect for preparing images for large-format printing.",
      },
      {
        question: "What formats are supported?",
        answer: "JPG, PNG, and WebP files up to 20MB.",
      },
      {
        question: "How much does upscaling cost?",
        answer:
          "4K upscaling costs 10 credits per image. Free credits on signup + daily credit included.",
      },
      {
        question: "Is 4K upscaling really free?",
        answer:
          "You get 5 free credits on signup plus 1 daily credit to try it out. Credit packs start at $9.99.",
      },
    ],
    demos: [
      {
        title: "Low-res → 4K sharpness",
        description: "Detail is reconstructed, not stretched. Results stay natural.",
        beforeImage: "/demos/restoration-old-photo-low-resolution.webp",
        afterImage: "/demos/photo-restoration.webp",
      },
    ],
  },
  {
    slug: "ai-photo-to-real",
    title: "AI Photo to Real - Make AI Images Realistic",
    description:
      "Turn AI-generated images into realistic photos online free. Remove the AI look, fix plastic skin, and make AI photos look human. No signup needed.",
    shortDescription: "Make AI images look like real photos",
    category: "edit",
    credits: 10,
    systemPrompt:
      "You are an AI image humanizer. Transform the AI-generated image into a realistic photograph: fix plastic-looking skin, add natural skin texture and pores, correct unnatural lighting, and remove the AI artifact look. Keep the subject, pose, and composition identical.",
    examplePrompt: "Make this AI image look like a real photo",
    keywords: [
      "ai photo to real",
      "ai image humanizer",
      "make ai image realistic",
      "remove ai look from photo",
      "make ai photo look real",
      "ai image to real photo",
      "humanize ai image",
      "remove ai detection from image",
    ],
    faqs: [
      {
        question: "How do I turn an AI image into a realistic photo?",
        answer:
          "Upload your AI-generated image and click one button. The AI removes the AI look - fixing skin texture, lighting, and artifacts.",
      },
      {
        question: "Can I remove the AI look from photos?",
        answer:
          "Yes. The AI detects common AI artifacts like plastic skin, waxy texture, and unnatural lighting, then regenerates realistic pixels.",
      },
      {
        question: "Does it work on AI portraits?",
        answer:
          "Yes, AI portraits are the most common use case. Fix skin, hair, and eyes to look natural.",
      },
      {
        question: "Can I make AI images undetectable?",
        answer:
          "Our tool makes AI images look more realistic, which can help them pass as human-created. Use responsibly.",
      },
      {
        question: "What formats are supported?",
        answer: "JPG, PNG, and WebP files up to 20MB.",
      },
      {
        question: "Is it free?",
        answer:
          "You get 5 free credits on signup plus 1 daily credit. Costs 10 credits per image.",
      },
    ],
    demos: [
      {
        title: "AI look → realistic photo",
        description: "Plastic skin and unnatural lighting are fixed to look human.",
        beforeImage: "/demos/before-photo-to-anime.webp",
        afterImage: "/demos/after-turn-into-painting.webp",
      },
    ],
  },
  {
    slug: "background-remover",
    title: "Background Remover - Remove Image Background Free",
    description:
      "Remove image backgrounds online for free with AI. Cut out people, products, and objects with hair-level precision. No Photoshop needed.",
    shortDescription: "Remove & replace backgrounds in one click",
    category: "remove",
    credits: 10,
    systemPrompt:
      "You are an AI background removal engine. Remove the background from the image with precise edge detection. Preserve fine details like hair, fur, and transparent objects. Output a clean cutout with transparent background.",
    examplePrompt: "Remove the background from this photo",
    keywords: [
      "background remover",
      "remove background from image",
      "remove background online free",
      "background remover ai",
      "transparent background maker",
      "cut out image background",
      "remove photo background free",
      "background remover no signup",
    ],
    faqs: [
      {
        question: "How do I remove the background from an image for free?",
        answer:
          "Upload your image and click one button. The AI detects the subject and removes the background with hair-level precision.",
      },
      {
        question: "Does it work on hair and fur?",
        answer:
          "Yes. Our AI handles complex edges including hair, fur, and transparent objects without manual masking.",
      },
      {
        question: "Can I get a transparent background?",
        answer:
          "Yes. The output is a clean cutout with a transparent background (PNG).",
      },
      {
        question: "Is it good for product photos?",
        answer:
          "Yes. Perfect for Amazon, Etsy, and Shopify product photos that require clean white or transparent backgrounds.",
      },
      {
        question: "How much does it cost?",
        answer:
          "Background removal costs 10 credits per image. Free credits on signup + daily credit included.",
      },
      {
        question: "What formats are supported?",
        answer: "JPG, PNG, and WebP files up to 20MB.",
      },
    ],
    demos: [
      {
        title: "Background removed in one click",
        description: "Hair-level precision cutout, ready for e-commerce or design.",
        beforeImage: "/demos/before-swap-background.webp",
        afterImage: "/demos/after-swap-background.webp",
      },
    ],
  },
  {
    slug: "photo-restoration",
    title: "Photo Restoration - Restore Old Photos Free",
    description:
      "Restore old, damaged, faded, or scratched photos online free with AI. Repair scratches, fix tears, colorize black & white, and enhance quality.",
    shortDescription: "Bring damaged old photos back to life",
    category: "enhance",
    credits: 10,
    systemPrompt:
      "You are an AI photo restoration engine. Restore the old, damaged, or faded photo: repair scratches, tears, creases, and water damage; restore faded colors; sharpen blurry areas; colorize black & white photos naturally. Preserve the original faces and details.",
    examplePrompt: "Restore this old photo and fix the scratches",
    keywords: [
      "photo restoration",
      "restore old photos",
      "restore old photos online free",
      "fix scratched photos",
      "repair old photos ai",
      "colorize black and white photos",
      "restore damaged photos",
      "old photo restoration free",
    ],
    faqs: [
      {
        question: "How do I restore old photos online for free?",
        answer:
          "Upload your old or damaged photo and click one button. The AI repairs scratches, tears, fading, and enhances quality automatically.",
      },
      {
        question: "Can it fix scratched or torn photos?",
        answer:
          "Yes. The AI repairs scratches, creases, tears, missing corners, and water damage.",
      },
      {
        question: "Can it colorize black and white photos?",
        answer:
          "Yes. The AI adds natural, realistic colors to black & white photos while preserving the original subjects.",
      },
      {
        question: "Will faces stay recognizable?",
        answer:
          "Yes. Our restoration preserves facial features and structure, keeping people recognizable.",
      },
      {
        question: "Is photo restoration free?",
        answer:
          "You get 5 free credits on signup plus 1 daily credit. Restoration costs 10 credits per photo.",
      },
      {
        question: "What formats are supported?",
        answer: "JPG, PNG, and WebP files up to 20MB.",
      },
    ],
    demos: [
      {
        title: "Damaged old photo → restored",
        description: "Scratches, fading, and tears are repaired automatically.",
        beforeImage: "/demos/scrathed-photo.webp",
        afterImage: "/demos/photo-restoration.webp",
      },
      {
        title: "Faded photo → vivid colors",
        description: "Restore the rich tones lost to decades of sun and time.",
        beforeImage: "/demos/restoration-old-photo-fade.webp",
        afterImage: "/demos/photo-restoration.webp",
      },
    ],
  },
  {
    slug: "ai-photo-enhancer",
    title: "AI Photo Enhancer - Enhance Quality Free",
    description:
      "Enhance photo quality online free with AI. Improve resolution, sharpness, lighting, and colors automatically. Fix dark, blurry, or low-quality photos.",
    shortDescription: "One-click photo quality enhancement",
    category: "enhance",
    credits: 10,
    systemPrompt:
      "You are an AI photo enhancement engine. Enhance the photo quality: improve resolution and sharpness, correct lighting and exposure, boost colors naturally, and reduce noise. Keep the photo looking natural, not over-processed.",
    examplePrompt: "Enhance this photo quality",
    keywords: [
      "ai photo enhancer",
      "photo enhancer",
      "enhance photo quality",
      "ai photo enhancer free",
      "improve photo quality online",
      "enhance image quality",
      "photo quality enhancer",
      "best ai photo enhancer",
    ],
    faqs: [
      {
        question: "How do I enhance photo quality online for free?",
        answer:
          "Upload your photo and click one button. The AI improves resolution, sharpness, lighting, and colors automatically.",
      },
      {
        question: "Can it fix dark or blurry photos?",
        answer:
          "Yes. The AI corrects exposure, reduces noise, and sharpens blurry areas.",
      },
      {
        question: "Will enhancement look natural?",
        answer:
          "Yes. Our AI enhances while preserving natural skin tones and textures, avoiding the over-processed look.",
      },
      {
        question: "How much does it cost?",
        answer:
          "Enhancement costs 10 credits per image. Free credits on signup + daily credit included.",
      },
      {
        question: "What formats are supported?",
        answer: "JPG, PNG, and WebP files up to 20MB.",
      },
      {
        question: "Do I need to sign up?",
        answer:
          "You can try immediately. Sign up for 5 free credits + 1 daily credit to save results.",
      },
    ],
    demos: [
      {
        title: "Dark & dull → vivid & sharp",
        description: "Lighting, colors, and detail are enhanced naturally.",
        beforeImage: "/demos/before-change-outfit-color.webp",
        afterImage: "/demos/after-change-outfit-color.webp",
      },
    ],
  },
  {
    slug: "photo-text-editor",
    title: "Photo Text Editor - Edit Text on Photos Free",
    description:
      "Edit text on photos online free with AI. Add, change, or remove text in any image while keeping the original font and style. No Photoshop, no downloads.",
    shortDescription: "Edit text on photos keeping the font",
    category: "edit",
    credits: 10,
    systemPrompt:
      "You are an AI photo text editor. Edit the text in the user's photo: add new text, change existing text, or remove text. Preserve the original font style, size, color, position, and image quality so the edit looks completely natural.",
    examplePrompt: "Change the store name in this photo sign to 'SeedPix'",
    keywords: [
      "photo text editor",
      "edit text on photo",
      "edit text on photos online free",
      "free web based image text editor",
      "photo text editing",
      "text editor for photos",
      "change text in photo",
      "remove text from photo online free",
    ],
    faqs: [
      {
        question: "How do I edit text on a photo online for free?",
        answer:
          "Upload your photo, tell the AI what text to add, change, or remove, and it edits the image while keeping the original font and style. Results come back in about 30 seconds.",
      },
      {
        question: "Can I edit text without Photoshop?",
        answer:
          "Yes. This is a free web-based image text editor - no downloads, no layers, no selection tools. Just type what you want.",
      },
      {
        question: "Does it keep the original font and size?",
        answer:
          "Yes. The AI analyzes the existing text style and matches the font, size, color, and placement, so edits look completely natural.",
      },
      {
        question: "Can I remove text from a photo?",
        answer:
          "Yes, you can remove signs, labels, watermarks, dates, or captions. The AI fills in the background seamlessly.",
      },
      {
        question: "Is there a free web-based image text editor?",
        answer:
          "Yes, SeedPix runs entirely in your browser. You get 5 free credits on signup plus 1 daily credit. Text editing costs 10 credits per image.",
      },
      {
        question: "What formats are supported?",
        answer: "JPG, PNG, and WebP files up to 20MB.",
      },
    ],
    demos: [
      {
        title: "Edit text while keeping the style",
        description: "Change signs, labels, and captions naturally.",
        beforeImage: "/demos/before-reframe-photo.webp",
        afterImage: "/demos/after-reframe-photo.webp",
      },
    ],
  },
  {
    slug: "text-to-image",
    title: "AI Image Generator - Text to Image Free",
    description:
      "Create stunning images from text with AI. Generate art, illustrations, product mockups, and realistic photos in seconds. Free, no Photoshop needed.",
    shortDescription: "Turn text prompts into images",
    category: "generate",
    credits: 10,
    systemPrompt:
      "You are an AI image generation engine. Generate a high-quality image from the user's text description: follow the prompt precisely and render with good composition, lighting, and detail. Support styles including photorealistic, anime, cartoon, 3D render, oil painting, watercolor, and flat illustration. Match the described subject, scene, style, and mood.",
    examplePrompt: "A photorealistic golden retriever puppy sitting in a sunlit meadow",
    keywords: [
      "text to image",
      "ai image generator",
      "text to image ai",
      "ai art generator",
      "generate image from text",
      "ai image generator free",
      "text to image generator",
      "create image from text",
    ],
    faqs: [
      {
        question: "How do I generate an image from text for free?",
        answer:
          "Type your idea in the editor and click generate. The AI renders a high-quality image from your text description in seconds. New users get 5 free credits on signup plus 1 daily credit.",
      },
      {
        question: "What styles can the AI image generator produce?",
        answer:
          "Photorealistic, anime, cartoon, 3D render, oil painting, watercolor, flat illustration, and more. Just describe the style you want in your prompt.",
      },
      {
        question: "Can I use generated images commercially?",
        answer:
          "Yes. Images you generate with SeedPix are yours to use commercially - no watermark is added to your downloads.",
      },
      {
        question: "Do I need to sign up to generate images?",
        answer:
          "You can generate immediately without signing up. Sign up to save history, claim free credits, and unlock unlimited creating.",
      },
      {
        question: "How much does one image generation cost?",
        answer:
          "One generation costs 10 credits. Signup gives you 5 free credits plus 1 daily credit, and packs start at $9.99 for 350 credits.",
      },
      {
        question: "What formats are supported?",
        answer: "JPG, PNG, and WebP files up to 20MB.",
      },
    ],
    demos: [
      {
        title: "Text prompt → generated scene",
        description: "Type a description and the AI renders a complete image in seconds.",
        image: "/demos/after-relight-scene.webp",
      },
    ],
  },
  {
    slug: "ai-photo-generator",
    title: "AI Photo Generator - Realistic Photos from Text",
    description:
      "Create realistic photos from text with AI. Generate portraits, product shots, and scenes that look like real photographs. Free, no signup needed.",
    shortDescription: "Generate realistic photos from text",
    category: "generate",
    credits: 10,
    systemPrompt:
      "You are an AI photorealistic photo generator. Generate a realistic photograph from the user's text description: natural skin texture, realistic lighting, true-to-life colors, and photographic composition. Output must look like a real camera photo, not an illustration.",
    examplePrompt: "A professional headshot portrait of a woman in a business suit, studio lighting",
    keywords: [
      "ai photo generator",
      "ai photo generator free",
      "generate realistic photo from text",
      "ai photography generator",
      "realistic photo generator",
      "text to realistic photo",
      "ai image generator realistic",
      "create photo with ai",
    ],
    faqs: [
      {
        question: "How do I generate a realistic photo with AI?",
        answer:
          "Type a description of the photo you want - subject, setting, lighting, and style - and the AI renders a photorealistic image in seconds.",
      },
      {
        question: "Can it generate realistic portraits?",
        answer:
          "Yes. The AI generates natural skin texture, realistic lighting, and photographic composition, so portraits look like real camera photos.",
      },
      {
        question: "Can I generate product photos?",
        answer:
          "Yes. Describe the product, background, and lighting to create clean product shots for e-commerce, ads, or mockups.",
      },
      {
        question: "Is the AI photo generator free?",
        answer:
          "You get 5 free credits on signup plus 1 daily credit. Each generation costs 10 credits.",
      },
      {
        question: "Do I need to sign up?",
        answer:
          "You can generate immediately without signing up. Sign up for free credits and history saving.",
      },
      {
        question: "What formats are supported?",
        answer: "JPG, PNG, and WebP files up to 20MB.",
      },
    ],
    demos: [
      {
        title: "Description → realistic photo",
        description: "Photorealistic results with natural skin, light, and texture.",
        image: "/demos/after-linkedin-headshot.webp",
      },
    ],
  },
  {
    slug: "ai-portrait-generator",
    title: "AI Portrait Generator - Create Stunning Portraits",
    description:
      "Generate stunning AI portraits online - professional headshots, artistic portraits, and avatars from a text description. Free, no Photoshop needed.",
    shortDescription: "Generate portraits & headshots with AI",
    category: "generate",
    credits: 10,
    systemPrompt:
      "You are an AI portrait generator. Create a stunning portrait from the user's description: professional composition, flattering lighting, natural skin texture, and expressive features. Support styles: studio headshot, cinematic portrait, artistic illustration, anime avatar. Frame the subject from the chest up with a clean background.",
    examplePrompt: "A cinematic portrait of a man with silver hair, dramatic rim lighting",
    keywords: [
      "ai portrait generator",
      "ai portrait generator free",
      "ai headshot generator",
      "ai avatar generator",
      "generate portrait online",
      "ai profile picture generator",
      "ai photo portrait",
      "portrait generator from text",
    ],
    faqs: [
      {
        question: "How do I generate an AI portrait for free?",
        answer:
          "Describe the person and style you want - e.g. 'a professional headshot of a woman with curly hair, studio lighting' - and the AI generates a portrait in seconds.",
      },
      {
        question: "Can I generate professional headshots?",
        answer:
          "Yes. The AI generates studio-quality headshots with professional composition and flattering lighting - great for LinkedIn and resumes.",
      },
      {
        question: "Can I create an AI avatar?",
        answer:
          "Yes. Generate profile pictures, gaming avatars, and artistic portraits in styles from photorealistic to anime.",
      },
      {
        question: "How much does it cost to generate a portrait?",
        answer:
          "One portrait costs 10 credits. Signup gives you 5 free credits plus 1 daily credit.",
      },
      {
        question: "Can I use the portraits commercially?",
        answer:
          "Yes. Generated portraits are yours to use, with no watermark added to downloads.",
      },
      {
        question: "What formats are supported?",
        answer: "JPG, PNG, and WebP files up to 20MB.",
      },
    ],
    demos: [
      {
        title: "Prompt → studio portrait",
        description: "Professional headshots and artistic portraits in seconds.",
        image: "/demos/after-change-pose.webp",
      },
    ],
  },
];

export function getToolBySlug(slug: string): ToolPageData | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): ToolPageData[] {
  return tools.filter((t) => t.category === category);
}

export function getCategories(): string[] {
  return [...new Set(tools.map((t) => t.category))];
}

/**
 * 返回工具的封面示例图 URL（供首页/卡片复用）。
 * 优先取第一个 demo 的 afterImage，其次单图 image，最后 beforeImage。
 */
export function getToolCover(tool: ToolPageData): string | undefined {
  const d = tool.demos?.[0];
  if (!d) return undefined;
  return d.afterImage || d.image || d.beforeImage || undefined;
}

/** 返回工具的第一对 before/after 示例图（做成滑块/对比用）。 */
export function getToolBeforeAfter(
  tool: ToolPageData,
): { before?: string; after?: string } | undefined {
  const d = tool.demos?.[0];
  if (!d) return undefined;
  return { before: d.beforeImage || d.image, after: d.afterImage || d.image };
}
