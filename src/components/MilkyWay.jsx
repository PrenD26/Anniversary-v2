import { useMemo } from 'react'

const rng = (seed) => {
  let s = seed
  return () => (s = (s * 16807) % 2147483647) / 2147483647
}

// urutan lapisan: paling atas dulu
const LAYERS = [
  'radial-gradient(ellipse 40% 5% at 52% 53%, rgba(14,8,40,.45), rgba(14,8,40,0) 80%)', // jalur debu gelap
  'radial-gradient(ellipse 24% 7% at 55% 48%, rgba(255,245,230,.30), rgba(255,245,230,0) 75%)', // inti terang
  'radial-gradient(ellipse 30% 13% at 70% 54%, rgba(130,190,255,.22), rgba(130,190,255,0) 70%)', // kabut biru
  'radial-gradient(ellipse 36% 15% at 38% 47%, rgba(255,170,230,.24), rgba(255,170,230,0) 70%)', // kabut pink
  'radial-gradient(ellipse 48% 28% at 50% 50%, rgba(170,140,255,.30), rgba(170,140,255,.1) 45%, rgba(170,140,255,0) 72%)', // cahaya lilac luas
].join(',')

export default function MilkyWay() {
  const dust = useMemo(() => {
    const r = rng(11)
    return Array.from({ length: 200 }, (_, i) => ({
      x: 6 + r() * 88,
      y: 50 + (r() + r() + r() - 1.5) * 26, // titik berkumpul di sekitar tengah pita
      s: 0.8 + r() * 1.8,
      o: 0.35 + r() * 0.6,
      c: i % 5 === 0 ? '#ffd9f5' : i % 4 === 0 ? '#cfe2ff' : '#ffffff',
      tw: i % 6 === 0,
      d: r() * 4,
      t: 2.5 + r() * 3,
    }))
  }, [])

  return (
    <div className="pointer-events-none absolute left-1/2 top-[38%]" style={{ width: '170vmax', height: '44vmax', transform: 'translate(-50%, -50%) rotate(-32deg)' }} aria-hidden="true">
      <div className="absolute inset-0" style={{ background: LAYERS }} />
      {dust.map((p, i) => (
        <span
          key={i}
          className={p.tw ? 'star twinkle' : 'star'}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, background: p.c, opacity: p.o, animationDelay: `${p.d}s`, animationDuration: `${p.t}s` }}
        />
      ))}
    </div>
  )
}