import { useContext, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { SEPTEMBER } from '../data/september.js'
import { SkyContext } from './SkyBackground.jsx'

const SIZE = 76

export default function StarCatch() {
  const S = SEPTEMBER.secret
  const { ink } = useContext(SkyContext)
  const arena = useRef(null)
  const inView = useInView(arena, { amount: 0.4 })
  const [pos, setPos] = useState({ x: 20, y: 20 })
  const [caught, setCaught] = useState(false)
  const [misses, setMisses] = useState(0)

  useEffect(() => {
    if (caught || !inView) return
    const move = () => {
      const el = arena.current
      if (!el) return
      setPos({ x: Math.random() * (el.clientWidth - SIZE), y: Math.random() * (el.clientHeight - SIZE) })
    }
    move()
    const id = setInterval(move, 750)
    return () => clearInterval(id)
  }, [caught, inView])

  const hint = misses >= 8 ? S.hintMiss2 : misses >= 3 ? S.hintMiss : S.hintStart

  return (
    <div className="mx-auto mt-8 w-full max-w-sm">
      <div
        ref={arena}
        onClick={() => !caught && setMisses((m) => m + 1)}
        className="relative h-[52svh] min-h-[340px] w-full"
      >
        {!caught && (
          <motion.button
            type="button"
            aria-label="Tangkap bintang"
            onClick={(e) => {
              e.stopPropagation()
              setCaught(true)
            }}
            animate={{ x: pos.x, y: pos.y }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute left-0 top-0 flex items-center justify-center rounded-full"
            style={{ width: SIZE, height: SIZE }}
          >
            <motion.svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{ filter: 'drop-shadow(0 0 10px #fff6c9)' }}
            >
              <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.8-6.3 3.8 1.7-7L2 9.2l7.1-.6z" fill="#ffe27a" />
            </motion.svg>
          </motion.button>
        )}

        {caught &&
          Array.from({ length: 10 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-2 w-2 rounded-full bg-[#ffe27a]"
              style={{ left: pos.x + SIZE / 2, top: pos.y + SIZE / 2 }}
              initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              animate={{ opacity: 0, x: Math.cos((i / 10) * 6.28) * 90, y: Math.sin((i / 10) * 6.28) * 90, scale: 0 }}
              transition={{ duration: 0.9 }}
            />
          ))}

        {caught && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="absolute inset-x-2 top-1/2 -translate-y-1/2 rounded-3xl border border-white/30 bg-white/15 p-6 text-center text-white backdrop-blur-md"
          >
            <p className="font-display text-xl font-extrabold">{S.title}</p>
            <p className="mt-3 font-['Dancing_Script',cursive] text-[1.7rem] leading-snug">{S.text}</p>
          </motion.div>
        )}
      </div>
      {!caught && <motion.p style={{ color: ink }} className="mt-3 text-center text-sm">{hint}</motion.p>}
    </div>
  )
}