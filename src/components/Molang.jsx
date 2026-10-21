import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { JUNE } from '../data/june.js'
import { H } from '../timeline.js'
import { Cat, Koala } from './Characters.jsx'
import MediaFrame from './Media.jsx'

const SAND = '#f3dfb9'
const INK = '#5a4630'
const SCRIPT = "font-['Dancing_Script',cursive]"
const DOTS = { backgroundColor: SAND, backgroundImage: 'radial-gradient(#e3c896 1px, transparent 1px)', backgroundSize: '14px 14px' }
const WAVE = 'M0 28Q30 8 60 28T120 28T180 28T240 28T300 28T360 28T420 28T480 28T540 28T600 28T660 28T720 28V56H0Z'
const FADE = 'linear-gradient(to bottom, transparent 0, #000 70px, #000 calc(100% - 70px), transparent 100%)'
const FADE_TOP = 'linear-gradient(to bottom, transparent 0, #000 70px)'
const fadeStyle = { WebkitMaskImage: FADE, maskImage: FADE }

// satu lapis ombak yang bergulir terus (mulus karena periodenya bulat)
function Band({ color, op = 1, dur, bottom, h = 56, delay = 0 }) {
  return (
    <motion.svg
      viewBox="0 0 720 56"
      preserveAspectRatio="none"
      className="pointer-events-none absolute left-0 w-[200%]"
      style={{ bottom, height: h, opacity: op }}
      animate={{ x: ['0%', '-50%'] }}
      transition={{ duration: dur, repeat: Infinity, ease: 'linear', delay }}
      aria-hidden="true"
    >
      <path d={WAVE} fill={color} />
    </motion.svg>
  )
}

/* ================= 1. LAUT ================= */
const GULLS = [{ t: '10%', l: '14%', d: 0 }, { t: '18%', l: '36%', d: 1.4 }, { t: '8%', l: '60%', d: 2.6 }]
const SPARKS = [[12, 58], [26, 70], [44, 62], [60, 74], [76, 60], [88, 68], [34, 80], [70, 84]]

