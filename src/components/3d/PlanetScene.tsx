'use client'

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

// Planet component
export function Planet() {
  const planetRef = useRef<THREE.Mesh>(null)
  const atmosphereRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (planetRef.current) {
      // Slow rotation
      planetRef.current.rotation.y += 0.002
    }
    if (atmosphereRef.current) {
      // Slightly different rotation for atmosphere
      atmosphereRef.current.rotation.y += 0.001
    }
  })

  return (
    <group position={[0, -3, -2]}>
      {/* Main Planet */}
      <Sphere ref={planetRef} args={[2.5, 64, 64]} position={[0, 0, 0]}>
        <meshPhongMaterial
          color="#4f46e5"
          emissive="#1e1b4b"
          emissiveIntensity={0.1}
          shininess={30}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Planet Atmosphere */}
      <Sphere ref={atmosphereRef} args={[2.7, 32, 32]} position={[0, 0, 0]}>
        <meshPhongMaterial
          color="#6366f1"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Planet Surface Details */}
      <Sphere args={[2.52, 32, 32]} position={[0, 0, 0]}>
        <meshPhongMaterial
          color="#312e81"
          transparent
          opacity={0.3}
          wireframe
        />
      </Sphere>
    </group>
  )
}

// Rocketship component
export function Rocketship() {
  const rocketRef = useRef<THREE.Group>(null)
  const flameRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    if (rocketRef.current) {
      // Initial animation - rocket landing
      gsap.fromTo(rocketRef.current.position, 
        { y: 5, x: -3, z: 1 },
        { 
          y: -0.3, 
          x: -2.2, 
          z: 0.5,
          duration: 3,
          ease: "power2.out",
          delay: 2
        }
      )

      // Gentle hovering animation
      gsap.to(rocketRef.current.position, {
        y: -0.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 5
      })
    }
  }, [])

  useFrame((state) => {
    if (flameRef.current) {
      // Flickering flame effect
      const intensity = 0.5 + Math.sin(state.clock.elapsedTime * 10) * 0.3
      flameRef.current.scale.y = intensity
      flameRef.current.material.opacity = intensity * 0.8
    }
  })

  return (
    <group ref={rocketRef} position={[-2.2, -0.3, 0.5]} rotation={[0, 0.3, 0]}>
      {/* Rocket Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.6, 8]} />
        <meshPhongMaterial color="#e5e7eb" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Rocket Nose Cone */}
      <mesh position={[0, 0.35, 0]}>
        <coneGeometry args={[0.08, 0.3, 8]} />
        <meshPhongMaterial color="#dc2626" />
      </mesh>

      {/* Rocket Fins */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[
            Math.sin((i * Math.PI) / 2) * 0.15,
            -0.25,
            Math.cos((i * Math.PI) / 2) * 0.15
          ]}
          rotation={[0, (i * Math.PI) / 2, 0]}
        >
          <boxGeometry args={[0.02, 0.15, 0.08]} />
          <meshPhongMaterial color="#6b7280" />
        </mesh>
      ))}

      {/* Rocket Flame */}
      <mesh ref={flameRef} position={[0, -0.45, 0]}>
        <coneGeometry args={[0.06, 0.2, 6]} />
        <meshPhongMaterial
          color="#f59e0b"
          emissive="#dc2626"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Engine Details */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.1, 0.08, 0.08, 8]} />
        <meshPhongMaterial color="#374151" />
      </mesh>
    </group>
  )
}

// Stars background
export function Stars() {
  const starsRef = useRef<THREE.Points>(null)

  const starPositions = new Float32Array(200 * 3)
  for (let i = 0; i < 200; i++) {
    starPositions[i * 3] = (Math.random() - 0.5) * 50
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 50
    starPositions[i * 3 + 2] = (Math.random() - 0.5) * 50
  }

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
      starsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.03) * 0.1
    }
  })

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.05}
        sizeAttenuation={true}
        transparent
        opacity={0.6}
      />
    </points>
  )
}