import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Usage Guidelines",
  description:
    "SeedPix Terms of Service: Read our terms and conditions for using our free and premium AI photo editor tools.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
        {/* Header */}
        <div className="mb-12 border-b border-neutral-200 pb-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center text-xs font-medium text-neutral-500 hover:text-neutral-900"
          >
            ← Back to Free Photo Editor
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-2 text-xs text-neutral-500">Last updated: September 20, 2026</p>
        </div>

        {/* Terms Body */}
        <div className="space-y-8 text-sm leading-relaxed text-neutral-700">
          <section>
            <h2 className="text-lg font-semibold text-neutral-900">1. Acceptance of Terms</h2>
            <p className="mt-2">
              By accessing or using SeedPix (https://seedpix.org), including our online AI photo editor, batch upscaler, background remover, and related services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue using the service immediately.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">2. Permitted Use & Intellectual Property</h2>
            <p className="mt-2">
              We respect creator ownership:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600">
              <li><strong>Your Content Remains Yours</strong>: You retain 100% intellectual property ownership of all images you upload to SeedPix and all edited versions generated through your prompts.</li>
              <li><strong>Commercial Use Allowed</strong>: Subject to these terms, you are free to use images generated or enhanced via SeedPix for commercial purposes, client deliverables, personal projects, and social media.</li>
              <li><strong>Platform IP</strong>: The SeedPix brand, website design, UI components, neural pipeline orchestrations, and proprietary software remain the exclusive property of SeedPix.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">3. Acceptable Use & Prohibited Conduct</h2>
            <p className="mt-2">
              You agree not to misuse our artificial intelligence tools. Specifically, you agree never to upload, generate, or distribute:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600">
              <li>Non-consensual imagery, deepfakes intended to harass or defame individuals, or child sexual abuse material (CSAM).</li>
              <li>Content that promotes violence, hate speech, terrorism, or illegal activities.</li>
              <li>Malicious payloads, automated scripts intended to scrape or overwhelm our compute infrastructure, or attempts to reverse engineer our proprietary endpoints.</li>
            </ul>
            <p className="mt-2 text-neutral-500 text-xs">
              Violations will result in immediate termination of account access and, where required by applicable law, notification to relevant law enforcement authorities.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">4. Credit Packages, Purchases & Refund Policy</h2>
            <p className="mt-2">
              SeedPix provides free tier access alongside optional credit packages for high-resolution 4K processing and batch jobs:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600">
              <li><strong>One-Time Payments</strong>: Credit packages are non-recurring and do not auto-renew unless explicitly stated.</li>
              <li><strong>Refunds</strong>: Because GPU compute is consumed immediately upon job execution, credits that have already been utilized for generation are non-refundable. If you experience a technical failure or system outage, please email support for an immediate credit replacement or refund.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">5. Disclaimer of Warranties & Limitation of Liability</h2>
            <p className="mt-2">
              SeedPix is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied. While we strive for 99.9% uptime and state-of-the-art AI generation fidelity, we do not warrant that results will always meet specific creative expectations or that service will be uninterrupted.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">6. Modifications to the Service</h2>
            <p className="mt-2">
              We reserve the right to modify or discontinue features, update model weights, or adjust credit costs with reasonable notice on our website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">7. Governing Law & Contact</h2>
            <p className="mt-2">
              These terms shall be governed by and construed in accordance with applicable laws. If you have any inquiries regarding these terms, contact us at:{" "}
              <a href="mailto:support@seedpix.org" className="text-blue-600 hover:underline">
                support@seedpix.org
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
