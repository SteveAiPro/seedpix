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
            Terms of Service
          </h1>
          <p className="mt-2 text-xs text-white/50">Last updated: November 2, 2026</p>
        </div>

        {/* Terms Body */}
        <div className="space-y-8 text-sm leading-relaxed text-white/70">
          <section>
            <h2 className="text-lg font-semibold text-white">1. Acceptance of Terms</h2>
            <p className="mt-2">
              By accessing or using SeedPix (https://seedpix.org), including our online AI photo editor, batch upscaler, background remover, and related services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue using the service immediately.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">2. Permitted Use & Intellectual Property</h2>
            <p className="mt-2">
              We respect creator ownership:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-white/60">
              <li><strong className="text-white">Your Content Remains Yours</strong>: You retain 100% intellectual property ownership of all images you upload to SeedPix and all edited versions generated through your prompts.</li>
              <li><strong className="text-white">Commercial Use Allowed</strong>: Subject to these terms, you are free to use images generated or enhanced via SeedPix for commercial purposes, client deliverables, personal projects, and social media.</li>
              <li><strong className="text-white">Platform IP</strong>: The SeedPix brand, website design, UI components, neural pipeline orchestrations, and proprietary software remain the exclusive property of SeedPix.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">3. Acceptable Use & Prohibited Conduct</h2>
            <p className="mt-2">
              You agree not to misuse our artificial intelligence tools. Specifically, you agree never to upload, generate, or distribute:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-white/60">
              <li>Non-consensual imagery, deepfakes intended to harass or defame individuals, or child sexual abuse material (CSAM).</li>
              <li>Content that promotes violence, hate speech, terrorism, or illegal activities.</li>
              <li>Malicious payloads, automated scripts intended to scrape or overwhelm our compute infrastructure, or attempts to reverse engineer our proprietary endpoints.</li>
            </ul>
            <p className="mt-2 text-white/50 text-xs">
              Violations will result in immediate termination of account access and, where required by applicable law, notification to relevant law enforcement authorities.
            </p>
          </section>

          <section id="refunds" className="scroll-mt-24">
            <h2 className="text-lg font-semibold text-white">4. Credit Packages, Purchases & Refund Policy</h2>
            <p className="mt-2">
              SeedPix provides free tier access alongside optional credit packages for high-resolution 4K processing and batch jobs:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-white/60">
              <li><strong className="text-white">One-Time Payments</strong>: Credit packages are non-recurring and do not auto-renew unless explicitly stated.</li>
              <li><strong className="text-white">Credits Never Expire</strong>: Purchased credits remain in your account balance indefinitely until consumed.</li>
            </ul>

            <h3 className="mt-5 text-sm font-bold text-white">Refund Policy</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-white/60">
              <li><strong className="text-white">14-Day Refund Window</strong>: You may request a full refund within 14 days of purchase, provided that no more than 10% of the credits from that package have been consumed. Refund requests outside this window, or for packages that are mostly consumed, are not eligible.</li>
              <li><strong className="text-white">Technical Failures</strong>: If a generation fails due to a fault on our side (system error, no output produced), the credits consumed for that job will be re-credited to your account or refunded on request.</li>
              <li><strong className="text-white">Duplicate Charges</strong>: Accidental duplicate charges are refunded in full, no questions asked.</li>
              <li><strong className="text-white">How to Request</strong>: Email{" "}
                <a href="mailto:support@seedpix.org" className="text-[#FFE525] hover:underline">
                  support@seedpix.org
                </a>{" "}
                from your account email with your order receipt (or Stripe receipt ID). Refunds are processed within 5–10 business days back to your original payment method.</li>
              <li><strong className="text-white">Statutory Rights</strong>: Nothing in this policy limits any mandatory consumer rights you may have under the laws of your jurisdiction, including EU/UK statutory withdrawal rights where applicable.</li>
              <li><strong className="text-white">Before Filing a Chargeback</strong>: Please contact support first — we resolve almost every billing issue within 24 hours. Chargebacks filed without contacting support may result in account suspension pending review.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">5. Disclaimer of Warranties & Limitation of Liability</h2>
            <p className="mt-2">
              SeedPix is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied. While we strive for 99.9% uptime and state-of-the-art AI generation fidelity, we do not warrant that results will always meet specific creative expectations or that service will be uninterrupted.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">6. Modifications to the Service</h2>
            <p className="mt-2">
              We reserve the right to modify or discontinue features, update model weights, or adjust credit costs with reasonable notice on our website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">7. Governing Law & Contact</h2>
            <p className="mt-2">
              These terms shall be governed by and construed in accordance with applicable laws. If you have any inquiries regarding these terms, contact us at:{" "}
              <a href="mailto:support@seedpix.org" className="text-[#FFE525] hover:underline">
                support@seedpix.org
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
