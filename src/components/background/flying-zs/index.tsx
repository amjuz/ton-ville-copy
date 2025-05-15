import React, { useEffect, useRef, useState } from 'react'

interface ZParticle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  fontSize: number
}

const maxParticles = 50

const FlyingZs: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<ZParticle[]>([])
  const animationFrameId = useRef<number | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Create a "Z" particle that originates from the middle of the screen
    const createParticle = (): ZParticle => ({
      x: dimensions.width / 2, // Start from the center of the screen (horizontally)
      y: dimensions.height / 2, // Start from the center of the screen (vertically)
      vx: Math.random() * 2 - 1, // Velocity on the x-axis
      vy: Math.random() * -1.5 - 0.5, // Move upwards
      life: Math.random() * 300 + 100, // Adjust the lifespan
      fontSize: Math.random() * 20 + 30, // Random font size for variation
    })

    particles.current = []

    // Create initial particles
    for (let i = 0; i < maxParticles * 0.1; i++) {
      particles.current.push(createParticle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      particles.current.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life--

        // If the particle's life ends, create a new one from the center
        if (particle.life <= 0) {
          particles.current[index] = createParticle()
        }

        // Draw the "Z" particle
        ctx.font = `${particle.fontSize}px Arial`
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.life / 400})` // Fade out over time
        ctx.fillText('Z', particle.x, particle.y)
      })

      animationFrameId.current = requestAnimationFrame(animate)
    }

    const addParticles = () => {
      if (particles.current.length < maxParticles) {
        particles.current.push(createParticle())
        setTimeout(addParticles, 1000)
      }
    }

    addParticles()
    animate()

    return () => {
      particles.current = []

      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [dimensions, maxParticles])

  return (
    <canvas
      className="fixed bottom-0 left-0 -z-10 h-screen w-full"
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height - 100}
      style={{ opacity: 0.2 }}
    />
  )
}

export default FlyingZs
