import { useState } from 'react'
import { Canvas } from './Canvas'
import './App.css'

const MIN_RADIUS = 10
const MAX_RADIUS = 360
const DEFAULT_RADIUS = 180
const MIN_DIAMETERS = 6
const MAX_DIAMETERS = 32
const DEFAULT_DIAMETERS = 8
const MIN_SPEED = 0
const MAX_SPEED = 0.05
const DEFAULT_SPEED = 0.015
const SPEED_STEP = 0.001

function App() {
  const [radius, setRadius] = useState(DEFAULT_RADIUS)
  const [numDiameters, setNumDiameters] = useState(DEFAULT_DIAMETERS)
  const [speed, setSpeed] = useState(DEFAULT_SPEED)
  const [showDiameters, setShowDiameters] = useState(false)

  return (
    <div className="app">
      <h1>Tusi Couple</h1>
      <p className="subtitle">Canvas · dibujo y animación</p>
      <div className="controls">
        <div className="control-group">
          <label htmlFor="radius-slider">
            Tamaño del círculo: <strong>{radius}px</strong>
          </label>
          <input
            id="radius-slider"
            type="range"
            min={MIN_RADIUS}
            max={MAX_RADIUS}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="slider"
          />
        </div>
        <div className="control-group">
          <label htmlFor="diameters-slider">
            Diámetros (sectores): <strong>{numDiameters}</strong>
          </label>
          <input
            id="diameters-slider"
            type="range"
            min={MIN_DIAMETERS}
            max={MAX_DIAMETERS}
            value={numDiameters}
            onChange={(e) => setNumDiameters(Number(e.target.value))}
            className="slider"
          />
        </div>
        <div className="control-group">
          <label htmlFor="speed-slider">
            Velocidad: <strong>{(speed * 1000).toFixed(0)}</strong>
          </label>
          <input
            id="speed-slider"
            type="range"
            min={MIN_SPEED}
            max={MAX_SPEED}
            step={SPEED_STEP}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="slider"
          />
        </div>
        <div className="control-group checkbox-group">
          <label htmlFor="show-diameters">
            <input
              id="show-diameters"
              type="checkbox"
              checked={showDiameters}
              onChange={(e) => setShowDiameters(e.target.checked)}
            />
            Mostrar radios
          </label>
        </div>
      </div>
      <Canvas
        radius={radius}
        numDiameters={numDiameters}
        speed={speed}
        showDiameters={showDiameters}
      />
    </div>
  )
}

export default App