function Boat({ c }) {
  return (
    <motion.svg width="64" height="54" viewBox="0 0 64 54" animate={{ y: [0, -4, 0], rotate: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true">
      <path d="M32 2V30" stroke="#6b4a34" strokeWidth="2" />
      <path d="M33 4L52 28H33Z" fill={c} />
      <path d="M31 8L14 28H31Z" fill="#fff" opacity=".9" />
      <path d="M8 32H56L48 46H16Z" fill="#8a5a3a" />
      <path d="M32 2L40 5L32 8Z" fill="#ff6f9c" />
    </motion.svg>
  )
}

export function MolangSea() {
  const D = JUNE.beach
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const boatX = useTransform(p, [0, 1], [-30, 60])
  const cloudX = useTransform(p, [0, 1], [0, -90])
  const sunY = useTransform(p, [0, 1], [30, -40])
  const [splashes, setSplashes] = useState([])
  const id = useRef(0)

  const splash = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const k = id.current++
    setSplashes((s) => [...s, { k, x, y, word: D.splash[k % D.splash.length], fish: k % 4 === 3 }])
    setTimeout(() => setSplashes((s) => s.filter((v) => v.k !== k)), 1600)
    navigator.vibrate?.(10)
  }

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight: `${H['jun-laut']}svh`, background: 'linear-gradient(180deg,#ffd9c4 0%,#ffcdb2 24%,#a6dbe8 44%,#4fb3c9 100%)', ...fadeStyle }}
    >
      <motion.div className="pointer-events-none absolute left-[56%] h-24 w-24 rounded-full" style={{ top: '24%', y: sunY, background: 'radial-gradient(circle,#fff6d8 35%,rgba(255,190,140,0) 72%)' }} />
      <motion.div className="pointer-events-none absolute -left-10 top-[16%] h-9 w-36 rounded-full bg-white/70 blur-md" style={{ x: cloudX }} />
      <motion.div className="pointer-events-none absolute right-[8%] top-[24%] h-7 w-24 rounded-full bg-white/60 blur-md" style={{ x: cloudX }} />
      {GULLS.map((g) => (
        <motion.svg key={g.l} width="26" height="12" viewBox="0 0 26 12" className="pointer-events-none absolute" style={{ top: g.t, left: g.l }} animate={{ x: [0, 60, 0], y: [0, -6, 0] }} transition={{ duration: 9 + g.d * 2, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true">
          <path d="M1 8Q7 0 13 7Q19 0 25 8" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </motion.svg>
      ))}
      <motion.div className="pointer-events-none absolute left-[10%]" style={{ top: '37%', x: boatX }}><Boat c="#ffe3ee" /></motion.div>
      <motion.div className="pointer-events-none absolute left-[62%]" style={{ top: '39.5%', x: boatX }}><Boat c="#c9b2ff" /></motion.div>

      <div className="pointer-events-none relative z-[2] px-4 pt-[10svh] text-center">
        <h2 className="font-display text-[clamp(2.4rem,11vw,3.4rem)] font-extrabold leading-none" style={{ color: '#5a2d4a' }}>{D.title}</h2>
        <p className={`mt-1 text-2xl ${SCRIPT}`} style={{ color: '#7a4560' }}>{D.subtitle}</p>
        <p className="text-sm" style={{ color: '#7a4560' }}>{D.date}</p>
      </div>

      {SPARKS.map(([x, y], i) => (
        <motion.span key={i} className="pointer-events-none absolute h-0.5 w-3 rounded bg-white" style={{ left: `${x}%`, top: `${y}%` }} animate={{ opacity: [0, 0.9, 0] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.35 }} />
      ))}

      <Band color="#7fd0dc" op={0.75} dur={12} bottom={90} />
      <Band color="#a9e3ea" op={0.85} dur={9} bottom={66} delay={-3} />
      <Band color="#ffffff" op={0.92} dur={7} bottom={44} delay={-2} />
      <Band color={SAND} dur={10} bottom={20} delay={-5} />
      <div className="absolute inset-x-0 bottom-0 h-[36px]" style={DOTS} />

      {/* ketuk laut: cipratan dan ikan melompat */}
      <div className="absolute inset-x-0 z-10" style={{ top: '44%', bottom: 110, touchAction: 'pan-y' }} onClick={splash}>
        {splashes.map((s) => (
          <div key={s.k} className="pointer-events-none absolute" style={{ left: s.x, top: s.y }}>
            {[0, 1].map((r) => (
              <motion.span key={r} className="absolute -ml-6 -mt-2 h-4 w-12 rounded-full border-2 border-white/85" initial={{ scale: 0.3, opacity: 0.9 }} animate={{ scale: [0.3, 2.4], opacity: [0.9, 0] }} transition={{ duration: 0.9, delay: r * 0.18 }} />
            ))}
            <motion.span className="absolute -ml-8 w-16 text-center text-sm font-bold text-white" initial={{ y: 0, opacity: 1 }} animate={{ y: -58, opacity: 0 }} transition={{ duration: 1.2 }}>{s.word}</motion.span>
            {s.fish && (
              <motion.svg width="30" height="16" viewBox="0 0 30 16" className="absolute" initial={{ x: 0, y: 0, rotate: -40, opacity: 1 }} animate={{ x: [0, 22, 44], y: [0, -64, 0], rotate: [-40, 0, 40], opacity: [1, 1, 0] }} transition={{ duration: 0.95, ease: 'easeOut' }} aria-hidden="true">
                <ellipse cx="12" cy="8" rx="11" ry="6" fill="#ff9f6b" />
                <path d="M22 8L30 2V14Z" fill="#ff9f6b" />
                <circle cx="7" cy="6" r="1.4" fill="#2a1f45" />
              </motion.svg>
            )}
          </div>
        ))}
      </div>
      <p className="pointer-events-none absolute inset-x-0 z-[11] text-center text-sm font-semibold text-white" style={{ bottom: 70, textShadow: '0 1px 6px rgba(0,0,0,.35)' }}>{D.hintSea}</p>
      <div className="pointer-events-none absolute bottom-[30px] right-3 z-[11] flex gap-1"><Koala size={50} /><Cat size={50} /></div>
    </section>
  )
}

