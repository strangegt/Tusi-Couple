import { useRef, useEffect } from 'react'

const WIDTH = 800
const HEIGHT = 800
const BALL_RADIUS = 8

interface CanvasProps {
  radius: number
  numDiameters: number
  speed: number
  showDiameters: boolean
}

export function Canvas({ radius, numDiameters, speed, showDiameters }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const angleRef = useRef(0) // ángulo del centro del círculo pequeño respecto al grande
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return
    const ctx = context

    const centerX = WIDTH / 2
    const centerY = HEIGHT / 2

    function drawFrame() {
      const theta = angleRef.current // ángulo del centro del círculo pequeño

      // Fondo
      ctx.fillStyle = '#1a1a1a'
      ctx.fillRect(0, 0, WIDTH, HEIGHT)

      // Círculo grande
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fillStyle = '#646cff'
      ctx.fill()
      ctx.strokeStyle = '#535bf2'
      ctx.lineWidth = 2
      ctx.stroke()

      // Diámetros del círculo grande
      if (numDiameters > 0) {
        if (showDiameters) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'
          ctx.lineWidth = 1
          for (let i = 0; i < numDiameters; i++) {
            const diameterAngle = (i * Math.PI) / numDiameters
            const x1 = centerX - radius * Math.cos(diameterAngle)
            const y1 = centerY - radius * Math.sin(diameterAngle)
            const x2 = centerX + radius * Math.cos(diameterAngle)
            const y2 = centerY + radius * Math.sin(diameterAngle)
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()
          }
        }

        // -----------------------------------------------------------
        // CORRECCIÓN MATEMÁTICA: Movimiento Armónico Simple (SHM)
        // -----------------------------------------------------------
        // Para generar la ilusión de "Tusi Couple" (círculo rodando dentro de otro círculo del doble de radio),
        // cada punto (bola) debe oscilar sinusoidalmente a lo largo de su diámetro.
        // 
        // La posición 'x' a lo largo del diámetro con ángulo alpha es:
        // x(t) = A * cos(theta - alpha)
        // Donde theta es el ángulo de rotación del círculo imaginario.
        // A (amplitud) es el radio disponible (radius - BALL_RADIUS para que no se salga).

        const amplitude = radius - BALL_RADIUS

        // Ya no usamos phaseOffset, usamos la rotación acumulada (theta) directamente
        const currentTheta = theta

        for (let i = 0; i < numDiameters; i++) {
          const diameterAngle = (i * Math.PI) / numDiameters

          // Calculamos la posición usando la función coseno
          const alongDiameter = amplitude * Math.cos(currentTheta - diameterAngle)

          // Coordenadas cartesianas
          const ballX = centerX + alongDiameter * Math.cos(diameterAngle)
          const ballY = centerY + alongDiameter * Math.sin(diameterAngle)

          ctx.beginPath()
          ctx.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2)
          ctx.fillStyle = '#fff'
          ctx.fill()
          ctx.strokeStyle = '#ccc'
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      angleRef.current += speed
      frameRef.current = requestAnimationFrame(drawFrame)
    }

    drawFrame()
    return () => cancelAnimationFrame(frameRef.current)
  }, [radius, numDiameters, speed, showDiameters])

  return (
    <canvas
      ref={canvasRef}
      width={WIDTH}
      height={HEIGHT}
      style={{ display: 'block', borderRadius: 8 }}
    />
  )
}
