'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`purus-nav fixed top-0 left-0 right-0 z-50 ${
        scrolled
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

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/#how-it-works" className="text-sm text-[var(--gray)] hover:text-[var(--dark)]">
            How it works
          </a>
          <a href="/#features" className="text-sm text-[var(--gray)] hover:text-[var(--dark)]">
            Features
          </a>
          <a href="/#about" className="text-sm text-[var(--gray)] hover:text-[var(--dark)]">
            About
          </a>
        </div>

        {/* CTA */}
        <a
          href="#download"
          className="btn-spring text-sm font-medium bg-[var(--blue)] text-white px-4 py-2 rounded-full hover:bg-[var(--blue-dark)]"
        >
          Download Free
        </a>
      </div>
    </nav>
  )
}
