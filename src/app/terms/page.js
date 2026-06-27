import Nav from '@/components/Nav'
import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service — Purus',
  description: 'Purus Terms of Service. Governs your use of the Purus browser application.',
}

export default function TermsOfService() {
  return (
    <main className="bg-white text-[var(--dark)]">
      <Nav />

      <div className="max-w-2xl mx-auto px-6 pt-36 pb-24">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-block text-sm mb-8 hover:underline"
            style={{ color: '#2B5BA8' }}
          >
            ← Back to Purus
          </Link>
          <p className="text-xs font-semibold text-[var(--blue)] uppercase tracking-widest mb-3">Legal</p>
          <h1 className="font-display text-4xl md:text-5xl text-[var(--dark)] leading-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-[var(--gray)]">Effective Date: June 1, 2026</p>
        </div>

        {/* Intro */}
        <p className="text-sm leading-7 text-[var(--gray)] mb-10">
          These Terms of Service govern your use of the Purus browser application and any related services. By downloading or using Purus, you agree to these terms.
        </p>

        {/* Sections */}
        <div className="space-y-10 text-[var(--gray)] leading-relaxed">

          <Section title="1. Acceptance of Terms">
            <p className="text-sm leading-7">
              By downloading, installing, or using Purus, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, do not use the app.
            </p>
          </Section>

          <Section title="2. Description of Service">
            <p className="text-sm leading-7 mb-4">
              Purus is a content-filtering web browser for iOS. The app uses multiple filtering layers — including domain blocking, DNS-level filtering, keyword filtering, and safe search enforcement — to reduce exposure to explicit content, advertisements, and unsafe searches. All filtering occurs on your device.
            </p>
            <p className="text-sm leading-7">
              Purus may request the following device permissions to support optional features: microphone and speech recognition access (for voice search, processed entirely on-device), and Photos library access (to save images you choose to download). These features are optional and the app remains fully functional without granting these permissions.
            </p>
          </Section>

          <Section title="3. No Guarantee of Complete Filtering">
            <div className="bg-[var(--gray-light)] border border-[var(--gray-mid)] rounded-xl p-4 mb-4">
              <p className="text-sm leading-7 font-medium text-[var(--dark)]">
                PURUS DOES NOT GUARANTEE COMPLETE FILTERING OF ALL EXPLICIT, HARMFUL, OR INAPPROPRIATE CONTENT. While Purus uses multiple layers of filtering technology, no content filter is perfect. Some explicit or inappropriate content may not be blocked. Purus is not responsible for any content that is not filtered by the app.
              </p>
            </div>
            <p className="text-sm leading-7">
              Purus is designed to significantly reduce exposure to explicit content but should not be relied upon as the sole means of content protection, particularly for minors. Parents and guardians remain responsible for supervising minors&apos; use of this app and any device on which it is installed.
            </p>
          </Section>

          <Section title="4. Limitation of Liability">
            <div className="bg-[var(--gray-light)] border border-[var(--gray-mid)] rounded-xl p-4 mb-4">
              <p className="text-sm leading-7 font-medium text-[var(--dark)]">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, PURUS AND ITS OWNERS, OFFICERS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES ARISING FROM YOUR USE OR INABILITY TO USE THE APP, ANY CONTENT ACCESSED THROUGH THE APP, OR ANY FAILURE OF THE FILTERING TECHNOLOGY.
              </p>
              <p className="text-sm leading-7 font-medium text-[var(--dark)] mt-3">
                IN NO EVENT SHALL PURUS&apos;S TOTAL LIABILITY TO YOU EXCEED THE AMOUNT YOU PAID FOR THE APP.
              </p>
            </div>
          </Section>

          <Section title="5. Acceptable Use">
            <p className="text-sm leading-7">
              You agree to use Purus only for lawful purposes. You may not attempt to circumvent, disable, or interfere with the filtering technology. You may not reverse engineer, decompile, or modify the app.
            </p>
          </Section>

          <Section title="6. One-Time Purchase">
            <p className="text-sm leading-7">
              Purus is available as a one-time purchase. The purchase price is non-refundable except as required by applicable law or Apple App Store policies. Apple&apos;s standard refund policies apply to all purchases made through the App Store.
            </p>
          </Section>

          <Section title="7. Third-Party Services and Network Extension">
            <p className="text-sm leading-7 mb-4">
              Purus integrates with third-party services including AdGuard DNS Family Protection. Enabling this feature installs a system-level Network Extension (DNS proxy) on your device to filter content at the network level. Your use of this service is subject to AdGuard&apos;s terms and privacy policy.
            </p>
            <p className="text-sm leading-7 mb-4">
              If you enable the optional search suggestions feature in Settings, partial search queries you type may be sent to your selected search engine (Google or DuckDuckGo) to retrieve suggestions. This feature is off by default. Your use of any search engine accessed through Purus is subject to that search engine&apos;s own terms and privacy policy.
            </p>
            <p className="text-sm leading-7">
              The app displays content from third-party websites. Purus is not responsible for the content, accuracy, or practices of any third-party website accessed through the browser.
            </p>
          </Section>

          <Section title="8. Reporting Incorrectly Blocked Content">
            <p className="text-sm leading-7">
              If Purus blocks a website you believe was blocked in error, you may report it to us using the in-app reporting feature. We review reports and make adjustments to our filtering lists as appropriate, though we do not guarantee a specific response time or outcome.
            </p>
          </Section>

          <Section title="9. Intellectual Property">
            <p className="text-sm leading-7">
              Purus and its original content, features, and functionality are owned by Purus LLC and are protected by applicable intellectual property laws. Third-party trademarks and logos referenced in Purus materials are the property of their respective owners. Purus is not affiliated with or endorsed by Google, YouTube, Reddit, Amazon, DuckDuckGo, Bing, Yahoo, AdGuard, or any other third party whose services are referenced.
            </p>
          </Section>

          <Section title="10. Disclaimer of Warranties">
            <div className="bg-[var(--gray-light)] border border-[var(--gray-mid)] rounded-xl p-4">
              <p className="text-sm leading-7 font-medium text-[var(--dark)]">
                PURUS IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
            </div>
          </Section>

          <Section title="11. Changes to Terms">
            <p className="text-sm leading-7">
              We reserve the right to update these Terms of Service at any time. Material changes will be communicated through the app or our website. Continued use of Purus after changes constitutes acceptance of the updated terms.
            </p>
          </Section>

          <Section title="12. Governing Law">
            <p className="text-sm leading-7">
              These Terms of Service are governed by the laws of the State of Utah, United States, without regard to conflict of law provisions.
            </p>
          </Section>

          <Section title="13. Contact">
            <p className="text-sm leading-7">
              For questions about these Terms of Service, contact us at:
            </p>
            <div className="mt-3 text-sm">
              <p className="font-semibold text-[var(--dark)]">Purus</p>
              <a href="mailto:nicholas.purus@gmail.com" className="text-[var(--blue)] hover:underline">
                nicholas.purus@gmail.com
              </a>
            </div>
          </Section>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--gray-mid)] px-6 py-8">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-sm font-semibold hover:underline" style={{ color: '#2B5BA8' }}>
            ← Back to Purus
          </Link>
          <p className="text-xs text-[var(--gray)]">© 2026 Purus. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="font-semibold text-lg text-[var(--dark)] mb-3">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  )
}
