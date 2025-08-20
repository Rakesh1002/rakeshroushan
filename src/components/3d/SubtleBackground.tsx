'use client'

import { useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Gentle floating particles
export function SubtleParticles({ count = 50 }: { count?: number }) {
  const points = useRef<THREE.Points>(null)
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      points.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1
    }
  })

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  )
}

// Subtle animated orb
export function SubtleOrb() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={[3, 0, -3]}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshPhongMaterial
        color="#ff6b9d"
        transparent
        opacity={0.4}
        emissive="#ff6b9d"
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

// Gentle wave effect
export function SubtleWaves() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry as THREE.PlaneGeometry
      const position = geometry.attributes.position
      
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i)
        const y = position.getY(i)
        const wave = Math.sin(x * 0.5 + state.clock.elapsedTime * 0.5) * 
                    Math.sin(y * 0.5 + state.clock.elapsedTime * 0.3) * 0.1
        position.setZ(i, wave)
      }
      position.needsUpdate = true
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} rotation={[-Math.PI / 4, 0, 0]}>
      <planeGeometry args={[15, 15, 30, 30]} />
      <meshPhongMaterial
        color="#6366f1"
        transparent
        opacity={0.1}
        wireframe
      />
    </mesh>
  )
}