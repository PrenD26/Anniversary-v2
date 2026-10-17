import { useContext, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { NOVEMBER } from '../data/november.js'
import { H } from '../timeline.js'
import { SkyContext } from './SkyBackground.jsx'
import StoryDialog from './StoryDialog.jsx'
import HoldHands from './HoldHands.jsx'
import Clothesline from './Clothesline.jsx'
import DateQuiz from './DateQuiz.jsx'
import ChatOverlay from './ChatOverlay.jsx'
import { setVolume } from '../audio/player.js'

const fade = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.6 }, transition: { duration: 1.2 } }
const sec = (id) => ({ minHeight: `${H[id]}svh` })
const H2 = 'text-center font-display text-[clamp(2.2rem,10vw,3rem)] font-extrabold leading-none'
const SAND = '#f3dfb9'
const HEART = 'M20 35C5 25 3 14 10 10C15 7.5 19 10 20 14C21 10 25 7.5 30 10C37 14 35 25 20 35Z'

/* ---------- laut, ombak, botol ---------- */
function Waves({ progress }) {
  const x1 = useTransform(progress, [0, 1], [-40, 40])
  const x2 = useTransform(progress, [0, 1], [40, -40])
  const d = 'M0 22Q25 6 50 22T100 22T150 22T200 22T250 22T300 22T350 22T400 22T450 22T500 22V50H0Z'
  return (
    <div className="pointer-events-none absolute inset-x-0 -bottom-px h-12 overflow-hidden" aria-hidden="true">
      <motion.svg style={{ x: x1 }} viewBox="0 0 500 50" preserveAspectRatio="none" className="absolute -left-10 bottom-1 h-12 w-[calc(100%+80px)]">
        <path d={d} fill="#fff" fillOpacity=".85" />
      </motion.svg>
      <motion.svg style={{ x: x2 }} viewBox="0 0 500 50" preserveAspectRatio="none" className="absolute -left-10 bottom-0 h-12 w-[calc(100%+80px)]">
        <path d={d} fill={SAND} />
      </motion.svg>
    </div>
  )
}

function Bottle({ uncorked }) {
  return (
    <svg width="64" height="120" viewBox="0 0 64 120" aria-hidden="true">
      <motion.g animate={uncorked ? { y: -22, rotate: 25, opacity: 0 } : { y: 0 }} transition={{ duration: 0.6 }}>
        <rect x="26" y="2" width="12" height="14" rx="3" fill="#d79a52" />
      </motion.g>
      <path
        d="M24 16h16v14c0 6 14 12 14 30v46a8 8 0 0 1-8 8H18a8 8 0 0 1-8-8V60c0-18 14-24 14-30z"
        fill="#b8a5dc"
        stroke="#6a4cb4"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <rect x="25" y="62" width="14" height="30" rx="2" fill="#fffdf8" />
      <path d="M28 70h8M28 76h8M28 82h5" stroke="#8d86a3" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M16 62v36" stroke="#fff" strokeOpacity=".4" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function NovLaut() {
  const N = NOVEMBER.beach
  const { ink } = useContext(SkyContext)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const [uncorked, setUncorked] = useState(false)
  const [open, setOpen] = useState(false)

  const grab = () => {
    if (uncorked) return setOpen(true)
    setUncorked(true)
    setTimeout(() => setOpen(true), 700)
  }

  return (
    <section ref={ref} className="relative">
      <motion.h2 {...fade} style={{ color: ink }} className={`pt-[8svh] ${H2}`}>{N.title}</motion.h2>
      <div className="relative mt-6 h-[44svh] min-h-[300px] bg-gradient-to-b from-[#7ea6ee] to-[#b6cdf6]">
        <div className="absolute left-1/2 top-[30%] -translate-x-1/2">
          <motion.div animate={{ y: [0, -8, 0], rotate: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            <button type="button" onClick={grab} aria-label="Ambil botol pesan" className="flex flex-col items-center">
              <Bottle uncorked={uncorked} />
              <span className="mt-2 text-sm text-white/90">{N.bottleHint}</span>
            </button>
          </motion.div>
        </div>
        <Waves progress={scrollYProgress} />
      </div>
      <StoryDialog open={open} onClose={() => setOpen(false)} title={N.story.title} paragraphs={N.story.paragraphs} />
    </section>
  )
}

/* ---------- jejak kaki ---------- */
const pop = { hide: { opacity: 0, scale: 0.5 }, show: { opacity: 0.9, scale: 1, transition: { duration: 0.4 } } }
const TOES = [[-6.5, -13.5], [-2.5, -16.5], [1.5, -16.5], [5.5, -13.5]]

function Foot({ x, y, r, c }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <motion.g variants={pop}>
        <ellipse rx="7" ry="12" fill={c} />
        {TOES.map(([tx, ty]) => (
          <circle key={tx} cx={tx} cy={ty} r="2.5" fill={c} />
        ))}
      </motion.g>
    </g>
  )
}

// Dua pasang jejak: awalnya berjauhan, makin lama makin dekat
// Jejak kaki kiri dan kanan tiap karakter, bergantian. Awalnya berjauhan, makin lama makin dekat
function Footprints() {
  const steps = Array.from({ length: 6 }, (_, i) => ({ y: 28 + i * 78, s: 84 - i * 10 }))
  return (
    <motion.svg
      viewBox="0 0 390 490"
      className="mx-auto block w-full max-w-[420px]"
      initial="hide"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ hide: {}, show: { transition: { staggerChildren: 0.1 } } }}
      aria-hidden="true"
    >
      {steps.map((st, i) => (
        <g key={i}>
          {/* koala: kaki kiri lalu kanan */}
          <Foot x={195 - st.s - 11} y={st.y} r={-8} c="#bfa0c8" />
          <Foot x={195 - st.s + 11} y={st.y + 36} r={8} c="#bfa0c8" />
          {/* kucing: kaki kiri lalu kanan, sedikit bergeser dari koala */}
          <Foot x={195 + st.s - 11} y={st.y + 18} r={-8} c="#d3a06c" />
          <Foot x={195 + st.s + 11} y={st.y + 54} r={8} c="#d3a06c" />
        </g>
      ))}
    </motion.svg>
  )
}

