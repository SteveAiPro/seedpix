/**
 * 工具页的补充内容。
 *
 * 为什么单独放一个文件：
 * 1. `lib/tools.ts` 里 15/16 个工具**没有 steps**，导致页面上「How It Works」区块
 *    只有标题、内容为空（ToolPage.tsx 渲染的是 `tool.steps ?? []`）。
 * 2. 原先「Why use SeedPix for this?」段落是所有页面共用的样板文字，是站内重复度最高的来源。
 *    这里按 slug 提供定制段落替换掉它。
 * 3. 额外 FAQ 会与 `tool.faqs` 合并，**同时进入 FAQPage JSON-LD**（两处都读这个文件）。
 *
 * 写作原则：每页内容必须是这个工具独有的（真实场景、真实限制），
 * 不做跨页复用的填充段落 —— 模板化灌水正是 Google 的 scaled content 打击对象。
 */

export interface ToolExtraContent {
  /** 替换样板文字的定制段落 */
  whyUse: string;
  /** 具体使用场景 */
  useCases: { title: string; text: string }[];
  /** 三步操作说明（补 tools.ts 缺失的 steps） */
  steps: { title: string; description: string }[];
  /** 追加 FAQ，会与 tool.faqs 合并 */
  extraFaqs: { question: string; answer: string }[];
}

