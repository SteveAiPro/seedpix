import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — How We Protect Your Data",
  description:
    "SeedPix Privacy Policy: We respect your privacy. Learn how we handle image processing ephemerally with zero persistent storage of personal photos.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-neutral-500">Last updated: September 20, 2026</p>
        </div>

        {/* Policy Body */}
        <div className="space-y-8 text-sm leading-relaxed text-neutral-700">
          <section>
            <h2 className="text-lg font-semibold text-neutral-900">1. Overview & Commitment</h2>
            <p className="mt-2">
              At SeedPix (accessible from https://seedpix.org), safeguarding user privacy is foundational to our engineering architecture. This Privacy Policy outlines the types of information we process, how that information is handled during your photo editing sessions, and your data protection rights.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">2. Ephemeral Image Processing</h2>
            <p className="mt-2">
              When you upload a photograph or image file to SeedPix for editing, background removal, inpainting, or restoration:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600">
              <li><strong>Temporary Storage Only</strong>: Uploaded files and generated results are stored temporarily in volatile cache solely to deliver your requested edits.</li>
              <li><strong>Automatic 24-Hour Purge</strong>: All image assets are permanently deleted from our servers automatically within 24 hours of generation.</li>
              <li><strong>No Model Training on User Photos</strong>: We do <em>not</em> use your uploaded personal photographs or artwork to train or fine-tune public foundation AI models.</li>
              <li><strong>No Public Gallery</strong>: Your uploaded and edited images remain private to your session and are never displayed publicly.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">3. Information We Collect</h2>
            <p className="mt-2">
              Depending on how you interact with our platform:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600">
              <li><strong>Anonymous Usage Data</strong>: If you use SeedPix without creating an account, we do not collect your name, email, or physical location.</li>
              <li><strong>Account Credentials</strong>: If you choose to sign up or purchase additional credit packages, we collect your email address and authentication tokens via secure OAuth providers.</li>
              <li><strong>Technical Logs & Analytics</strong>: We collect standard server logs (IP address, browser type, referral URL, and timestamps) and anonymized Google Analytics 4 telemetry to monitor platform uptime and prevent denial-of-service abuse.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">4. Third-Party Services & Payment Security</h2>
            <p className="mt-2">
              We partner with industry-standard third-party providers for infrastructure:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600">
              <li><strong>Payment Processors</strong>: All financial transactions are processed directly by certified PCI-DSS compliant gateways (e.g., Stripe). SeedPix never stores or handles your credit card numbers.</li>
              <li><strong>Hosting & CDN</strong>: Our web assets are globally routed through Vercel and Cloudflare with TLS 1.3 encryption.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">5. Cookies & Local Storage</h2>
            <p className="mt-2">
              SeedPix uses essential cookies and browser LocalStorage exclusively to preserve user preferences (such as language selection and theme) and maintain active sessions. You can disable cookies at any time in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">6. User Rights (GDPR & CCPA)</h2>
            <p className="mt-2">
              Regardless of your geographical location, you have the right to request access to your personal account data, request immediate deletion of any associated account records, and object to processing. To exercise any of these rights, contact us at{" "}
              <a href="mailto:privacy@seedpix.org" className="text-blue-600 hover:underline">
                privacy@seedpix.org
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">7. Contact Information</h2>
            <p className="mt-2">
              For any questions or privacy inquiries regarding this policy, reach out to our privacy compliance officer at{" "}
              <a href="mailto:privacy@seedpix.org" className="text-blue-600 hover:underline">
                privacy@seedpix.org
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
