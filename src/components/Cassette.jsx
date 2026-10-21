import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { JUNE } from '../data/june.js'
import { H } from '../timeline.js'
import { Cat, Koala } from './Characters.jsx'
import { currentSrc, playTrack, togglePause, trackInfo } from '../audio/player.js'

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

function Reel({ spin }) {
  return (
    <motion.svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      animate={{ rotate: spin ? 360 : 0 }}
      transition={spin ? { duration: 2, repeat: Infinity, ease: 'linear' } : { duration: 0.4 }}
      aria-hidden="true"
    >
      <circle cx="23" cy="23" r="21" fill="#2a1f45" />
      <circle cx="23" cy="23" r="9" fill="#e9e1f7" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <rect key={a} x="21.5" y="3" width="3" height="8" rx="1.5" fill="#e9e1f7" transform={`rotate(${a} 23 23)`} />
      ))}
    </motion.svg>
  )
}

export default function Cassette() {
  const D = JUNE.music
  const [inserted, setInserted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [t, setT] = useState(0)
  const [d, setD] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      const i = trackInfo()
      setPlaying(i.playing)
      setT(Math.floor(i.t))
      setD(Math.floor(i.d))
    }, 400)
    return () => clearInterval(id)
  }, [])

  const insert = () => {
    if (inserted) return
    setInserted(true)
    navigator.vibrate?.(20)
  }
  const toggle = () => {
    if (currentSrc() !== JUNE.audio) playTrack(JUNE.audio)
    else togglePause()
  }
  const bob = (delay = 0) => (playing ? { animate: { y: [0, -7, 0] }, transition: { duration: 0.6, repeat: Infinity, delay } } : { animate: { y: 0 } })

  return (
    <section className="relative flex flex-col items-center px-4 pt-[9svh] pb-[10svh] text-center text-lilac-100" style={{ minHeight: `${H['jun-musik']}svh` }}>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.2 }}
        className="font-display text-[clamp(2.2rem,10vw,3rem)] font-extrabold leading-none text-white"
      >
        {D.title}
      </motion.h2>

      <div className="relative mt-8 h-[290px] w-[300px]">
        <motion.div className="absolute left-[-4px] top-[70px] z-[3]" {...bob(0)}><Koala size={58} /></motion.div>
        <motion.div className="absolute right-[-4px] top-[70px] z-[3]" {...bob(0.3)}><Cat size={58} /></motion.div>

        {/* badan pemutar */}
        <div className="absolute inset-x-0 top-[130px] h-[160px] rounded-3xl bg-gradient-to-b from-[#c9a2d8] to-[#8a62b0] shadow-2xl">
          <div className="absolute left-[50px] top-[18px] h-[92px] w-[200px] rounded-xl border-4 border-[#6a4cb4] bg-[#2a1f45]" />
          {['left-[12px]', 'right-[12px]'].map((c) => (
            <div key={c} className={`absolute ${c} bottom-[12px] flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#2a1f45]`}>
              <motion.span className="h-[26px] w-[26px] rounded-full border-2 border-[#8a62b0]" animate={playing ? { scale: [1, 1.14, 1] } : { scale: 1 }} transition={{ duration: 0.6, repeat: Infinity }} />
            </div>
          ))}
          <button
            type="button"
            onClick={toggle}
            disabled={!inserted}
            aria-label={playing ? 'Jeda' : 'Putar'}
            className="absolute bottom-[10px] left-1/2 -ml-[24px] flex h-12 w-12 items-center justify-center rounded-full bg-[#ff8fb1] text-xl text-white shadow-lg active:scale-90 disabled:opacity-40"
          >
            {playing ? '❚❚' : '▶'}
          </button>
        </div>

        {/* kaset */}
        <motion.button
          type="button"
          onClick={insert}
          aria-label="Masukkan kaset"
          className="absolute left-[50px] z-[4] h-[112px] w-[200px] rounded-xl bg-gradient-to-b from-[#ffd3e4] to-[#ff9fc0] shadow-xl"
          style={{ top: 0 }}
          initial={false}
          animate={inserted ? { y: 142, rotate: 0, scale: 0.94 } : { y: [0, -8, 0], rotate: [-2, 2, -2] }}
          transition={inserted ? { type: 'spring', damping: 14, stiffness: 120 } : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="absolute inset-x-3 top-3 flex h-[44px] flex-col items-center justify-center rounded bg-[#fffdf8]">
            <span className="font-['Dancing_Script',cursive] text-xl leading-none text-[#2a1f45]">{D.song}</span>
            <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-[#8a62b0]">{D.artist}</span>
          </span>
          <span className="absolute inset-x-8 bottom-3 flex justify-between">
            <Reel spin={playing && inserted} />
            <Reel spin={playing && inserted} />
          </span>
        </motion.button>
      </div>

      <div className="mt-6 max-w-[300px]">
        {!inserted ? (
          <p className="text-sm font-semibold">{D.hint}</p>
        ) : (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <p className="font-display text-xl font-extrabold text-white">{D.song}</p>
            <p className="text-sm">{D.artist}</p>
            <p className="mt-2 text-sm leading-relaxed">{D.reason}</p>
            <div className="mx-auto mt-4 h-1.5 w-[220px] overflow-hidden rounded-full bg-white/20">
              <div className="h-full bg-[#ff8fb1]" style={{ width: d ? `${(t / d) * 100}%` : '0%' }} />
            </div>
            <p className="mt-1 text-xs tabular-nums opacity-80">{fmt(t)} / {d ? fmt(d) : '--:--'}</p>
          </motion.div>
        )}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.2 }}
        className="mt-10 max-w-[300px] font-['Dancing_Script',cursive] text-[1.9rem] leading-snug text-white"
      >
        {D.closing}
      </motion.p>
    </section>
  )
}