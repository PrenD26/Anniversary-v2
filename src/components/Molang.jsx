import { useContext, useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useSpring, useTransform } from 'framer-motion'
import { JUNE } from '../data/june.js'
import { H } from '../timeline.js'
import { SkyContext } from './SkyBackground.jsx'
import { Cat, Koala } from './Characters.jsx'
import MediaFrame from './Media.jsx'

/* ---------- ukuran dunia (satuan desain, diskalakan ke lebar layar) ---------- */
const W = 360
const STAGE_H = 540
const WORLD = 1080
const GROUND = 455 // garis kaki
const SW = { x: 190, pivot: 200, rope: 132 } // ayunan
const ROCK_X = 560
const SAND = '#f3dfb9'
const SCRIPT = "font-['Dancing_Script',cursive]"
const HEART = 'M20 35C5 25 3 14 10 10C15 7.5 19 10 20 14C21 10 25 7.5 30 10C37 14 35 25 20 35Z'
const SHORE = 'M0 292Q90 282 180 290T360 290T540 292T720 294Q900 330 1080 420V540H0Z'
const FOAM = 'M0 292Q90 282 180 290T360 290T540 292T720 294Q900 330 1080 420'
const WASH = 'M700 296Q900 332 1080 424V480Q900 388 700 344Z'
const WAVE = 'M0 28Q30 8 60 28T120 28T180 28T240 28T300 28T360 28T420 28T480 28T540 28T600 28T660 28T720 28V56H0Z'

const camAt = (c) => Math.min(WORLD - W, Math.max(0, c - 180))
const wait = (ms) => new Promise((r) => setTimeout(r, ms))
// lompatan kecil: mv naik sedikit lalu mendarat di 'to'
const hop = (mv, to, peak = 36, dur = 0.5) => {
  const from = mv.get()
  return animate(mv, [from, Math.max(from, to) + peak, to], { duration: dur, times: [0, 0.5, 1], ease: 'easeInOut' })
}

/* ---------- komponen gambar ---------- */
function Buddy({ who, walking = false, fast = false, size = 56, camera = false, pose = false }) {
  const koala = who === 'koala'
  const fill = koala ? '#cbb8e2' : '#f7a85a'
  const shade = koala ? '#b9a3d4' : '#e0893a'
  const step = fast ? 0.17 : 0.3
  return (
    <div className="relative" style={{ width: size, height: size + 34 }}>
      <div className="absolute rounded-[45%]" style={{ left: size * 0.2, top: size * 0.72, width: size * 0.6, height: 40, background: fill }} />
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{ left: size * (0.2 + i * 0.3), top: size + 22, width: 17, height: 10, background: shade }}
          animate={walking ? { y: [0, -7, 0] } : { y: 0 }}
          transition={walking ? { duration: step * 2, repeat: Infinity, delay: i * step } : { duration: 0.2 }}
        />
      ))}
      <motion.div
        className="absolute left-0 top-0"
        animate={walking ? { y: [0, -4, 0], rotate: [-3, 3, -3] } : pose ? { y: 0, rotate: [-5, 5, -5] } : { y: [0, -1.5, 0], rotate: 0 }}
        transition={{ duration: walking ? step * 2 : 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {koala ? <Koala size={size} /> : <Cat size={size} />}
      </motion.div>
      {camera && (
        <svg width="30" height="24" viewBox="0 0 30 24" className="absolute" style={{ left: size * 0.5, top: size * 0.62 }} aria-hidden="true">
          <rect x="1" y="5" width="28" height="18" rx="4" fill="#3b3550" />
          <rect x="9" y="1" width="12" height="6" rx="2" fill="#3b3550" />
          <circle cx="15" cy="14" r="6.5" fill="#cfe6f8" stroke="#1f1b30" strokeWidth="2.5" />
          <circle cx="13" cy="12" r="1.8" fill="#fff" />
        </svg>
      )}
    </div>
  )
}

// satu lapis ombak yang bergulir terus (mulus karena periodenya bulat)
function Band({ color, op = 1, dur, top, delay = 0 }) {
  return (
    <div className="pointer-events-none absolute left-0 overflow-hidden" style={{ top, width: WORLD, height: 56 }} aria-hidden="true">
      <motion.svg viewBox="0 0 720 56" preserveAspectRatio="none" className="absolute left-0 top-0 h-full w-[200%]" style={{ opacity: op }} animate={{ x: ['0%', '-50%'] }} transition={{ duration: dur, repeat: Infinity, ease: 'linear', delay }}>
        <path d={WAVE} fill={color} />
      </motion.svg>
    </div>
  )
}

