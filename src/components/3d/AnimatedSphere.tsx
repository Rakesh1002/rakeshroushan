'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh, Vector3 } from 'three'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'

interface AnimatedSphereProps {
  position?: [number, number, number]
}

export function AnimatedSphere({ position = [0, 0, 0] }: AnimatedSphereProps) {
  const meshRef = useRef<Mesh>(null)
  const targetPosition = useRef(new Vector3(...position))

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.3
      
      // Gentle rotation
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Sphere
      ref={meshRef}
      position={position}
      args={[0.8, 64, 64]}
      castShadow
      receiveShadow
    >
      <MeshDistortMaterial
        color="#ec4899"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.4}
        metalness={0.8}
      />
    </Sphere>
  )
}