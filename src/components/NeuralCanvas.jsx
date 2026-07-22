import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 74

export default function NeuralCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d', { alpha: true })
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let width = 0
    let height = 0
    let dpr = 1
    let pointerX = 0
    let pointerY = 0

    const particles = Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.25 + Math.random() * 0.9,
      vx: (Math.random() - 0.5) * 0.00008,
      vy: (Math.random() - 0.5) * 0.00005,
      radius: index % 13 === 0 ? 1.5 : 0.55 + Math.random() * 0.75,
      alpha: 0.12 + Math.random() * 0.38
    }))

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onPointerMove = (event) => {
      pointerX = (event.clientX / Math.max(window.innerWidth, 1) - 0.5) * 15
      pointerY = (event.clientY / Math.max(window.innerHeight, 1) - 0.5) * 10
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)

      particles.forEach((particle, index) => {
        if (!reducedMotion) {
          particle.x += particle.vx * particle.z
          particle.y += particle.vy * particle.z
          if (particle.x < -0.04) particle.x = 1.04
          if (particle.x > 1.04) particle.x = -0.04
          if (particle.y < -0.04) particle.y = 1.04
          if (particle.y > 1.04) particle.y = -0.04
        }

        const x = particle.x * width + pointerX * particle.z
        const y = particle.y * height + pointerY * particle.z
        const radius = particle.radius * particle.z

        context.beginPath()
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.fillStyle = `rgba(242, 247, 249, ${particle.alpha})`
        context.fill()

        if (index % 17 === 0) {
          context.beginPath()
          context.moveTo(x - 16 * particle.z, y)
          context.lineTo(x + 16 * particle.z, y)
          context.strokeStyle = `rgba(236, 243, 246, ${particle.alpha * 0.24})`
          context.lineWidth = 0.45
          context.stroke()
        }
      })

      frame = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return <canvas className="neural-canvas" ref={canvasRef} aria-hidden="true" />
}
