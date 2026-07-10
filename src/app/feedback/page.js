'use client'
import Nav from '@/components/Nav'
import Link from 'next/link'
import { useState } from 'react'

const CATEGORIES = [
  { value: 'bug', label: 'Bug report' },
  { value: 'false-positive', label: 'Content blocked incorrectly' },
  { value: 'false-negative', label: 'Content should have been blocked' },
  { value: 'feature', label: 'Feature request' },
  { value: 'other', label: 'Other' },
]

const CHEVRON_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`

export default function Feedback() {
  const [form, setForm] = useState({ category: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ timestamp: new Date().toISOString(), ...form }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setStatus('success')
      setForm({ category: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

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
          <p className="text-xs font-semibold text-[var(--blue)] uppercase tracking-widest mb-3">Feedback</p>
          <h1 className="font-display text-4xl md:text-5xl text-[var(--dark)] leading-tight mb-4">
            Tell us what&apos;s on your mind.
          </h1>
          <p className="text-sm text-[var(--gray)] leading-7">
            Found a bug, hit a site that shouldn&apos;t be blocked, or have an idea? We read every submission.
          </p>
        </div>

        {status === 'success' ? (
          <div className="rounded-2xl border border-[var(--gray-mid)] bg-[var(--gray-light)] p-10 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--blue-light)] mb-4">
              <svg className="w-6 h-6 text-[var(--blue)]" fill="none" viewBox="0 0 24 24">
                <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="font-semibold text-[var(--dark)] text-lg mb-2">Thanks for the feedback.</h2>
            <p className="text-sm text-[var(--gray)] leading-relaxed mb-6">
              We got your message and will take a look.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="text-sm font-medium text-[var(--blue)] hover:underline"
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-[var(--dark)] mb-2">
                Category <span className="text-[var(--blue)]">*</span>
              </label>
              <select
                id="category"
                name="category"
                required
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-[var(--gray-mid)] bg-white px-4 py-3 text-sm text-[var(--dark)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)] focus:border-transparent appearance-none"
                style={{
                  backgroundImage: CHEVRON_BG,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '20px',
                  paddingRight: '40px',
                }}
              >
                <option value="" disabled>Select a category</option>
                {CATEGORIES.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--dark)] mb-2">
                Email{' '}
                <span className="text-[var(--gray)] font-normal">(optional — only if you&apos;d like a reply)</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[var(--gray-mid)] bg-white px-4 py-3 text-sm text-[var(--dark)] placeholder:text-[var(--gray)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)] focus:border-transparent"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[var(--dark)] mb-2">
                Message <span className="text-[var(--blue)]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder="Describe the issue or idea in as much detail as you'd like…"
                className="w-full rounded-xl border border-[var(--gray-mid)] bg-white px-4 py-3 text-sm text-[var(--dark)] placeholder:text-[var(--gray)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)] focus:border-transparent resize-none leading-relaxed"
              />
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-500 leading-relaxed">
                Something went wrong. Try again, or email us at{' '}
                <a href="mailto:nicholas.purus@gmail.com" className="underline">
                  nicholas.purus@gmail.com
                </a>
                .
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full btn-spring text-sm font-medium bg-[var(--blue)] text-white px-6 py-3.5 rounded-full hover:bg-[var(--blue-dark)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {status === 'submitting' ? 'Sending…' : 'Send feedback'}
            </button>
          </form>
        )}
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