function Palm({ x, h = 190, flip = false }) {
  return (
    <motion.svg
      className="pointer-events-none absolute"
      style={{ left: x - 50, top: GROUND - h, transformOrigin: '50% 100%', overflow: 'visible', scaleX: flip ? -1 : 1 }}
      width="100"
      height={h}
      viewBox="0 0 100 190"
      animate={{ rotate: [-1.5, 1.5, -1.5] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <path d="M52 190Q56 130 46 74" stroke="#9a6a3a" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M46 74Q16 46 -8 62Q22 50 46 74Z" fill="#4fa05a" />
      <path d="M46 74Q30 40 8 34Q38 36 46 74Z" fill="#5fb06a" />
      <path d="M46 74Q54 38 76 30Q58 44 46 74Z" fill="#4fa05a" />
      <path d="M46 74Q78 48 104 62Q72 52 46 74Z" fill="#5fb06a" />
      <path d="M46 74Q60 100 86 104Q60 86 46 74Z" fill="#46944f" />
      <path d="M46 74Q32 100 8 104Q32 86 46 74Z" fill="#46944f" />
      <circle cx="42" cy="80" r="5" fill="#7a5230" />
      <circle cx="51" cy="82" r="5" fill="#7a5230" />
    </motion.svg>
  )
}

function Crab() {
  return (
    <svg width="40" height="30" viewBox="0 0 46 34" aria-hidden="true">
      <path d="M10 22l-6 6M14 25l-4 7M32 25l4 7M36 22l6 6M18 13V9M28 13V9" stroke="#d9573f" strokeWidth="2" strokeLinecap="round" fill="none" />
      <ellipse cx="23" cy="20" rx="14" ry="9" fill="#f26b4f" />
      <circle cx="6" cy="10" r="5" fill="#f26b4f" />
      <circle cx="40" cy="10" r="5" fill="#f26b4f" />
      <circle cx="18" cy="9" r="2.5" fill="#fff" />
      <circle cx="28" cy="9" r="2.5" fill="#fff" />
      <circle cx="18" cy="9" r="1.2" fill="#2a1f45" />
      <circle cx="28" cy="9" r="1.2" fill="#2a1f45" />
    </svg>
  )
}

function Terrain() {
  return (
    <svg className="pointer-events-none absolute left-0 top-0" width={WORLD} height={STAGE_H} viewBox={`0 0 ${WORLD} ${STAGE_H}`} aria-hidden="true">
      <defs>
        <pattern id="mlDots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="7" r="1" fill="#e3c896" />
        </pattern>
      </defs>
      <path d={SHORE} fill={SAND} />
      <path d={SHORE} fill="url(#mlDots)" />
      <path d={FOAM} fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" opacity=".9" />
      {/* bintang laut, kerang, dan batu kecil */}
      <path d="M262 492L266 502L277 503L269 510L271 521L262 515L253 521L255 510L247 503L258 502Z" fill="#f59a7b" stroke="#e07a58" strokeWidth="1.2" />
      <path d="M452 505L440 490Q443 480 452 479Q461 480 464 490Z" fill="#f7c9d8" stroke="#e59ab5" strokeWidth="1.2" />
      <path d="M118 500Q116 490 128 488Q140 488 142 500Z" fill="#b7aab6" />
      <path d="M700 488Q698 480 708 478Q718 478 720 488Z" fill="#b7aab6" />
      <path d="M835 505L825 492Q828 484 835 483Q842 484 845 492Z" fill="#e8d2f4" stroke="#b996d6" strokeWidth="1.2" />
    </svg>
  )
}

function Wash() {
  return (
    <svg className="pointer-events-none absolute left-0 top-0 z-[6]" width={WORLD} height={STAGE_H} viewBox={`0 0 ${WORLD} ${STAGE_H}`} aria-hidden="true">
      <motion.path d={WASH} fill="rgba(255,255,255,.5)" animate={{ y: [0, 58, 0], opacity: [0.15, 0.6, 0.15] }} transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.path d={WASH} fill="rgba(220,243,250,.5)" animate={{ y: [0, 42, 0], opacity: [0.1, 0.5, 0.1] }} transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }} />
    </svg>
  )
}

