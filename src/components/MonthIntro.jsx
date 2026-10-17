import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const HILLS = [
  { c: '#8f78c9', y: [120, 0] },
  { c: '#5d4a9e', y: [220, 0] },
  { c: '#3a2d73', y: [340, 0] },
]

function HillLayer({ c, y, progress }) {
  const ty = useTransform(progress, [0, 1], y)
  return (
    <motion.svg style={{ y: ty }} viewBox="0 0 390 200" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[34svh] w-full" aria-hidden="true">
      <path d="M0 80Q90 10 200 60T390 40V200H0Z" fill={c} />
    </motion.svg>
  )
}

export default function MonthIntro({ height, kicker, title, subtitle }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const titleY = useTransform(scrollYProgress, [0, 1], [90, 0])
  return (
    <section ref={ref} className="relative overflow-hidden" style={{ height: `${height}svh` }}>
      <motion.div style={{ y: titleY }} className="px-6 pt-[22svh] text-center text-white">
        <p className="text-base text-lilac-100">{kicker}</p>
        <h2 className="mt-2 font-display text-[clamp(2.8rem,15vw,4.2rem)] font-extrabold leading-none" style={{ textShadow: '0 0 24px rgba(183,140,255,.7)' }}>
          {title}
        </h2>
        {subtitle && <p className="mt-3 font-['Dancing_Script',cursive] text-3xl text-[#f3d9ff]">{subtitle}</p>}
      </motion.div>
      {HILLS.map((h) => (
        <HillLayer key={h.c} c={h.c} y={h.y} progress={scrollYProgress} />
      ))}
    </section>
  )
}