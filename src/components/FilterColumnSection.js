'use client'
import { useEffect, useRef, useState } from 'react'

const LAYERS = [
  {
    name: 'Block List',
    desc: 'Every request is checked against thousands of known explicit domains and ad networks before anything loads.',
  },
  {
    name: 'DNS Filtering',
    desc: 'All domain lookups route through AdGuard Family Protection, blocking the large majority of explicit domains at the network level.',
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
    desc: 'CSS-level rules hide explicit images and embedded elements that pass the domain block list.',
  },
  {
    name: 'Safe Search Enforcement',
    desc: 'Safe Search is enforced at the URL level across every major engine, every time.',
  },
  {
    name: 'YouTube Restricted Mode',
    desc: 'Every YouTube request is rewritten to force Restricted Mode across feeds and search.',
  },
  {
    name: 'Platform-Specific Filtering',
    desc: 'Reddit, Facebook, and Amazon each get filtering rules tuned to how content surfaces on that platform.',
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
  /*
    We use GSAP's pin:true (position:fixed) instead of CSS position:sticky.

    The parent <main> has overflow-x:hidden, which per CSS spec promotes
    overflow-y from visible→auto, making <main> the scroll container.
    position:sticky is constrained to its scroll container — but <main> never
    actually scrolls (the window does), so sticky degrades to position:relative
    and the panel scrolls straight past the user.

    position:fixed (what GSAP pin uses) is always relative to the viewport
    initial containing block and is unaffected by any ancestor overflow value.
  */
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

    /*
      pinDuration = how many pixels the user scrolls while the panel is pinned.
      Total page space = section height (100vh) + pinDuration, because GSAP's
      pin inserts a spacer of exactly that total size.
      Desktop: 4× viewport = 400vh total scroll (~50vh per layer).
      Mobile:  3.2× viewport = 320vh total scroll (~40vh per layer).
    */
    const isMobile = window.innerWidth < 768
    const pinDuration = Math.round(window.innerHeight * (isMobile ? 3.2 : 4))

    let cleanup = () => {}

    const raf = requestAnimationFrame(() => {
      Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
        ([{ default: gsap }, { ScrollTrigger }]) => {
          gsap.registerPlugin(ScrollTrigger)

          const dot = dotRef.current
          const filled = filledRef.current

          console.log(
            '[FilterColumn] pinDuration:', pinDuration + 'px',
            '| vh:', window.innerHeight + 'px',
            '| isMobile:', isMobile
          )

          const st = ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            /*
              pin:true tells GSAP to hold `section` fixed in the viewport
              (via position:fixed) while the user scrolls `pinDuration` pixels.
              GSAP inserts a spacer div to preserve page flow during the pin.
              This bypasses the overflow-x:hidden scroll-container issue entirely.
            */
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
    /*
      Single 100vh div — GSAP takes this element, pins it (position:fixed),
      and inserts a spacer of (100vh + pinDuration) in its place to preserve
      the page scroll height. No outer wrapper with explicit height needed.
    */
    <div
      ref={sectionRef}
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'white',
      }}
    >
      <div className="max-w-5xl mx-auto w-full px-6">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-start md:items-center">

          {/* ── Left: filtration column ── */}
          <div className="flex-shrink-0">
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: 'var(--blue)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: 20,
              }}
            >
              Filtration Layers
            </p>

            {/* Track container */}
            <div style={{ position: 'relative', height: TRACK_H, width: 120 }}>
              {/* Background track (gray) */}
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

              {/* Filled (passed) track — grows downward as dot moves */}
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

              {/* The dot — moved via direct DOM manipulation each scroll frame */}
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

          {/* ── Right: current layer info ── */}
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: 'var(--blue)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: 14,
              }}
            >
              Layer {String(activeLayer + 1).padStart(2, '0')}
            </p>

            {/* key= forces DOM replacement on layer change, triggering the CSS animation */}
            <h3
              key={`name-${activeLayer}`}
              className="font-display filter-layer-in"
              style={{
                fontSize: 'clamp(30px, 4.5vw, 48px)',
                color: 'var(--dark)',
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              {LAYERS[activeLayer].name}
            </h3>
            <p
              key={`desc-${activeLayer}`}
              className="filter-layer-in"
              style={{
                fontSize: 18,
                color: 'var(--gray)',
                lineHeight: 1.75,
                maxWidth: 460,
              }}
            >
              {LAYERS[activeLayer].desc}
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
