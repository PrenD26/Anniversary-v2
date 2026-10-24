import { useMemo } from 'react'
import { motion, useTransform } from 'framer-motion'

const rng = (seed) => {
  let s = seed
  return () => (s = (s * 16807) % 2147483647) / 2147483647
}

export default function DayAtmosphere({ progress }) {
  const hazeOp = useTransform(progress, [0, 0.25, 0.5, 0.8, 1], [0.9, 0.8, 0.6, 0.4, 0])
  const raysOp = useTransform(progress, [0, 0.2, 0.6, 0.9], [0.5, 0.4, 0.18, 0])
  const warmOp = useTransform(progress, [0, 0.4, 0.75], [0.5, 0.32, 0.16])

  const dust = useMemo(() => {
    const r = rng(777)
    return Array.from({ length: 38 }, (_, i) => ({
      x: 10 + r() * 80,
      y: 58 + r() * 26,
      s: 0.6 + r() * 1.2,
      o: 0.08 + r() * 0.14,
      d: r() * 12,
    }))
  }, [])

  const rays = useMemo(() => {
    const r = rng(888)
    return Array.from({ length: 7 }, (_, i) => ({
      x: 25 + r() * 50,
      rot: -14 + r() * 28,
      w: 14 + r() * 22,
      h: 38 + r() * 26,
      o: 0.05 + r() * 0.09,
    }))
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        style={{ opacity: warmOp }}
        className="absolute -bottom-[18%] left-1/2 h-[46%] w-[160%] -translate-x-1/2"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(255,196,140,0.38) 0%, rgba(255,178,120,0.22) 28%, rgba(255,160,110,0.12) 48%, rgba(255,150,100,0) 78%)',
            filter: 'blur(26px)',
          }}
        />
      </motion.div>

      <motion.div style={{ opacity: hazeOp }} className="absolute inset-0">
        <div
          className="absolute inset-x-0 bottom-[-10%] h-[62%]"
          style={{
            background:
              'linear-gradient(180deg, rgba(190,220,255,0) 0%, rgba(170,210,255,0.14) 38%, rgba(150,198,255,0.22) 72%, rgba(140,190,255,0.28) 100%)',
            filter: 'blur(14px)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-[-6%] h-[38%]"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(235,245,255,0.16) 0%, rgba(210,230,255,0.1) 36%, rgba(190,220,255,0) 78%)',
            filter: 'blur(18px)',
          }}
        />
      </motion.div>

      <motion.div style={{ opacity: raysOp }} className="absolute inset-0">
        {rays.map((r, i) => (
          <div
            key={i}
            className="absolute -top-[10%]"
            style={{
              left: `${r.x}%`,
              width: `${r.w}%`,
              height: `${r.h}%`,
              transform: `translateX(-50%) rotate(${r.rot}deg)`,
              background:
                'conic-gradient(from 180deg at 50% 0%, rgba(255,232,200,0) 0deg, rgba(255,236,210,0.12) 8deg, rgba(255,240,220,0.08) 16deg, rgba(255,240,220,0) 28deg)',
              filter: 'blur(16px)',
              mixBlendMode: 'screen',
              opacity: r.o,
            }}
          />
        ))}
      </motion.div>

      <motion.div style={{ opacity: hazeOp }} className="absolute inset-0">
        {dust.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s,
              height: p.s,
              background: 'radial-gradient(circle, rgba(255,248,235,0.9) 0%, rgba(255,248,235,0) 70%)',
              opacity: p.o,
              filter: 'blur(1px)',
              animation: 'moteRise 18s linear infinite',
              animationDelay: `${p.d}s`,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
