'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

// Interactive Stars that follow mouse
export function InteractiveStars() {
  const pointsRef = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  // Generate star positions
  const { positions, colors, sizes } = useMemo(() => {
    const count = 300
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Spread stars across a larger area
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30

      // Varied star colors (white to blue)
      const colorIntensity = Math.random()
      colors[i * 3] = 0.8 + colorIntensity * 0.2 // R
      colors[i * 3 + 1] = 0.8 + colorIntensity * 0.2 // G
      colors[i * 3 + 2] = 1 // B

      // Varied star sizes
      sizes[i] = Math.random() * 0.1 + 0.05
    }

    return { positions, colors, sizes }
  }, [])

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      
      // Create parallax effect based on mouse position
      const mouseInfluence = 0.1
      pointsRef.current.rotation.x = mouseRef.current.y * mouseInfluence
      pointsRef.current.rotation.y = mouseRef.current.x * mouseInfluence

      // Add gentle floating animation
      for (let i = 0; i < positions.length; i += 3) {
        const time = state.clock.elapsedTime
        const originalY = positions[i + 1]
        positions[i + 1] = originalY + Math.sin(time + i) * 0.002
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial
        size={0.08}
        sizeAttenuation={true}
        transparent
        alphaTest={0.001}
        vertexColors
        opacity={0.8}
      />
    </Points>
  )
}

// Floating celestial orbs
export function CelestialOrbs() {
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
      // Mouse parallax effect
      orbsRef.current.rotation.y = mouseRef.current.x * 0.05
      orbsRef.current.rotation.x = mouseRef.current.y * 0.03
    }
  })

  return (
    <group ref={orbsRef}>
      {/* Large background orb */}
      <mesh position={[8, -4, -8]}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshPhongMaterial
          color="#6366f1"
          transparent
          opacity={0.3}
          emissive="#4338ca"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Medium orb */}
      <mesh position={[-6, 2, -5]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshPhongMaterial
          color="#8b5cf6"
          transparent
          opacity={0.4}
          emissive="#7c3aed"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Small accent orbs */}
      <mesh position={[4, 6, -3]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshPhongMaterial
          color="#ec4899"
          transparent
          opacity={0.4}
          emissive="#db2777"
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh position={[-8, -2, -6]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial
          color="#10b981"
          transparent
          opacity={0.35}
          emissive="#059669"
          emissiveIntensity={0.25}
        />
      </mesh>
    </group>
  )
}

// Animated constellation lines
export function ConstellationLines() {
  const linesRef = useRef<THREE.Group>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (linesRef.current) {
      // Gentle rotation based on mouse
      linesRef.current.rotation.x = mousePosition.y * 0.02
      linesRef.current.rotation.y = mousePosition.x * 0.02
      
      // Breathing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02
      linesRef.current.scale.setScalar(scale)
    }
  })

  // Create constellation lines
  const lines = useMemo(() => {
    const lineGeometries = []
    
    // Define some constellation points
    const constellations = [
      [
        new THREE.Vector3(-5, 3, -2),
        new THREE.Vector3(-3, 4, -2),
        new THREE.Vector3(-1, 3, -2),
        new THREE.Vector3(1, 5, -2)
      ],
      [
        new THREE.Vector3(3, -2, -3),
        new THREE.Vector3(5, -1, -3),
        new THREE.Vector3(6, -3, -3),
        new THREE.Vector3(4, -4, -3)
      ]
    ]

    constellations.forEach(constellation => {
      for (let i = 0; i < constellation.length - 1; i++) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          constellation[i],
          constellation[i + 1]
        ])
        lineGeometries.push(geometry)
      }
    })

    return lineGeometries
  }, [])

  return (
    <group ref={linesRef}>
      {lines.map((geometry, index) => (
        <line key={index} geometry={geometry}>
          <lineBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.6}
            linewidth={2}
          />
        </line>
      ))}
    </group>
  )
}

// Shooting stars
export function ShootingStars() {
  const starsRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (starsRef.current) {
      const createShootingStar = () => {
        const star = starsRef.current?.children[Math.floor(Math.random() * 3)]
        if (star) {
          // Random starting position
          star.position.set(
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            -5
          )
          
          // Animate across the sky
          gsap.fromTo(star.position, 
            { x: star.position.x, y: star.position.y },
            {
              x: star.position.x + (Math.random() * 20 - 10),
              y: star.position.y - (Math.random() * 10 + 5),
              duration: Math.random() * 3 + 2,
              ease: "power2.out",
              onComplete: () => {
                // Reset for next animation
                setTimeout(createShootingStar, Math.random() * 5000 + 2000)
              }
            }
          )

          gsap.fromTo(star.scale,
            { x: 0, y: 0, z: 0 },
            {
              x: 1, y: 1, z: 1,
              duration: 0.3,
              ease: "power2.out"
            }
          )
        }
      }

      // Start the shooting star cycle
      setTimeout(createShootingStar, 2000)
    }
  }, [])

  return (
    <group ref={starsRef}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} scale={[0, 0, 0]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}