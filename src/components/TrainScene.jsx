import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const TILE = 520
const COPIES = 6
const HEART = 'M20 35C5 25 3 14 10 10C15 7.5 19 10 20 14C21 10 25 7.5 30 10C37 14 35 25 20 35Z'

// Satu lapisan latar yang diulang dan bergeser; beda durasi = efek kedalaman (parallax)
function Layer({ duration, running, className, children }) {
  return (
    <div
      className={`drift absolute left-0 flex ${className}`}
      style={{ width: TILE * COPIES, animationDuration: `${duration}s`, animationPlayState: running ? 'running' : 'paused' }}
    >
      {Array.from({ length: COPIES }, (_, i) => (
        <div key={i} className="shrink-0" style={{ width: TILE }}>
          {children}
        </div>
      ))}
    </div>
  )
}

const Hills = (
  <svg width={TILE} height="96" viewBox="0 0 520 96" className="block" aria-hidden="true">
    <path d="M0 70Q70 14 140 56T270 50T400 58T520 70V96H0Z" fill="#cdbde4" />
    <ellipse cx="60" cy="90" rx="30" ry="14" fill="#a48ed0" />
    <ellipse cx="96" cy="92" rx="20" ry="11" fill="#8f78c0" />
    <ellipse cx="300" cy="91" rx="34" ry="13" fill="#a48ed0" />
    <ellipse cx="340" cy="92" rx="22" ry="10" fill="#8f78c0" />
  </svg>
)

const Poles = (
  <svg width={TILE} height="110" viewBox="0 0 520 110" style={{ overflow: 'visible' }} className="block" aria-hidden="true">
    {[8, 268].map((x) => (
      <g key={x}>
        <rect x={x} y="16" width="4" height="94" fill="#4b3a78" />
        <rect x={x - 8} y="22" width="20" height="3" rx="1.5" fill="#4b3a78" />
      </g>
    ))}
    <path d="M10 26Q140 52 270 26Q400 52 530 26" stroke="#4b3a78" strokeWidth="1.4" fill="none" />
  </svg>
)

const Track = (
  <svg width={TILE} height="34" viewBox="0 0 520 34" className="block" aria-hidden="true">
    <rect width="520" height="5" fill="#4b3a78" />
    <rect y="5" width="520" height="2" fill="#d9cbe8" opacity=".6" />
    <rect y="7" width="520" height="27" fill="#4b3a78" />
    {Array.from({ length: 13 }, (_, i) => (
      <rect key={i} x={i * 40 + 4} y="13" width="18" height="5" rx="1" fill="#2a1f45" />
    ))}
    {Array.from({ length: 26 }, (_, i) => (
      <circle key={i} cx={i * 20 + 8} cy={26 + (i % 2) * 4} r="1.2" fill="#8a76b8" />
    ))}
  </svg>
)

function Wheel({ cx, running }) {
  return (
    <g className="wheel" style={{ animationPlayState: running ? 'running' : 'paused' }}>
      <circle cx={cx} cy="52" r="5" fill="#2a1f45" />
      <path d={`M${cx - 4} 52h8`} stroke="#c9a2d8" strokeWidth="1.2" />
    </g>
  )
}

function Carriage({ x, running }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x="2" y="6" width="100" height="40" rx="4" fill="#c9a2d8" />
      <rect x="2" y="28" width="100" height="5" fill="#8a62b0" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={10 + i * 22} y="13" width="16" height="11" rx="2" fill="#fff3d9" />
      ))}
      <text x="10" y="42" fontSize="6" fontWeight="700" fill="#3b2a63" fontFamily="DM Sans, sans-serif">
        SURABAYA
      </text>
      {[20, 34, 70, 84].map((cx) => (
        <Wheel key={cx} cx={cx} running={running} />
      ))}
    </g>
  )
}

export default function TrainScene({ running }) {
  const [puffs, setPuffs] = useState([])
  const id = useRef(0)

  const honk = () => {
    const k = ++id.current
    setPuffs((p) => [...p, k])
    navigator.vibrate?.(15)
    setTimeout(() => setPuffs((p) => p.filter((v) => v !== k)), 1700)
  }

  return (
    <div className="relative h-[190px] w-full overflow-hidden">
      <Layer duration={40} running={running} className="bottom-[34px]">{Hills}</Layer>
      <Layer duration={6} running={running} className="bottom-[34px]">{Poles}</Layer>

      <motion.div
        className="absolute bottom-[31px] left-1/2 -ml-[160px] w-[320px]"
        animate={running ? { y: [0, -1.5, 0] } : { y: 0 }}
        transition={running ? { duration: 0.55, repeat: Infinity } : { duration: 0.3 }}
      >
        <svg viewBox="0 0 330 60" className="block w-full" aria-label="Kereta api">
          <rect x="102" y="36" width="6" height="3" fill="#2a1f45" />
          <rect x="208" y="36" width="8" height="3" fill="#2a1f45" />
          <Carriage x={0} running={running} />
          <Carriage x={108} running={running} />
          <g transform="translate(216 0)">
            <rect x="0" y="10" width="110" height="36" rx="6" fill="#3b2a63" />
            <rect x="0" y="27" width="110" height="4" fill="#d9c6ef" />
            <rect x="6" y="16" width="14" height="9" rx="2" fill="#e6dcff" />
            <rect x="84" y="16" width="14" height="9" rx="2" fill="#e6dcff" />
            <rect x="50" y="2" width="12" height="8" rx="2" fill="#2a1f45" />
            <rect x="70" y="4" width="10" height="6" rx="2" fill="#2a1f45" />
            <circle cx="108" cy="38" r="2.5" fill="#ffe27a" />
            {[16, 30, 76, 90].map((cx) => (
              <Wheel key={cx} cx={cx} running={running} />
            ))}
          </g>
        </svg>

        {/* ketuk lokomotif: asap berbentuk hati */}
        <button type="button" onClick={honk} aria-label="Bunyikan klakson" className="absolute right-0 top-0 h-full w-[36%]" />
        {puffs.map((k) => (
          <motion.svg
            key={k}
            width="22"
            height="22"
            viewBox="0 0 40 40"
            className="pointer-events-none absolute"
            style={{ left: '82%', top: 0 }}
            initial={{ opacity: 1, y: 0, x: 0, scale: 0.5 }}
            animate={{ opacity: 0, y: -80, x: ((k % 3) - 1) * 18, scale: 1.3 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            aria-hidden="true"
          >
            <path d={HEART} fill="#ff8fb1" />
          </motion.svg>
        ))}
      </motion.div>

      <Layer duration={5} running={running} className="bottom-0">{Track}</Layer>
    </div>
  )
}