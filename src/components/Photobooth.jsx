import { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { JANUARY } from '../data/january.js'
import { SkyContext } from './SkyBackground.jsx'
import { Cat, Koala } from './Characters.jsx'
import PhotoFrame from './Photo.jsx'

const wait = (ms) => new Promise((r) => setTimeout(r, ms))
const EASE = [0.22, 1, 0.36, 1]

export default function Photobooth() {
  const B = JANUARY.booth
  const { ink } = useContext(SkyContext)
  const [color, setColor] = useState(B.colors[0].c)
  const [phase, setPhase] = useState('idle') // idle | shooting | done
  const [count, setCount] = useState(0)
  const [flash, setFlash] = useState(0)
  const shooting = phase === 'shooting'
  const done = phase === 'done'

  const shoot = async () => {
    if (shooting) return
    setPhase('shooting')
    await wait(900)
    for (let n = 3; n >= 1; n--) {
      setCount(n)
      await wait(700)
    }
    setCount(0)
    for (let k = 0; k < B.photos.length; k++) {
      setFlash((f) => f + 1)
      navigator.vibrate?.(20)
      await wait(650)
    }
    await wait(300)
    setPhase('done')
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-[250px]">
        <div className="rounded-t-2xl bg-[#ff8fb1] py-1.5 text-center text-sm font-bold leading-6 tracking-[0.2em] text-white">PHOTOBOOTH</div>
        <div className="relative h-[270px] overflow-hidden border-x-[10px] border-[#6a4cb4] bg-[#2a1f45]">
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
            <Koala size={64} />
            <Cat size={64} />
          </div>
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-b from-[#c9a2d8] to-[#8a62b0]"
            animate={{ width: shooting ? '50%' : '22%' }}
            transition={{ duration: 0.7 }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 bg-gradient-to-b from-[#c9a2d8] to-[#8a62b0]"
            animate={{ width: shooting ? '50%' : '22%' }}
            transition={{ duration: 0.7 }}
          />
          {count > 0 && (
            <motion.span
              key={count}
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 z-20 flex items-center justify-center font-display text-8xl font-extrabold text-white"
            >
              {count}
            </motion.span>
          )}
          {flash > 0 && (
            <motion.div
              key={flash}
              className="pointer-events-none absolute inset-0 z-30 bg-white"
              initial={{ opacity: 0.95 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </div>
        <div className="h-3 rounded-b-md bg-[#6a4cb4]" />
      </div>

      <div className="mt-3 h-2.5 w-[200px] rounded-full bg-[#150e2e]" />

      {/* strip foto: tingginya 0 sampai foto jadi, lalu meluncur keluar dari slot */}
      <motion.div
        className="w-[210px] overflow-hidden"
        initial={false}
        animate={{ height: done ? 'auto' : 0 }}
        transition={{ duration: 2.4, ease: EASE }}
      >
        <motion.div
          className="mx-auto w-[190px] p-2.5 pb-3 shadow-2xl"
          style={{ background: color }}
          initial={false}
          animate={{ y: done ? '0%' : '-100%' }}
          transition={{ duration: 2.4, ease: EASE }}
        >
          <div className="flex flex-col gap-2">
            {B.photos.map((p, i) => (
              <PhotoFrame
                key={p.src}
                photo={p}
                label={`foto photobooth ${i + 1}`}
                frameClass="w-full !bg-transparent"
                imgClass="h-[132px] w-full"
              />
            ))}
          </div>
          <p className="mt-2 text-center font-['Dancing_Script',cursive] text-xl text-[#2d2638]">{B.stripCaption}</p>
        </motion.div>
      </motion.div>

      {!done ? (
        <div className="relative z-10 mt-5 flex flex-col items-center">
          <div className="flex gap-3">
            {B.colors.map((c) => (
              <button
                key={c.c}
                type="button"
                disabled={shooting}
                onClick={() => setColor(c.c)}
                aria-label={`Bingkai ${c.name}`}
                className="h-9 w-9 rounded-full border-2 border-white/70"
                style={{ background: c.c, outline: color === c.c ? '3px solid #fff' : 'none', outlineOffset: 2 }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={shoot}
            disabled={shooting}
            className="mt-4 h-14 w-48 rounded-full bg-gradient-to-r from-lilac-500 to-[#c47ad9] text-lg font-semibold text-white shadow-[0_0_24px_rgba(178,132,255,.45)] disabled:opacity-50"
          >
            {B.button}
          </button>
          <motion.p style={{ color: ink }} className="mt-3 text-sm">{B.hint}</motion.p>
        </div>
      ) : (
        <div className="relative z-10 mt-5 flex flex-col items-center px-6 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }} style={{ color: ink }} className="max-w-[290px] leading-relaxed">
            {B.story}
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }} style={{ color: ink }} className="mt-2 text-xs opacity-80">
            {B.zoomHint}
          </motion.p>
          <button type="button" onClick={() => setPhase('idle')} className="mt-3 text-sm underline" style={{ color: ink }}>
            Ulangi
          </button>
        </div>
      )}
    </div>
  )
}