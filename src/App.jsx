import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import OpeningScreen from './components/OpeningScreen.jsx'
import Journey from './components/Journey.jsx'
import { playTrack } from './audio/player.js'

function goFullscreen() {
  const el = document.documentElement
  const req = el.requestFullscreen || el.webkitRequestFullscreen
  if (!req) return
  try {
    const p = req.call(el)
    if (p && typeof p.catch === 'function') p.catch(() => {})
  } catch {
    /* browser tidak mendukung, abaikan */
  }
}

export default function App() {
  const [stage, setStage] = useState('opening')

  const handleStart = () => {
    requestAnimationFrame(() => {
      goFullscreen()
      setStage('intro')
    })
    playTrack('/audio/intro.mp3')
  }

  return (
    <>
      {stage === 'intro' && <Journey />}

      <AnimatePresence>
        {stage === 'opening' && (
          <motion.div
            key="opening"
            className="fixed inset-0 z-50"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
          >
            <OpeningScreen onStart={handleStart} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
