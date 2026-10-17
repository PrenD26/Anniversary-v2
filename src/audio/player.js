let el = null
let fade = null
let current = null
let token = 0

function ramp(target, ms, done) {
  clearInterval(fade)
  const from = el.volume
  const steps = Math.max(1, Math.round(ms / 50))
  let n = 0
  fade = setInterval(() => {
    n++
    el.volume = Math.min(1, Math.max(0, from + ((target - from) * n) / steps))
    if (n >= steps) {
      clearInterval(fade)
      done?.()
    }
  }, 50)
}

export function playTrack(src, { volume = 0.85, fadeIn = 2500 } = {}) {
  if (src === current) return
  current = src
  const my = ++token
  if (!el) el = new Audio()
  const start = () => {
    if (my !== token) return
    el.src = src
    el.loop = true
    el.volume = 0
    el.play()
      .then(() => my === token && ramp(volume, fadeIn))
      .catch((e) => console.warn('Audio gagal diputar:', e))
  }
  if (!el.paused && el.src) ramp(0, 1500, start)
  else start()
}

export function stopTrack(ms = 1500) {
  if (!el || current === null) return
  current = null
  token++
  ramp(0, ms, () => el.pause())
}