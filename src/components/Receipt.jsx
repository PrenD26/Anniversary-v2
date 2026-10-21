import { useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { SEPTEMBER } from '../data/september.js'
import { SkyContext } from './SkyBackground.jsx'

const BARS = Array.from({ length: 44 }, (_, i) => ({ w: 1 + ((i * 7 + 3) % 4), g: 1 + ((i * 5) % 3) }))
const ZIG = 'polygon(0 0,100% 0,' + Array.from({ length: 21 }, (_, i) => `${100 - i * 5}% ${i % 2 ? '96%' : '100%'}`).join(',') + ')'
const stepped = (t) => Math.floor(t * 26) / 26 // gerak patah-patah ala printer

const Dash = () => <div className="my-2 border-t border-dashed border-[#9d96a8]" />

export default function Receipt() {
  const R = SEPTEMBER.receipt
  const S = SEPTEMBER.story
  const { ink } = useContext(SkyContext)
  const ref = useRef(null)
  const started = useInView(ref, { once: true, amount: 0.5 })
  const [done, setDone] = useState(false)
  const [open, setOpen] = useState(false)
  const [egg, setEgg] = useState(false)
  const printing = started && !done

  useEffect(() => {
    if (!egg) return
    const t = setTimeout(() => setEgg(false), 2400)
    return () => clearTimeout(t)
  }, [egg])

  return (
    <div ref={ref} className="flex flex-col items-center">
      {/* printer */}
      <motion.div
        className="relative z-10 h-24 w-[270px] rounded-3xl bg-gradient-to-b from-[#a39cba] to-[#7a7394] shadow-xl"
        animate={printing ? { x: [0, 1.5, -1.5, 0] } : { x: 0 }}
        transition={printing ? { duration: 0.2, repeat: Infinity } : { duration: 0.2 }}
      >
        <motion.div
          className="absolute right-6 top-5 h-2.5 w-2.5 rounded-full bg-emerald-300"
          animate={{ opacity: printing ? [1, 0.3, 1] : 1 }}
          transition={{ duration: 0.6, repeat: printing ? Infinity : 0 }}
        />
        <div className="absolute inset-x-6 bottom-2 h-3 rounded-full bg-[#2a2338]" />
      </motion.div>

      {/* kertas keluar dari slot */}
      <div className="relative z-0 -mt-3 w-[230px] overflow-hidden">
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: started ? '0%' : '-100%' }}
          transition={{ duration: 3.8, ease: stepped }}
          onAnimationComplete={() => started && setDone(true)}
        >
          <div
            role="button"
            tabIndex={0}
            aria-label="Buka cerita dari nota"
            onClick={() => done && setOpen(true)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && done && setOpen(true)}
            className="bg-[#fffdf8] px-4 pb-9 pt-4 font-mono text-[12px] leading-snug text-[#2d2638]"
            style={{ clipPath: ZIG }}
          >
            <p className="text-center text-[13px] font-bold tracking-wider">{R.store}</p>
            <p className="text-center">{R.city}</p>
            <Dash />
            <div className="flex justify-between"><span>Tanggal</span><span>{R.date}</span></div>
            <div className="flex justify-between"><span>Bagian</span><span>{R.part}</span></div>
            <Dash />
            {R.items.map(([n, q]) => (
              <div key={n} className="flex justify-between"><span>{n}</span><span>{q}</span></div>
            ))}
            <Dash />
            <div className="flex justify-between font-bold"><span>TOTAL</span><span>{R.total}</span></div>
            <p className="mt-2 text-center text-[10.5px] italic opacity-80">{R.note}</p>
            <button
              type="button"
              aria-label="Kode batang"
              onClick={(e) => {
                e.stopPropagation()
                setEgg(true)
              }}
              className="mt-3 flex h-11 w-full items-stretch justify-center"
            >
              {BARS.map((b, i) => (
                <span key={i} className="bg-[#2d2638]" style={{ width: b.w, marginRight: b.g }} />
              ))}
            </button>
          </div>
        </motion.div>
      </div>

      <div className="mt-3 h-8 text-center">
        <AnimatePresence mode="wait">
          {egg ? (
            <motion.p key="egg" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="inline-block rounded-full bg-[#2d2638] px-3 py-1 text-xs text-white">
              {R.egg}
            </motion.p>
          ) : (
            <motion.p key="hint" style={{ color: ink }} animate={{ opacity: done ? 1 : 0 }} className="text-sm">
              {R.hint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={S.title}
                initial={{ scale: 0.85, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 22, stiffness: 260 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm rounded-3xl bg-[#fffdf8] p-6 text-[#2d2638] shadow-2xl"
              >
                <h3 className="font-display text-2xl font-extrabold">{S.title}</h3>
                {S.paragraphs.map((p) => (
                  <p key={p} className="mt-3 leading-relaxed">{p}</p>
                ))}
                <button type="button" onClick={() => setOpen(false)} className="mt-5 h-11 w-full rounded-full bg-lilac-500 font-semibold text-white">
                  Tutup
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  )
}