'use client'
import Nav from '@/components/Nav'
import Link from 'next/link'
import { useState } from 'react'

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="border-b border-gray-100 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-6 gap-4">
        <h4 className="font-semibold text-[var(--dark)] text-base">{question}</h4>
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center transition-all duration-300"
          style={{
            background: open ? 'var(--blue)' : 'white',
            borderColor: open ? 'var(--blue)' : '',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14"
            style={{ color: open ? 'white' : 'var(--gray)' }}>
            <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: open ? '300px' : '0px', opacity: open ? 1 : 0 }}
      >
        <p className="text-sm text-[var(--gray)] leading-7 pb-6 pr-12">{answer}</p>
      </div>
    </div>
  )
}

export default function Support() {
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
          <p className="text-xs font-semibold text-[var(--blue)] uppercase tracking-widest mb-3">Support</p>
          <h1 className="font-display text-4xl md:text-5xl text-[var(--dark)] leading-tight mb-4">
            Need help with Purus? We&apos;re here.
          </h1>
        </div>

        <div className="space-y-14">

          {/* Contact */}
          <div>
            <h2 className="font-semibold text-lg text-[var(--dark)] mb-3">Contact us</h2>
            <p className="text-sm text-[var(--gray)] leading-7 mb-4">
              For any questions, issues, or feedback, reach out directly by email. We read every message.
            </p>
            <a
              href="mailto:nicholas.purus@gmail.com"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--blue)] hover:underline"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 20 20">
                <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              nicholas.purus@gmail.com
            </a>
          </div>

          {/* Reporting a blocked site */}
          <div>
            <h2 className="font-semibold text-lg text-[var(--dark)] mb-3">Reporting a blocked site</h2>
            <p className="text-sm text-[var(--gray)] leading-7">
              If Purus blocks a site you believe is legitimate, you can report it directly from within the app. When you land on a blocked page, tap <strong className="text-[var(--dark)]">Report it</strong> — this submits the URL for review. We go through every report and update our filters accordingly. There&apos;s no separate form or email needed; the in-app button is the fastest way to get a false positive resolved.
            </p>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="font-semibold text-lg text-[var(--dark)] mb-1">Frequently asked questions</h2>
            <div>
              <FAQItem
                question="Will Purus slow down my browsing?"
                answer="No. All filtering happens on-device before requests are made, so there's no round-trip to an external server to check content. In most cases Purus is actually faster than a standard browser because ads and trackers are blocked before they load."
              />
              <FAQItem
                question="What if a legitimate site gets blocked?"
                answer="It happens occasionally. Tap 'Report it' on the blocked page and we review it within 24 hours. False positive reports go directly to our block list team and the site is usually cleared in the next filter update."
              />
              <FAQItem
                question="Can my child turn off the filtering?"
                answer="No. The filtering layers are built into the browser at a level that cannot be toggled off by the user. Safe search, DNS filtering, and the keyword scanner are always on. The only way to disable filtering is to delete the app."
              />
              <FAQItem
                question="Does Purus require a subscription?"
                answer="No subscription — Purus is a one-time purchase with no account required. Eight filtering layers, safe search locked, and ad blocking all included. We're building a parent dashboard with additional controls and reporting for families who want more visibility. That will be a separate tier when it launches."
              />
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--gray-mid)] px-6 py-8">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-sm font-semibold text-[var(--dark)] hover:text-[var(--blue)] transition-colors">
            Back to Purus
          </Link>
          <p className="text-xs text-[var(--gray)]">© 2026 Purus. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
