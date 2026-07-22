import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

export default function ScrollScene({
  id,
  index,
  label,
  tone = 'light',
  height = '260vh',
  className = '',
  children
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  })

  const progress = useSpring(scrollYProgress, {
    stiffness: 62,
    damping: 24,
    mass: 0.72,
    restDelta: 0.0002,
    restSpeed: 0.0002
  })

  const contentScale = useTransform(
    progress,
    [0, 0.055, 0.945, 1],
    [0.992, 1, 1, 0.994]
  )
  const contentY = useTransform(
    progress,
    [0, 0.08, 0.92, 1],
    ['1.2vh', '0vh', '0vh', '-1.2vh']
  )
  const introVeil = useTransform(progress, [0, 0.025, 0.07], [1, 0.42, 0])
  const outroVeil = useTransform(progress, [0.93, 0.975, 1], [0, 0.42, 1])
  const edgeGlow = useTransform(progress, [0, 0.08, 0.92, 1], [0.7, 0, 0, 0.7])

  return (
    <section
      ref={ref}
      id={id}
      className={`scroll-scene-wrap ${className}`}
      style={{ height }}
      data-scene={id}
    >
      <div className={`scroll-scene scroll-scene--${tone}`}>
        <motion.div
          className="scroll-scene__content"
          style={{ scale: contentScale, y: contentY }}
        >
          {children(progress)}
        </motion.div>

        <motion.div className="scene-transition scene-transition--intro" style={{ opacity: introVeil }} />
        <motion.div className="scene-transition scene-transition--outro" style={{ opacity: outroVeil }} />
        <motion.div className="scene-edge-glow" style={{ opacity: edgeGlow }} />

        <div className="scene-chrome" aria-hidden="true">
          <span>{String(index).padStart(2, '0')}</span>
          <span>{label}</span>
          <span>TSB / NEW DELHI / 2026</span>
        </div>
      </div>
    </section>
  )
}
