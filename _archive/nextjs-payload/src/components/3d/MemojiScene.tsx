'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { LayeredFaceMemoji } from './Interactive3DMemoji'

interface MemojiSceneProps {
  className?: string
}

export function MemojiScene({ className }: MemojiSceneProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 50,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Lighting for 3D memoji */}
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.8}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-5, 5, 5]} intensity={0.3} color="#6366f1" />

          {/* Front-facing memoji for clean look */}
          <group scale={[1.6, 1.6, 1.6]} position={[0, 0, 0]}>
            <LayeredFaceMemoji />
          </group>

          {/* Optional: Add controls for debugging */}
          {/* <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} /> */}
        </Suspense>
      </Canvas>
    </div>
  )
}
