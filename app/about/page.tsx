import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — Our Mission & Technology",
  description:
    "Learn about SeedPix, our mission to make professional AI photo editing accessible to everyone without paywalls, subscriptions, or intrusive sign-ups.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
        {/* Header */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center text-xs font-medium text-white/50 hover:text-[#FFE525] transition"
          >
            ← Back to Free Photo Editor
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            About SeedPix
          </h1>
          <p className="mt-3 text-base text-white/70">
            Democratizing creative image editing through modern, open-access artificial intelligence.
          </p>
        </div>

        {/* Story & Vision */}
        <div className="space-y-10 text-sm leading-relaxed text-white/70">
          <section>
            <h2 className="text-xl font-semibold text-white">Our Story & Mission</h2>
            <p className="mt-3">
              Photo editing has traditionally required expensive software licenses, complex learning curves, or aggressive paywalls. At <strong className="text-white">SeedPix</strong>, we set out to build a truly modern alternative: an online AI-powered photo editor where anyone can modify images simply by describing what they want in natural language.
            </p>
            <p className="mt-3">
              Our core belief is simple: <strong className="text-[#FFE525]">tools should be immediately accessible</strong>. No mandatory sign-up, no hidden subscriptions, and no intrusive watermarks on your personal creations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">How Our Technology Works</h2>
            <p className="mt-3">
              SeedPix harnesses state-of-the-art multimodal vision and diffusion models. Whether you need to remove an unwanted background object, restore an old family photograph, upscale low-resolution art to 4K, or erase watermarks, our neural pipelines parse your prompt and compute pixel transformations in real-time.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-white/60">
              <li><strong className="text-white">Zero Installation</strong>: Completely browser-based, optimized for mobile and desktop screens.</li>
              <li><strong className="text-white">Natural Language Guidance</strong>: Edit photos by typing descriptive prompts.</li>
              <li><strong className="text-white">Fast GPU Inference</strong>: High-throughput cloud processing designed for quick turnaround.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Our Privacy & Security Commitment</h2>
            <p className="mt-3">
              Your photos belong to you. We strictly process images ephemerally in secure memory buffers. We do not store or monetize your uploaded imagery, and all temporary assets are automatically purged from our servers within 24 hours. For full details, please review our{" "}
              <Link href="/privacy" className="text-[#FFE525] underline hover:text-[#FFE525]/80 transition">
                Privacy Policy
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Contact & Support</h2>
            <p className="mt-3">
              Have questions, feedback, or enterprise API inquiries? We welcome direct communication from our global community of creators:
            </p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-[#13131A] p-5">
              <p className="font-medium text-white">SeedPix Team</p>
              <p className="mt-1 text-xs text-white/60">
                Support & Inquiries:{" "}
                <a href="mailto:support@seedpix.org" className="text-[#FFE525] hover:underline">
                  support@seedpix.org
                </a>
              </p>
              <p className="mt-1 text-xs text-white/60">
                Official Website:{" "}
                <a href="https://seedpix.org" className="text-[#FFE525] hover:underline">
                  https://seedpix.org
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
