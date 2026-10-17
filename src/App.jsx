import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import OpeningScreen from './components/OpeningScreen.jsx'
import IntroScreen from './components/IntroScreen.jsx'

export default function App() {
  const [stage, setStage] = useState('opening') // 'opening' -> 'intro' -> timeline (Tahap 3)

  return (
    <AnimatePresence mode="wait">
      {stage === 'opening' && <OpeningScreen key="opening" onStart={() => setStage('intro')} />}
      {stage === 'intro' && <IntroScreen key="intro" />}
    </AnimatePresence>
  )
}
