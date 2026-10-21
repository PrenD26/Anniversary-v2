import { useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { SEPTEMBER } from '../data/september.js'
import { SkyContext } from './SkyBackground.jsx'

const SPOTS = [
  { x: -70, y: 10, r: -9 },
  { x: 60, y: 0, r: 8 },
  { x: -45, y: 120, r: -4 },
  { x: 65, y: 135, r: 6 },
  { x: 0, y: 70, r: -1 },
]

function Img({ p, i, className }) {
  const [bad, setBad] = useState(false)
  if (bad) {
    return (
      <div className={`flex flex-col items-center justify-center bg-lilac-200 px-2 text-center text-xs text-ink ${className}`}>
        <b>Foto {i + 1}</b>
        <span className="mt-1 break-all opacity-70">{p.src}</span>
      </div>
    )
  }
  return <img src={p.src} alt={p.caption} onError={() => setBad(true)} draggable={false} className={`object-cover ${className}`} />
}

export default function Gallery() {
  const { photos, funFacts } = SEPTEMBER
  const { ink } = useContext(SkyContext)
  const [sel, setSel] = useState(null)
  const [fact, setFact] = useState(-1)

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[400px] w-full max-w-[320px]">
        {photos.map((p, i) => {
          const s = SPOTS[i % SPOTS.length]
          return (
            <motion.button
              key={p.src}
              type="button"
              layoutId={`photo-${i}`}
              onClick={() => setSel(i)}
              whileTap={{ scale: 0.96 }}
              aria-label={`Perbesar foto ${i + 1}`}
              className="absolute left-1/2 w-[170px] bg-white p-2 pb-8 shadow-xl"
              style={{ marginLeft: -85 + s.x, top: s.y, rotate: s.r, zIndex: i }}
            >
              <Img p={p} i={i} className="h-[170px] w-full" />
            </motion.button>
          )
        })}
      </div>

      <motion.p style={{ color: ink }} className="mt-2 text-sm">Ketuk foto untuk memperbesar</motion.p>

      <button
        type="button"
        onClick={() => setFact((f) => (f + 1) % funFacts.length)}
        className="mt-4 rounded-full bg-white/50 px-4 py-2 text-sm font-semibold text-[#3b2a63] backdrop-blur-sm"
      >
        Tahukah kamu?
      </button>
      <p className="mt-3 min-h-[3rem] max-w-[280px] text-center text-sm text-[#3b2a63]">{fact >= 0 ? funFacts[fact] : ''}</p>

      {createPortal(
        <AnimatePresence>
          {sel !== null && (
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSel(null)}
            >
              <motion.div
                layoutId={`photo-${sel}`}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm bg-white p-3 pb-4 shadow-2xl"
              >
                <Img p={photos[sel]} i={sel} className="aspect-[4/5] w-full" />
                <p className="mt-3 text-center font-['Dancing_Script',cursive] text-2xl text-ink">{photos[sel].caption}</p>
              </motion.div>
              <button
                type="button"
                aria-label="Tutup foto"
                onClick={() => setSel(null)}
                className="absolute right-4 top-4 h-11 w-11 rounded-full bg-white/90 text-2xl leading-none text-ink"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  )
}