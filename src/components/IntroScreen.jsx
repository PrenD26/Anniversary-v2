import { motion, useScroll, useTransform } from 'framer-motion'
import Stars from './Stars.jsx'

// Muncul dari bawah dengan jarak berbeda per lapisan = efek kedalaman (parallax)
const rise = (y, delay, duration = 1.8) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
})

const EYES = { fill: 'none', stroke: '#2a1f45', strokeWidth: 2.4, strokeLinecap: 'round' }

function Moon() {
  return (
    <svg
      viewBox="0 0 200 190"
      role="img"
      aria-label="Koala dan kucing oyen tidur di atas bulan sabit"
      style={{ width: 'min(82vw, 330px, 44svh)', height: 'auto', filter: 'drop-shadow(0 0 28px rgba(245,238,250,.3))' }}
    >
      {/* koala */}
      <circle cx="62" cy="68" r="11" fill="#bdb5dd" />
      <circle cx="98" cy="68" r="11" fill="#bdb5dd" />
      <circle cx="62" cy="68" r="6" fill="#f6e9f6" />
      <circle cx="98" cy="68" r="6" fill="#f6e9f6" />
      <circle cx="80" cy="90" r="27" fill="#bdb5dd" />
      <path d="M69 87q4 4 9 0M83 87q4 4 9 0" {...EYES} />
      <ellipse cx="80" cy="98" rx="3.5" ry="5" fill="#2a1f45" />
      <circle cx="67" cy="97" r="3.5" fill="#f7a8c8" opacity=".6" />
      <circle cx="93" cy="97" r="3.5" fill="#f7a8c8" opacity=".6" />
      {/* kucing oyen */}
      <polygon points="108,76 112,52 128,68" fill="#f5993a" />
      <polygon points="146,76 142,52 126,68" fill="#f5993a" />
      <circle cx="127" cy="92" r="23" fill="#f5993a" />
      <path d="M122 72v6M127 71v7M132 72v6" stroke="#e0782a" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M115 90q4 4 8 0M131 90q4 4 8 0" {...EYES} />
      <path d="M124 98h6l-3 3z" fill="#f08aa8" />
      <circle cx="113" cy="99" r="3.2" fill="#f7a8c8" opacity=".6" />
      <circle cx="141" cy="99" r="3.2" fill="#f7a8c8" opacity=".6" />
      {/* bulan sabit (menutupi bagian bawah kepala) */}
      <path d="M44.5 32.4A80 80 0 1 0 155.5 32.4A62 62 0 1 1 44.5 32.4Z" fill="#f5eefa" />
    </svg>
  )
}

export default function IntroScreen() {
  const { scrollY } = useScroll()
  // parallax saat digulir: makin jauh lapisannya, makin lambat bergerak
  const starsY = useTransform(scrollY, [0, 800], [0, 480])
  const moonY = useTransform(scrollY, [0, 800], [0, 280])
  const hintOpacity = useTransform(scrollY, [0, 160], [1, 0])

  return (
    <motion.div className="relative">
      <section className="relative h-[100svh] overflow-hidden">
        <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#7a5cc4]/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-[#c47ad9]/15 blur-3xl" />


        {/* lapisan 2: bulan + koala + kucing */}
        <motion.div style={{ y: moonY }} className="absolute inset-x-0 top-[13svh] flex justify-center">
          <motion.div {...rise(170, 0.3, 2.2)}>
            <motion.div
              className="relative"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Moon />
              {['z', 'Z'].map((z, i) => (
                <motion.span
                  key={z}
                  className="absolute font-display text-2xl font-bold text-lilac-200"
                  style={{ left: `${40 + i * 10}%`, top: '20%' }}
                  animate={{ y: [0, -28], opacity: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 2.5 + i * 1.5 }}
                >
                  {z}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

    {/* lapisan 3: teks (paling dekat), menempel tepat di bawah bulan */}
<div
  className="absolute inset-x-0 px-5 text-center"
  style={{ top: 'calc(13svh + min(82vw, 330px, 44svh) * 0.9 + 0.5rem)' }}
>
  <motion.p {...rise(240, 1.0)} className="font-script text-[1.6rem] leading-tight text-[#d9a9ea]">
    untuk wanita yang aku sayangi
  </motion.p>
  <motion.h2
    {...rise(240, 1.3)}
    className="mt-1 font-script text-[2rem] font-semibold leading-tight text-[#ecc6f7]"
    style={{ textShadow: '0 0 18px rgba(217,169,234,.55)' }}
  >
    Kyla Salwa Annisa
  </motion.h2>
  <motion.h1
    {...rise(260, 1.8)}
    className="mt-5 font-display text-[clamp(2.7rem,13.5vw,3.8rem)] font-extrabold leading-[1.05] text-white"
    style={{ textShadow: '0 0 28px rgba(183,140,255,.7)' }}
  >
    Happy Anniversary
  </motion.h1>
</div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute inset-x-0 bottom-[3svh] text-center text-sm text-lilac-200"
        >
          Gulir ke bawah
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            ⌄
          </motion.div>
        </motion.div>
      </section>
</motion.div>
  )
}