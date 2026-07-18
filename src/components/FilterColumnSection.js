'use client'
import { useEffect, useRef, useState } from 'react'

const LAYERS = [
  {
    name: 'Block List',
    desc: 'Every request is checked against thousands of known explicit domains and ad networks before anything loads.',
  },
  {
    name: 'DNS Filtering',
    desc: "All domain lookups route through AdGuard Family Protection, which blocks 93.8% of explicit domains at the network level according to AdGuard's own published data.",
  },
  {
    name: 'Keyword Filter',
    desc: 'Every search query typed anywhere in the browser is scanned against 507 blocked keyword patterns.',
  },
  {
    name: 'URL Inspector',
    desc: 'Every navigation is checked for known bad domains, suspicious paths, and redirect chains.',
  },
  {
    name: 'Cosmetic Filtering',
    desc: "CSS-level rules hide explicit images, banners, and embedded elements that pass the domain block list — so even a clean-looking URL can't surface unwanted content.",
  },
  {
    name: 'Safe Search Enforcement',
    desc: 'Safe Search is enforced at the URL level across Google, DuckDuckGo, Bing, Yahoo, and Startpage. Every other search engine is protected through DNS-level domain blocking and keyword filtering applied to every search query.',
  },
  {
    name: 'YouTube Restricted Mode',
    desc: 'Every YouTube request is rewritten to force Restricted Mode, filtering adult-flagged videos from all feeds, search results, and recommendations.',
  },
  {
    name: 'Platform-Specific Filtering',
    desc: 'Reddit is restricted to safe communities, Facebook search queries are filtered against the same keyword patterns used across all supported platforms, and Amazon search results exclude adult product categories before the page renders.',
  },
]

// Murky slate at layer 1 → brand blue at layer 8
const DOT_COLORS = [
  '#94a3b8',
  '#8b909a',
  '#6e7a85',
  '#4e7095',
  '#3361a8',
  '#1f5cc2',
  '#1a67de',
  '#1B6CF2',
]

const BAND_H = 40
const TRACK_H = BAND_H * 8  // 320px
const DOT_SIZE = 18
const TRACK_LEFT = 10

function lerpHex(a, b, t) {
  const h = (s) => parseInt(s, 16)
  const ar = h(a.slice(1, 3)), ag = h(a.slice(3, 5)), ab = h(a.slice(5, 7))
  const br = h(b.slice(1, 3)), bg = h(b.slice(3, 5)), bb = h(b.slice(5, 7))
  return `rgb(${Math.round(ar + (br - ar) * t)},${Math.round(ag + (bg - ag) * t)},${Math.round(ab + (bb - ab) * t)})`
}

export default function FilterColumnSection() {
  const sectionRef = useRef(null)
  const dotRef = useRef(null)
  const filledRef = useRef(null)
  const [activeLayer, setActiveLayer] = useState(0)
  const activeRef = useRef(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setActiveLayer(7)
      return
    }

    const isMobile = window.innerWidth < 768
    const pinDuration = Math.round(window.innerHeight * (isMobile ? 3.2 : 4))

    let cleanup = () => {}

    const raf = requestAnimationFrame(() => {
      Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
        ([{ default: gsap }, { ScrollTrigger }]) => {
          gsap.registerPlugin(ScrollTrigger)

          const dot = dotRef.current
          const filled = filledRef.current

          const st = ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            pin: true,
            end: '+=' + pinDuration,
            scrub: 0.6,
            onUpdate(self) {
              const p = self.progress

              if (dot) {
                dot.style.top = `${p * (TRACK_H - DOT_SIZE)}px`
              }

              if (filled) {
                filled.style.height = `${p * 100}%`
              }

              if (dot) {
                const ci = Math.min(6, Math.floor(p * 7))
                const ct = p * 7 - ci
                dot.style.backgroundColor = lerpHex(
                  DOT_COLORS[ci],
                  DOT_COLORS[Math.min(7, ci + 1)],
                  ct
                )
              }

              const newActive = Math.min(7, Math.floor(p * 8))
              if (newActive !== activeRef.current) {
                activeRef.current = newActive
                setActiveLayer(newActive)
              }
            },
          })

          cleanup = () => st.kill()
        }
      )
    })

    return () => {
      cancelAnimationFrame(raf)
      cleanup()
    }
  }, [])

  return (
    <div
      id="how-it-works"
      ref={sectionRef}
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'white',
      }}
    >
      <div className="max-w-5xl mx-auto w-full px-6">

        {/* Static heading */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>
            Eight layers
          </p>
          <h2 className="font-display" style={{ fontSize: 'clamp(30px, 4vw, 52px)', color: 'var(--dark)', lineHeight: 1.1 }}>
            Every page. Every search. Every time.
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-row gap-6 md:gap-16 items-start">

          {/* ── Left: filtration column ── */}
          <div className="flex-shrink-0">
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: 'var(--blue)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: 16,
              }}
            >
              Filtration Layers
            </p>

            <div style={{ position: 'relative', height: TRACK_H, width: 80 }}>
              {/* Background track */}
              <div
                style={{
                  position: 'absolute',
                  left: TRACK_LEFT,
                  top: 0,
                  width: 3,
                  height: '100%',
                  background: 'var(--gray-mid)',
                  borderRadius: 2,
                }}
              />

              {/* Filled (passed) track */}
              <div
                ref={filledRef}
                style={{
                  position: 'absolute',
                  left: TRACK_LEFT,
                  top: 0,
                  width: 3,
                  height: '0%',
                  background: 'var(--blue)',
                  borderRadius: 2,
                  zIndex: 1,
                }}
              />

              {/* Band labels */}
              {LAYERS.map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: i * BAND_H,
                    left: TRACK_LEFT + 3 + 10,
                    height: BAND_H,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      fontVariantNumeric: 'tabular-nums',
                      color: activeLayer >= i ? 'var(--blue)' : 'var(--gray)',
                      opacity: activeLayer > i ? 0.4 : 1,
                      transition: 'color 250ms, opacity 250ms',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}

              {/* Dot */}
              <div
                ref={dotRef}
                style={{
                  position: 'absolute',
                  left: TRACK_LEFT - DOT_SIZE / 2 + 1,
                  top: 0,
                  width: DOT_SIZE,
                  height: DOT_SIZE,
                  borderRadius: '50%',
                  backgroundColor: DOT_COLORS[0],
                  border: '2.5px solid white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                  zIndex: 2,
                }}
              />
            </div>
          </div>

          {/* ── Right: current layer info + summary card ── */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'var(--blue)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginBottom: 12,
                }}
              >
                Layer {String(activeLayer + 1).padStart(2, '0')}
              </p>

              <h3
                key={`name-${activeLayer}`}
                className="font-display filter-layer-in"
                style={{
                  fontSize: 'clamp(26px, 3.5vw, 40px)',
                  color: 'var(--dark)',
                  lineHeight: 1.1,
                  marginBottom: 14,
                }}
              >
                {LAYERS[activeLayer].name}
              </h3>
              <p
                key={`desc-${activeLayer}`}
                className="filter-layer-in"
                style={{
                  fontSize: 16,
                  color: 'var(--gray)',
                  lineHeight: 1.7,
                  maxWidth: 440,
                }}
              >
                {LAYERS[activeLayer].desc}
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