function NovJejak() {
  return (
    <section className="relative pt-[4svh]" style={sec('nov-jejak')}>
      <Footprints />
    </section>
  )
}

function NovGandeng() {
  const { ink } = useContext(SkyContext)
  return (
    <section className="relative flex flex-col items-center px-4 pt-[6svh]" style={sec('nov-gandeng')}>
      <motion.h2 {...fade} style={{ color: ink }} className={`mb-5 ${H2}`}>{NOVEMBER.hold.title}</motion.h2>
      <HoldHands />
    </section>
  )
}

function NovFoto() {
  const { ink } = useContext(SkyContext)
  return (
    <section className="relative flex flex-col items-center px-4 pt-[6svh]" style={sec('nov-foto')}>
      <motion.h2 {...fade} style={{ color: ink }} className={`mb-6 ${H2}`}>{NOVEMBER.photos.title}</motion.h2>
      <Clothesline />
    </section>
  )
}

// Satu hamparan pasir yang memudar di bawah, jadi tidak ada tepi keras
export function NovPantaiSand() {
  return (
    <div
      style={{
        backgroundImage:
          'radial-gradient(#e3c896 1px, transparent 1px), linear-gradient(180deg, #f3dfb9 0%, #f3dfb9 90%, rgba(243,223,185,0) 100%)',
        backgroundSize: '14px 14px, 100% 100%',
      }}
    >
      <NovJejak />
      <NovGandeng />
      <NovFoto />
    </div>
  )
}

// Sore: murni jembatan latar, tanpa konten
export const NovSore = () => <section aria-hidden="true" style={sec('nov-sore')} />

/* ---------- malam: pilih tanggal, chat, penutup ---------- */
const HEARTS = Array.from({ length: 8 }, (_, i) => ({ x: 6 + i * 12, d: i * 0.35, s: 14 + (i % 3) * 6 }))

export function NovMalam() {
  const N = NOVEMBER
  const { ink } = useContext(SkyContext)
  const [chat, setChat] = useState(false)
  const [done, setDone] = useState(false)

  const openChat = () => {
    setChat(true)
    setVolume(0.3, 1200) // lagu mengecil supaya chat terasa intim
  }
  const closeChat = () => {
    setChat(false)
    setDone(true)
    setVolume(0.85, 1500)
  }

  return (
    <section className="relative flex flex-col items-center px-6 pt-[8svh]" style={sec('nov-malam')}>
      <motion.h2 {...fade} style={{ color: ink }} className={`mb-6 ${H2}`}>{N.date.title}</motion.h2>
      <DateQuiz onSolved={openChat} />

      <div className="relative mt-10 min-h-[220px] w-full text-center">
        {done && (
          <>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0" aria-hidden="true">
              {HEARTS.map((h, i) => (
                <motion.svg
                  key={i}
                  width={h.s}
                  height={h.s}
                  viewBox="0 0 40 40"
                  className="absolute"
                  style={{ left: `${h.x}%`, bottom: 0 }}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 1, 0], y: -170 }}
                  transition={{ duration: 3.2, delay: h.d + 0.6, repeat: Infinity, repeatDelay: 2 }}
                >
                  <path d={HEART} fill="#ff8fb1" />
                </motion.svg>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              style={{ color: ink }}
              className="font-['Dancing_Script',cursive] text-[2rem] leading-snug"
            >
              {N.closing.text}
            </motion.p>
            {N.closing.codeLine && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 1.6 }} style={{ color: ink }} className="mt-5 text-sm">
                {N.closing.codeLine}
              </motion.p>
            )}
            <motion.button
              type="button"
              onClick={openChat}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 2.4 }}
              style={{ color: ink }}
              className="mt-6 text-sm underline"
            >
              Baca chatnya lagi
            </motion.button>
          </>
        )}
      </div>

      <ChatOverlay open={chat} onClose={closeChat} />
    </section>
  )
}