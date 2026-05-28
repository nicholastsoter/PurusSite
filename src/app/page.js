'use client'
import Nav from '@/components/Nav'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

/* ─── Reusable section wrapper ─── */
function Section({ id, className = '', children, style }) {
  return (
    <section id={id} className={`px-6 ${className}`} style={style}>
      <div className="max-w-5xl mx-auto">{children}</div>
    </section>
  )
}

/* ─── Shield / lock icon ─── */
function ShieldIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L4 5.5V11c0 4.5 3.5 8.7 8 9.9 4.5-1.2 8-5.4 8-9.9V5.5L12 2z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ─── Feature card ─── */
function FeatureCard({ icon, title, description }) {
  return (
    <div
      data-cascade
      className="card-reveal bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md"
      style={{ transition: 'box-shadow 200ms ease, opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)' }}
    >
      <div className="w-10 h-10 rounded-xl bg-[var(--blue-light)] flex items-center justify-center mb-4 text-[var(--blue)]">
        {icon}
      </div>
      <h3 className="font-semibold text-[var(--dark)] mb-1.5">{title}</h3>
      <p className="text-sm text-[var(--gray)] leading-relaxed">{description}</p>
    </div>
  )
}

/* ─── Layer step ─── */
function LayerStep({ number, title, description }) {
  return (
    <div data-cascade className="reveal flex gap-5">
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--blue)] text-white flex items-center justify-center text-sm font-semibold">
        {number}
      </div>
      <div>
        <h4 className="font-semibold text-[var(--dark)] mb-1">{title}</h4>
        <p className="text-sm text-[var(--gray)] leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

/* ─── Audience card ─── */
function AudienceCard({ emoji, title, description }) {
  return (
    <div data-cascade className="audience-reveal text-center px-4">
      <div className="text-3xl mb-3">{emoji}</div>
      <h4 className="font-semibold text-[var(--dark)] mb-1.5">{title}</h4>
      <p className="text-sm text-[var(--gray)] leading-relaxed">{description}</p>
    </div>
  )
}

const CHECK_ITEMS = [
  'Safe Search locked on Google — cannot be disabled',
  'Safe Search enforced on DuckDuckGo',
  'YouTube Restricted Mode always on',
  '400+ blocked keyword terms',
  'No browsing data leaves your phone',
  'No account, no cloud sync, no tracking',
]

