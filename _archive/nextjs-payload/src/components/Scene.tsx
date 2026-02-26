'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import {
  FlyingStarfield,
  SpeedLines,
  DistantNebula,
} from './3d/FlyingStarfield'

interface SceneProps {
  className?: string
}

export function Scene({ className }: SceneProps) {
  return (
    <div className={className} style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 60,
          near: 0.1,
          far: 200,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          premultipliedAlpha: false,
          preserveDrawingBuffer: true,
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        <Suspense fallback={null}>
          {/* Minimal lighting for space */}
          <ambientLight intensity={0.3} />

          {/* Flying Through Space */}
          <FlyingStarfield />
          <SpeedLines />

          {/* Post-processing for space travel effect */}
          <EffectComposer>
            <Bloom luminanceThreshold={0.5} intensity={0.8} />
            <Vignette eskil={false} offset={0.1} darkness={0.3} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}