function Rocks() {
  return (
    <svg className="pointer-events-none absolute" style={{ left: ROCK_X - 120, top: 290 }} width="240" height="175" viewBox="0 0 240 175" aria-hidden="true">
      <ellipse cx="130" cy="168" rx="116" ry="8" fill="rgba(90,70,48,.25)" />
      <path d="M48 165Q40 118 82 104Q122 96 142 122Q158 165 158 165Z" fill="#9a8f9f" />
      <path d="M100 165Q96 90 148 68Q196 58 216 100Q232 165 232 165Z" fill="#8a7f91" />
      <path d="M154 100Q160 40 196 22Q228 18 238 50Q246 90 232 120Z" fill="#a89eae" />
      <path d="M62 120Q80 108 104 110M120 86Q146 70 178 72M176 44Q198 30 222 36" stroke="#c9c1cf" strokeWidth="4" strokeLinecap="round" fill="none" opacity=".8" />
      <path d="M120 150L128 126M196 96L206 70" stroke="#6f6578" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="88" cy="112" rx="14" ry="5" fill="#7fae7a" opacity=".7" />
      <ellipse cx="190" cy="68" rx="12" ry="4" fill="#7fae7a" opacity=".6" />
    </svg>
  )
}

function SwingFrame() {
  const h = GROUND - SW.pivot + 14
  return (
    <svg className="pointer-events-none absolute" style={{ left: SW.x - 130, top: SW.pivot - 14 }} width="260" height={h + 8} viewBox={`0 0 260 ${h + 8}`} aria-hidden="true">
      <ellipse cx="130" cy={h + 2} rx="120" ry="7" fill="rgba(90,70,48,.22)" />
      <path d={`M40 14L12 ${h}M40 14L68 ${h}M220 14L192 ${h}M220 14L248 ${h}`} stroke="#8a5a34" strokeWidth="8" strokeLinecap="round" fill="none" />
      <rect x="28" y="8" width="204" height="12" rx="6" fill="#a8723f" />
    </svg>
  )
}

/* ---------- album (terkunci sampai ketiga tempat selesai) ---------- */
const AW = 230
const AG = 18

function Album({ D, open, count, ink }) {
  const sc = useRef(null)
  const [i, setI] = useState(0)
  // Ubah baris di bawah ini, tambahkan .beach
  const A = D.beach.album 
}
  // ... sisa kode di bawahnya tetap sama

