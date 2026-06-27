'use client'
import { useState, useEffect, useCallback } from 'react'

const slides = [
  {
    src: '/screenshot-1.png',
    caption: 'Stops it before it loads.',
  },
  {
    src: '/screenshot-2.png',
    caption: 'Set as your default.',
  },
  {
    src: '/screenshot-3.png',
    caption: 'Optional Safari restriction.',
  },
  {
    src: '/screenshot-4.png',
    caption: 'Safe search, always strict.',
  },
  {
    src: '/screenshot-5.png',
    caption: "You're all set.",
  },
]

export default function AppCarousel() {
  const [current, setCurrent] = useState(0)

  const goTo = useCallback(
    (index) => {
      if (index === current) return
      setCurrent(index)
    },
    [current]
  )

  const prev = () => goTo((current - 1 + slides.length) % slides.length)
  const next = () => goTo((current + 1) % slides.length)

  // Auto-advance every 3.5s
  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [current, goTo])

  return (
    <div className="flex flex-col items-center">
      {/* Phone frame + image */}
      <div className="relative flex items-center gap-6 md:gap-10">

        {/* Prev arrow */}
        <button
          onClick={prev}
          className="hidden md:flex w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm items-center justify-center hover:shadow-md transition-shadow text-gray-400 hover:text-gray-700"
          aria-label="Previous"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Phone mockup */}
        <div className="relative" style={{ width: '220px' }}>
          {/* Phone shell */}
          <div
            className="relative rounded-[2.8rem] overflow-hidden shadow-2xl border-[6px] border-gray-900 bg-white"
            style={{ width: '220px', height: '476px' }}
          >
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-2xl z-10" />

            {/* Screenshots — crossfade */}
            <div className="relative w-full h-full">
              {slides.map((slide, i) => (
                <img
                  key={slide.src}
                  src={slide.src}
                  alt={slide.caption}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    opacity: i === current ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    willChange: 'opacity',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Side button details */}
          <div className="absolute -right-[8px] top-16 w-[4px] h-10 bg-gray-800 rounded-r-sm" />
          <div className="absolute -left-[8px] top-14 w-[4px] h-7 bg-gray-800 rounded-l-sm" />
          <div className="absolute -left-[8px] top-24 w-[4px] h-7 bg-gray-800 rounded-l-sm" />
        </div>

        {/* Next arrow */}
        <button
          onClick={next}
          className="hidden md:flex w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm items-center justify-center hover:shadow-md transition-shadow text-gray-400 hover:text-gray-700"
          aria-label="Next"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Caption */}
      <p className="mt-6 text-sm font-medium text-[var(--blue)] tracking-wide">
        {slides[current].caption}
      </p>

      {/* Dot indicators */}
      <div className="flex items-center gap-2 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? '20px' : '6px',
              height: '6px',
              background: i === current ? 'var(--blue)' : 'var(--gray-mid)',
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Mobile swipe arrows */}
      <div className="flex gap-4 mt-4 md:hidden">
        <button
          onClick={prev}
          className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={next}
          className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
