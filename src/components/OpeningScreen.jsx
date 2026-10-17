import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Cat, Koala } from './Characters.jsx'
import CodeForm from './CodeForm.jsx'

const float = (delay = 0) => ({
  animate: { y: [0, -10, 0], rotate: [-2, 2, -2] },
  transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay },
})

export default function OpeningScreen({ onStart }) {
  const [showForm, setShowForm] = useState(false)
  const [mood, setMood] = useState('happy')

  useEffect(() => {
    const t = setTimeout(() => setShowForm(true), 3800) // ±4 detik
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.main
      className="screen bg-gradient-to-b from-lilac-100 via-lilac-200 to-lilac-300"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* awan lembut (statis, ringan) */}
      <div className="pointer-events-none absolute -left-10 top-16 h-16 w-52 rounded-full bg-white/50 blur-2xl" />
      <div className="pointer-events-none absolute -right-12 top-80 h-20 w-60 rounded-full bg-white/45 blur-2xl" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-md flex-col items-center px-6 pt-[12svh] text-center">
        <motion.h1
          className="font-display text-[3.4rem] italic leading-none"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          Happy Anniversary
        </motion.h1>

        <motion.p
          className="mt-6 font-display text-[2.6rem] italic text-white"
          initial={{ opacity: 0, textShadow: '0 0 0px #fff' }}
          animate={{
            opacity: 1,
            textShadow: ['0 0 0px #fff', '0 0 24px #fff', '0 0 14px #c7a8ff'],
          }}
          transition={{ duration: 1.4, delay: 1.5 }}
        >
          Sayangg
        </motion.p>

        <div className="mt-8 flex items-end justify-center gap-4">
          <motion.div
            initial={{ x: -170, y: 30, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.3, ease: 'easeOut' }}
          >
            <motion.div {...float(0)}>
              <Koala mood={mood} size={112} />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ x: 170, y: 30, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.3, ease: 'easeOut' }}
          >
            <motion.div {...float(0.4)}>
              <Cat mood={mood} size={112} />
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-10 min-h-[260px] w-full">
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <CodeForm onMood={setMood} onStart={onStart} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.main>
  )
}