export default function Home() {
  const heroContentRef = useRef(null)

  /* ── Hero word-by-word stagger ── */
  useEffect(() => {
    document.querySelectorAll('.hero-word').forEach((word, i) => {
      setTimeout(() => word.classList.add('visible'), 100 + i * 80)
    })
    document.querySelectorAll('.hero-reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 680 + i * 110)
    })
  }, [])

  /* ── Parallax on hero content ── */
  useEffect(() => {
    const heroEl = heroContentRef.current
    if (!heroEl) return
    const onScroll = () => {
      heroEl.style.transform = `translateY(${window.scrollY * 0.22}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── IntersectionObserver for scroll reveals ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target
          if (el.classList.contains('reveal')) el.classList.add('visible')
          if (el.hasAttribute('data-cascade-parent')) {
            const delay = parseInt(el.getAttribute('data-cascade-delay') || '100', 10)
            el.querySelectorAll('[data-cascade]').forEach((child, i) => {
              setTimeout(() => child.classList.add('visible'), i * delay)
            })
          }
          observer.unobserve(el)
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal, [data-cascade-parent]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const words1 = ['A', 'browser', 'that', 'keeps']
  const words2 = ['the', 'web', 'clean.']

  return (
    <main className="bg-white text-[var(--dark)] overflow-x-hidden">
      <Nav />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="hero-bg relative px-6 pt-40 pb-28 text-center overflow-hidden">
        <div className="hero-noise" aria-hidden="true" />
        <div className="max-w-5xl mx-auto relative z-10" ref={heroContentRef}>

          <div className="flex justify-center mb-8">
            <Image
              src="/purus-logo.jpg"
              alt="Purus"
              width={260}
              height={87}
              className="object-contain"
              priority
            />
          </div>

          <h1 className="font-display text-5xl md:text-7xl text-[var(--dark)] leading-[1.08] tracking-tight mb-6 max-w-3xl mx-auto">
            {words1.map((word, i) => (
              <span key={i} className="hero-word">{word}&nbsp;</span>
            ))}
            <span className="italic text-[var(--blue)]">
              {words2.map((word, i) => (
                <span key={i} className="hero-word">
                  {word}{i < words2.length - 1 ? ' ' : ''}
                </span>
              ))}
            </span>
          </h1>

          <p className="hero-reveal text-lg md:text-xl text-[var(--gray)] max-w-xl mx-auto mb-10 leading-relaxed">
            Purus blocks explicit content, ads, and unsafe searches automatically.
            No setup. No account. No subscription.
          </p>

          <div id="download" className="hero-reveal flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="#"
              className="btn-spring inline-flex items-center gap-2.5 bg-[var(--dark)] text-white px-6 py-3.5 rounded-full font-medium text-sm hover:bg-gray-800"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download on the App Store
            </a>
            <a href="#how-it-works" className="text-sm text-[var(--gray)] hover:text-[var(--dark)] underline underline-offset-4">
              See how it works
            </a>
          </div>

          <p className="hero-reveal mt-8 text-xs text-[var(--gray)] tracking-wide">
            Free · iOS 16+ · No account required · On-device filtering
          </p>
        </div>
      </section>

      {/* ── divider ── */}
      <div className="max-w-5xl mx-auto px-6"><hr className="border-[var(--gray-mid)]" /></div>

      {/* ══════════════════════════════════════
          WHO IT'S FOR
      ══════════════════════════════════════ */}
      <Section className="py-24">
        <div className="text-center mb-14 reveal">
          <p className="text-xs font-semibold text-[var(--blue)] uppercase tracking-widest mb-3">Built for</p>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--dark)] leading-tight">
            Anyone who wants a safer default.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10" data-cascade-parent data-cascade-delay="100">
          <AudienceCard emoji="🛡️" title="Recovery" description="Meaningful friction for people working to stay free from pornography. Purus blocks the vast majority of explicit content before it ever appears." />
          <AudienceCard emoji="👨‍👩‍👧" title="Parents" description="Hand a child an iPhone with Purus knowing that virtually every explicit domain, ad, and unsafe search is blocked before it loads." />
          <AudienceCard emoji="🕊️" title="Faith communities" description="A browser aligned with values you already hold, without any extra configuration." />
          <AudienceCard emoji="🧘" title="Anyone" description="Sometimes you just want a browser that doesn't make the web feel dangerous." />
        </div>
      </Section>

      {/* ── divider ── */}
      <div className="max-w-5xl mx-auto px-6"><hr className="border-[var(--gray-mid)]" /></div>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <Section id="how-it-works" className="py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="reveal">
              <p className="text-xs font-semibold text-[var(--blue)] uppercase tracking-widest mb-3">Four layers</p>
              <h2 className="font-display text-4xl md:text-5xl text-[var(--dark)] leading-tight mb-8">
                Every page. Every search. Every time.
              </h2>
            </div>
            <div className="flex flex-col gap-7" data-cascade-parent data-cascade-delay="120">
              <LayerStep number="1" title="Block List" description="Every request is checked against thousands of known explicit domains and ad networks before anything loads." />
              <LayerStep number="2" title="DNS Filtering" description="All domain lookups route through AdGuard Family Protection, blocking 93.8% of explicit domains at the network level." />
              <LayerStep number="3" title="Keyword Filter" description="Every search query typed anywhere in the browser is scanned against 400+ blocked terms." />
              <LayerStep number="4" title="URL Inspector" description="Every navigation is checked for known bad domains, suspicious paths, and redirect chains." />
            </div>
          </div>

          <div
            className="reveal bg-[var(--gray-light)] rounded-3xl p-8 border border-[var(--gray-mid)]"
            data-cascade-parent
            data-cascade-delay="60"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--blue-light)] mb-4">
                <ShieldIcon className="w-8 h-8 text-[var(--blue)]" />
              </div>
              <p className="text-xs text-[var(--gray)] uppercase tracking-widest font-semibold">On-device. Always.</p>
            </div>
            <ul className="space-y-3.5 text-sm">
              {CHECK_ITEMS.map((item) => (
                <li key={item} data-cascade className="reveal flex items-start gap-2.5 text-[var(--gray)]">
                  <svg className="w-4 h-4 mt-0.5 text-[var(--blue)] flex-shrink-0" fill="none" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-[var(--gray)] text-center leading-relaxed">
              Designed to stop 99% of explicit content before it loads — automatically, on every request.
            </p>
          </div>
        </div>
      </Section>

      {/* ── divider ── */}
      <div className="max-w-5xl mx-auto px-6"><hr className="border-[var(--gray-mid)]" /></div>

      {/* ══════════════════════════════════════
          FEATURES
      ══════════════════════════════════════ */}
      <Section id="features" className="py-24">
        <div className="text-center mb-14 reveal">
          <p className="text-xs font-semibold text-[var(--blue)] uppercase tracking-widest mb-3">Features</p>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--dark)] leading-tight max-w-xl mx-auto">
            Built to stay out of your way.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5" data-cascade-parent data-cascade-delay="100">
          <FeatureCard
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 20 20"><rect x="2" y="3" width="16" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5" /><path d="M6 7h8M6 10h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>}
            title="Clean browser interface"
            description="Minimal, distraction-free design that gets out of the way and lets you browse."
          />
          <FeatureCard
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 20 20"><path d="M4 5h12M4 10h12M4 15h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>}
            title="Up to 10 persistent tabs"
            description="Safari-style tab switcher. Tabs stay open across app launches, just like you'd expect."
          />
          <FeatureCard
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16A8 8 0 0010 2z" stroke="currentColor" strokeWidth="1.5" /><path d="M6.5 10.5S8 12 10 12s3.5-1.5 3.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M7.5 7.5v.5M12.5 7.5v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>}
            title="One-time onboarding"
            description="Setup takes seconds. After that, you never see it again."
          />
          <FeatureCard
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M10 2v2M10 16v2M2 10h2M16 10h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>}
            title="Your choice of search engine"
            description="Use DuckDuckGo (private, default) or Google. Both have Safe Search permanently locked."
          />
          <FeatureCard
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 20 20"><path d="M10 2l2 6h6l-5 3.5 2 6L10 14l-5 3.5 2-6L2 8h6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>}
            title="False positive reporting"
            description="One tap to report a legitimate site that got blocked. We review and fix it."
          />
          <FeatureCard
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v1H3a1 1 0 00-1 1v6a1 1 0 001 1h14a1 1 0 001-1v-6a1 1 0 00-1-1h-1V8a6 6 0 00-6-6z" stroke="currentColor" strokeWidth="1.5" /></svg>}
            title="No account. No subscription."
            description="Free. No email, no credit card, no cloud account. Download and it works."
          />
        </div>
      </Section>

      {/* ── divider ── */}
      <div className="max-w-5xl mx-auto px-6"><hr className="border-[var(--gray-mid)]" /></div>

      {/* ══════════════════════════════════════
          ABOUT
      ══════════════════════════════════════ */}
      <Section id="about" className="py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="reveal">
            <p className="text-xs font-semibold text-[var(--blue)] uppercase tracking-widest mb-3">About Purus</p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--dark)] leading-tight mb-8">
              Built to do one thing well.
            </h2>
          </div>
          <div className="reveal">
            <p className="text-[var(--gray)] leading-relaxed mb-5">
              Purus started from a simple frustration: existing tools for filtering explicit content were either too complicated, too expensive, or too easy to work around. Parental control suites require accounts, subscriptions, and configuration. VPNs are overkill. Browser extensions are easy to disable.
            </p>
            <p className="text-[var(--gray)] leading-relaxed mb-5">
              We wanted something simpler. A browser that is just safe by default. No special mode to activate. No settings to configure correctly. You install it, go through a short onboarding, and from that point on you never encounter explicit content, intrusive ads, or unsafe search results.
            </p>
            <p className="text-[var(--gray)] leading-relaxed mb-10">
              Every filtering decision happens on your device. Nothing about what you search or browse is transmitted to Purus servers, because we don't have any. Purus is a native iOS app, and the filtering stack runs entirely in-app.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-[var(--gray)] bg-[var(--gray-light)] border border-[var(--gray-mid)] px-4 py-2.5 rounded-full">
              <ShieldIcon className="w-4 h-4 text-[var(--blue)]" />
              All filtering is on-device. Nothing leaves your phone.
            </div>
          </div>
        </div>
      </Section>

      {/* ── divider ── */}
      <div className="max-w-5xl mx-auto px-6"><hr className="border-[var(--gray-mid)]" /></div>

      {/* ══════════════════════════════════════
          COMING SOON
      ══════════════════════════════════════ */}
      <Section className="py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 bg-[var(--gray-light)] border border-[var(--gray-mid)] text-[var(--gray)] text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              Coming soon
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--dark)] leading-tight mb-6">
              On-screen content detection.
            </h2>
          </div>
          <div className="reveal">
            <p className="text-[var(--gray)] leading-relaxed mb-4">
              The next version of Purus will include a real-time visual filter that watches the screen itself. Instead of relying purely on domain and keyword lists, this model will analyze what is actually being rendered and block explicit imagery before it appears.
            </p>
            <p className="text-[var(--gray)] leading-relaxed">
              The model runs entirely on-device using Apple's Neural Engine, with no image data leaving the phone. It's designed to catch what block lists miss — embedded images, social feeds, cached content, and anything that arrives through a clean-looking URL.
            </p>
          </div>
        </div>
      </Section>

      {/* ── divider ── */}
      <div className="max-w-5xl mx-auto px-6"><hr className="border-[var(--gray-mid)]" /></div>

      {/* ══════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════ */}
      <Section className="py-24 text-center">
        <div className="reveal">
          <h2 className="font-display text-4xl md:text-6xl text-[var(--dark)] leading-tight mb-6 max-w-2xl mx-auto">
            The web, without the parts you don't want.
          </h2>
          <p className="text-[var(--gray)] mb-10 text-lg max-w-lg mx-auto">
            Four filtering layers, no setup, no subscription. Built to block virtually every encounter before it happens.
          </p>
          <a
            href="#"
            className="btn-spring inline-flex items-center gap-2.5 bg-[var(--blue)] text-white px-7 py-4 rounded-full font-medium text-sm hover:bg-[var(--blue-dark)]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Download on the App Store
          </a>
          <p className="mt-4 text-xs text-[var(--gray)]">Requires iOS 16 or later · iPhone</p>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          FOOTER  (#0F1F3D)
      ══════════════════════════════════════ */}
      <footer style={{ background: '#0F1F3D' }} className="px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <span className="font-bold text-white text-lg tracking-tight">Purus</span>
          </div>
          <div className="flex items-center gap-6 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <a href="mailto:nicholas.purus@gmail.com" className="hover:text-white">Contact</a>
          </div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            © {new Date().getFullYear()} Purus. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
