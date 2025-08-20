'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'
import { Box } from '@react-three/drei'

interface FloatingCubeProps {
  position?: [number, number, number]
}

export function FloatingCube({ position = [0, 0, 0] }: FloatingCubeProps) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  return (
    <Box
      ref={meshRef}
      position={position}
      args={[1, 1, 1]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color="#6366f1"
        metalness={0.7}
        roughness={0.2}
        emissive="#6366f1"
        emissiveIntensity={0.1}
      />
    </Box>
  )
}