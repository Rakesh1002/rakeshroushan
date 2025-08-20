'use client'

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function MouseInteractiveStars() {
  const pointsRef = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = mouseRef.current.y * 0.1
      pointsRef.current.rotation.y = mouseRef.current.x * 0.1
    }
  })

  // Generate star positions
  const positions = new Float32Array(Array.from({ length: 450 }, () => (Math.random() - 0.5) * 40))

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={150}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.05}
        sizeAttenuation={true}
        transparent
        opacity={0.8}
      />
    </points>
  )
}

export function FloatingOrbs() {
  const orbsRef = useRef<THREE.Group>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (orbsRef.current) {
      orbsRef.current.rotation.y = mouseRef.current.x * 0.05
      orbsRef.current.rotation.x = mouseRef.current.y * 0.03
      
      // Gentle floating animation
      orbsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group ref={orbsRef}>
      <mesh position={[8, 4, -12]}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.3}
        />
      </mesh>

      <mesh position={[-6, -2, -10]}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.4}
        />
      </mesh>

      <mesh position={[4, -4, -8]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#ec4899"
          transparent
          opacity={0.35}
        />
      </mesh>

      <mesh position={[-8, 3, -15]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#10b981"
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}