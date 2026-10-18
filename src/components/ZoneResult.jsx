import { motion } from 'framer-motion'
import MediaFrame from './Media.jsx'

export default function ZoneResult({ title, story, item, label, onAgain, extra, delay = 0.4 }) {
  return (
    <motion.div
      className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#1d1438]/85 px-6 text-center text-white backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay }}
    >
      <p className="font-display text-3xl font-extrabold">{title}</p>
      {extra && <p className="mt-1 text-xs text-lilac-200">{extra}</p>}
      <p className="mt-2 max-w-[280px] text-sm leading-relaxed">{story}</p>
      {item && (
        <MediaFrame item={item} label={label} frameClass="mt-4 w-[150px] p-1.5 pb-5 shadow-xl" imgClass="aspect-square w-full" style={{ rotate: 3 }} />
      )}
      <button type="button" onClick={onAgain} className="mt-5 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold">
        Main lagi
      </button>
    </motion.div>
  )
}