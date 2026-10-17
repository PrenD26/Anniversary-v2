import { useContext, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { DECEMBER } from '../data/december.js'
import { H } from '../timeline.js'
import { SkyContext } from './SkyBackground.jsx'
import StoryDialog from './StoryDialog.jsx'
import PhotoFrame from './Photo.jsx'

const SLIDE = 230
const GAP = 24
const DROPS = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37 + 8) % 96}%`,
  h: 14 + (i % 4) * 6,
  d: 1.3 + (i % 5) * 0.35,
  delay: (i * 0.37) % 2,
}))
const STREAKS = [12, 28, 46, 63, 78, 90].map((t, i) => ({ top: `${t}%`, d: 0.9 + (i % 3) * 0.35, delay: i * 0.3 }))

export default function TrainWindow() {
  const W = DECEMBER.window
  const { ink } = useContext(SkyContext)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const n = W.photos.length
  const x = useTransform(scrollYProgress, [0.1, 0.9], [0, -(n - 1) * (SLIDE + GAP)])
  const [open, setOpen] = useState(false)

  return (
    <section ref={ref} className="relative" style={{ minHeight: `${H['des-jendela']}svh` }}>
      <div className="sticky top-[10svh] flex flex-col items-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2 }}
          style={{ color: ink }}
          className="text-center font-display text-[clamp(2.2rem,10vw,3rem)] font-extrabold leading-none"
        >
          {W.title}
        </motion.h2>

        <div className="mt-5 w-full max-w-[340px]">
          <div className="relative h-[250px] overflow-hidden rounded-[2rem] border-[10px] border-[#8f78c9] bg-gradient-to-b from-[#a9c9f2] to-[#d6e6fa] shadow-2xl">
            <motion.div
              style={{ x, paddingLeft: `calc(50% - ${SLIDE / 2}px)`, gap: GAP }}
              className="absolute inset-y-0 left-0 flex items-center"
            >
              {W.photos.map((p, i) => (
                <div key={p.src} className="shrink-0" style={{ width: SLIDE }}>
                  <PhotoFrame
                    photo={p}
                    label={`foto Surabaya ${i + 1}`}
                    frameClass="w-full overflow-hidden rounded-xl shadow-lg"
                    imgClass="h-[190px] w-full"
                  />
                </div>
              ))}
            </motion.div>

            {/* garis laju + hujan di kaca (tidak menghalangi ketukan) */}
            <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
              {STREAKS.map((s, i) => (
                <span key={i} className="streak" style={{ top: s.top, animationDuration: `${s.d}s`, animationDelay: `${s.delay}s` }} />
              ))}
              {DROPS.map((d, i) => (
                <span key={i} className="drop" style={{ left: d.left, height: d.h, animationDuration: `${d.d}s`, animationDelay: `${d.delay}s` }} />
              ))}
              <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent" />
            </div>
          </div>
          <div className="-mx-2 h-3 rounded-b-xl bg-[#6a4cb4]" />
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-6 rounded-full bg-white/60 px-4 py-2 text-sm font-semibold text-[#3b2a63] backdrop-blur-sm"
        >
          {W.zoo.button}
        </button>
        <motion.p style={{ color: ink }} className="mt-3 text-sm">
          {W.hint}
        </motion.p>
      </div>

      <StoryDialog open={open} onClose={() => setOpen(false)} title={W.zoo.story.title} paragraphs={W.zoo.story.paragraphs} />
    </section>
  )
}