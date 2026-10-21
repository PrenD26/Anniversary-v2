import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionTemplate, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { JUNE } from '../data/june.js'
import { H } from '../timeline.js'

const MASK = 'linear-gradient(to bottom, transparent 0, #000 70px, #000 calc(100% - 70px), transparent 100%)'
const ST = { fill: 'none', stroke: '#2a1f45', strokeWidth: 3, strokeLinecap: 'round' }
const FACES = {
  sleep: (<><path d="M23 42q5 5 11 0M46 42q5 5 11 0" {...ST} /><ellipse cx="40" cy="55" rx="4" ry="6" fill="#2a1f45" /></>),
  yawn: (<><path d="M24 41q5-4 10 0M46 41q5-4 10 0" {...ST} /><ellipse cx="40" cy="55" rx="6" ry="9" fill="#2a1f45" /></>),
  awake: (<><circle cx="29" cy="42" r="3.5" fill="#2a1f45" /><circle cx="51" cy="42" r="3.5" fill="#2a1f45" /><ellipse cx="40" cy="53" rx="6" ry="7" fill="#4a3a6b" /><path d="M34 60q6 6 12 0" fill="#f4a6c4" /></>),
}

function Head({ stage }) {
  return (
    <svg width="150" height="150" viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="16" cy="22" r="13" fill="#b9a9d9" />
      <circle cx="64" cy="22" r="13" fill="#b9a9d9" />
      <circle cx="16" cy="22" r="7" fill="#e8dcf8" />
      <circle cx="64" cy="22" r="7" fill="#e8dcf8" />
      <circle cx="40" cy="44" r="28" fill="#cbb8e2" />
      <circle cx="22" cy="52" r="4" fill="#f4a6c4" opacity=".7" />
      <circle cx="58" cy="52" r="4" fill="#f4a6c4" opacity=".7" />
      {FACES[stage]}
    </svg>
  )
}

export default function Wake() {
  const D = JUNE.wake
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start 85%', 'end 40%'] })
  const [stage, setStage] = useState('sleep')
  useMotionValueEvent(p, 'change', (v) => {
    const s = v < 0.38 ? 'sleep' : v < 0.64 ? 'yawn' : 'awake'
    setStage((x) => (x === s ? x : s))
  })

  const top = useTransform(p, [0, 0.6, 1], ['#241a48', '#8a74c4', '#f6e9ff'])
  const bottom = useTransform(p, [0, 0.6, 1], ['#3b2d6e', '#d6b2e6', '#ffe6d6'])
  const bg = useMotionTemplate`linear-gradient(180deg, ${top}, ${bottom})`
  const wTop = useTransform(p, [0, 0.6, 1], ['#1a1f4a', '#f08a5a', '#9ac7ee'])
  const wBottom = useTransform(p, [0, 0.6, 1], ['#3a3f7a', '#ffd08a', '#e3f2fb'])
  const wBg = useMotionTemplate`linear-gradient(180deg, ${wTop}, ${wBottom})`
  const sunY = useTransform(p, [0.1, 0.9], ['96px', '24px'])
  const arms = useTransform(p, [0.62, 0.8], [0, 1])

  return (
    <section ref={ref} className="relative flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: `${H['jun-bangun']}svh`, WebkitMaskImage: MASK, maskImage: MASK }}>
      <motion.div className="absolute inset-0" style={{ background: bg }} />
      <p className="relative z-[3] mb-4 mt-[8svh] text-sm font-semibold text-white/85">{D.hint}</p>

      {/* jendela: matahari terbit */}
      <div className="relative z-[1] h-[150px] w-[130px] overflow-hidden rounded-t-[65px] border-[8px] border-[#6b4a8a]">
        <motion.div className="absolute inset-0" style={{ background: wBg }} />
        <motion.div className="absolute left-1/2 -ml-[24px] h-12 w-12 rounded-full" style={{ top: sunY, background: 'radial-gradient(circle,#fff6c9 40%,rgba(255,190,110,0) 72%)' }} />
        <span className="absolute inset-y-0 left-1/2 -ml-[2px] w-1 bg-[#6b4a8a]" />
        <span className="absolute inset-x-0 top-[58%] h-1 bg-[#6b4a8a]" />
      </div>

      {/* tempat tidur */}
      <div className="relative z-[2] mt-8 h-[210px] w-[300px]">
        <div className="absolute bottom-0 inset-x-0 h-[120px] rounded-3xl bg-[#6b4a8a]" />
        <div className="absolute left-5 top-[56px] h-[84px] w-[260px] rounded-[50%] bg-[#fffdf8] shadow-md" />
        <motion.div
          className="absolute left-[75px] top-0"
          animate={stage === 'sleep' ? { rotate: [-1.5, 1.5, -1.5] } : stage === 'yawn' ? { scale: [1, 1.05, 1] } : { y: [0, -3, 0] }}
          transition={{ duration: stage === 'sleep' ? 3 : 1.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Head stage={stage} />
        </motion.div>

        {/* tangan terentang saat bangun */}
        {[
          ['left-[34px]', -40],
          ['right-[34px]', 40],
        ].map(([cls, r]) => (
          <motion.span
            key={cls}
            className={`absolute ${cls} top-[104px] h-[34px] w-[34px] rounded-full bg-[#cbb8e2] shadow`}
            style={{ opacity: arms, rotate: r }}
            animate={stage === 'awake' ? { y: [-34, -46, -34] } : { y: 0 }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        ))}

        <div className="absolute bottom-0 inset-x-3 h-[100px] rounded-3xl" style={{ background: 'linear-gradient(180deg,#b9a2e6,#9a7fd8)', boxShadow: '0 -6px 14px rgba(0,0,0,.15)' }}>
          <span className="absolute inset-x-0 top-4 h-3 bg-white/25" />
          <span className="absolute inset-x-0 top-9 h-1 bg-white/15" />
        </div>

        {stage === 'sleep' &&
          ['z', 'Z', 'z'].map((z, i) => (
            <motion.span
              key={i}
              className="absolute font-display text-2xl font-extrabold text-lilac-100"
              style={{ left: 218 + i * 14, top: 10 }}
              animate={{ y: [0, -34], opacity: [0, 1, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.8 }}
            >
              {z}
            </motion.span>
          ))}
      </div>

      <div className="relative z-[3] mb-[8svh] mt-6 h-12">
        <AnimatePresence mode="wait">
          <motion.p
            key={stage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-['Dancing_Script',cursive] text-[2rem] leading-none text-white"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,.35)' }}
          >
            {D[stage]}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  )
}