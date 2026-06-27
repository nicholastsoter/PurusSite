import Nav from '@/components/Nav'
import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — Purus',
  description: 'Purus Privacy Policy. Your browsing stays on your device. We do not collect, store, or transmit your browsing data.',
}

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--gray)]">Effective date: May 23, 2026 · Last updated: June 26, 2026</p>
        </div>

        {/* Summary callout */}
        <div className="bg-[#EBF4FF] border border-blue-100 rounded-2xl p-6 mb-10">
          <h2 className="font-semibold text-[var(--dark)] mb-2">Our core commitment</h2>
          <p className="text-sm leading-relaxed text-[var(--gray)]">
            Purus is a content-filtering browser for iOS. Your browsing stays on your device. We do not collect, store, or transmit your browsing history, search queries, or any personally identifiable information.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10 text-[var(--gray)] leading-relaxed">

          <Section title="1. What Purus Does">
            <p className="text-sm leading-7">
              Purus is a web browser that filters explicit content, ads, and trackers on your device. All content filtering happens locally using on-device rule sets and a DNS proxy. No images, URLs, or browsing history are ever transmitted to Purus or any third party for analysis.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <Subsection title="What we do not collect">
              <p className="text-sm leading-7">
                Purus does not collect, store, or transmit your browsing history, the URLs you visit, search queries you enter, images or content from pages you view, or any personally identifiable information.
              </p>
            </Subsection>
            <Subsection title="Filter list updates">
              <p className="text-sm leading-7">
                Purus periodically fetches updated content filter rule sets from our servers to keep blocking rules current. These requests contain no user-identifying information and no browsing data. Only a standard network request is made to check for and download updated rules.
              </p>
            </Subsection>
            {/* REVIEW BEFORE LAUNCH: Confirm whether false positive reporting is a native in-app
                flow or still routes through a Google Form. Update this paragraph accordingly.
                If still using Google Forms, restore the Google privacy policy link below. */}
            <Subsection title="False positive reports">
              <p className="text-sm leading-7">
                If you tap &quot;Report it&quot; on a blocked page, you may submit the blocked URL directly through the app. This submission is voluntary.
              </p>
            </Subsection>
            <Subsection title="Optional search suggestions">
              <p className="text-sm leading-7">
                If you enable &quot;Search Suggestions&quot; in Settings, partial text you type into the search bar is sent to your selected search engine (Google or DuckDuckGo) to retrieve autocomplete suggestions as you type. This feature is off by default. When disabled, suggestions are generated only from your own on-device search history, which never leaves your device. Your use of this feature when enabled is subject to your selected search engine&apos;s own privacy policy.
              </p>
            </Subsection>
            <Subsection title="Voice search">
              <p className="text-sm leading-7">
                If you use the microphone to search by voice, your speech is processed entirely on-device using Apple&apos;s on-device speech recognition. Your voice is never transmitted to Purus or any third-party server for this feature.
              </p>
            </Subsection>
            <Subsection title="Downloads and Photos access">
              <p className="text-sm leading-7">
                If you choose to save an image from a webpage, Purus requests access to your Photos library solely to save that image at your direction. Purus does not browse, scan, or access any other content in your Photos library.
              </p>
            </Subsection>
            <Subsection title="App analytics">
              <p className="text-sm leading-7">
                Purus does not use third-party analytics SDKs. We do not track app usage, session lengths, or in-app behavior.
              </p>
            </Subsection>
          </Section>

          <Section title="3. How Filtering Works">
            <p className="text-sm leading-7">
              All content filtering in Purus operates entirely on your device through multiple mechanisms: a locally stored block list and compiled content rule list checked against every web request, a DNS proxy that routes domain lookups through AdGuard&apos;s Family Protection filtered resolver, a keyword filter that scans search queries against a list of blocked terms, and a search query filter that enforces safe search parameters before queries are sent to search engines. None of these mechanisms send your data to Purus. DNS queries are resolved through AdGuard&apos;s servers under their Family Protection configuration; their privacy policy is available at{' '}
              <a href="https://adguard.com/en/privacy/dns.html" className="text-[var(--blue)] hover:underline" target="_blank" rel="noopener noreferrer">
                adguard.com/en/privacy/dns.html
              </a>.
            </p>
          </Section>

          <Section title="4. Data Storage">
            <p className="text-sm leading-7">
              Purus stores only the following data locally on your device: the content filter rule set files used for blocking decisions, your bookmarks and tab data, your local search history (used only for on-device suggestions, never transmitted), and your app preferences such as whether you have completed onboarding and your enabled feature settings. No data is stored on Purus servers. No account or login is required.
            </p>
          </Section>

          <Section title="5. Third-Party Services">
            <p className="text-sm leading-7 mb-4">
              Purus integrates with the following third-party services in a limited capacity:
            </p>
            <ul className="text-sm leading-7 space-y-3 list-disc pl-5">
              <li>
                <strong className="text-[var(--dark)]">AdGuard DNS Family Protection:</strong> Provides filtered DNS resolution via a system Network Extension. Your DNS queries pass through their resolver under their family filter configuration. Review AdGuard&apos;s privacy policy for details on their data handling.
              </li>
              <li>
                <strong className="text-[var(--dark)]">Google and/or DuckDuckGo:</strong> If you enable optional search suggestions, partial search text is sent to your selected search engine to retrieve autocomplete results. Governed by that search engine&apos;s own privacy policy.
              </li>
              {/* REVIEW BEFORE LAUNCH: Replace this list item with the actual reporting mechanism
                  once confirmed — native in-app flow or Google Forms. */}
              <li>
                <strong className="text-[var(--dark)]">False positive reporting:</strong> Used only when you voluntarily submit a false positive report through the in-app reporting feature.
              </li>
            </ul>
            <p className="text-sm leading-7 mt-4">
              Purus does not integrate any advertising networks, social media trackers, or third-party analytics services.
            </p>
          </Section>

          <Section title="6. Children's Privacy">
            <p className="text-sm leading-7">
              Purus is designed to be safe for users of all ages, including children. We do not knowingly collect personal information from anyone, including children under 13. Because no account or personal information is required to use Purus, the app is appropriate for use by minors under parental supervision. Purus is a tool intended to support parental oversight and is not a substitute for direct parental supervision of a minor&apos;s device use.
            </p>
          </Section>

          <Section title="7. Your Rights">
            <p className="text-sm leading-7 mb-5">
              Because Purus does not collect personal information, there is no personal data for us to provide, correct, or delete. If you have submitted a false positive report and wish to have it removed, contact us at the email below.
            </p>
            <Subsection title="California Residents (CCPA/CPRA)">
              <p className="text-sm leading-7">
                We do not sell or share your personal information. We do not collect sensitive personal information as defined under California law.
              </p>
            </Subsection>
            <Subsection title="EU/UK Residents (GDPR)">
              <p className="text-sm leading-7">
                Our lawful basis for processing any data (limited to filter list update requests and, if enabled, search suggestion requests routed through third-party search engines) is legitimate interest in providing a functioning service. No personal data is processed by Purus in connection with these requests.
              </p>
            </Subsection>
          </Section>

          <Section title="8. Security">
            <p className="text-sm leading-7">
              All network requests made by Purus, including filter list updates, use encrypted HTTPS connections. Because no personal data is collected or stored on our servers, the risk of a data breach affecting your personal information is minimal.
            </p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p className="text-sm leading-7">
              We may update this Privacy Policy to reflect changes in the app or applicable law. Material changes will be noted with a revised effective date. Continued use of Purus after a policy update constitutes acceptance of the revised policy.
            </p>
          </Section>

          <Section title="10. Contact">
            <p className="text-sm leading-7">
              For questions about this Privacy Policy, contact us at:
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
          <Link href="/" className="text-sm font-semibold text-[var(--dark)] hover:text-[var(--blue)] transition-colors">
            Back to Purus
          </Link>
          <p className="text-xs text-[var(--gray)]">© {new Date().getFullYear()} Purus. All rights reserved.</p>
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

function Subsection({ title, children }) {
  return (
    <div className="mt-4">
      <h3 className="font-medium text-[var(--dark)] mb-1.5 text-sm">{title}</h3>
      {children}
    </div>
  )
}