/* ================= 2. JALAN BARENG ================= */
function Print({ x, y, r, c }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`} fill={c}>
      <ellipse rx="4.2" ry="6.6" />
      {[[-3.4, -8.6], [-1.1, -9.8], [1.2, -9.8], [3.5, -8.6]].map(([a, b]) => <circle key={a} cx={a} cy={b} r="1.5" />)}
    </g>
  )
}

export function MolangWalk() {
  const D = JUNE.beach.walk
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const left = useTransform(p, [0, 1], ['-26%', '70%'])
  const printW = useTransform(p, (v) => `${Math.max(0, -26 + 96 * v + 12)}%`)
  const farX = useTransform(p, [0, 1], [0, -70])
  const frameLeft = useTransform(p, [0.25, 1], ['112%', '84%'])
  const hintOp = useTransform(p, [0, 0.08], [1, 0])
  const endOp = useTransform(p, [0.82, 0.95], [0, 1])
  const [moving, setMoving] = useState(false)
  const t = useRef(null)
  useMotionValueEvent(p, 'change', () => {
    setMoving(true)
    clearTimeout(t.current)
    t.current = setTimeout(() => setMoving(false), 160)
  })
  useEffect(() => () => clearTimeout(t.current), [])

  return (
    <section ref={ref} className="relative" style={{ minHeight: `${H['jun-jalan']}svh`, ...fadeStyle }}>
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[40%]" style={{ background: 'linear-gradient(180deg,#bfe3f5,#e9f5fb)' }} />
        <motion.div className="pointer-events-none absolute left-[14%] top-[10%] h-16 w-16 rounded-full" style={{ x: farX, background: 'radial-gradient(circle,#fff6d8 35%,rgba(255,200,140,0) 72%)' }} />
        <motion.div className="pointer-events-none absolute left-[50%] top-[18%] h-8 w-28 rounded-full bg-white/80 blur-md" style={{ x: farX }} />
        <div className="absolute inset-x-0 top-[34%] h-[18%]" style={{ background: 'linear-gradient(180deg,#6cc3d6,#8fd3e0)' }} />
        <motion.div className="absolute top-[28%] z-[1]" style={{ left: frameLeft }} aria-hidden="true">
          <svg width="82" height="92" viewBox="0 0 360 380">
            <path d="M80 50L40 372M80 50L120 372M280 50L240 372M280 50L320 372" stroke="#8a5a34" strokeWidth="14" strokeLinecap="round" fill="none" />
            <rect x="66" y="42" width="228" height="16" rx="8" fill="#a8723f" />
            <path d="M140 54V210M220 54V210" stroke="#6b4a34" strokeWidth="6" />
            <rect x="130" y="206" width="100" height="14" rx="6" fill="#c9965a" />
          </svg>
        </motion.div>
        <div className="absolute inset-x-0 top-[48%] z-[2] h-[8%] overflow-hidden"><Band color="#ffffff" op={0.9} dur={8} bottom={0} h={44} /></div>
        <div className="absolute inset-x-0 bottom-0 top-[50%]" style={DOTS} />
        <div className="absolute inset-x-0 top-[50%] h-[7%]" style={{ background: 'linear-gradient(180deg,rgba(170,140,90,.55),rgba(170,140,90,0))' }} />
        <motion.div className="pointer-events-none absolute inset-x-0 top-[49%] z-[2] h-[5%] bg-white/70 blur-sm" animate={{ y: [0, 16, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />

        <div className="relative z-[5] px-4 pt-[9svh] text-center">
          <h2 className="font-display text-[clamp(2.2rem,10vw,3rem)] font-extrabold leading-none" style={{ color: '#1f4a7a' }}>{D.title}</h2>
          <motion.p className="mt-2 text-sm font-semibold" style={{ color: '#1f4a7a', opacity: hintOp }}>{D.hint}</motion.p>
        </div>

        {/* jejak kaki muncul di belakang mereka */}
        <motion.div className="absolute left-0 z-[3] overflow-hidden" style={{ top: 'calc(56% + 78px)', width: printW, height: 96 }}>
          <svg className="block" style={{ width: '100vw', height: 96 }} aria-hidden="true">
            <defs>
              <pattern id="molFp" width="64" height="96" patternUnits="userSpaceOnUse">
                <Print x="16" y="16" r="-6" c="#b9a2d4" />
                <Print x="48" y="38" r="6" c="#b9a2d4" />
                <Print x="16" y="60" r="-6" c="#e0a060" />
                <Print x="48" y="82" r="6" c="#e0a060" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#molFp)" />
          </svg>
        </motion.div>

        {/* koala dan kucing berjalan berdampingan */}
        <motion.div className="absolute z-[4] flex gap-1" style={{ left, top: '56%' }}>
          <motion.div className="flex gap-1" animate={moving ? { y: [0, -7, 0] } : { y: 0 }} transition={moving ? { duration: 0.4, repeat: Infinity } : { duration: 0.2 }}>
            <Koala size={84} />
            <Cat size={84} />
          </motion.div>
        </motion.div>

        <motion.div className="absolute inset-x-0 z-[5] px-8 text-center" style={{ top: '80%', opacity: endOp }}>
          <p className={`text-[1.9rem] leading-none ${SCRIPT}`} style={{ color: INK }}>{D.done}</p>
          <p className="mx-auto mt-2 max-w-[300px] text-sm leading-relaxed" style={{ color: INK }}>{D.story}</p>
        </motion.div>
      </div>
    </section>
  )
}

/* ================= 3. AYUNAN ================= */
const L = 210 // panjang tali (px)
const POS = [{ left: '6%', top: '9%', r: -6 }, { right: '6%', top: '16%', r: 5 }, { left: '38%', top: '3%', r: -2 }]

export function MolangSwing() {
  const D = JUNE.beach.swing
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.35 })
  const ang = useMotionValue(8)
  const sim = useRef({ th: 0.14, om: 0, last: 0, lvl: 0 })
  const [lvl, setLvl] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf
    let last = performance.now()
    const loop = (now) => {
      const dt = Math.min(0.04, (now - last) / 1000)
      last = now
      const s = sim.current
      s.om += (-16 * Math.sin(s.th) - 0.28 * s.om) * dt
      s.th += s.om * dt
      if (Math.abs(s.th) > 1.05) {
        s.th = Math.sign(s.th) * 1.05
        s.om *= 0.6
      }
      if (s.last * s.om < 0) {
        const a = (Math.abs(s.th) * 180) / Math.PI
        const nl = a > 50 ? 3 : a > 36 ? 2 : a > 20 ? 1 : 0
        if (nl > s.lvl) {
          s.lvl = nl
          setLvl(nl)
          navigator.vibrate?.(20)
        }
      }
      s.last = s.om
      ang.set((s.th * 180) / Math.PI)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [inView, ang])

  const push = () => {
    const s = sim.current
    s.om += (Math.abs(s.om) > 0.3 ? Math.sign(s.om) : 1) * 1.1
    navigator.vibrate?.(8)
  }

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ minHeight: `${H['jun-ayunan']}svh`, background: 'linear-gradient(180deg,#cfeaf7 0%,#bfe3f0 34%,#6cc3d6 40%,#8fd3e0 50%)', ...fadeStyle }}>
      <div className="absolute inset-x-0 bottom-0" style={{ ...DOTS, top: '54%' }} />

      <div className="relative z-[2] px-4 pt-[9svh] text-center">
        <h2 className="font-display text-[clamp(2.2rem,10vw,3rem)] font-extrabold leading-none" style={{ color: '#1f4a7a' }}>{D.title}</h2>
        <p className="mt-2 text-sm font-semibold" style={{ color: '#1f4a7a' }}>{lvl === 0 ? D.hint : D.levels[lvl - 1]}</p>
      </div>

      {D.media.map((m, i) => {
        const pos = POS[i % POS.length]
        return (
          <motion.div
            key={m.src}
            className="absolute z-[4]"
            style={{ left: pos.left, right: pos.right, top: pos.top }}
            initial={false}
            animate={lvl > i ? { scale: 1, opacity: 1, rotate: pos.r } : { scale: 0, opacity: 0, rotate: 0 }}
            transition={{ type: 'spring', damping: 11, stiffness: 140 }}
          >
            <MediaFrame item={m} label={`kenangan ayunan ${i + 1}`} frameClass="w-[104px] p-1.5 pb-5 shadow-xl" imgClass="aspect-square w-full" />
          </motion.div>
        )
      })}

      <div className="relative z-[3] mx-auto mt-[11svh] h-[380px] w-[360px]" onPointerDown={push} style={{ touchAction: 'manipulation' }}>
        <svg viewBox="0 0 360 380" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d="M80 50L40 372M80 50L120 372M280 50L240 372M280 50L320 372" stroke="#8a5a34" strokeWidth="9" strokeLinecap="round" fill="none" />
          <rect x="66" y="42" width="228" height="12" rx="6" fill="#a8723f" />
          <ellipse cx="180" cy="374" rx="150" ry="9" fill="rgba(90,70,48,.22)" />
        </svg>
        <motion.div className="absolute" style={{ left: 180, top: 50, rotate: ang, transformOrigin: '0px 0px' }}>
          <span className="absolute w-[3px] bg-[#6b4a34]" style={{ left: -42, top: 0, height: L }} />
          <span className="absolute w-[3px] bg-[#6b4a34]" style={{ left: 40, top: 0, height: L }} />
          <div className="absolute h-[12px] w-[112px] rounded bg-[#c9965a]" style={{ left: -56, top: L }} />
          <div className="absolute" style={{ left: -58, top: L - 58 }}><Koala size={58} /></div>
          <div className="absolute" style={{ left: 2, top: L - 58 }}><Cat size={58} /></div>
        </motion.div>
      </div>

      <p className="relative z-[3] mx-auto mt-2 max-w-[300px] px-4 pb-[8svh] text-center text-sm leading-relaxed" style={{ color: INK }}>{D.story}</p>
    </section>
  )
}

/* ================= 4. GALERI ================= */
const W = 230
const G = 18

export function MolangGallery() {
  const D = JUNE.beach.gallery
  const sc = useRef(null)
  const [i, setI] = useState(0)
  const onScroll = () => {
    const el = sc.current
    if (el) setI(Math.min(D.media.length - 1, Math.max(0, Math.round(el.scrollLeft / (W + G)))))
  }

  return (
    <section
      className="relative overflow-hidden pb-[9svh] pt-[10svh]"
      style={{
        ...DOTS,
        minHeight: `${H['jun-galeri']}svh`,
        borderBottomLeftRadius: '50% 90px',
        borderBottomRightRadius: '50% 90px',
        WebkitMaskImage: FADE_TOP,
        maskImage: FADE_TOP,
      }}
    >
      <div className="px-4 text-center">
        <h2 className="font-display text-[clamp(2.2rem,10vw,3rem)] font-extrabold leading-none" style={{ color: INK }}>{D.title}</h2>
        <p className="mt-2 text-sm font-semibold" style={{ color: INK }}>{D.hint}</p>
      </div>

      <div ref={sc} onScroll={onScroll} className="no-scrollbar mt-6 flex snap-x snap-mandatory overflow-x-auto py-5" style={{ gap: G, paddingLeft: `calc(50% - ${W / 2}px)`, paddingRight: `calc(50% - ${W / 2}px)` }}>
        {D.media.map((m, k) => (
          <div key={m.src} className="shrink-0 snap-center" style={{ width: W }}>
            <MediaFrame item={m} label={`foto pantai ${k + 1}`} frameClass="w-full p-2 pb-8 shadow-xl" imgClass="aspect-[4/5] w-full" style={{ rotate: k % 2 ? 2 : -2 }} />
            <p className="mt-2 text-center text-xs" style={{ color: INK }}>{m.caption}</p>
          </div>
        ))}
      </div>

      <div className="mt-2 flex justify-center gap-1.5">
        {D.media.map((_, k) => (
          <span key={k} className="h-2 w-2 rounded-full" style={{ background: k === i ? '#7a5cc4' : 'rgba(90,70,48,.25)' }} />
        ))}
      </div>
    </section>
  )
}