/* ---------- bagian utama ---------- */
export default function Molang() {
  const B = JUNE.beach
  const { ink } = useContext(SkyContext)
  const need = Math.max(1, Math.min(3, B.swing.media.length || 3))

  // skala panggung mengikuti lebar layar
  const wrap = useRef(null)
  const [k, setK] = useState(1)
  useEffect(() => {
    const el = wrap.current
    if (!el) return undefined
    const ro = new ResizeObserver(([e]) => setK(Math.min(1.2, Math.max(0.6, e.contentRect.width / W))))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // posisi koala dan kucing
  const cx = useMotionValue(380)
  const kx = useMotionValue(380 - 62)
  const tx = useMotionValue(380 + 6)
  const ky = useMotionValue(0)
  const ty = useMotionValue(0)
  const kyN = useTransform(ky, (v) => -v)
  const tyN = useTransform(ty, (v) => -v)

  // kamera otomatis
  const camT = useMotionValue(camAt(380))
  const cam = useSpring(camT, { stiffness: 70, damping: 20 })
  const worldX = useTransform(cam, (v) => -v)
  const skyX = useTransform(cam, (v) => -v * 0.5)
  const follow = useRef(true)
  useMotionValueEvent(cx, 'change', (v) => {
    if (follow.current) camT.set(camAt(v))
  })

  const ang = useMotionValue(0)
  const swingRef = useRef({ th: 0, om: 0, last: 0, lvl: 0 })
  const busyRef = useRef(false)
  const fxId = useRef(0)

  const [active, setActive] = useState(false)
  const [busy, setBusy] = useState(false)
  const [mode, setMode] = useState('idle')
  const [walking, setWalking] = useState(false)
  const [fast, setFast] = useState(false)
  const [onSwing, setOnSwing] = useState(false)
  const [swingOn, setSwingOn] = useState(false)
  const [lvl, setLvl] = useState(0)
  const [photo, setPhoto] = useState('')
  const [holding, setHolding] = useState(false)
  const [shown, setShown] = useState(null)
  const [done, setDone] = useState([])
  const [flash, setFlash] = useState(0)
  const [running, setRunning] = useState(false)
  const [fx, setFx] = useState([])

  const markDone = (id) => setDone((d) => (d.includes(id) ? d : [...d, id]))
  const release = () => {
    busyRef.current = false
    setBusy(false)
    setMode('idle')
  }
  const addFx = (type, x, y, text = '') => {
    const id = fxId.current++
    setFx((f) => [...f, { id, type, x, y, text }])
    setTimeout(() => setFx((f) => f.filter((v) => v.id !== id)), 1500)
  }

  /* ----- gerak dasar ----- */
  const walkTo = async (to, speed = 120) => {
    const from = cx.get()
    const dur = Math.max(0.35, Math.abs(to - from) / speed)
    setFast(false)
    setWalking(true)
    await Promise.all([
      animate(cx, to, { duration: dur, ease: 'easeInOut' }),
      animate(kx, to - 62, { duration: dur, ease: 'easeInOut' }),
      animate(tx, to + 6, { duration: dur, ease: 'easeInOut' }),
    ])
    setWalking(false)
  }
  const syncCx = () => cx.set((kx.get() + tx.get()) / 2 + 28)

  const activate = async () => {
    if (active) return
    setActive(true)
    navigator.vibrate?.(20)
    addFx('heart', kx.get() + 28, GROUND - 100)
    addFx('heart', tx.get() + 28, GROUND - 100)
    await Promise.all([hop(ky, 0, 30, 0.5), hop(ty, 0, 30, 0.5)])
  }

  /* ----- AYUNAN ----- */
  const doSwing = async () => {
    setShown(null)
    setMode('swing')
    setLvl(0)
    swingRef.current = { th: 0.1, om: 0.4, last: 0, lvl: 0 }
    await walkTo(SW.x, 120)
    await Promise.all([hop(ky, 66, 40, 0.6), hop(ty, 66, 40, 0.6)])
    setOnSwing(true)
    ky.set(0)
    ty.set(0)
    setSwingOn(true)
  }
  const leaveSwing = async () => {
    setSwingOn(false)
    await animate(ang, 0, { duration: 0.4, ease: 'easeOut' })
    setOnSwing(false)
    ky.set(66)
    ty.set(66)
    await Promise.all([animate(ky, 0, { duration: 0.5, ease: 'easeIn' }), animate(ty, 0, { duration: 0.5, ease: 'easeIn' })])
    release()
  }
  const push = () => {
    const s = swingRef.current
    s.om += (Math.abs(s.om) > 0.3 ? Math.sign(s.om) : 1) * 1.1
    navigator.vibrate?.(8)
  }
  useEffect(() => {
    if (!swingOn) return undefined
    let raf
    let last = performance.now()
    const loop = (now) => {
      const dt = Math.min(0.04, (now - last) / 1000)
      last = now
      const s = swingRef.current
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
  }, [swingOn])
  // ayunan kosong bergoyang pelan
  useEffect(() => {
    if (swingOn || onSwing) return undefined
    const c = animate(ang, [-3, 3, -3], { duration: 4, repeat: Infinity, ease: 'easeInOut' })
    return () => c.stop()
  }, [swingOn, onSwing])
  useEffect(() => {
    if (swingOn && lvl >= 1) {
      setShown('swing')
      if (lvl >= need) markDone('swing')
    }
  }, [lvl, swingOn])

  /* ----- BATU KARANG ----- */
  const doRock = async () => {
    setShown(null)
    setMode('rock')
    setPhoto('')
    await walkTo(430, 120)
    follow.current = false
    camT.set(camAt(ROCK_X + 10))
    setHolding(true)
    setWalking(true)
    await Promise.all([animate(kx, 500, { duration: 1, ease: 'easeInOut' }), animate(tx, 410, { duration: 0.9, ease: 'easeInOut' })])
    setWalking(false)
    await Promise.all([animate(kx, 507, { duration: 0.55 }), hop(ky, 63, 34, 0.55)])
    await Promise.all([animate(kx, 562, { duration: 0.55 }), hop(ky, 103, 34, 0.55)])
    await Promise.all([animate(kx, 627, { duration: 0.6 }), hop(ky, 143, 34, 0.6)])
    setPhoto('ready')
  }
  const shoot = async () => {
    if (photo !== 'ready') return
    setPhoto('shot')
    setFlash((f) => f + 1)
    navigator.vibrate?.(20)
    await wait(900)
    setShown('rock')
    markDone('rock')
    await wait(1800)
    await Promise.all([animate(kx, 562, { duration: 0.5 }), hop(ky, 103, 10, 0.5)])
    await Promise.all([animate(kx, 507, { duration: 0.5 }), hop(ky, 63, 10, 0.5)])
    await Promise.all([animate(kx, 500, { duration: 0.5 }), hop(ky, 0, 10, 0.5)])
    setHolding(false)
    setPhoto('')
    syncCx()
    follow.current = true
    await walkTo(490, 100)
    release()
  }

  /* ----- BIBIR PANTAI ----- */
  const runTo = async (to) => {
    const cur = kx.get() + 28
    const dir = to >= cur ? 1 : -1
    const dur = Math.max(0.4, Math.abs(to - cur) / 250)
    setFast(true)
    setWalking(true)
    await Promise.all([
      animate(kx, to - 28, { duration: dur, ease: 'easeInOut' }),
      animate(tx, to - dir * 62 - 28, { duration: dur, ease: 'easeInOut' }),
    ])
  }
  const doShore = async () => {
    setShown(null)
    setMode('shore')
    follow.current = false
    camT.set(WORLD - W)
    await walkTo(830, 130)
    setRunning(true)
    for (const to of [1010, 850, 1010, 850]) {
      // eslint-disable-next-line no-await-in-loop
      await runTo(to)
    }
    setRunning(false)
    setFast(false)
    setWalking(false)
    syncCx()
    await walkTo(900, 100)
    addFx('word', 900, 330, B.shore.brr)
    await Promise.all([hop(ky, 0, 40, 0.45), hop(ty, 0, 40, 0.45)])
    await wait(900)
    setShown('shore')
    markDone('shore')
    follow.current = true
    release()
  }
  useEffect(() => {
    if (!running) return undefined
    const id = setInterval(() => addFx('splash', kx.get() + 28, GROUND - 6), 170)
    return () => clearInterval(id)
  }, [running])

  const start = (id) => {
    if (!active || busyRef.current) return
    busyRef.current = true
    setBusy(true)
    follow.current = true
    if (id === 'swing') doSwing()
    else if (id === 'rock') doRock()
    else doShore()
  }

  const stagePointerDown = () => {
    if (swingOn) push()
    else if (mode === 'shore' && running) addFx('heart', kx.get() + 28, GROUND - 110)
  }

  /* ----- teks bantuan dan panel kenangan ----- */
  let hint = ''
  if (!active) hint = B.start
  else if (mode === 'idle') hint = done.length >= 3 ? B.done : B.pick
  else if (mode === 'swing') hint = swingOn ? (lvl === 0 ? B.swing.hint : B.swing.levels[Math.min(lvl, B.swing.levels.length) - 1]) : ''
  else if (mode === 'rock') hint = photo === 'ready' ? B.rock.ready : photo === 'shot' ? '' : B.rock.hint
  else if (mode === 'shore') hint = B.shore.hint

  const memory =
    shown === 'swing'
      ? { items: B.swing.media.slice(0, lvl), text: lvl >= need ? B.swing.story : '' }
      : shown === 'rock'
        ? { items: [B.rock.photo], text: B.rock.story }
        : shown === 'shore'
          ? { items: [B.shore.photo], text: B.shore.story }
          : null

  const spots = [
    ['swing', SW.x, 138],
    ['rock', 592, 258],
    ['shore', 905, 296],
  ]

  return (
    <>
      <section className="relative px-4 pb-[4svh] pt-[7svh]" style={{ minHeight: `${H['jun-pantai']}svh` }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 1.2 }} className="text-center">
          <h2 style={{ color: ink }} className="font-display text-[clamp(2.4rem,11vw,3.4rem)] font-extrabold leading-none">{B.title}</h2>
          <p style={{ color: ink }} className={`mt-1 text-2xl ${SCRIPT}`}>{B.subtitle}</p>
          <p style={{ color: ink }} className="text-sm">{B.date}</p>
        </motion.div>

        <div ref={wrap} className="relative mx-auto mt-5 w-full max-w-[420px] overflow-hidden rounded-3xl shadow-2xl" style={{ height: STAGE_H * k }}>
          <div className="absolute left-0 top-0 overflow-hidden" style={{ width: W, height: STAGE_H, transform: `scale(${k})`, transformOrigin: '0 0' }} onPointerDown={stagePointerDown}>
            {/* langit: bergeser lebih lambat (parallax) */}
            <motion.div className="absolute left-0 top-0" style={{ width: 720, height: 240, x: skyX, background: 'linear-gradient(180deg,#ffd0b8 0%,#fbe3d6 45%,#d4eef5 100%)' }}>
              <div className="absolute h-20 w-20 rounded-full" style={{ left: 330, top: 40, background: 'radial-gradient(circle,#fff6d8 35%,rgba(255,190,140,0) 72%)' }} />
              <motion.div className="absolute h-9 w-32 rounded-full bg-white/70 blur-md" style={{ left: 40, top: 60 }} animate={{ x: [0, 40, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
              <motion.div className="absolute h-7 w-24 rounded-full bg-white/60 blur-md" style={{ left: 450, top: 96 }} animate={{ x: [0, -34, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} />
              <motion.div className="absolute h-8 w-28 rounded-full bg-white/60 blur-md" style={{ left: 220, top: 30 }} animate={{ x: [0, 30, 0] }} transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }} />
              {[0, 1, 2, 3].map((g) => (
                <motion.svg key={g} width="26" height="12" viewBox="0 0 26 12" className="absolute" style={{ left: 60 + g * 150, top: 70 + (g % 2) * 28 }} animate={{ x: [0, 60, 0], y: [0, -6, 0] }} transition={{ duration: 9 + g * 2, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true">
                  <path d="M1 8Q7 0 13 7Q19 0 25 8" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                </motion.svg>
              ))}
            </motion.div>

            {/* dunia */}
            <motion.div className="absolute left-0 top-0" style={{ width: WORLD, height: STAGE_H, x: worldX }}>
              <div className="absolute left-0" style={{ top: 168, bottom: 0, width: WORLD, background: 'linear-gradient(180deg,#c3e9f1 0%,#8fd3e0 35%,#4fb3c9 100%)' }} />
              <Band color="#a9e3ea" op={0.8} dur={15} top={178} />
              <Band color="#8fd6e2" op={0.8} dur={12} top={214} delay={-4} />
              <Band color="#ffffff" op={0.5} dur={9} top={252} delay={-2} />
              <Band color="#7fd0dc" op={0.6} dur={11} top={300} delay={-5} />
              <Band color="#9fdce8" op={0.6} dur={13} top={344} delay={-7} />

              {[[140, 168], [650, 172], [930, 176]].map(([x, y], i) => (
                <motion.svg key={x} width="52" height="44" viewBox="0 0 64 54" className="absolute" style={{ left: x, top: y }} animate={{ y: [0, -3, 0], rotate: [-2, 2, -2] }} transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true">
                  <path d="M32 2V30" stroke="#6b4a34" strokeWidth="2" />
                  <path d="M33 4L52 28H33Z" fill={i % 2 ? '#c9b2ff' : '#ffe3ee'} />
                  <path d="M31 8L14 28H31Z" fill="#fff" opacity=".9" />
                  <path d="M8 32H56L48 46H16Z" fill="#8a5a3a" />
                </motion.svg>
              ))}
              {[[60, 214], [200, 240], [330, 226], [480, 252], [620, 232], [790, 262], [880, 300], [1000, 330]].map(([x, y], i) => (
                <motion.span key={i} className="absolute h-0.5 w-3 rounded bg-white" style={{ left: x, top: y }} animate={{ opacity: [0, 0.9, 0] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.35 }} />
              ))}

              <Terrain />
              <motion.div className="pointer-events-none absolute" style={{ left: 250, top: 486 }} animate={{ x: [0, 210, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true">
                <Crab />
              </motion.div>
              <Palm x={330} h={200} />
              <Palm x={760} h={170} flip />
              <Rocks />
              <SwingFrame />

              {/* sorotan sebelum koala dan kucing diketuk */}
              {!active && (
                <motion.div className="pointer-events-none absolute rounded-full bg-white/50" style={{ left: 380 - 92, top: GROUND - 104, width: 184, height: 112 }} animate={{ scale: [1, 1.12, 1], opacity: [0.9, 0.35, 0.9] }} transition={{ duration: 1.6, repeat: Infinity }} />
              )}

              {/* bayangan di tanah */}
              <motion.div className="pointer-events-none absolute rounded-full bg-black/15" style={{ left: 0, top: GROUND - 6, width: 44, height: 9, x: kx, marginLeft: 6, opacity: onSwing ? 0 : 1 }} />
              <motion.div className="pointer-events-none absolute rounded-full bg-black/15" style={{ left: 0, top: GROUND - 6, width: 44, height: 9, x: tx, marginLeft: 6, opacity: onSwing ? 0 : 1 }} />

              {/* koala dan kucing */}
              <motion.div className="absolute" style={{ left: 0, top: GROUND - 90, x: kx, y: kyN, opacity: onSwing ? 0 : 1, cursor: active ? 'default' : 'pointer' }} onClick={() => !active && activate()} role={active ? undefined : 'button'} tabIndex={active ? -1 : 0} aria-label={active ? undefined : 'Ketuk koala'}>
                <Buddy who="koala" walking={walking} fast={fast} pose={photo === 'ready'} />
              </motion.div>
              <motion.div className="absolute" style={{ left: 0, top: GROUND - 90, x: tx, y: tyN, opacity: onSwing ? 0 : 1, cursor: active ? 'default' : 'pointer' }} onClick={() => !active && activate()} role={active ? undefined : 'button'} tabIndex={active ? -1 : 0} aria-label={active ? undefined : 'Ketuk kucing'}>
                <Buddy who="cat" walking={walking} fast={fast} camera={holding} />
              </motion.div>

              {/* ayunan: tali, dudukan, dan yang duduk di atasnya */}
              <motion.div className="pointer-events-none absolute" style={{ left: SW.x, top: SW.pivot, width: 0, height: 0, rotate: ang, transformOrigin: '0px 0px' }}>
                <span className="absolute w-[3px] bg-[#6b4a34]" style={{ left: -42, top: 0, height: SW.rope }} />
                <span className="absolute w-[3px] bg-[#6b4a34]" style={{ left: 40, top: 0, height: SW.rope }} />
                <div className="absolute rounded bg-[#c9965a]" style={{ left: -52, top: SW.rope, width: 104, height: 12 }} />
                {onSwing && (
                  <>
                    <div className="absolute" style={{ left: -46, top: SW.rope - 68 }}><Buddy who="koala" size={38} /></div>
                    <div className="absolute" style={{ left: 8, top: SW.rope - 68 }}><Buddy who="cat" size={38} /></div>
                  </>
                )}
              </motion.div>

              {/* bingkai bidik kamera */}
              {photo === 'ready' && (
                <motion.div className="pointer-events-none absolute" style={{ left: 604, top: 214, width: 102, height: 108 }} initial={{ opacity: 0, scale: 1.3 }} animate={{ opacity: 1, scale: 1 }}>
                  <span className="absolute left-0 top-0 h-5 w-5 border-l-[3px] border-t-[3px] border-white" />
                  <span className="absolute right-0 top-0 h-5 w-5 border-r-[3px] border-t-[3px] border-white" />
                  <span className="absolute bottom-0 left-0 h-5 w-5 border-b-[3px] border-l-[3px] border-white" />
                  <span className="absolute bottom-0 right-0 h-5 w-5 border-b-[3px] border-r-[3px] border-white" />
                </motion.div>
              )}

              <Wash />

              {fx.map((f) =>
                f.type === 'heart' ? (
                  <motion.svg key={f.id} width="20" height="20" viewBox="0 0 40 40" className="pointer-events-none absolute z-[9]" style={{ left: f.x - 10, top: f.y }} initial={{ opacity: 1, y: 0, scale: 0.6 }} animate={{ opacity: 0, y: -60, scale: 1.2 }} transition={{ duration: 1.3 }} aria-hidden="true">
                    <path d={HEART} fill="#ff6f9c" />
                  </motion.svg>
                ) : f.type === 'splash' ? (
                  <motion.span key={f.id} className="pointer-events-none absolute z-[9] h-2 w-6 rounded-full border border-white/90" style={{ left: f.x - 12, top: f.y }} initial={{ opacity: 0.9, scale: 0.4 }} animate={{ opacity: 0, scale: 1.8, y: -8 }} transition={{ duration: 0.7 }} />
                ) : (
                  <motion.span key={f.id} className="pointer-events-none absolute z-[9] w-16 -ml-8 text-center text-base font-extrabold text-[#1f6a8a]" style={{ left: f.x, top: f.y }} initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -50 }} transition={{ duration: 1.4 }}>
                    {f.text}
                  </motion.span>
                ),
              )}

              {/* tempat yang bisa diketuk */}
              {active && mode === 'idle' && !busy &&
                spots.map(([id, x, y]) => (
                  <div key={id} className="absolute z-[8]" style={{ left: x - 48, top: y, width: 96 }}>
                    <motion.button type="button" onClick={() => start(id)} aria-label={B.chips[id]} className="flex w-full flex-col items-center" animate={{ y: [0, -5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
                      <span className={`rounded-full px-3 py-1 text-[11px] font-bold shadow-lg ${done.includes(id) ? 'bg-[#a8e6cf] text-[#1f5a45]' : 'bg-white text-[#5a2d4a]'}`}>
                        {done.includes(id) ? '✓ ' : ''}{B.chips[id]}
                      </span>
                      <span className="mt-0.5 h-3 w-3 rotate-45 bg-white shadow" />
                    </motion.button>
                  </div>
                ))}
            </motion.div>

            {/* lapisan UI tetap di layar */}
            <div className="pointer-events-none absolute inset-0 z-30">
              {hint && (
                <div className="absolute inset-x-0 top-2 flex justify-center px-3">
                  <p className="rounded-full bg-white/85 px-3 py-1 text-center text-[11px] font-bold text-[#5a2d4a] shadow">{hint}</p>
                </div>
              )}

              <AnimatePresence>
                {memory && (
                  <motion.div key={shown} className="pointer-events-auto absolute inset-x-3 top-[42px] rounded-2xl bg-white/92 p-2.5 text-[#3b2a63] shadow-xl backdrop-blur-sm" initial={{ opacity: 0, y: -14, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: 'spring', damping: 18, stiffness: 220 }}>
                    <div className={`flex gap-2 ${memory.items.length > 1 ? 'flex-col items-center' : 'items-start'}`}>
                      <div className="flex shrink-0 gap-1.5">
                        {memory.items.map((m, i) => (
                          <MediaFrame key={m.src} item={m} label={`kenangan ${i + 1}`} frameClass="w-[84px] p-1 pb-3 shadow" imgClass="aspect-square w-full" />
                        ))}
                      </div>
                      {memory.text && <p className="text-xs leading-relaxed">{memory.text}</p>}
                    </div>
                    <button type="button" onClick={() => setShown(null)} aria-label="Tutup kenangan" className="absolute right-1 top-0 h-7 w-7 text-lg leading-none text-[#3b2a63]/60">×</button>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {(photo === 'ready' || (swingOn && lvl >= need)) && (
                  <motion.button key="act" type="button" onClick={photo === 'ready' ? shoot : leaveSwing} className="pointer-events-auto absolute bottom-[52px] left-1/2 -ml-[70px] h-12 w-[140px] rounded-full bg-gradient-to-r from-lilac-500 to-[#c47ad9] font-semibold text-white shadow-lg" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    {photo === 'ready' ? B.rock.shoot : B.swing.down}
                  </motion.button>
                )}
              </AnimatePresence>

              <div className="pointer-events-auto absolute inset-x-2 bottom-2 flex justify-center gap-1.5">
                {['swing', 'rock', 'shore'].map((id) => (
                  <button key={id} type="button" disabled={!active || busy} onClick={() => start(id)} className={`rounded-full px-3 py-1.5 text-[11px] font-bold shadow transition-opacity ${active && !busy ? 'bg-white/95 text-[#5a2d4a]' : 'bg-white/55 text-[#5a2d4a]/60'}`}>
                    {done.includes(id) ? '✓ ' : ''}{B.chips[id]}
                  </button>
                ))}
              </div>

              {flash > 0 && <motion.div key={flash} className="absolute inset-0 bg-white" initial={{ opacity: 0.9 }} animate={{ opacity: 0 }} transition={{ duration: 0.5 }} />}
            </div>
          </div>
        </div>
      </section>

      <Album D={JUNE} open={done.length >= 3} count={done.length} ink={ink} />
    </>
  )
}