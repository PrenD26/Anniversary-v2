import { motion } from 'framer-motion'

// Placeholder. Tahap 2: langit malam, bintang berotasi, bintang jatuh,
// koala + kucing di bulan sabit, parallax, dan musik pembuka.
export default function IntroScreen() {
  return (
    <motion.main
      className="screen flex items-center justify-center bg-gradient-to-b from-[#261a42] via-[#2b2050] to-[#4a3a85] px-6 text-center text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div>
        <p className="text-lg text-lilac-100">Untuk wanita yang aku sayangi</p>
        <h2 className="mt-2 font-display text-4xl italic">Kyla Salwa Annisa</h2>
        <p className="mt-10 text-sm text-lilac-200">Tahap 2 segera dibangun</p>
      </div>
    </motion.main>
  )
}
