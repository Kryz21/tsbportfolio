import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const scale = useMotionValue(1)
  const smoothX = useSpring(x, { stiffness: 390, damping: 32, mass: 0.3 })
  const smoothY = useSpring(y, { stiffness: 390, damping: 32, mass: 0.3 })
  const smoothScale = useSpring(scale, { stiffness: 260, damping: 24, mass: 0.45 })

  useEffect(() => {
    const move = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
      const interactive = event.target instanceof Element
        ? event.target.closest('a, button, .magnetic-wrap, [data-cursor="focus"]')
        : null
      scale.set(interactive ? 1.85 : 1)
    }

    const leave = () => scale.set(0)
    const enter = () => scale.set(1)

    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)

    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
    }
  }, [scale, x, y])

  return (
    <motion.div
      className="cursor-orb"
      style={{ x: smoothX, y: smoothY, scale: smoothScale }}
      aria-hidden="true"
    />
  )
}
