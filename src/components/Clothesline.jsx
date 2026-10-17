import { useContext } from 'react'
import { motion } from 'framer-motion'
import { NOVEMBER } from '../data/november.js'
import { SkyContext } from './SkyBackground.jsx'
import PhotoFrame from './Photo.jsx'

const ROPE = 'M0 6Q180 26 360 6'
const ROWS = [
  [{ i: 0, x: 6, top: 10 }, { i: 1, x: 128, top: 16 }, { i: 2, x: 250, top: 10 }],
  [{ i: 3, x: 66, top: 13 }, { i: 4, x: 190, top: 13 }],
]

export default function Clothesline() {
  const P = NOVEMBER.photos
  const { ink } = useContext(SkyContext)

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[360px]">
        {ROWS.map((row, r) => (
          <div key={r} className="relative h-[172px]">
            <svg viewBox="0 0 360 30" className="absolute inset-x-0 top-0 w-full" aria-hidden="true">
              <path d={ROPE} fill="none" stroke="#8a7a6a" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {row.map(({ i, x, top }) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: x, top, transformOrigin: '50% 0' }}
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 3 + i * 0.45, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              >
                <span className="absolute -top-2 left-1/2 z-10 -ml-1 h-4 w-2 rounded bg-[#e7b863]" />
                <PhotoFrame
                  photo={P.list[i]}
                  label={`foto pantai ${i + 1}`}
                  frameClass="w-[104px] p-1.5 pb-6 shadow-lg"
                  imgClass="h-[104px] w-full"
                />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
      <motion.p style={{ color: ink }} className="mt-2 text-sm">{P.hint}</motion.p>
    </div>
  )
}