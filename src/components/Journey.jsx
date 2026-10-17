import { useContext, useEffect, useRef } from 'react'
import { motion, useInView, useScroll } from 'framer-motion'
import IntroScreen from './IntroScreen.jsx'
import SkyBackground, { SkyContext, useInk } from './SkyBackground.jsx'
import KoalaSlider from './KoalaSlider.jsx'
import Receipt from './Receipt.jsx'
import Gallery from './Gallery.jsx'
import StarCatch from './StarCatch.jsx'
import MonthIntro from './MonthIntro.jsx'
import { OktPagi, OktMomoyo, OktNiceSo, OktSore, OktUltah, OktDompet } from './October.jsx'
import { SEPTEMBER } from '../data/september.js'
import { OCTOBER } from '../data/october.js'
import { H } from '../timeline.js'
import { playTrack, stopTrack } from '../audio/player.js'
import { NovLaut, NovPantaiSand, NovSore, NovMalam } from './November.jsx'
import { NOVEMBER } from '../data/november.js'
import { DesTiket, DesJendela, DesGolden, DesSore, DesMalam } from './December.jsx'
import { DECEMBER } from '../data/december.js'

// Lagu berganti saat bagian itu melewati tengah layar (fade-out lama, fade-in baru)
function useTrackOnView(ref, src) {
  const inView = useInView(ref, { margin: '-50% 0px -50% 0px' })
  useEffect(() => {
    if (!inView) return
    if (src) playTrack(src)
    else stopTrack(1500)
  }, [inView, src])
}

const fade = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.6 }, transition: { duration: 1.2 } }
const sec = (id) => ({ minHeight: `${H[id]}svh` })

function Pagi() {
  const { ink } = useContext(SkyContext)
  return (
    <section className="relative flex flex-col items-center px-6 pt-[14svh] text-center" style={sec('sept-pagi')}>
      <motion.h2 {...fade} style={{ color: ink }} className="font-display text-[clamp(2.8rem,14vw,4rem)] font-extrabold leading-none">
        {SEPTEMBER.title}
      </motion.h2>
      <motion.p {...fade} style={{ color: ink }} className="mt-3 font-['Dancing_Script',cursive] text-3xl">
        {SEPTEMBER.subtitle}
      </motion.p>
      <div className="mt-[6svh]">
        <Receipt />
      </div>
    </section>
  )
}

function Siang() {
  const { ink } = useContext(SkyContext)
  return (
    <section className="relative px-6 pt-[12svh]" style={sec('sept-siang')}>
      <motion.h2 {...fade} style={{ color: ink }} className="mb-6 text-center font-display text-[clamp(2.2rem,10vw,3rem)] font-extrabold leading-none">
        Galeri kenangan
      </motion.h2>
      <Gallery />
    </section>
  )
}

// Sore: murni jembatan latar (biru ke ungu malam), tanpa konten
const Sore = () => <section aria-hidden="true" style={sec('sept-sore')} />

function Malam() {
  const { ink } = useContext(SkyContext)
  return (
    <section className="relative px-6 pt-[6svh]" style={sec('sept-malam')}>
      <motion.h2 {...fade} style={{ color: ink }} className="text-center font-display text-[clamp(2.2rem,10vw,3rem)] font-extrabold leading-none">
        Ada yang rahasia
      </motion.h2>
      <StarCatch />
    </section>
  )
}

export default function Journey() {
  const { scrollYProgress: progress } = useScroll()
  const ink = useInk(progress)
  const introRef = useRef(null)
  const septRef = useRef(null)
  const octRef = useRef(null)
  const novRef = useRef(null)
  const desRef = useRef(null)
  const janRef = useRef(null)

  useTrackOnView(introRef, '/audio/intro.mp3')
  useTrackOnView(septRef, SEPTEMBER.audio)
  useTrackOnView(octRef, OCTOBER.audio)
    useTrackOnView(novRef, NOVEMBER.audio)
   useTrackOnView(desRef, DECEMBER.audio)
  useTrackOnView(janRef, null) // musik Januari menyusul// musik Desember menyusul // musik November menyusul di tahap berikutnya

  return (
    <SkyContext.Provider value={{ progress, ink }}>
      <SkyBackground progress={progress} />
      <KoalaSlider progress={progress} />
      <main className="relative z-10">
        <div ref={introRef}>
          <IntroScreen />
        </div>
        <div ref={septRef}>
          <Pagi />
          <Siang />
          <Sore />
          <Malam />
        </div>
        <div ref={octRef}>
          <MonthIntro height={H['okt-title']} kicker="Bulan kedua" title={OCTOBER.title} subtitle={OCTOBER.subtitle} />
          <OktPagi />
          <OktMomoyo />
          <OktNiceSo />
          <OktSore />
          <OktUltah />
          <OktDompet />
        </div>
                <div ref={novRef}>
          <MonthIntro height={H['nov-title']} kicker="Bulan ketiga" title={NOVEMBER.title} subtitle={NOVEMBER.subtitle} />
          <NovLaut />
          <NovPantaiSand />
          <NovSore />
          <NovMalam />
        </div>
              <div ref={desRef}>
          <MonthIntro height={H['des-title']} kicker="Bulan keempat" title={DECEMBER.title} subtitle={DECEMBER.subtitle} />
          <DesTiket />
          <DesJendela />
          <DesGolden />
          <DesSore />
          <DesMalam />
        </div>
        <div ref={janRef}>
          <MonthIntro height={H['jan-title']} kicker="Bulan kelima" title="Januari 2026" />
        </div>
      </main>
    </SkyContext.Provider>
  )
}