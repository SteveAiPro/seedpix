import Link from "next/link";

// 首页 SEO 内容区 —— 把可见正文补到 1200+ 词，聚焦 "ai photo editor"，
// 用自然、对用户有用的说明文字 + 内链，避免关键词堆砌。
const features = [
  {
    href: "/remove-object-from-photo",
    title: "Remove objects",
    text: "Erase people, cars, text, wires, or anything unwanted from a photo in one click. The AI fills the gap with realistic background so the edit looks natural.",
  },
  {
    href: "/background-remover",
    title: "Remove backgrounds",
    text: "Instantly cut out the subject and get a clean transparent background — perfect for product photos, profile pictures, and ecommerce listings.",
  },
  {
    href: "/4k-image-upscaler",
    title: "Upscale to 4K",
    text: "Blow up a small, pixelated image into crisp 4K detail without losing quality. Great for prints, thumbnails, and old low-res screenshots.",
  },
  {
    href: "/photo-restoration",
    title: "Restore old photos",
    text: "Bring faded, scratched, or damaged old photographs back to life. The AI repairs cracks, restores color, and sharpens faces.",
  },
  {
    href: "/remove-person-from-photo",
    title: "Remove a person",
    text: "Remove a specific person from a group photo or a photobomber from your shot, while keeping everyone else untouched.",
  },
  {
    href: "/unblur-image",
    title: "Unblur images",
    text: "Fix out-of-focus and motion-blurred photos. Recover sharp edges and readable details from blurry pictures.",
  },
  {
    href: "/ai-photo-enhancer",
    title: "Enhance quality",
    text: "Boost lighting, color, and detail automatically. Make any photo look professionally finished in seconds.",
  },
  {
    href: "/filter-remover",
    title: "Remove AI filters",
    text: "Take matcha, anime, and other AI filter effects off a photo and restore the realistic original underneath.",
  },
  {
    href: "/ai-photo-generator",
    title: "Generate photos from text",
    text: "Describe the picture you want and the AI renders a photorealistic image from scratch — no camera, no stock photo, no design skills.",
  },
  {
    href: "/text-to-image",
    title: "Turn text into images",
    text: "Type a scene, style, or product idea and get a finished image in seconds. Every download is watermark-free and free for commercial use.",
  },
  {
    href: "/ai-portrait-generator",
    title: "Create AI portraits",
    text: "Generate studio-quality headshots and character portraits from a short description, with natural skin, hair, and lighting.",
  },
  {
    href: "/photo-text-editor",
    title: "Rewrite text on a photo",
    text: "Change signs, labels, and captions inside a photo. The AI swaps the words and matches the original font, angle, and lighting.",
  },
];

