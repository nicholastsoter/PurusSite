'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#features', label: 'Features' },
  { href: '/#about', label: 'About' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`purus-nav fixed top-0 left-0 right-0 z-50 ${
        scrolled || open
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm'
          : 'bg-white'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/purus-logo.jpg"
            alt="Purus"
            width={88}
            height={30}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} className="text-sm text-[var(--gray)] hover:text-[var(--dark)]">
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* CTA */}
          <a
            href="#download"
            className="btn-spring text-sm font-medium bg-[var(--blue)] text-white px-4 py-2 rounded-full hover:bg-[var(--blue-dark)]"
          >
            Download Free
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span
              className="block w-5 h-0.5 bg-gray-700 transition-all duration-200 origin-center"
              style={open ? { transform: 'translateY(4px) rotate(45deg)' } : {}}
            />
            <span
              className="block w-5 h-0.5 bg-gray-700 transition-all duration-200"
              style={open ? { opacity: 0 } : {}}
            />
            <span
              className="block w-5 h-0.5 bg-gray-700 transition-all duration-200 origin-center"
              style={open ? { transform: 'translateY(-4px) rotate(-45deg)' } : {}}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? '200px' : '0px' }}
      >
        <div className="bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-[var(--gray)] hover:text-[var(--dark)] py-1"
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
