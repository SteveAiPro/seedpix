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
          "Yes, you get 10 free credits when you sign up, which covers your first filter removal in full, plus 1 free credit every day. Each removal after that costs 10 credits, and packs start at $9.99 for 350 credits.",
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
          "You can try the tool immediately without signing up. To save your results and get free credits, sign up - new users receive 10 free credits plus 1 free credit daily.",
      },
      {
        question: "What image formats are supported?",
        answer:
          "We support JPG, PNG, and WebP files up to 20MB. The output keeps the aspect ratio of your uploaded image.",
      },
    ],
    comparison: [
      {
        name: "SeedPix filter remover",
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
          "One matcha filter removal costs 10 credits. Signing up gives you 10 free credits, so your first removal is free. Packs start at $9.99 for 350 credits.",
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
          "You get 10 free credits on signup plus 1 free daily credit. Text editing costs 10 credits per image. Credit packs start at $9.99.",
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
          "You get 10 free credits on signup plus 1 daily credit. Removal costs 10 credits per photo. Packs start at $9.99 for 350 credits.",
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
          "You get 10 free credits on signup plus 1 daily credit. Removal costs 10 credits per photo.",
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
    slug: "erase-and-replace-ai",
    title: "Erase and Replace AI Free Online (No Sign Up) | SeedPix",
    description:
      "Erase and replace anything in photos with AI online for free. Inpaint, swap objects, and regenerate backgrounds by typing. No sign up required.",
    shortDescription: "Erase any element and replace it with AI",
    category: "edit",
    credits: 10,
    systemPrompt:
      "You are an advanced AI erase and replace inpainting engine. Erase the specified object, region, or background in the photo and replace it with whatever new object, texture, or element the user describes. Ensure seamless blending, lighting, shadows, and perspective matching so the replacement looks 100% photorealistic.",
    examplePrompt: "Erase the coffee cup and replace it with a vintage camera",
    keywords: [
      "erase and replace ai",
      "ai erase and replace",
      "erase and replace",
      "erase and replace online free",
      "replace object in photo ai",
      "ai inpainting online free",
      "swap object in photo ai",
      "erase object and replace with ai",
      "free ai erase and replace",
    ],
    faqs: [
      {
        question: "How does Erase and Replace AI work?",
        answer:
          "Upload your photo, describe what you want to erase and what you want to replace it with (or use the brush to highlight the area), and our AI inpainting models seamlessly regenerate the new object with matching lighting and perspective.",
      },
      {
        question: "Is Erase and Replace AI completely free without sign up?",
        answer:
          "Yes! You can try our AI photo editor directly in your browser with no mandatory sign up and zero watermarks on your downloaded results.",
      },
      {
        question: "Can I replace people, backgrounds, or specific clothing?",
        answer:
          "Yes. You can swap backgrounds, change outfits, replace furniture, erase clutter, and insert custom objects naturally.",
      },
      {
        question: "What image formats and file sizes are supported?",
        answer:
          "SeedPix supports PNG, JPG, JPEG, and WebP images up to 20MB with high-definition resolution preservation.",
      },
      {
        question: "Can I use the edited photos for commercial projects?",
        answer:
          "Yes. All exported images come with full commercial rights for your e-commerce listings, client work, marketing, and social media.",
      },
    ],
    demos: [
      {
        title: "Erase object and replace seamlessly",
        description: "Swap unwanted elements with creative new objects naturally.",
        beforeImage: "/demos/before-remove-objects-generic.webp",
        afterImage: "/demos/after-remove-objects-generic.webp",
      },
    ],
    updatedAt: "2026-09-21",
  },
  {
    slug: "watermark-remover",
    title: "Free Watermark Remover Online - AI Watermark & Logo Eraser",
    description:
      "Remove watermarks, logos, stamps, and text from photos online free with AI. Erase transparent watermarks and inpaint clean background naturally with no signup.",
    shortDescription: "Erase watermarks, logos & stamps with AI",
    category: "remove",
    credits: 10,
    systemPrompt:
      "You are an advanced AI watermark and text removal engine. Detect and erase all watermarks, logos, text overlays, copyright marks, date stamps, and signature icons from the uploaded image. Reconstruct the underlying background texture, gradient, color, and visual elements seamlessly so no blur, smear, or artifact remains. Only process images the user is authorized to edit.",
    examplePrompt: "Remove all watermarks and logos from this image cleanly, reconstructing natural background",
    keywords: [
      "watermark remover",
      "remove watermark",
      "free watermark remover",
      "watermark remover ai",
      "remove watermark from photo",
      "erase watermark online free",
      "ai watermark remover",
      "remove logo from image",
      "remove watermark without blur",
      "shutterstock watermark remover alternative",
    ],
    updatedAt: "2026-09-26",
    faqs: [
      {
        question: "How does the AI watermark remover work?",
        answer:
          "Our context-aware AI analyzes the pixels around and beneath the watermark. It separates the translucent overlay from the true image data, erasing the watermark and inpainting realistic texture, grain, and color to restore the original composition seamlessly.",
      },
      {
        question: "Can it remove semi-transparent or full-image watermarks?",
        answer:
          "Yes. Unlike traditional clone-stamp tools that leave blurry smudges, our deep-learning model handles complex semi-transparent stamps, stock photo grids, and gradient logos across varied textures.",
      },
      {
        question: "Is SeedPix watermark remover free to use?",
        answer:
          "Yes, you can remove watermarks immediately with no mandatory signup. New accounts receive 10 free credits plus 1 daily credit, allowing you to test full-resolution results for free.",
      },
      {
        question: "Will removing a watermark blur my photo?",
        answer:
          "No. The AI reconstructs natural image details rather than blurring or pixelating the affected area, preserving sharp edges and realistic lighting.",
      },
      {
        question: "What image formats are supported?",
        answer:
          "We support high-resolution JPG, PNG, and WebP images up to 20MB, maintaining original dimensions and color profiles upon download.",
      },
      {
        question: "Is it legal to remove watermarks?",
        answer:
          "You should only remove watermarks from images you own, personal photographs, or content you have legitimate rights to modify and publish.",
      },
    ],
    comparison: [
      {
        name: "SeedPix AI Watermark Remover",
        rows: [
          "AI contextual inpainting",
          "Zero smudging / clean texture recovery",
          "100% free with no watermark added",
          "Instant browser execution, no signup",
        ],
      },
      {
        name: "Manual clone stamp (Photoshop)",
        rows: [
          "Requires advanced manual editing skills",
          "Leaves noticeable smudges on gradients",
          "Costly monthly subscription ($22.99/mo)",
          "Complex desktop installation",
        ],
      },
      {
        name: "Generic online watermark tools",
        rows: [
          "Simple blur box overlay",
          "Destroys original resolution and texture",
          "Forces own branding/watermark on download",
          "Requires sign up after 1 low-res export",
        ],
      },
    ],
    steps: [
      {
        title: "Upload your watermarked photo",
        description: "Drop your image into the editor. Supports JPG, PNG, or WebP up to 20MB.",
      },
      {
        title: "AI detects and inpaints the area",
        description: "Click once to let AI erase the watermark and reconstruct the background automatically.",
      },
      {
        title: "Inspect & download clean image",
        description: "Check the before/after comparison slider and download full resolution with no watermark.",
      },
    ],
    demos: [
      {
        title: "Watermark → Clean natural background",
        description: "Seamless removal of translucent watermarks and logos without blurring.",
        beforeImage: "/demos/before-remove-watermark.webp",
        afterImage: "/demos/after-remove-watermark.webp",
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
          "You get 10 free credits on signup plus 1 daily credit. Watermark removal costs 10 credits per image.",
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
          "You can try immediately. To save results and get free credits, sign up for 10 free credits plus 1 daily credit.",
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
    slug: "image-upscaler",
    title: "Free AI Image Upscaler - 4K Quality Photo Enhancer Online",
    description:
      "Upscale images to 4K quality online free with AI. Enhance blurry photos, sharpen pixelated details, and enlarge pictures up to 400% with no watermark and no signup.",
    shortDescription: "Upscale images up to 4K free with AI",
    category: "enhance",
    credits: 10,
    systemPrompt:
      "You are an AI image upscaling and super-resolution engine. Upscale the uploaded image to ultra-high resolution (up to 4K). Reconstruct lost micro-details, sharpen blurry contours, eliminate JPEG compression noise and pixelation, and enhance textures (skin pores, hair, foliage, fabric) naturally without generating plastic artifacts or oversharpened halos. Maintain exact original colors, composition, and subject integrity.",
    examplePrompt: "Upscale this image to 4K high resolution, enhance fine details and remove noise",
    keywords: [
      "image upscaler",
      "image upscaler free",
      "free ai image upscaler",
      "4k image upscaler",
      "ai image upscaler",
      "upscale image online",
      "ai image expander",
      "photo upscaler free",
      "image resolution enhancer",
      "enlarge image without losing quality",
    ],
    updatedAt: "2026-09-26",
    faqs: [
      {
        question: "How does the AI image upscaler work?",
        answer:
          "Traditional upscalers stretch existing pixels using bicubic interpolation, which causes blurriness. Our AI neural network analyzes image context and generates realistic missing high-frequency details (textures, contours, eyelashes, fabric weaves) to create true 4K resolution.",
      },
      {
        question: "How much can I upscale my image?",
        answer:
          "You can enlarge images up to 2x, 4x, or up to 4K UHD resolution (3840×2160 pixels) while maintaining sharp definition and natural grain.",
      },
      {
        question: "Can I upscale photos for free without signing up?",
        answer:
          "Yes. You can test the upscaler immediately directly in your browser. New accounts get 10 free credits plus 1 daily credit with zero mandatory credit card requirement.",
      },
      {
        question: "Will the upscaled photo have a watermark?",
        answer:
          "No. All processed images downloaded from SeedPix are 100% watermark-free and cleared for personal and commercial projects.",
      },
      {
        question: "Is it suitable for printing and e-commerce?",
        answer:
          "Absolutely. It is specially optimized for Shopify/Amazon product zoom requirements, large-format canvas printing, marketing banners, and digital wallpapers.",
      },
      {
        question: "What file formats and sizes are supported?",
        answer:
          "We support JPG, PNG, and WebP images up to 20MB. Output matches the input aspect ratio precisely.",
      },
    ],
    comparison: [
      {
        name: "SeedPix AI Image Upscaler",
        rows: [
          "Deep learning super-resolution",
          "Reconstructs lost texture & micro-details",
          "Free 4K full-resolution export",
          "Watermark-free with instant web preview",
        ],
      },
      {
        name: "Photoshop Bicubic interpolation",
        rows: [
          "Pixel stretching with math interpolation",
          "Blurs fine edges and magnifies compression noise",
          "Expensive monthly Creative Cloud plan",
          "Requires desktop installation and manual setup",
        ],
      },
      {
        name: "Traditional online upscalers",
        rows: [
          "Limited to 2x low-resolution upscale",
          "Heavy waxy plastic smoothing",
          "Forced watermarks on free downloads",
          "Aggressive sign-up and credit card paywalls",
        ],
      },
    ],
    steps: [
      {
        title: "Upload low-res or blurry photo",
        description: "Drop your image into the upscaler. Compatible with JPG, PNG, and WebP up to 20MB.",
      },
      {
        title: "AI reconstructs details to 4K",
        description: "Our diffusion engine removes compression artifacts and sharpens micro-details in seconds.",
      },
      {
        title: "Compare and download 4K image",
        description: "Slide to inspect fine hair, skin, and text detail, then download full resolution with no watermark.",
      },
    ],
    demos: [
      {
        title: "Low resolution → Crisp 4K detail",
        description: "True AI super-resolution that reconstructs facial features, textures, and edges.",
        beforeImage: "/demos/restoration-old-photo-low-resolution.webp",
        afterImage: "/demos/photo-restoration.webp",
      },
    ],
  },
  {
    slug: "4k-image-upscaler",
    title: "4K Quality AI - Free 4K Image Upscaler & Photo Enhancer",
    description:
      "Convert any image into 4K quality online free. AI 4K photo enhancer reconstructs details, sharpens blurry pictures to 4K resolution with no watermark.",
    shortDescription: "Upscale any image to true 4K quality",
    category: "enhance",
    credits: 10,
    systemPrompt:
      "You are an AI image upscaling engine. Upscale the image to 4K resolution, enhancing sharpness and detail. Reconstruct fine textures naturally without introducing artifacts or plastic-looking results.",
    examplePrompt: "Upscale this photo to true 4K quality and sharpness",
    keywords: [
      "4k quality",
      "4k image upscaler",
      "enhance photo 4k",
      "image en 4k",
      "image enhancer 4k",
      "4k enhancer",
      "4k photo enhancer",
      "convert image to 4k quality",
      "upscale image to 4k",
      "image upscaler 4k free",
    ],
    updatedAt: "2026-09-24",
    faqs: [
      {
        question: "How do I upscale an image to 4K quality online for free?",
        answer:
          "Upload your image and click one button. The AI upscales it to 4K resolution (3840x2160 or 4x scale) while enhancing real details and sharpness.",
      },
      {
        question: "Does this convert blurry photos to real 4K quality?",
        answer:
          "Yes. Unlike traditional bicubic interpolation that blurs edges, our neural model reconstructs missing pixel details, textures, and edges so the output looks genuinely high-resolution.",
      },
      {
        question: "Will upscaling add watermarks or cost money?",
        answer:
          "No watermarks are added to your downloads. New users get 10 free credits plus 1 daily credit to upscale images completely free with no signup required.",
      },
      {
        question: "Can I upscale photos for large-format printing?",
        answer:
          "Yes. Our 4K upscaler is designed specifically for large-format printing, wallpapers, e-commerce product photos, and digital displays.",
      },
      {
        question: "What formats and file sizes are supported?",
        answer: "JPG, PNG, and WebP files up to 20MB are supported.",
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
    slug: "ai-image-humanizer",
    title: "AI Image Humanizer - Make AI Photos Realistic Free Online",
    description:
      "Free AI image humanizer online. Turn AI-generated images into realistic photos, remove plastic skin, fix unnatural textures and lighting with zero sign-up.",
    shortDescription: "Humanize AI images and make photos realistic",
    category: "edit",
    credits: 10,
    systemPrompt:
      "You are an AI image humanizer. Transform the AI-generated image into a realistic photograph: fix plastic-looking skin, add natural skin pores and realistic micro-textures, correct artificial lighting and glossy reflections, soften overly sharp edges, and eliminate the signature AI generation look. Keep the person's identity, facial expression, pose, and background intact.",
    examplePrompt: "Humanize this AI image and make it look like a real photo taken on an iPhone",
    keywords: [
      "ai image humanizer",
      "humanize ai",
      "humanize ai image",
      "make ai photo realistic",
      "make image look less ai",
      "make image not look like ai",
      "remove ai look from image",
      "realistic ai",
      "make ai image look real",
      "ai photo humanizer",
      "turn ai into real photo",
      "ai to real photo converter",
      "make midjourney photo look real",
    ],
    updatedAt: "2026-09-24",
    faqs: [
      {
        question: "What is an AI image humanizer?",
        answer:
          "An AI image humanizer takes synthetic AI-generated images (from Midjourney, Flux, Stable Diffusion, or ChatGPT) and removes the telltale signs of AI generation—such as waxy skin, plastic sheen, and surreal lighting—replacing them with natural photographic textures.",
      },
      {
        question: "How do I humanize an AI image for free?",
        answer:
          "Upload your AI image to SeedPix and click one button. The AI humanizer analyzes the image, reconstructs natural skin pores, realistic hair strands, and camera lighting, and delivers a realistic photo in seconds with zero sign-up.",
      },
      {
        question: "Can this make AI portraits look photographed?",
        answer:
          "Yes. AI portraits are the #1 use case. It specifically fixes the over-smoothed porcelain skin, plastic eyes, and flat lighting so headshots look like real studio or smartphone photography.",
      },
      {
        question: "Does it keep the person's original identity and clothing?",
        answer:
          "Yes. The underlying subject, facial features, pose, clothing, and background are strictly preserved. Only artificial textures and lighting are refined.",
      },
    ],
    demos: [
      {
        title: "Plastic AI face → realistic photo",
        description: "Reconstructs natural skin pores, realistic light bounce, and believable depth.",
        beforeImage: "/demos/before-linkedin-headshot.webp",
        afterImage: "/demos/after-linkedin-headshot.webp",
      },
    ],
  },
  {
    slug: "remove-ai-look",
    title: "Remove AI Look from Photos - Make Images Look Less AI Free",
    description:
      "Make images not look like AI free online. Remove plastic skin, waxy textures, and AI artifacts to make photos look natural and photographed with no watermark.",
    shortDescription: "Make photos look less like AI and more realistic",
    category: "edit",
    credits: 10,
    systemPrompt:
      "You are an AI artifact remover. Remove the AI-generated look from this image so it looks completely natural and photographed with a real camera: eliminate overly smooth plastic skin, remove glossy waxy sheen, fix surreal lighting, and add subtle photographic film grain. Preserve the original composition and subject.",
    examplePrompt: "Make this image look less like AI and more natural",
    keywords: [
      "make image not look like ai",
      "make image look less ai",
      "remove ai look",
      "remove ai look from photo",
      "un ai photo",
      "make picture look less ai",
      "remove ai feel from photo",
      "make it look less ai",
    ],
    updatedAt: "2026-09-24",
    faqs: [
      {
        question: "How do I make an image not look like AI?",
        answer:
          "Upload your image to the SeedPix Remove AI Look tool. The engine automatically replaces plastic skin tones and artificial lighting with camera grain, natural skin micro-texture, and balanced contrast.",
      },
      {
        question: "Why do AI images look fake or plastic?",
        answer:
          "Diffusion models frequently over-smooth surfaces, resulting in 'porcelain skin', overly uniform highlights, and surreal edge sharpness. Removing the AI look restores natural photographic imperfections like pores, subtle film noise, and realistic light falloff.",
      },
      {
        question: "Is there any watermark on downloaded photos?",
        answer:
          "No. All processed images can be downloaded at full resolution completely watermark-free.",
      },
    ],
    demos: [
      {
        title: "AI look → natural photo",
        description: "Restores photographic realism and subtle camera texture without changing the subject.",
        beforeImage: "/demos/before-change-pose.webp",
        afterImage: "/demos/after-change-pose.webp",
      },
    ],
  },
  {
    slug: "remove-tattoo-from-photo",
    title: "AI Tattoo Removal from Photo - Erase Tattoos Free Online",
    description:
      "Remove tattoos from photos online free with AI inpainting. Cleanly erase tattoo ink from skin while restoring natural skin texture, lighting, and pores with no signup.",
    shortDescription: "Erase tattoos from photos and restore clean skin",
    category: "edit",
    credits: 10,
    systemPrompt:
      "You are an AI photo restoration engine specializing in tattoo removal. Cleanly remove all tattoos or ink from the subject's skin in the photo, seamlessly reconstructing natural skin texture, color variations, and natural pores without any blurry patches, scars, or discoloration. Keep everything else in the photo untouched.",
    examplePrompt: "Remove the tattoo from my skin and restore clean, natural skin texture",
    keywords: [
      "remove tattoo from photo",
      "ai tattoo removal",
      "tattoo remover online free",
      "erase tattoo from picture",
      "tattoo removal photo editor",
      "remove tattoo wedding photo",
      "ai remove tattoo",
      "tattoo remover app free",
    ],
    updatedAt: "2026-09-24",
    faqs: [
      {
        question: "How do I remove a tattoo from a photo online for free?",
        answer:
          "Upload your photo, select or brush over the tattoo area, and click Remove. The AI inpainting model removes the tattoo ink and reconstructs natural skin texture in seconds.",
      },
      {
        question: "Will the skin look blurry or smudged after tattoo removal?",
        answer:
          "No. SeedPix uses contextual skin diffusion that reconstructs real skin pores, tones, and highlights matching the surrounding area rather than simply blurring or smudging.",
      },
      {
        question: "Can I use this for professional headshots, wedding photos, or job applications?",
        answer:
          "Yes. Many users remove tattoos from LinkedIn photos, passport headshots, formal wedding portraits, and family albums where a tattoo-free appearance is preferred.",
      },
      {
        question: "Can I preview what I look like before laser tattoo removal?",
        answer:
          "Yes. This tool is widely used as a digital simulation tool to preview how your skin will look once a tattoo is removed before undergoing laser treatments.",
      },
    ],
    demos: [
      {
        title: "Tattoo on skin → clean natural skin",
        description: "Seamlessly replaces tattoo ink with realistic skin tones and natural texture.",
        beforeImage: "/demos/before-remove-objects-generic.webp",
        afterImage: "/demos/after-remove-objects-generic.webp",
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
    updatedAt: "2026-09-24",
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
          "You get 10 free credits on signup plus 1 daily credit. Costs 10 credits per image.",
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
          "You get 10 free credits on signup plus 1 daily credit. Restoration costs 10 credits per photo.",
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
    slug: "fix-creased-photos",
    title: "Fix Creased Photos AI - Remove Fold Lines & Cracks Free",
    description:
      "Fix creased photos online free with AI. Remove fold lines, cracks, tears, and scratches from old scanned pictures with zero sign-up.",
    shortDescription: "Remove fold lines, creases & cracks from old photos",
    category: "enhance",
    credits: 10,
    systemPrompt:
      "You are an AI old photo restoration engine specializing in crease and fold removal. Detect and eliminate all paper fold lines, creases, physical cracks, tears, and scan artifacts across the image. Reconstruct seamless underlying facial details, clothing textures, and backgrounds without altering the original historical character, lighting, or face shapes.",
    examplePrompt: "Fix the creases, cracks, and fold lines in this scanned old photo",
    keywords: [
      "fix creased photos",
      "remove fold lines from scanned image ai",
      "creased photo repair online",
      "fix creases in old photos",
      "remove creases from photo online free",
      "fold line remover photo",
      "restore creased photo",
      "old photo crease removal",
    ],
    updatedAt: "2026-09-24",
    faqs: [
      {
        question: "How do I remove creases and fold lines from scanned photos for free?",
        answer:
          "Upload your scanned or photographed vintage photo. The AI crease remover automatically scans for fold lines, cracks, and tears, and reconstructs the missing pixels in seconds with no signup.",
      },
      {
        question: "Can it fix deep creases that run across someone's face?",
        answer:
          "Yes. Our neural inpainting model analyzes facial symmetry and surrounding skin tones to seamlessly bridge deep cracks and fold lines across faces, eyes, and clothing.",
      },
      {
        question: "Will the paper texture and vintage feel be preserved?",
        answer:
          "Yes. It eliminates destructive white cracks and physical creases while preserving the natural vintage warmth, grain, and authentic details of the original photograph.",
      },
      {
        question: "Is there any watermark on the restored photo?",
        answer: "No. All downloads are 100% watermark-free at full resolution.",
      },
    ],
    demos: [
      {
        title: "Fold lines & creases → seamless restoration",
        description: "Paper cracks and scanner fold lines are detected and healed automatically.",
        beforeImage: "/demos/scrathed-photo.webp",
        afterImage: "/demos/photo-restoration.webp",
      },
    ],
  },
  {
    slug: "gfpgan-face-enhancement",
    title: "GFPGAN Face Enhancement Online Free - Restore Blurry Faces",
    description:
      "GFPGAN face restoration online free with AI. Enhance blurry, low-resolution faces, restore realistic eyes, teeth, and hair details with zero sign-up.",
    shortDescription: "Restore blurry and low-res faces with GFPGAN AI",
    category: "enhance",
    credits: 10,
    systemPrompt:
      "You are a GFPGAN face restoration engine. Enhance and restore facial details in blurry, degraded, or low-resolution portraits: reconstruct realistic eyes, irises, skin texture, lips, and hair strands. Eliminate pixelation and compression artifacts while maintaining high fidelity to the original facial identity.",
    examplePrompt: "Enhance facial details and unblur this portrait using GFPGAN restoration",
    keywords: [
      "gfpgan",
      "gfpgan online",
      "gfpgan face restoration",
      "gfpgan free online",
      "gfpgan ai",
      "restore blurry face gfpgan",
      "gfpgan online demo",
      "face restoration ai free",
    ],
    updatedAt: "2026-09-24",
    faqs: [
      {
        question: "What is GFPGAN face enhancement?",
        answer:
          "GFPGAN (Generative Facial Prior GAN) is a state-of-the-art AI architecture designed to restore degraded, blurry, or low-resolution human faces by synthesizing realistic facial priors like sharp eyes, detailed skin, and hair.",
      },
      {
        question: "Can I use GFPGAN online without Python or Colab?",
        answer:
          "Yes. SeedPix provides a zero-install online GFPGAN web tool. Simply drop your image to restore faces in your browser without configuring Python, GPUs, or Google Colab.",
      },
      {
        question: "Does GFPGAN alter the person's identity?",
        answer:
          "No. GFPGAN preserves facial geometry, bone structure, and distinctive personal features while restoring clarity and sharpness to blurry eyes, teeth, and skin.",
      },
      {
        question: "Is GFPGAN face restoration free on SeedPix?",
        answer:
          "Yes. You receive free credits to restore faces immediately with no watermark and no mandatory registration.",
      },
    ],
    demos: [
      {
        title: "Blurry face → sharp GFPGAN detail",
        description: "Reconstructs lifelike facial details, clear eyes, and defined hair texture.",
        beforeImage: "/demos/unblur-oldphoto.webp",
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
          "You can try immediately. Sign up for 10 free credits + 1 daily credit to save results.",
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
    title: "Free Photo Text Editor Online (No Sign Up & Keep Font) | SeedPix",
    description:
      "Edit text on photos online free with AI. Add, change, or erase text in any image while keeping original font and style. No sign up, no Photoshop.",
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
          "Yes, SeedPix runs entirely in your browser. You get 10 free credits on signup plus 1 daily credit. Text editing costs 10 credits per image.",
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
    title: "Free Text to Image AI Generator - No Sign Up Online",
    description:
      "Generate realistic photos, art, and illustrations from text free online with AI. No sign up required, zero watermarks, and instant full-resolution download.",
    shortDescription: "Turn text prompts into images",
    category: "generate",
    credits: 10,
    systemPrompt:
      "You are an AI image generation engine. Generate a high-quality image from the user's text description: follow the prompt precisely and render with good composition, lighting, and detail. Support styles including photorealistic, anime, cartoon, 3D render, oil painting, watercolor, and flat illustration. Match the described subject, scene, style, and mood.",
    examplePrompt: "A photorealistic golden retriever puppy sitting in a sunlit meadow",
    keywords: [
      "text to image",
      "free ai image generator from text",
      "text to image no sign up",
      "ai image generator",
      "text to image ai",
      "ai art generator",
      "generate image from text",
      "ai image generator free",
      "image generator no sign up",
      "free text to image generator online",
      "create image from text",
    ],
    faqs: [
      {
        question: "How do I generate an image from text for free?",
        answer:
          "Type your idea in the editor and click generate. The AI renders a high-quality image from your text description in seconds. New users get 10 free credits on signup plus 1 daily credit.",
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
          "One generation costs 10 credits. Signup gives you 10 free credits plus 1 daily credit, and packs start at $9.99 for 350 credits.",
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
    updatedAt: "2026-09-23",
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
          "You get 10 free credits on signup plus 1 daily credit. Each generation costs 10 credits.",
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
    title: "Free AI Portrait Generator Online (No Sign Up & HD) | SeedPix",
    description:
      "Generate professional AI portraits, headshots & avatars from text online for free. Studio lighting, realistic skin with no sign up or watermarks.",
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
          "One portrait costs 10 credits. Signup gives you 10 free credits plus 1 daily credit.",
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
  {
    slug: "remove-text-from-photo",
    title: "Remove Text from Photo Free - AI Text Eraser Online",
    description:
      "Remove text, watermarks, timestamps, captions, and logos from photos online free with AI. Inpaint clean, natural background seamlessly with no signup.",
    shortDescription: "Erase text, captions & timestamps from photos",
    category: "remove",
    credits: 10,
    systemPrompt:
      "You are an AI text removal and inpainting engine. Detect all text, letters, numbers, timestamps, captions, watermarks, and logos in the image. Erase them completely and reconstruct the original texture, surface, and background underneath with photographic realism. Keep all other visual elements, colors, lighting, and composition unchanged.",
    examplePrompt: "Remove all text and captions from this photo cleanly",
    keywords: [
      "remove text from photo",
      "remove text from image",
      "ai text remover",
      "erase text from photo online free",
      "delete text on picture",
      "text eraser ai",
      "remove letters from photo",
      "clean text off image",
    ],
    faqs: [
      {
        question: "How do I remove text from a photo online for free?",
        answer:
          "Upload your photo into SeedPix and click Remove Text. The AI automatically detects text, subtitles, and timestamps, erases them, and reconstructs the realistic background underneath in about 20 seconds.",
      },
      {
        question: "Will the background look blurry after removing text?",
        answer:
          "No. Unlike basic clone stamp tools that smudge pixels, our diffusion model reconstructs the natural texture, lighting, and grain of the underlying surface.",
      },
      {
        question: "Can I remove text without creating an account?",
        answer:
          "Yes. SeedPix lets you test and download watermark-free images immediately without signing up or entering payment info.",
      },
      {
        question: "What image formats and file sizes are supported?",
        answer: "We support JPG, PNG, and WebP images up to 20MB in full original resolution.",
      },
    ],
    steps: [
      {
        title: "Upload your photo",
        description: "Drop your photo with unwanted text, timestamps, or captions into the editor.",
      },
      {
        title: "Click Remove Text",
        description: "One click does it all. The AI locates all typography and inpaint the background.",
      },
      {
        title: "Download clean image",
        description: "Export in full native resolution with zero watermarks.",
      },
    ],
  },
  {
    slug: "remove-shadow-from-photo",
    title: "Remove Shadow from Photo Free - AI Shadow Remover Online",
    description:
      "Remove harsh shadows from photos online free with AI. Eliminate facial shadows, phone drop shadows, and uneven lighting with one click. No signup needed.",
    shortDescription: "Eliminate harsh shadows & balance lighting",
    category: "remove",
    credits: 10,
    systemPrompt:
      "You are an AI shadow removal and illumination balancing engine. Detect unwanted harsh drop shadows, facial shadows, phone casting shadows, and uneven dark patches in the photo. Smooth out the lighting across the shaded area to match the surrounding ambient exposure and color temperature while preserving underlying textures, facial features, and details.",
    examplePrompt: "Remove the harsh drop shadow from this photo",
    keywords: [
      "remove shadow from photo",
      "ai shadow remover",
      "remove shadow from face photo free",
      "fix shadow in picture online",
      "remove drop shadow from image",
      "eliminate shadows on photos",
      "shadow eraser online",
    ],
    faqs: [
      {
        question: "How do I remove shadows from a photo online?",
        answer:
          "Drop your photo into the SeedPix Shadow Remover and click Generate. The neural network detects harsh shadow boundaries and equalizes ambient lighting across the affected area without destroying surface details.",
      },
      {
        question: "Can I remove shadows cast by a phone or camera on documents and food?",
        answer:
          "Yes! Removing overhead phone shadows from documents, receipts, flat lays, and food photography is one of the most effective use cases for this tool.",
      },
      {
        question: "Does it work on facial shadows in portraits?",
        answer:
          "Yes. It softens and lifts harsh sun shadows under noses, eyes, and chins while preserving natural skin tones and facial bone structure.",
      },
      {
        question: "Is it free without registration?",
        answer:
          "Yes, new visitors receive free starter credits to test the tool directly in the browser with no sign-up or credit card required.",
      },
    ],
    steps: [
      {
        title: "Upload shaded image",
        description: "Upload any portrait, product, or document photo with harsh cast shadows.",
      },
      {
        title: "Run Shadow Remover",
        description: "The AI isolates shadow falloff and balances luminance across the scene.",
      },
      {
        title: "Download balanced photo",
        description: "Save a clean, evenly lit photo in original resolution.",
      },
    ],
  },
  {
    slug: "remove-emoji-from-photo",
    title: "Remove Emoji from Photo Free - AI Emoji Remover Online",
    description:
      "Remove emojis, stickers, and reaction icons from photos free with AI. Reconstruct faces and background seamlessly with no sign-up. 100% watermark-free.",
    shortDescription: "Erase emojis & stickers, restore faces underneath",
    category: "remove",
    credits: 10,
    systemPrompt:
      "You are an AI emoji and sticker removal engine. Detect emojis, digital stickers, snapchat stickers, reaction icons, and cartoon overlays placed on top of photos. Erase the emoji completely and reconstruct the realistic human face, skin, hair, clothing, or background underneath with photographic fidelity and anatomical accuracy.",
    examplePrompt: "Remove the emoji covering the face and restore natural features",
    keywords: [
      "remove emoji from photo",
      "ai emoji remover",
      "remove stickers from pictures",
      "remove emoji from face photo free",
      "erase emoji on picture",
      "emoji remover online",
      "uncover emoji photo",
    ],
    faqs: [
      {
        question: "Can AI really remove an emoji covering a face?",
        answer:
          "Yes. Generative diffusion models have learned human facial anatomy and skin textures from millions of portraits. The AI erases the emoji overlay and inpaint realistic eyes, nose, lips, and skin consistent with the visible parts of the face.",
      },
      {
        question: "Can I remove WhatsApp, Instagram, or Snapchat stickers?",
        answer:
          "Yes. The tool works on all digital stickers, emojis, timestamps, and doodles overlaid on social media screenshots and photos.",
      },
      {
        question: "Is SeedPix Emoji Remover free without login?",
        answer:
          "Yes. You can test the tool immediately in your browser with no account creation or watermark on downloads.",
      },
    ],
    steps: [
      {
        title: "Upload screenshot or photo",
        description: "Upload the picture with emoji or sticker covering the subject.",
      },
      {
        title: "Click Remove Emoji",
        description: "The AI eliminates the graphic and regenerates the realistic pixels underneath.",
      },
      {
        title: "Download restored photo",
        description: "Export full-resolution watermark-free photo in seconds.",
      },
    ],
  },

  {
    slug: "type-to-edit",
    title: "Type to Edit Photos - Natural Language AI Photo Editor",
    description: "Edit photos by typing instructions in plain text. Change clothes, swap backgrounds, remove objects, and enhance faces with natural language commands.",
    shortDescription: "Edit photos by typing plain English instructions",
    category: "edit",
    credits: 5,
    systemPrompt: "You are an instruction-based AI photo editor. Follow the user's natural language command precisely while preserving overall identity, composition, and realistic lighting.",
    examplePrompt: "Change background to a modern minimalist office with soft bokeh",
    keywords: ["type to edit", "prompt to edit photo", "natural language photo editor", "ai photo editing by prompt"],
    faqs: [
      { question: "What is Type to Edit?", answer: "Type to Edit lets you describe desired image changes in natural English sentences without needing Photoshop or complex manual selections." },
      { question: "Is Type to Edit free?", answer: "Yes, new users receive 5 free credits to test Type to Edit with zero watermark." }
    ],
    demos: [{
      title: "Type to Edit in action",
      beforeImage: "/showcase/before-try-new-look.webp",
      afterImage: "/showcase/after-try-new-look.webp",
      prompt: "Change casual clothes into a tailored black suit"
    }]
  },
  {
    slug: "ai-photo-editor",
    title: "AI Photo Editor - Edit Photos Online Free Without Watermark",
    description: "Online AI photo editor to enhance, retouch, upscale, and edit photos by typing. 100% free with no watermark or credit card required.",
    shortDescription: "All-in-one free online AI photo editing suite",
    category: "edit",
    credits: 5,
    systemPrompt: "Professional AI photo editing suite. Perform seamless retouching, lighting correction, and detail enhancement.",
    examplePrompt: "Enhance overall lighting, brighten eyes, and smooth skin naturally",
    keywords: ["ai photo editor", "free ai photo editor online", "ai picture editor", "photo editor ai free"],
    faqs: [
      { question: "Is this AI photo editor free?", answer: "Yes, SeedPix provides free daily credits and requires no credit card." }
    ],
    demos: [{
      title: "Studio Retouching",
      beforeImage: "/showcase/before-linkedin-headshot.webp",
      afterImage: "/showcase/after-linkedin-headshot.webp",
      prompt: "Studio lighting, high-end professional portrait"
    }]
  },
  {
    slug: "ai-image-editor",
    title: "AI Image Editor - Edit Images with Neural Precision",
    description: "Transform and manipulate images with neural AI tools. Erase objects, change backgrounds, and upscale to 4K in seconds.",
    shortDescription: "Edit images with neural AI in your browser",
    category: "edit",
    credits: 5,
    systemPrompt: "High-precision neural image manipulation engine.",
    examplePrompt: "Remove unwanted background clutter and enhance image contrast",
    keywords: ["ai image editor", "edit images ai", "neural photo editor"],
    faqs: [{ question: "What formats are supported?", answer: "JPG, PNG, and WebP up to 20MB." }]
  },
  {
    slug: "free-ai-image-generator",
    title: "Free AI Image Generator - Create Stunning Art from Text",
    description: "Generate realistic photos, art, and illustrations from text prompts free online. Powered by GPT Image 2.5 and Nanobanana Pro.",
    shortDescription: "Generate stunning photorealistic images from text",
    category: "generate",
    credits: 5,
    systemPrompt: "High-fidelity text to image generation model.",
    examplePrompt: "A majestic snow leopard resting on Himalayan peaks at sunrise, 8k photography",
    keywords: ["free ai image generator", "text to image free", "ai picture generator"],
    faqs: [{ question: "Can I use generated images commercially?", answer: "Yes, you own 100% commercial rights to images generated on SeedPix." }]
  },
  {
    slug: "ai-headshot-generator",
    title: "AI Headshot Generator - Create Professional Studio Portraits",
    description: "Turn any casual selfie into a studio-grade professional business headshot. Perfect for resumes, company websites, and profiles.",
    shortDescription: "Turn casual selfies into studio business headshots",
    category: "generate",
    credits: 5,
    systemPrompt: "Generate a studio corporate headshot with flattering studio lighting, sharp eyes, and tailored attire.",
    examplePrompt: "Professional corporate headshot, dark suit jacket, soft gray studio backdrop, 85mm lens",
    keywords: ["ai headshot generator", "professional headshots ai", "ai portrait generator", "business headshot ai"],
    faqs: [{ question: "How many photos do I need to upload?", answer: "Just one clear selfie or photo is enough for our AI to generate a studio portrait." }],
    demos: [{
      title: "Headshot Generation",
      beforeImage: "/showcase/before-linkedin-headshot.webp",
      afterImage: "/showcase/after-linkedin-headshot.webp",
      prompt: "Corporate studio headshot with dark blazer"
    }]
  },
  {
    slug: "ai-linkedin-headshot-generator",
    title: "AI LinkedIn Headshot Generator - Elevate Your Profile Photo",
    description: "Generate polished, trustworthy LinkedIn profile pictures in seconds. Stand out to recruiters with executive studio headshots.",
    shortDescription: "Create executive LinkedIn profile photos from selfies",
    category: "generate",
    credits: 5,
    systemPrompt: "Generate an executive LinkedIn profile picture with confident smile and corporate attire.",
    examplePrompt: "LinkedIn executive headshot, friendly smile, crisp corporate blazer, modern office background",
    keywords: ["ai linkedin headshot generator", "linkedin profile picture ai", "executive headshot ai"],
    faqs: [{ question: "Will recruiters know it is AI?", answer: "Our models generate realistic skin textures and lighting indistinguishable from real photography." }]
  },
  {
    slug: "dating-profile-photo",
    title: "AI Dating Profile Photos - Get More Matches on Tinder & Hinge",
    description: "Transform ordinary selfies into attractive, candid, and high-converting dating photos for Tinder, Bumble, and Hinge.",
    shortDescription: "Generate attractive candid dating profile pictures",
    category: "generate",
    credits: 5,
    systemPrompt: "Generate attractive, natural-looking dating profile portraits with warm lighting and authentic smile.",
    examplePrompt: "Casual outdoor lifestyle photo, golden hour sunlight, relaxed candid smile, cozy sweater",
    keywords: ["dating profile photos ai", "tinder photos ai", "hinge profile pictures", "bumble photo enhancer"],
    faqs: [{ question: "Do these photos look genuine?", answer: "Yes, we focus on candid, authentic lifestyle poses rather than stiff artificial headshots." }],
    demos: [{
      title: "Dating Photo Enhancer",
      beforeImage: "/showcase/before-profile-dating-female.webp",
      afterImage: "/showcase/after-profile-dating-female.webp",
      prompt: "Golden hour aesthetic outdoor lifestyle photo"
    }]
  },
  {
    slug: "passport-photo-maker",
    title: "AI Passport Photo Maker - Official 2x2 & Biometric Photos Free",
    description: "Create official passport, visa, and ID photos from home. Automatic background whitening, biometric compliance, and standard sizing.",
    shortDescription: "Create compliant passport and ID photos instantly",
    category: "edit",
    credits: 5,
    systemPrompt: "Create a compliant passport photo with pure white background, balanced lighting, and correct proportions.",
    examplePrompt: "Compliant passport photo, pure white background, neutral expression, centered face",
    keywords: ["passport photo maker", "ai passport photo", "visa photo online", "id photo maker"],
    faqs: [{ question: "Are these photos officially compliant?", answer: "Yes, the tool removes background shadows, centers the face, and formats for standard 2x2 inch requirements." }],
    demos: [{
      title: "Passport Photo Formatting",
      beforeImage: "/showcase/before-passport-photo.webp",
      afterImage: "/showcase/after-passport-photo.webp",
      prompt: "Official white background passport photo"
    }]
  },
  {
    slug: "open-closed-eyes-ai",
    title: "Open Closed Eyes in Photo AI - Fix Blinking Eyes Free",
    description: "Fix ruined group photos and selfies where someone blinked. Open closed eyes naturally with matching iris color and gaze direction.",
    shortDescription: "Fix blinked photos by naturally opening closed eyes",
    category: "restore",
    credits: 5,
    systemPrompt: "Detect closed or blinking eyes and reconstruct realistic open eyes that match iris color, shape, and gaze.",
    examplePrompt: "Open closed eyes naturally, matching original eye color and lighting",
    keywords: ["open closed eyes in photo", "fix blinking photo ai", "ai open eyes", "fix closed eyes in picture"],
    faqs: [{ question: "How does the AI know my eye color?", answer: "It analyzes subtle cues in skin and other facial features, or you can specify eye color in the prompt." }],
    demos: [{
      title: "Blink Fixer",
      beforeImage: "/showcase/before-save-blink-photo.webp",
      afterImage: "/showcase/after-save-blink-photo.webp",
      prompt: "Open closed eyes naturally with sharp iris"
    }]
  },
  {
    slug: "change-outfit-ai",
    title: "Change Outfit AI - Virtual Clothes & Attire Try-On",
    description: "Swap outfits and try on clothes virtually with AI. Change casual clothes to suits, dresses, uniforms, or streetwear in seconds.",
    shortDescription: "Change clothes and try on new outfits virtually",
    category: "edit",
    credits: 5,
    systemPrompt: "Replace the subject clothing with the requested garment while preserving body pose and natural shadows.",
    examplePrompt: "Change outfit to a tailored navy blazer and white collared shirt",
    keywords: ["change outfit ai", "ai clothes changer", "virtual clothing try on", "change clothes in photo"],
    faqs: [{ question: "Can I choose specific clothing styles?", answer: "Yes, simply type whatever outfit you want in the prompt box." }],
    demos: [{
      title: "Virtual Wardrobe",
      beforeImage: "/showcase/before-try-new-look.webp",
      afterImage: "/showcase/after-try-new-look.webp",
      prompt: "Change clothes into stylish black leather jacket"
    }]
  },
  {
    slug: "change-background-ai",
    title: "Change Background AI - Replace Photo Backgrounds Instantly",
    description: "Replace boring backgrounds with stunning studios, luxury interiors, nature landscapes, or transparent backdrops with one click.",
    shortDescription: "Swap photo backgrounds with AI in seconds",
    category: "edit",
    credits: 5,
    systemPrompt: "Segment foreground subject cleanly and replace background with requested environment.",
    examplePrompt: "Replace background with modern Scandinavian living room with soft sunlight",
    keywords: ["change background ai", "replace photo background", "ai background changer"],
    faqs: [{ question: "Does it handle fine hair strands?", answer: "Yes, our neural segmentation handles wispy hair and complex edges with perfection." }]
  },
  {
    slug: "ai-hairstyle-changer",
    title: "AI Hairstyle Changer - Try Virtual Hairstyles & Hair Colors",
    description: "Test out new haircuts, hairstyles, and hair colors before going to the salon. Try buzz cuts, curls, bobs, blond, or neon dyes.",
    shortDescription: "Test new haircuts and hair colors virtually with AI",
    category: "edit",
    credits: 5,
    systemPrompt: "Change subject hair length, style, and color seamlessly while matching scalp and face shape.",
    examplePrompt: "Change hairstyle to modern textured wavy bob with caramel highlights",
    keywords: ["ai hairstyle changer", "virtual haircut try on", "hair color simulator ai"],
    faqs: [{ question: "Does it work for both men and women?", answer: "Yes, it supports all hair textures, lengths, and facial hair styles." }]
  },
  {
    slug: "photo-enhancer",
    title: "AI Photo Enhancer - Auto Enhance Quality, Color & Sharpness",
    description: "One-click AI photo enhancer. Automatically balance exposure, boost colors, remove grain, and enhance facial clarity.",
    shortDescription: "One-click automatic photo quality enhancer",
    category: "enhance",
    credits: 5,
    systemPrompt: "Automatically enhance photo clarity, color grading, dynamic range, and edge sharpness.",
    examplePrompt: "Auto enhance photo quality, vibrant colors, clear skin, 4K crispness",
    keywords: ["photo enhancer", "ai photo enhancer", "enhance photo quality free", "image quality improver"],
    faqs: [{ question: "Is it free?", answer: "Yes, test our photo enhancer free with zero watermark." }]
  },
  {
    slug: "game-screenshot-to-real-photo",
    title: "Game Screenshot to Real Photo AI - Convert Gaming into Reality",
    description: "Turn gaming screenshots from GTA, Cyberpunk, Skyrim, or Minecraft into realistic real-world DSLR photographs.",
    shortDescription: "Turn video game screenshots into realistic DSLR photos",
    category: "generate",
    credits: 5,
    systemPrompt: "Convert video game rendering into authentic real-life photography with real skin textures and camera lens bokeh.",
    examplePrompt: "Transform video game screenshot into real life 35mm photograph",
    keywords: ["game screenshot to real photo", "turn game to real life ai", "gaming screenshot enhancer"],
    faqs: [{ question: "Which games work best?", answer: "Any game screenshot with recognizable characters, landscapes, or vehicles works beautifully." }]
  },
  {
    slug: "remove-matcha-filter",
    title: "Remove Matcha Filter AI - Restore True Photo Colors",
    description: "Remove the viral TikTok matcha green filter from your photos. Reconstruct realistic warm skin tones and true original colors.",
    shortDescription: "Remove green matcha filter and restore natural colors",
    category: "restore",
    credits: 5,
    systemPrompt: "Detect and remove heavy green/matcha tint, restore natural skin colors, white balance, and contrast.",
    examplePrompt: "Remove matcha green filter and restore realistic skin tones",
    keywords: ["remove matcha filter", "tiktok matcha filter remover", "remove green filter from photo"],
    faqs: [{ question: "Can it restore natural skin tones?", answer: "Yes, the model specializes in reversing the heavy green hue shift of the matcha filter." }]
  }
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