export default function HomeSeoContent({
  faqs,
}: {
  faqs: { q: string; a: string }[];
}) {
  return (
    <section className="border-t border-white/5 bg-[#0A0A0F] text-white">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">
          The Free AI Photo Editor That Understands What You Say
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/70">
          An AI photo editor is a tool that edits pictures automatically from a simple
          description — no brushes, layers, or masking tools to learn. SeedPix takes this
          one step further by combining a text-based editing studio with dozens of
          one-click AI tools, so you get both power and simplicity in one place. Whether
          you need to remove an object, clean up a background, restore an old family
          photo, or upscale an image for print, you can describe what you want and the
          AI handles the rest.
        </p>

        <h3 className="mt-10 text-2xl font-bold tracking-tight text-white">
          What can you actually do with SeedPix?
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          Most people first come to an AI photo editor for one specific fix, then stay
          because they discover how many other jobs it can handle. Below are the edits
          SeedPix users make most often, each with its own dedicated tool:
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.href}
              className="rounded-2xl border border-white/10 bg-[#13131A] p-5 transition hover:border-[#FFE525]/40 hover:shadow-[0_0_20px_rgba(255,229,37,0.08)]"
            >
              <Link
                href={f.href}
                className="text-base font-bold text-[#FFE525] hover:underline"
              >
                {f.title} →
              </Link>
              <p className="mt-2 text-xs leading-relaxed text-white/60">{f.text}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 text-2xl font-bold tracking-tight text-white">
          Edit photos by typing — how the editor works
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/70">
          The core of SeedPix is a conversational photo editor. You upload a JPG, PNG, or
          WebP file, then type a plain-English instruction such as &ldquo;remove the
          cup on the table&rdquo;, &ldquo;make the sky brighter&rdquo;, or
          &ldquo;turn this sketch into a realistic photo&rdquo;. The editor routes your
          request to the best generation model for the job and returns an edited image in
          seconds. Because the model understands context, you can chain several edits in
          one session — remove an object, then upscale the result, then remove the
          background — all without re-uploading.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          If you prefer a guided workflow, every popular edit also exists as a dedicated
          AI tool with its own prompt template. This is useful when you know exactly what
          you want to change and want a repeatable, predictable result. Whether you use
          the free-form editor or the tool grid, the output stays high-resolution, has no
          watermark, and is free for commercial use.
        </p>

        <h2 className="mt-14 text-2xl font-bold tracking-tight text-white">
          Who uses a free AI photo editor online?
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/70">
          SeedPix is built for anyone who works with images but does not want to spend
          hours learning professional software. Here are the people who get the most
          value from editing photos with AI:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-white/70">
          <li>
            <strong className="text-white">Online sellers and shop owners</strong> remove backgrounds and objects
            from product photos to build clean, consistent listings that convert better.
          </li>
          <li>
            <strong className="text-white">Social media creators</strong> clean up selfies, remove photobombers,
            and upscale thumbnails so every post looks polished.
          </li>
          <li>
            <strong className="text-white">Small businesses and marketers</strong> restore and enhance brand
            imagery without hiring a designer or paying for expensive subscriptions.
          </li>
          <li>
            <strong className="text-white">Anyone restoring memories</strong> repairs old, damaged family
            photographs that would otherwise be lost.
          </li>
        </ul>

        <h2 className="mt-14 text-2xl font-bold tracking-tight text-white">
          AI photo editor vs Photoshop — why free AI editing wins for quick fixes
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/70">
          Traditional editors like Photoshop give you total control, but that control
          comes at a cost: a steep learning curve, a subscription fee, and a lot of time
          spent on every edit. For the majority of everyday jobs — removing an object,
          cleaning up a background, sharpening a blurry shot, or restoring an old photo —
          an AI photo editor online is faster and far easier to use. You describe the
          result you want instead of manipulating pixels by hand.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          That is not to say the two never overlap. Designers often use SeedPix to
          prepare a base image in seconds, then finish it in Photoshop when they need
          surgical, pixel-level control. For everyone else, SeedPix is enough on its own
          — no install, no signup required to try it, and results in about a minute.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#13131A]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 bg-[#16161F] text-white">
              <tr>
                <th className="px-4 py-3 font-semibold">Task</th>
                <th className="px-4 py-3 font-semibold text-[#FFE525]">SeedPix AI editor</th>
                <th className="px-4 py-3 font-semibold text-white/70">Photoshop</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/70">
              <tr className="hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-medium text-white">Remove an object</td>
                <td className="px-4 py-3 text-[#FFE525]">Type it, done in seconds</td>
                <td className="px-4 py-3">Clone stamp, 10-20 min</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-medium text-white">Remove a background</td>
                <td className="px-4 py-3 text-[#FFE525]">One click</td>
                <td className="px-4 py-3">Lasso + refine edges</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-medium text-white">Restore an old photo</td>
                <td className="px-4 py-3 text-[#FFE525]">Automatic repair</td>
                <td className="px-4 py-3">Manual retouch, hours</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-medium text-white">Skill level needed</td>
                <td className="px-4 py-3 text-[#FFE525]">None — plain English</td>
                <td className="px-4 py-3">Steep learning curve</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-medium text-white">Price to start</td>
                <td className="px-4 py-3 text-[#FFE525]">Free, 10 credits included</td>
                <td className="px-4 py-3">Subscription ($20+/mo)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-white/40">
          For daily photo fixes, a conversational AI photo editor gets the job done in a
          fraction of the time — with none of the software overhead.
        </p>

        <h2 className="mt-14 text-2xl font-bold tracking-tight text-white">
          Is an AI photo editor free? Is it safe to use?
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/70">
          Yes — SeedPix is free to start. New users receive 10 free credits on signup plus
          1 free credit every day, and you can try the editor immediately without an
          account. When you run out, credit packs start at a low price, far below what
          most AI art tools charge. Your photos are processed for the edit and not used
          to train shared models, and every output is delivered without a watermark.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          Because SeedPix runs in the browser on any device, there is nothing to download
          and no desktop software to maintain. You can edit a photo from a laptop during
          the day and finish a batch on your tablet at night — your results download
          directly, ready to use in emails, social posts, marketplaces, or print. This
          makes it a practical choice for anyone who edits photos occasionally rather
          than professionally, and who values a free AI photo editor that does not lock
          them into a monthly plan.
        </p>

        <h2 className="mt-14 text-2xl font-bold tracking-tight text-white">
          Frequently Asked Questions about SeedPix
        </h2>
        <div className="mt-6 space-y-3" id="home-faq">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-white/10 bg-[#13131A] transition hover:border-white/20"
            >
              <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-white transition hover:text-[#FFE525]">
                {f.q}
                <span className="ml-2 text-white/40 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="border-t border-white/5 px-5 py-4 text-sm leading-relaxed text-white/70">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
