import { useState } from 'react';
import InteractiveShader from "@/components/ui/crystal-shader";

export default function DemoTwo() {
   // State variables to hold the shader parameters, controlled by sliders
  const [cellDensity, setCellDensity] = useState(8.0);
  const [animationSpeed, setAnimationSpeed] = useState(0.2);
  const [warpFactor, setWarpFactor] = useState(0.6);
  const [mouseInfluence, setMouseInfluence] = useState(0.15);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '650px', overflow: 'hidden', borderRadius: '0.75rem' }}>
      {/* The main shader component that renders the visual effect */}
      <InteractiveShader
        cellDensity={cellDensity}
        animationSpeed={animationSpeed}
        warpFactor={warpFactor}
        mouseInfluence={mouseInfluence}
      />

      {/* UI controls panel */}
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        width: '90%',
        maxWidth: '32rem',
        border: '1px solid #4A5568'
      }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', letterSpacing: '0.05em', textAlign: 'center' }}>
          Crystal Synthesis
        </h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem 1.5rem' }}>
          {/* Slider for Cell Density */}
          <div>
            <label htmlFor="cellDensity" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              Cell Density: {cellDensity.toFixed(1)}
            </label>
            <input
              id="cellDensity"
              type="range"
              min="2"
              max="20"
              step="0.1"
              value={cellDensity}
              onChange={(e) => setCellDensity(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Slider for Animation Speed */}
          <div>
            <label htmlFor="animationSpeed" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              Animation Speed: {animationSpeed.toFixed(2)}
            </label>
            <input
              id="animationSpeed"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Slider for Warp Factor */}
          <div>
            <label htmlFor="warpFactor" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              Warp Factor: {warpFactor.toFixed(2)}
            </label>
            <input
              id="warpFactor"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={warpFactor}
              onChange={(e) => setWarpFactor(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Slider for Mouse Influence */}
          <div>
            <label htmlFor="mouseInfluence" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              Mouse Influence: {mouseInfluence.toFixed(2)}
            </label>
            <input
              id="mouseInfluence"
              type="range"
              min="0"
              max="0.5"
              step="0.01"
              value={mouseInfluence}
              onChange={(e) => setMouseInfluence(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