export const toolExtraContent: Record<string, ToolExtraContent> = {
  "filter-remover": {
    whyUse:
      "Filter remover is what you reach for when an AI filter has flattened a real photo into a trend. A saturation slider cannot undo that — it only mutes the effect. SeedPix reconstructs the photo underneath: real skin texture, individual hair strands, and true colour under the original lighting. The subject, pose, framing and crop stay exactly where they were, so the result still looks like the photo you took rather than a repainted version of it.",
    useCases: [
      {
        title: "Undo a matcha or anime filter",
        text: "You posted a filtered selfie and now need the real photo back for a profile picture, a badge, or a client. SeedPix reverses the filter instead of just lowering the saturation.",
      },
      {
        title: "Recover a photo where the filtered copy is all that is left",
        text: "If the original was never saved, it is gone — but enough of the real image usually survives under the effect for the model to rebuild a believable version of it.",
      },
      {
        title: "Clean up AI art for print or layout",
        text: "AI-generated images often ship with a heavy stylistic wash. Removing it makes the image usable in layouts where the filter reads as a mistake rather than a choice.",
      },
    ],
    steps: [
      {
        title: "Upload the filtered photo",
        description:
          "Drop in the JPG, PNG or WebP that already has the filter applied. No mask and no reference image needed.",
      },
      {
        title: "Click Remove Filter",
        description:
          "The model detects the filter layer and re-renders the photo underneath it, holding the subject and composition in place.",
      },
      {
        title: "Download the restored photo",
        description:
          "Check the before/after slider, then download. No watermark, and the file is licensed for commercial use.",
      },
    ],
    extraFaqs: [
      {
        question: "Does removing a filter change the composition of my photo?",
        answer:
          "No. The model keeps the subject, pose, framing and crop identical — it only rebuilds the pixels the filter overwrote. You should not need to re-crop or re-frame anything afterwards.",
      },
      {
        question: "Can it remove a filter from a video frame?",
        answer:
          "Yes, if you export the frame as a JPG or PNG first. SeedPix works on still images, so grab the frame you need from the video and upload that.",
      },
      {
        question: "What happens with a very heavy filter, like a full anime restyle?",
        answer:
          "Heavier filters are harder because less of the original survives underneath. Results are usually strong on faces and simple backgrounds; busy scenes with heavy stylisation may need a second pass or a different model choice.",
      },
    ],
  },

  "remove-matcha-filter": {
    whyUse:
      "The matcha filter replaces skin and hair with painted shapes, so there is no honest way to 'turn the effect down' — the information is gone. SeedPix treats it as a reconstruction problem: it reads what the filter preserved about the person and re-renders realistic skin, hair and fabric in the same pose and lighting. That is the difference between a photo that looks unfiltered and one that looks blurred.",
    useCases: [
      {
        title: "Get back a usable profile photo",
        text: "Matcha art works as a post but not as a headshot. Reconstruct the realistic version and use it where a painted avatar would look out of place.",
      },
      {
        title: "Fix a photo you only have in matcha form",
        text: "Trend filters are often applied before the original is saved anywhere else. The AI rebuilds from what the filter left behind.",
      },
      {
        title: "Clean up matcha art for a client deliverable",
        text: "If a matcha-styled image is going into a deck or a print piece, the painted look usually has to go. One pass converts it back to something photographic.",
      },
    ],
    steps: [
      {
        title: "Upload the matcha-filtered image",
        description:
          "Any JPG, PNG or WebP with the matcha effect applied. Screenshots from social apps work too.",
      },
      {
        title: "Run the matcha reversal",
        description:
          "The model identifies the stylisation pattern and rebuilds photographic skin, hair and background detail in the same framing.",
      },
      {
        title: "Compare and download",
        description:
          "Drag the before/after slider to check the result, then download the watermark-free file.",
      },
    ],
    extraFaqs: [
      {
        question: "Why can't I just lower the saturation to undo the matcha filter?",
        answer:
          "Because matcha does not work by shifting colour — it replaces texture with painted shapes. Desaturating a matcha image leaves you with a grey painting. Reversing it requires regenerating the missing texture, which is what SeedPix does.",
      },
      {
        question: "Will the reconstructed face still look like the person?",
        answer:
          "The model works from the facial structure the filter preserved, so likeness is usually good. Very heavy stylisation around the eyes or mouth is the hardest case — check the result before you rely on it.",
      },
      {
        question: "Does it work on group photos?",
        answer:
          "Yes, though every face in the frame is reconstructed independently. On wide shots with small faces, detail is naturally lower than on a close portrait.",
      },
    ],
  },

  "edit-text-in-image": {
    whyUse:
      "Most text edits fail because the replacement text does not match what surrounds it — the wrong font weight, a mismatched baseline, or lighting that suddenly goes flat. SeedPix reads the existing type and scene first, then renders the new words to match the original font, angle, perspective and light. That is why the result holds up at full size instead of looking pasted on.",
    useCases: [
      {
        title: "Fix a typo on a sign or label",
        text: "A misspelled word in a photo of signage, packaging or a whiteboard can be rewritten in place without retaking the shot.",
      },
      {
        title: "Update prices or dates in a menu photo",
        text: "Change a figure in a menu or price board and keep the original typeface, so the edit does not read as a patch.",
      },
      {
        title: "Remove text you do not want to show",
        text: "Erase a phone number, address or watermark text and let the model fill the gap with matching background.",
      },
    ],
    steps: [
      {
        title: "Upload the image",
        description:
          "Any JPG, PNG or WebP containing text you want to change. Higher resolution gives the model more to match against.",
      },
      {
        title: "Describe the text change",
        description:
          "Say what should be replaced and what it should say — for example, change \"Open 9-5\" to \"Open 8-8\".",
      },
      {
        title: "Download the edited image",
        description:
          "The new text is rendered to match the original font, angle and lighting. No watermark on the result.",
      },
    ],
    extraFaqs: [
      {
        question: "Can it match a font that is not a standard typeface?",
        answer:
          "It matches what it can see — letterforms, weight, spacing, angle and perspective — rather than looking the font up by name. Custom or hand-lettered type is reproduced by eye, so short strings work better than long passages.",
      },
      {
        question: "Will the new text follow the surface it sits on?",
        answer:
          "Yes. Text on a curved bottle, a tilted sign or a folded page is rendered with the same perspective and shading as the original, which is what stops the edit from looking flat.",
      },
      {
        question: "Can I add text where there was none before?",
        answer:
          "You can, but the result is more convincing when you are replacing existing type — the model has real lighting and perspective to copy. Adding text to an empty area is closer to typesetting than restoration.",
      },
    ],
  },

  "remove-person-from-photo": {
    whyUse:
      "Removing a person is not the same as removing an object: you are deleting a human-shaped hole that often covers a large part of the frame, and the background behind them has to be invented convincingly. SeedPix reconstructs the scene behind the person — floors, walls, foliage, crowd texture — while leaving everyone else in the photo untouched, including anyone standing right next to them.",
    useCases: [
      {
        title: "Delete a photobomber",
        text: "Someone walked into your shot. Remove just that person and keep the rest of the frame exactly as it was.",
      },
      {
        title: "Clean up travel photos",
        text: "Busy landmarks are rarely empty. Remove the tourists in front of the subject and rebuild the architecture or landscape behind them.",
      },
      {
        title: "Take one person out of a group photo",
        text: "Remove an ex-partner or a colleague who has left, while keeping the other people, their shadows and the spacing between them intact.",
      },
    ],
    steps: [
      {
        title: "Upload the photo",
        description:
          "Any JPG, PNG or WebP. The larger the file, the more detail the model has to reconstruct the background with.",
      },
      {
        title: "Say who to remove",
        description:
          "Describe the person — for example, \"remove the man in the blue shirt on the left\". Everyone else is preserved.",
      },
      {
        title: "Download the cleaned photo",
        description:
          "Check the gap where the person was, then download. No watermark, commercial use allowed.",
      },
    ],
    extraFaqs: [
      {
        question: "Will it remove the wrong person?",
        answer:
          "Be specific about position and clothing — \"the person in the red jacket on the right\" works far better than \"remove someone\". You can also run it again if the first pass picks the wrong subject.",
      },
      {
        question: "What happens to the shadows and reflections the person cast?",
        answer:
          "The model rebuilds the area rather than copying a patch, so shadows on the ground and reflections in glass are regenerated to match the new scene. Strong, hard-edged shadows are the hardest case and may need a second pass.",
      },
      {
        question: "Can it remove several people at once?",
        answer:
          "Yes, if you describe them clearly — for example, \"remove the two people on the far left\". Removing many overlapping figures in one pass reduces how much original background the model has to work from.",
      },
    ],
  },
  "remove-object-from-photo": {
    whyUse:
      "Object removal lives or dies on what fills the gap. A clone-stamp leaves a visible repeat; a blur leaves a smudge. SeedPix regenerates the area from the surrounding scene — the grain of a wooden table, the perspective lines of a tiled floor, the falloff of light across a wall — so the patch matches the photo rather than sitting on top of it. That is what keeps the edit invisible at full resolution.",
    useCases: [
      {
        title: "Erase clutter from product and listing photos",
        text: "Cables, price stickers, dust and stray props pull attention away from what you are selling. Remove them and keep the product untouched.",
      },
      {
        title: "Take out text, logos and watermarks",
        text: "Remove a phone number, a competitor logo or an unwanted caption and rebuild the background behind it.",
      },
      {
        title: "Clean up street and travel shots",
        text: "Wires, bins, signage and parked cars are hard to avoid. Removing them gives you a cleaner frame without waiting for a better moment.",
      },
    ],
    steps: [
      {
        title: "Upload the photo",
        description:
          "Any JPG, PNG or WebP up to 20MB. A higher-resolution original gives the model more texture to rebuild the gap with.",
      },
      {
        title: "Name the object",
        description:
          "Describe what should go — for example, \"remove the power line across the sky\" or \"remove the coffee cup\".",
      },
      {
        title: "Download the result",
        description:
          "The gap is filled from the surrounding scene. Check it at 100% zoom, then download watermark-free.",
      },
    ],
    extraFaqs: [
      {
        question: "What is the difference between this and a clone-stamp tool?",
        answer:
          "A clone stamp copies pixels from elsewhere in the image, which is why it repeats patterns and mismatches perspective. SeedPix generates new pixels that match the surrounding texture, lighting and perspective instead of duplicating an existing patch.",
      },
      {
        question: "Can it remove an object that covers a large part of the frame?",
        answer:
          "Yes, but the larger the object, the more the model has to invent. Removing something that occupies a small fraction of the frame is close to invisible; removing a third of the image is a reconstruction job and may need a second pass.",
      },
      {
        question: "Will removing an object leave a blurry patch behind?",
        answer:
          "It should not. The model fills with generated texture rather than blurring, so grain, edges and gradients continue through the removed area. If you see softness, it usually means the surrounding area was itself out of focus.",
      },
    ],
  },

  "gemini-watermark-remover": {
    whyUse:
      "Watermarks are laid over the image rather than baked into it, which means the pixels underneath still exist — they are just obscured. SeedPix reads the watermark's shape, opacity and position and reconstructs the covered area from the surrounding image, instead of smudging it away. On gradients, skies and flat surfaces the result is usually indistinguishable from the original.",
    useCases: [
      {
        title: "Clean up images for client work",
        text: "When a watermarked draft is the only version you have, removing it gives you something presentable while you wait for the clean file.",
      },
      {
        title: "Tidy AI-generated images",
        text: "AI tools often stamp a logo into the corner. Remove it so the image can be used in a layout without an unrelated brand mark.",
      },
      {
        title: "Prepare images for print",
        text: "A watermark that reads as a small mark on screen becomes an obvious blemish at print size. Remove it before export.",
      },
    ],
    steps: [
      {
        title: "Upload the watermarked image",
        description:
          "Any JPG, PNG or WebP. The clearer the watermark edges are, the more precisely the model can target it.",
      },
      {
        title: "Run the watermark removal",
        description:
          "The model locates the mark and rebuilds the covered pixels from the surrounding image rather than blurring over them.",
      },
      {
        title: "Download the clean file",
        description:
          "Inspect the area at 100% zoom — gradients and flat surfaces clean up best. No watermark on the output.",
      },
    ],
    extraFaqs: [
      {
        question: "Does removing a watermark damage the image underneath?",
        answer:
          "The area under the mark is regenerated from the surrounding pixels, so anything the watermark covered is reconstructed rather than recovered. On busy texture you may see slight softening; on skies, gradients and plain backgrounds the repair is usually invisible.",
      },
      {
        question: "Will it remove a watermark that sits on top of a face?",
        answer:
          "It can, but a watermark across facial features is the hardest case — the model has to rebuild skin and detail rather than continue a texture. Check the result carefully before using it.",
      },
      {
        question: "Should I remove watermarks from other people's images?",
        answer:
          "Only where you have the right to. Watermarks usually indicate ownership or licensing terms, so removing one from an image you do not own or licence may infringe the creator's rights.",
      },
    ],
  },

  "unblur-image": {
    whyUse:
      "Sharpening a blurred photo amplifies the blur — it adds edge contrast to detail that is not there. SeedPix treats it as a restoration problem: it estimates what the motion or defocus did to the image and reverses that, recovering edges and readable detail rather than just making the fuzz look crisper. The result reads as a sharper photo, not an over-processed one.",
    useCases: [
      {
        title: "Rescue a shot that missed focus",
        text: "One frame out of a burst is slightly soft. Recover it instead of discarding the whole take.",
      },
      {
        title: "Fix motion blur from a slow shutter",
        text: "Camera shake and moving subjects both smear detail. The model estimates the direction and amount of movement and compensates for it.",
      },
      {
        title: "Make a document or receipt photo readable",
        text: "Photos of text are especially unforgiving of blur. Recovering edge definition can turn an unreadable shot into a usable record.",
      },
    ],
    steps: [
      {
        title: "Upload the blurry photo",
        description:
          "Any JPG, PNG or WebP. Upload the original rather than a version that has already been sharpened.",
      },
      {
        title: "Run the unblur pass",
        description:
          "The model estimates the blur profile and reverses it, rebuilding edge definition and fine detail.",
      },
      {
        title: "Download the sharper photo",
        description:
          "Compare before and after at 100% zoom. No watermark, and the file is yours to use commercially.",
      },
    ],
    extraFaqs: [
      {
        question: "How is this different from a sharpening filter?",
        answer:
          "A sharpening filter increases contrast along existing edges. If the edge is not there, all you get is a harsher blur. SeedPix estimates the blur itself and reconstructs the missing edge detail, which is why it can recover text and fine texture that sharpening cannot.",
      },
      {
        question: "How blurry is too blurry?",
        answer:
          "Mild to moderate blur recovers well. Once detail is completely averaged out — a long exposure of a moving subject, or heavy defocus on a small subject — there is not enough signal left, and the model can only produce a plausible guess.",
      },
      {
        question: "Should I unblur before or after upscaling?",
        answer:
          "Unblur first. Recovering the edges at the original resolution gives the upscaler real detail to work with; upscaling a blurry image just produces a larger blurry image.",
      },
    ],
  },

  "4k-image-upscaler": {
    whyUse:
      "Interpolation makes an image bigger, not better — it averages neighbouring pixels, so edges get softer as the file grows. SeedPix predicts the detail that should exist at the higher resolution: hair, fabric weave, foliage, brickwork and type edges are generated rather than smoothed. That is why the result survives being viewed at 100% instead of looking like a blurred enlargement.",
    useCases: [
      {
        title: "Prepare a small image for print",
        text: "A photo that looks fine on screen can fall apart at A4. Upscaling to 4K gives you enough pixels for a decent print.",
      },
      {
        title: "Recover old low-resolution photos",
        text: "Scans and early digital photos are often only a few hundred pixels wide. Upscaling makes them usable on modern displays.",
      },
      {
        title: "Enlarge product and listing images",
        text: "Marketplaces reward larger, sharper images. Upscaling small product shots avoids the soft, stretched look of interpolation.",
      },
    ],
    steps: [
      {
        title: "Upload the small image",
        description:
          "Any JPG, PNG or WebP. If the source is blurry as well as small, unblur it first — see the unblur tool.",
      },
      {
        title: "Upscale to 4K",
        description:
          "The model predicts and generates detail at the target resolution rather than averaging existing pixels.",
      },
      {
        title: "Download the 4K file",
        description:
          "Compare edges and fine texture against the original. No watermark, commercial use allowed.",
      },
    ],
    extraFaqs: [
      {
        question: "Is upscaling the same as resizing?",
        answer:
          "No. Resizing interpolates — it invents nothing and softens edges. Upscaling predicts the detail that should be present at the larger size, so texture and edges stay defined instead of turning to mush.",
      },
      {
        question: "How small can the source image be?",
        answer:
          "Small images recover well up to a point. A few hundred pixels wide is usually fine for a 4K output; thumbnails under roughly 100 pixels rarely carry enough information for a convincing result.",
      },
      {
        question: "Will upscaling make noise or compression artifacts worse?",
        answer:
          "It can, because the model amplifies what it sees. On a heavily compressed JPEG the artifacts may become more visible — cleaning those up first, or choosing a lower magnification, usually gives a better result.",
      },
    ],
  },
  "ai-photo-to-real": {
    whyUse:
      "AI images announce themselves in predictable ways: plastic-smooth skin, impossible lighting, hair that merges into the background, and texture that dissolves at 100% zoom. SeedPix targets those specific tells rather than applying a generic filter — it rebuilds skin with pores and variation, adds believable grain, and fixes the light so it falls consistently across the scene.",
    useCases: [
      {
        title: "Make AI product shots look photographed",
        text: "Generated product images often look too clean to trust. Adding realistic texture and lighting makes them read as studio photography.",
      },
      {
        title: "Fix AI headshots for a profile",
        text: "Smooth, waxy skin is the most obvious giveaway in a portrait. Restoring skin texture is usually enough to make the image believable.",
      },
      {
        title: "Prepare AI art for print",
        text: "Print exposes everything — banding, flat skin, missing grain. Converting to a photographic look before export avoids an expensive surprise.",
      },
    ],
    steps: [
      {
        title: "Upload the AI-generated image",
        description:
          "Any JPG, PNG or WebP. The higher the resolution, the more the model has to work with when rebuilding texture.",
      },
      {
        title: "Run the conversion",
        description:
          "The model adds skin texture, grain and consistent lighting while keeping the composition and subject unchanged.",
      },
      {
        title: "Download the realistic version",
        description:
          "Compare at 100% zoom — that is where the difference shows. No watermark on the output.",
      },
    ],
    extraFaqs: [
      {
        question: "What exactly makes an image look AI-generated?",
        answer:
          "The most common tells are unnaturally smooth skin, lighting that does not agree across the frame, hair and fabric edges that blur into the background, and a complete absence of camera grain. This tool works on those specific problems rather than applying one global effect.",
      },
      {
        question: "Will it change what is in the image?",
        answer:
          "No. The subject, composition, pose and framing stay as they are — the model changes how the image renders surface and light, not what it depicts.",
      },
      {
        question: "Can it fix AI hands or faces that are anatomically wrong?",
        answer:
          "Not reliably. This tool changes the photographic quality of an image; it does not correct structure. Badly formed hands or faces are better solved by regenerating the image than by post-processing it.",
      },
    ],
  },

  "background-remover": {
    whyUse:
      "Background removal is really an edge problem. Hair, fur, glass, thin straps and motion-blurred outlines are where cutouts usually fail — you get a hard outline, a halo, or chunks of background left behind. SeedPix resolves the edge at pixel level and keeps semi-transparent detail, which is why the result composites cleanly instead of needing a manual clean-up pass.",
    useCases: [
      {
        title: "Make clean product photos for marketplaces",
        text: "White or transparent backgrounds are required by most listings. Cutting out the product gives you a consistent set across a catalogue.",
      },
      {
        title: "Build transparent PNGs for design work",
        text: "Drop the subject onto a new layout without a rectangular frame of leftover background around it.",
      },
      {
        title: "Replace a distracting background",
        text: "Swap a messy room or a busy street for a plain studio backdrop while keeping the subject and their lighting intact.",
      },
    ],
    steps: [
      {
        title: "Upload the photo",
        description:
          "Any JPG, PNG or WebP. PNG sources keep more edge information than heavily compressed JPEGs.",
      },
      {
        title: "Cut out the subject",
        description:
          "The model separates subject from background at pixel level, preserving hair, fur and semi-transparent edges.",
      },
      {
        title: "Download the transparent PNG",
        description:
          "Use it as-is on any background, or export a version with a replacement background applied.",
      },
    ],
    extraFaqs: [
      {
        question: "How well does it handle hair and fur?",
        answer:
          "Fine edges are the hardest part of any cutout, and this is where the model spends most of its effort. Wispy hair and fur come out with soft, semi-transparent edges rather than a hard cut, which is what lets the subject composite onto a new background convincingly.",
      },
      {
        question: "What about glass, veils and other see-through objects?",
        answer:
          "Semi-transparent subjects are genuinely difficult because there is no clean boundary — the background is visible through the subject. Results are best on solid subjects; expect to do some manual work on glassware and sheer fabric.",
      },
      {
        question: "Do I get a transparent PNG or a white background?",
        answer:
          "You get a transparent cutout by default, which is the most flexible option — you can place it on any colour. If you need a solid background, apply it after the cutout so you keep full control over the final look.",
      },
    ],
  },

  "photo-restoration": {
    whyUse:
      "Old photos fail in several ways at once — scratches, creases, fading, water stains, and grain that has eaten the fine detail. Restoring them by hand means weeks of retouching. SeedPix separates damage from content: it repairs cracks and stains, rebuilds faded colour, and recovers facial detail, while keeping the character of the original rather than producing a plastic modern-looking version of it.",
    useCases: [
      {
        title: "Restore a damaged family photograph",
        text: "Tears, creases and water marks can be repaired without losing the faces that make the photo worth keeping.",
      },
      {
        title: "Bring back colour in a faded print",
        text: "Prints from the 1970s and 1980s often shift to orange or yellow. The model rebuilds believable colour from what survives.",
      },
      {
        title: "Digitise and clean up an old scan",
        text: "Scans pick up dust, scanner noise and paper texture. Restoration removes those artifacts and recovers the underlying image.",
      },
    ],
    steps: [
      {
        title: "Scan or photograph the original",
        description:
          "Use the highest resolution you can — 300 DPI or more if possible. The scan quality sets the ceiling on the restoration.",
      },
      {
        title: "Run the restoration",
        description:
          "The model repairs damage, rebuilds faded colour and recovers detail while preserving the subject's likeness.",
      },
      {
        title: "Compare and download",
        description:
          "Check faces closely at 100% zoom, then download the restored file. No watermark.",
      },
    ],
    extraFaqs: [
      {
        question: "Will restoration change how the people look?",
        answer:
          "It should not change identity, but it will change surface quality — that is the point. The model works from the facial structure in the scan, so likeness is preserved; check the eyes and mouth, which are the areas most likely to shift.",
      },
      {
        question: "Can it restore a photo where a piece is physically missing?",
        answer:
          "Small missing areas can be plausibly reconstructed from the surrounding image. A large missing region — a torn-off corner containing a face, for example — has to be invented, so treat that part as an artistic reconstruction rather than a restoration.",
      },
      {
        question: "Should I restore before or after upscaling?",
        answer:
          "Restore first. Repairing damage and recovering detail at the scan's native resolution gives the upscaler real information to work with; upscaling a damaged scan just produces a larger damaged scan.",
      },
    ],
  },

  "ai-photo-enhancer": {
    whyUse:
      "Enhancement is not one adjustment — it is several that have to agree. Brighten a photo and you also lift noise; add contrast and shadows crush; increase clarity and skin turns coarse. SeedPix evaluates the image and applies corrections that work together, so you get better light and definition without the side effects that usually come with a manual pass.",
    useCases: [
      {
        title: "Fix a photo that is too dark or flat",
        text: "Indoor and evening shots often come out muddy. Recovering light and contrast makes them usable without a reshoot.",
      },
      {
        title: "Give listing photos a consistent look",
        text: "Apply the same enhancement across a catalogue so every product photo matches, instead of adjusting each one by hand.",
      },
      {
        title: "Improve a phone photo for sharing",
        text: "Automatic phone processing is conservative. A single enhancement pass gives everyday shots more punch without over-cooking them.",
      },
    ],
    steps: [
      {
        title: "Upload the photo",
        description:
          "Any JPG, PNG or WebP. Start from the original rather than an already-edited version.",
      },
      {
        title: "Run the enhancement",
        description:
          "The model lifts exposure, contrast, colour and local detail together, avoiding the noise and crushed shadows that manual edits cause.",
      },
      {
        title: "Download the enhanced photo",
        description:
          "Compare at 100% to confirm skin and shadow areas still look natural, then download watermark-free.",
      },
    ],
    extraFaqs: [
      {
        question: "Will enhancing my photo introduce noise?",
        answer:
          "Lifting a dark image amplifies whatever noise is already there, which is why manual brightening so often looks grainy. The model handles exposure and noise together, so shadows lift without the image turning speckled — though a very underexposed original has limits.",
      },
      {
        question: "Can it recover detail in blown-out highlights?",
        answer:
          "Only partially. If a highlight is clipped to pure white in the original file, that information no longer exists. The model can make blown areas less distracting, but it cannot invent detail that was never recorded.",
      },
      {
        question: "Should I enhance before or after background removal?",
        answer:
          "Enhance first. Colour and lighting corrections applied to the whole photo keep the subject looking natural against its original background; enhancing an isolated cutout can leave the subject's lighting inconsistent with whatever background you place it on.",
      },
    ],
  },
  "photo-text-editor": {
    whyUse:
      "Replacing text on a photo is easy; making it look like it was always there is not. The replacement has to match the typeface's weight and spacing, sit on the right baseline, follow the surface's perspective, and pick up the same light. SeedPix reads all of that from the original before rendering the new words, so a menu, label or sign still looks photographed rather than edited.",
    useCases: [
      {
        title: "Correct a typo on signage or packaging",
        text: "Fix a misspelled word in a photo of a sign, box or whiteboard without reshooting the original.",
      },
      {
        title: "Update a price or date in a menu photo",
        text: "Change a figure while keeping the menu's own typeface and layout, so the edit does not read as a patch.",
      },
      {
        title: "Translate text in a photo",
        text: "Replace one language with another in the same position and style — useful for localising menus, labels and signage.",
      },
    ],
    steps: [
      {
        title: "Upload the photo",
        description:
          "Any JPG, PNG or WebP containing the text you want to change. Higher resolution means better font matching.",
      },
      {
        title: "Describe the replacement",
        description:
          "Give the original wording and what it should become, for example change \"Table d'hote\" to \"Set menu\".",
      },
      {
        title: "Download the edited photo",
        description:
          "The new text is rendered to match the original font, angle and lighting. No watermark on the output.",
      },
    ],
    extraFaqs: [
      {
        question: "Can it handle long passages of text?",
        answer:
          "Short strings work much better than long ones. Matching a few words is reliable; matching a paragraph means the model has to sustain a typeface, line spacing and alignment across many characters, and small mismatches become obvious. For long text, editing the source design is the better route.",
      },
      {
        question: "Will the replacement follow a curved or angled surface?",
        answer:
          "Yes. Text on a bottle, a tilted sign or a folded page is rendered with the same perspective, curve and shading as the surrounding type, which is what keeps the edit from looking flat and pasted on.",
      },
      {
        question: "Can I remove text instead of replacing it?",
        answer:
          "Yes — describe it as a removal and the model fills the area with matching background rather than new type. This is useful for erasing phone numbers, addresses or captions you do not want to show.",
      },
    ],
  },

  "text-to-image": {
    whyUse:
      "Text-to-image lives or dies on how well the model follows the prompt. SeedPix puts several leading generators behind one input, so you can describe the same scene and compare how each one interprets it, then keep the version that matches what you had in mind. That is a different approach from committing to a single model and hoping it understood you.",
    useCases: [
      {
        title: "Create social and blog imagery",
        text: "Describe the shot you need — a flat-lay, a scene, a mood — and generate it instead of hunting through stock libraries.",
      },
      {
        title: "Draft a concept before commissioning art",
        text: "Generate several interpretations of an idea quickly to find the direction you want before spending money on a final piece.",
      },
      {
        title: "Produce product mockups",
        text: "Describe a product on a surface or in a setting to get a presentable mockup without a photoshoot.",
      },
    ],
    steps: [
      {
        title: "Describe the image",
        description:
          "Write what you want to see — subject, setting, style and lighting. Specific prompts follow more reliably than short ones.",
      },
      {
        title: "Generate and compare models",
        description:
          "The same prompt can be rendered by different generators. Switch between them to see which interpretation fits your intent.",
      },
      {
        title: "Download the image you keep",
        description:
          "Results come out watermark-free and are licensed for commercial use, so you can take them straight into a layout.",
      },
    ],
    extraFaqs: [
      {
        question: "How do I get better results from a prompt?",
        answer:
          "Be concrete about the things you actually care about — subject, setting, lighting, camera angle, style — and leave out the rest. Adding detail that does not matter dilutes the parts that do, and it becomes hard to tell which change improved the image.",
      },
      {
        question: "Why do the same prompt give different results on different models?",
        answer:
          "Each generator was trained differently, so they have different strengths: some are better at photorealism, others at illustration, typography or composition. Running the same prompt across models is the fastest way to find which one suits the image you have in mind.",
      },
      {
        question: "Can I edit an image I generated?",
        answer:
          "Yes. Generated images can go straight into the editor, so you can remove an object, replace the background, upscale, or clean up a detail without starting the prompt over.",
      },
    ],
  },

  "ai-photo-generator": {
    whyUse:
      "The hard part of generating a photorealistic image is not making something recognisable — it is making it survive close inspection. Lighting has to fall consistently, skin needs texture rather than a smooth sheen, and materials have to behave the way they actually do. SeedPix routes each prompt to the model best suited to photographic output and lets you compare results before you commit.",
    useCases: [
      {
        title: "Generate product photography without a studio",
        text: "Describe the product, surface and lighting to get a presentable image without booking a shoot or building a set.",
      },
      {
        title: "Create realistic portraits and headshots",
        text: "Generate a portrait with believable skin, hair and lighting for a profile, a deck or a concept pitch.",
      },
      {
        title: "Fill gaps in a visual set",
        text: "When a layout needs an image you do not have, generate one that matches the lighting and style of the rest of the set.",
      },
    ],
    steps: [
      {
        title: "Describe the photograph",
        description:
          "Say what the photo shows and how it was taken — subject, setting, light direction, lens feel. Photographic language produces photographic output.",
      },
      {
        title: "Generate across models",
        description:
          "SeedPix can render the same description with different generators so you can compare realism side by side.",
      },
      {
        title: "Download the realistic result",
        description:
          "Keep the version that holds up at 100% zoom. No watermark, commercial use allowed.",
      },
    ],
    extraFaqs: [
      {
        question: "What makes a generated photo look fake?",
        answer:
          "Usually the surface, not the subject: skin with no pores, lighting that changes direction across the frame, hair that fuses into the background, and a total absence of grain. Naming the lighting and the lens in your prompt helps, and the photo-to-real tool can clean up the remaining tells.",
      },
      {
        question: "Can I generate a specific person?",
        answer:
          "You can describe a person's appearance and setting, but generating a recognisable likeness of a real, identifiable individual is not something you should do without their consent — it raises likeness and privacy issues regardless of how the image is used.",
      },
      {
        question: "How do I keep a consistent look across several images?",
        answer:
          "Reuse the same descriptive language for lighting, lens and style in every prompt, and stay on the same model. Changing the model between images is the most common reason a set stops looking like it came from the same shoot.",
      },
    ],
  },

  "ai-portrait-generator": {
    whyUse:
      "Portraits are the least forgiving subject because everyone reads faces fluently — a slightly wrong eye position or waxy forehead registers immediately. SeedPix generates portraits with natural skin texture, believable hair edges and light that falls the way it would in a studio or near a window. The result is a portrait that holds up as a photograph rather than announcing itself as generated.",
    useCases: [
      {
        title: "Produce a professional headshot",
        text: "Describe the framing, backdrop and lighting you want for a profile picture or a team page, without booking a photographer.",
      },
      {
        title: "Create character portraits for a project",
        text: "Generate a consistent cast for a pitch, a game concept or a storyboard, with control over age, styling and mood.",
      },
      {
        title: "Make avatar images",
        text: "Generate a portrait at the framing and tone you need for a profile, forum or account image.",
      },
    ],
    steps: [
      {
        title: "Describe the portrait",
        description:
          "Cover the subject, the framing (headshot, half-body), the backdrop and the lighting. These four decide most of the outcome.",
      },
      {
        title: "Generate and compare",
        description:
          "Render the same description with different models to see which handles skin, hair and light the way you want.",
      },
      {
        title: "Download the portrait",
        description:
          "Check the face at 100% zoom — that is where quality shows. No watermark, commercial use allowed.",
      },
    ],
    extraFaqs: [
      {
        question: "How do I get a natural-looking headshot?",
        answer:
          "Specify the lighting rather than the mood — \"soft window light from the left\", \"single key light with a gentle fill\" — and ask for visible skin texture. Vague prompts like \"beautiful professional headshot\" tend to produce the smooth, over-retouched look that reads as generated.",
      },
      {
        question: "Can I use a generated portrait of a real person?",
        answer:
          "Not without their consent. Generating an identifiable likeness of a real individual raises likeness and privacy concerns whatever you intend to do with the image, so keep portraits either fictional or of people who have agreed to it.",
      },
      {
        question: "Will the portrait hold up when printed?",
        answer:
          "At headshot framing it usually does, but print magnifies texture problems. Check skin and hair at full resolution first, and consider a cleanup pass to add grain if the print size is large.",
      },
    ],
  },
};

export function getToolExtraContent(slug: string): ToolExtraContent | undefined {
  return toolExtraContent[slug];
}
