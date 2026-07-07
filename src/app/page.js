'use client'
import Nav from '@/components/Nav'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AppCarousel from '@/components/AppCarousel'
import FactSheet from '@/components/FactSheet'

/* ─── FAQ accordion item ─── */
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

// REVIEW BEFORE LAUNCH: The '99%+' figure below is an unverified marketing claim.
// WKContentRuleList and AdGuard DNS blocking rates cannot be measured from inside the app.
// Confirm with product/legal whether this is substantiated before shipping.
const STATS = [
  { value: '8',     label: 'Simultaneous filtering layers',      sub: 'Most competitors don\'t run more than 2-3' },
  { value: '507',   label: 'Keyword patterns blocked',           sub: 'Across every major search engine' },
  { value: '60s',   label: 'From download to browsing clean',    sub: 'A minute or two to set up. No account needed.' },
]

const CHECK_ITEMS = [
  'Safe Search locked on Google by default.',
  'Safe Search enforced on DuckDuckGo',
  'YouTube Restricted Mode always on',
  '507 blocked keyword patterns',
  'No browsing data leaves your phone',
  'No account, no cloud sync, no tracking',
]

export default function Home() {
  /* ── Hero: render instantly on mobile, animate on desktop ── */
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      document.querySelectorAll('.hero-word, .hero-reveal').forEach((el) => {
        el.classList.add('visible')
      })
    } else {
      document.querySelectorAll('.hero-word').forEach((word, i) => {
        setTimeout(() => word.classList.add('visible'), 100 + i * 80)
      })
      document.querySelectorAll('.hero-reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 680 + i * 110)
      })
    }
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
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
        <div className="max-w-5xl mx-auto relative z-10">

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
            Minimal setup. No account. No subscription.
          </p>

          <div id="download" className="hero-reveal flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="#"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <img
                src="/app-store-badge.svg"
                alt="Download on the App Store"
                style={{ height: '44px', width: 'auto' }}
              />
            </a>
            <a href="#how-it-works" className="text-sm text-[var(--gray)] hover:text-[var(--dark)] underline underline-offset-4">
              See how it works
            </a>
          </div>

          <p className="hero-reveal mt-8 text-xs text-[var(--gray)] tracking-wide">
            iOS 16+ · No account required · On-device filtering
          </p>
          <p className="hero-reveal mt-3 text-xs text-[var(--gray)] max-w-sm mx-auto leading-relaxed" style={{ opacity: 0.7 }}>
            Purus significantly reduces exposure to explicit content but cannot guarantee complete filtering of all online content.
          </p>
        </div>
      </section>


      {/* ══════════════════════════════════════
          STAT CARDS  (below hero)
      ══════════════════════════════════════ */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          <div className="text-center flex flex-col items-center gap-3 reveal">
            <p className="text-xs font-semibold text-[var(--blue)] uppercase tracking-widest">Built Different</p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--dark)] leading-tight max-w-2xl">
              One of the Most Comprehensive Content Filters Available*
            </h2>
            <p className="text-[var(--gray)] max-w-lg leading-relaxed">
              Purus stacks eight independent layers of protection — from DNS to keyword to
              cookie enforcement — so nothing slips through.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5" data-cascade-parent data-cascade-delay="100">
            {STATS.map((s) => (
              <div
                key={s.value}
                data-cascade
                className="card-reveal bg-white border border-[var(--gray-mid)] rounded-2xl p-8 flex flex-col gap-2 hover:shadow-md"
                style={{ transition: 'box-shadow 200ms ease, opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)' }}
              >
                <p className="font-display leading-none" style={{ fontSize: 'clamp(40px, 6vw, 56px)', color: 'var(--blue)' }}>
                  {s.value}
                </p>
                <p className="font-semibold text-[var(--dark)] text-base leading-snug">{s.label}</p>
                <p className="text-sm text-[var(--gray)] leading-relaxed">{s.sub}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '11px', color: 'var(--gray)', marginTop: '4px' }}>
            * Based on number of simultaneous filtering layers compared to publicly available consumer browser filters.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FACT SHEET
      ══════════════════════════════════════ */}
      <FactSheet />

      {/* ── divider ── */}
      <div className="max-w-5xl mx-auto px-6"><hr className="border-[var(--gray-mid)]" /></div>

      {/* ══════════════════════════════════════
          SOCIAL MEDIA
      ══════════════════════════════════════ */}
      <Section className="py-24">
        <div className="text-center mb-14 reveal">
          <p className="text-xs font-semibold text-[var(--blue)] uppercase tracking-widest mb-3">Platform Coverage</p>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--dark)] leading-tight">
            Social Media, Done Right
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6" data-cascade-parent data-cascade-delay="80">
          {/* Supported platforms */}
          <div
            data-cascade
            className="card-reveal bg-white border border-[var(--gray-mid)] rounded-2xl p-8 hover:shadow-md"
            style={{ transition: 'box-shadow 200ms ease, opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)' }}
          >
            <p className="text-xs font-semibold text-[var(--blue)] uppercase tracking-widest mb-6">Active filtering</p>
            <div className="flex flex-col gap-6">
              {[
                {
                  name: 'YouTube',
                  detail: 'Restricted Mode enforced, safe search locked, explicit searches blocked',
                  icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
                },
                {
                  name: 'Facebook',
                  detail: 'Explicit searches blocked',
                  icon: 'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z',
                },
                {
                  name: 'Reddit',
                  detail: 'Safe search enforced, NSFW communities blocked',
                  icon: 'M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm4.388 3.199c1.104 0 1.999.895 1.999 1.999 0 1.105-.895 2-1.999 2-.946 0-1.739-.657-1.947-1.539v.002c-1.147.162-2.032 1.15-2.032 2.341v.007c1.776.067 3.4.567 4.686 1.363.473-.363 1.064-.58 1.707-.58 1.547 0 2.802 1.254 2.802 2.802 0 1.117-.655 2.081-1.601 2.531-.088 3.256-3.637 5.876-7.997 5.876-4.361 0-7.905-2.617-7.998-5.87-.954-.447-1.614-1.415-1.614-2.538 0-1.548 1.255-2.802 2.803-2.802.645 0 1.239.218 1.712.585 1.275-.79 2.881-1.291 4.64-1.365v-.01c0-1.663 1.263-3.034 2.88-3.207.188-.911.993-1.595 1.959-1.595Zm-8.085 8.376c-.784 0-1.459.78-1.506 1.797-.047 1.016.64 1.429 1.426 1.429.786 0 1.371-.369 1.418-1.385.047-1.017-.553-1.841-1.338-1.841Zm7.406 0c-.786 0-1.385.824-1.338 1.841.047 1.017.634 1.385 1.418 1.385.785 0 1.473-.413 1.426-1.429-.046-1.017-.721-1.797-1.506-1.797Zm-3.703 4.013c-.974 0-1.907.048-2.77.135-.147.015-.241.168-.183.305.483 1.154 1.622 1.964 2.953 1.964 1.33 0 2.47-.81 2.953-1.964.057-.137-.037-.29-.184-.305-.863-.087-1.795-.135-2.769-.135Z',
                },
              ].map(({ name, detail, icon }) => (
                <div key={name} className="flex items-start gap-3">
                  <svg className="flex-shrink-0 text-[var(--blue)]" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginTop: '1px' }}>
                    <path d={icon} />
                  </svg>
                  <div>
                    <p className="font-semibold text-sm text-[var(--dark)]">{name}</p>
                    <p className="text-sm text-[var(--gray)] leading-relaxed mt-0.5">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Blocked platforms */}
          <div
            data-cascade
            className="card-reveal bg-[var(--gray-light)] border border-[var(--gray-mid)] rounded-2xl p-8"
            style={{ transition: 'box-shadow 200ms ease, opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)' }}
          >
            <p className="text-xs font-semibold text-[var(--gray)] uppercase tracking-widest mb-6">Blocked entirely</p>
            <div className="flex flex-col gap-4 mb-6">
              {[
                { name: 'TikTok',    icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
                { name: 'X',         icon: 'M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z' },
                { name: 'Snapchat',  icon: 'M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z' },
                { name: 'Pinterest', icon: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z' },
                { name: 'Tumblr',    icon: 'M14.563 24c-5.093 0-7.031-3.756-7.031-6.411V9.747H5.116V6.648c3.63-1.313 4.512-4.596 4.71-6.469C9.84.051 9.941 0 9.999 0h3.517v6.114h4.801v3.633h-4.82v7.47c.016 1.001.375 2.371 2.207 2.371h.09c.631-.02 1.486-.205 1.936-.419l1.156 3.425c-.436.636-2.4 1.374-4.156 1.404h-.178l.011.002z' },
                { name: 'Instagram', icon: 'M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077' },
              ].map(({ name, icon }) => (
                <div key={name} className="flex items-center gap-3">
                  <svg className="flex-shrink-0 text-[var(--gray)]" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={icon} />
                  </svg>
                  <p className="text-sm font-medium text-[var(--dark)]">{name}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-[var(--gray)] leading-relaxed">
              Users who navigate to these platforms will see a Purus block page explaining why.
            </p>
          </div>
        </div>

        <p className="text-sm text-[var(--gray)] text-center mt-10 max-w-2xl mx-auto leading-relaxed reveal">
          Keyword search filtering applies to all supported platforms — the same 507 patterns that catch explicit searches on Google also apply to Facebook, YouTube, and Reddit.
        </p>
      </Section>

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
          APP CAROUSEL
      ══════════════════════════════════════ */}
      <Section className="py-24">
        <div className="text-center mb-14 reveal">
          <p className="text-xs font-semibold text-[var(--blue)] uppercase tracking-widest mb-3">See it in action</p>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--dark)] leading-tight">
            Simple by design.
          </h2>
        </div>
        <AppCarousel />
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
              <p className="text-xs font-semibold text-[var(--blue)] uppercase tracking-widest mb-3">Eight layers</p>
              <h2 className="font-display text-4xl md:text-5xl text-[var(--dark)] leading-tight mb-8">
                Every page. Every search. Every time.
              </h2>
            </div>
            <div className="flex flex-col gap-7" data-cascade-parent data-cascade-delay="120">
              <LayerStep number="1" title="Block List" description="Every request is checked against thousands of known explicit domains and ad networks before anything loads." />
              {/* REVIEW BEFORE LAUNCH: The 93.8% figure below comes from AdGuard's published stats
                  and cannot be independently verified from inside the app. Confirm with product/legal
                  whether citing a third-party's claim here is appropriate before shipping. */}
              <LayerStep number="2" title="DNS Filtering" description="All domain lookups route through AdGuard Family Protection, blocking 93.8% of explicit domains at the network level." />
              <LayerStep number="3" title="Keyword Filter" description="Every search query typed anywhere in the browser is scanned against 507 blocked keyword patterns." />
              <LayerStep number="4" title="URL Inspector" description="Every navigation is checked for known bad domains, suspicious paths, and redirect chains." />
              <LayerStep number="5" title="Cosmetic Filtering" description="CSS-level rules hide explicit images, banners, and embedded elements that pass the domain block list — so even a clean-looking URL can't surface unwanted content." />
              <LayerStep number="6" title="Safe Search Enforcement" description="Safe Search is locked at the URL level across Google, DuckDuckGo, Bing, Yahoo, and every other supported engine — users cannot toggle it off." />
              <LayerStep number="7" title="YouTube Restricted Mode" description="Every YouTube request is rewritten to force Restricted Mode, filtering adult-flagged videos from all feeds, search results, and recommendations." />
              <LayerStep number="8" title="Platform-Specific Filtering" description="Reddit is restricted to safe communities, Facebook search queries are filtered against the same keyword patterns used across all supported platforms, and Amazon search results exclude adult product categories before the page renders." />
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
            {/* REVIEW BEFORE LAUNCH: Same unverified 99% claim as in STATS — needs product/legal sign-off. */}
            <p className="mt-5 text-xs text-[var(--gray)] text-center leading-relaxed">
              Built to stop the vast majority of explicit content before it loads — automatically, on every request.
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
            title="Up to 16 persistent tabs"
            description="Safari-style tab switcher. Tabs stay open across app launches, just like you'd expect."
          />
          <FeatureCard
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16A8 8 0 0010 2z" stroke="currentColor" strokeWidth="1.5" /><path d="M6.5 10.5S8 12 10 12s3.5-1.5 3.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M7.5 7.5v.5M12.5 7.5v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>}
            title="One-time onboarding"
            description="Setup takes a minute or two. After that, it's out of your way."
          />
          <FeatureCard
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M10 2v2M10 16v2M2 10h2M16 10h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>}
            title="Your choice of search engine"
            description="Use DuckDuckGo (private, default) or Google. Both have Safe Search permanently locked."
          />
          {/* REVIEW BEFORE LAUNCH: Verify whether false positive reporting is a native
              in-app flow (a tap on the blocked-page screen) or still routes to a Google Form.
              Copy must match the actual UX — update this description before shipping. */}
          <FeatureCard
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 20 20"><path d="M10 2l2 6h6l-5 3.5 2 6L10 14l-5 3.5 2-6L2 8h6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>}
            title="False positive reporting"
            description="One tap to report a legitimate site that got blocked. We review every report and update our filters accordingly."
          />
          <FeatureCard
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v1H3a1 1 0 00-1 1v6a1 1 0 001 1h14a1 1 0 001-1v-6a1 1 0 00-1-1h-1V8a6 6 0 00-6-6z" stroke="currentColor" strokeWidth="1.5" /></svg>}
            title="No account. No subscription."
            description="No email, no cloud account. Download and it works."
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
              Purus started from a simple frustration: existing tools for filtering explicit content were either too complicated, too expensive, or too easy to work around. Parental control suites require accounts, subscriptions, and ongoing configuration. VPNs are overkill. Browser extensions are easy to disable.
            </p>
            <p className="text-[var(--gray)] leading-relaxed mb-5">
              We wanted something simpler. A browser that's safe from the moment you set it up. Onboarding takes a minute or two — including one quick step in iOS Settings to activate protection at the network level — and after that, Purus works automatically in the background every time you browse.
            </p>
            <p className="text-[var(--gray)] leading-relaxed mb-5">
              Every filtering decision happens on your device. Nothing about what you search or browse is transmitted to Purus servers, because we don't have any. Purus is a native iOS app, and the filtering stack runs entirely in-app.
            </p>
            <p className="text-[var(--gray)] leading-relaxed mb-10">
              No filter is perfect, and Purus doesn't claim to catch everything. What it does is stack eight independent layers of protection so that the vast majority of explicit content, intrusive ads, and unsafe searches are blocked automatically, without you having to think about it.
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
          FAQ
      ══════════════════════════════════════ */}
      <Section className="py-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-[var(--blue)] uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--dark)] leading-tight">
              Questions.
            </h2>
          </div>
          <div>
            <FAQItem
              question="Will Purus slow down my browsing?"
              answer="Most of Purus's filtering happens instantly on your device, with no delay. The one exception is DNS-level filtering, which checks domains through an encrypted connection — this can add a small delay the first time you visit a new site, similar to a VPN, though it speeds up quickly as your device caches results. Overall, most users don't notice a meaningful difference in everyday browsing."
            />
            <FAQItem
              question="What if a legitimate site gets blocked?"
              answer="It happens occasionally. Tap 'Report it' on the blocked page and we review it quickly. False positive reports go directly to our block list team and the site is usually cleared in the next filter update."
            />
            <FAQItem
              question="Can my child turn off the filtering?"
              answer="No. The filtering layers are built into the browser at a level that cannot be toggled off by the user. Safe search, DNS filtering, and the keyword scanner are always on. The only way to disable filtering is to delete the app."
            />
            <FAQItem
              question="Does Purus require a subscription?"
              answer="No subscription — Purus is a one-time download with no account required. Eight filtering layers, safe search locked, and ad blocking all included. We're building a parent dashboard with additional controls and reporting for families who want more visibility. That will be a separate tier when it launches."
            />
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
            Eight filtering layers, no setup, no subscription. Built to block virtually every encounter before it happens.
          </p>
          <a
            href="#"
            className="inline-block hover:opacity-80 transition-opacity"
          >
            <img
              src="/app-store-badge.svg"
              alt="Download on the App Store"
              style={{ height: '44px', width: 'auto' }}
            />
          </a>
          <p className="mt-4 text-xs text-[var(--gray)]">Requires iOS 16 or later · iPhone</p>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          FOOTER  (#0F1F3D)
      ══════════════════════════════════════ */}
      <footer className="px-6 py-10" style={{ background: 'var(--gray-light)', borderTop: '1px solid var(--gray-mid)' }}>
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-4 text-center">
          <span className="font-bold text-lg tracking-tight" style={{ color: '#2B5BA8' }}>Purus</span>
          <div className="flex items-center gap-2 text-sm text-[var(--gray)]">
            <Link href="/privacy" className="hover:text-[var(--dark)]">Privacy Policy</Link>
            <span aria-hidden="true">|</span>
            <Link href="/terms" className="hover:text-[var(--dark)]">Terms of Service</Link>
            <span aria-hidden="true">|</span>
            <Link href="/support" className="hover:text-[var(--dark)]">Support</Link>
            <span aria-hidden="true">|</span>
            <a href="mailto:nicholas.purus@gmail.com" className="hover:text-[var(--dark)]">Contact</a>
          </div>
          <p className="text-xs text-[var(--gray)]">
            © 2026 Purus. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
