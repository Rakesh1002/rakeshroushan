'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function FlyingStarfield() {
  const pointsRef = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0, z: 0 })

  // Create star field
  const { positions, colors, sizes } = useMemo(() => {
    const count = 2000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Spread stars in a large sphere around the camera
      positions[i * 3] = (Math.random() - 0.5) * 400 // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 400 // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400 // z

      // Varied star colors (white to blue)
      const colorIntensity = Math.random()
      colors[i * 3] = 0.8 + colorIntensity * 0.2 // R
      colors[i * 3 + 1] = 0.8 + colorIntensity * 0.2 // G
      colors[i * 3 + 2] = 1 // B

      // Varied sizes
      sizes[i] = Math.random() * 0.15 + 0.05
    }

    return { positions, colors, sizes }
  }, [])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(state => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position
        .array as Float32Array

      // Base forward speed
      const baseSpeed = 2

      // Mouse influence on direction
      velocityRef.current.x = THREE.MathUtils.lerp(
        velocityRef.current.x,
        mouseRef.current.x * 1.5,
        0.02
      )
      velocityRef.current.y = THREE.MathUtils.lerp(
        velocityRef.current.y,
        mouseRef.current.y * 1.5,
        0.02
      )
      velocityRef.current.z = baseSpeed

      // Move stars towards camera and reset when they pass
      for (let i = 0; i < positions.length; i += 3) {
        // Apply velocity to star positions
        positions[i] -= velocityRef.current.x // x
        positions[i + 1] -= velocityRef.current.y // y
        positions[i + 2] += velocityRef.current.z // z (towards camera)

        // Reset stars that have passed the camera
        if (positions[i + 2] > 50) {
          positions[i] = (Math.random() - 0.5) * 400
          positions[i + 1] = (Math.random() - 0.5) * 400
          positions[i + 2] = -200
        }

        // Reset stars that are too far to the sides
        if (Math.abs(positions[i]) > 200 || Math.abs(positions[i + 1]) > 200) {
          positions[i] = (Math.random() - 0.5) * 400
          positions[i + 1] = (Math.random() - 0.5) * 400
          positions[i + 2] = Math.random() * -400
        }
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2000}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={2000}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={2000}
          array={sizes}
          itemSize={1}
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        sizeAttenuation={true}
        transparent
        opacity={0.9}
        vertexColors
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export function SpeedLines() {
  const linesRef = useRef<THREE.Group>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(state => {
    if (linesRef.current) {
      // Rotate based on mouse for steering effect
      linesRef.current.rotation.z = -mouseRef.current.x * 0.1
      linesRef.current.rotation.x = mouseRef.current.y * 0.05

      // Pulse effect
      const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.1 + 1
      linesRef.current.scale.setScalar(pulse)
    }
  })

  // Create speed lines
  const lines = useMemo(() => {
    const lineGeometries = []

    for (let i = 0; i < 50; i++) {
      const points = []
      const angle = (i / 50) * Math.PI * 2
      const radius = 5 + Math.random() * 10

      // Create line from center outward
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          -20
        )
      )
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius * 1.5,
          Math.sin(angle) * radius * 1.5,
          -50
        )
      )

      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      lineGeometries.push(geometry)
    }

    return lineGeometries
  }, [])

  return (
    <group ref={linesRef}>
      {lines.map((geometry, index) => (
        <primitive
          key={index}
          object={
            new THREE.Line(
              geometry,
              new THREE.LineBasicMaterial({
                color: '#ffffff',
                transparent: true,
                opacity: 0.1,
                blending: THREE.AdditiveBlending,
              })
            )
          }
        />
      ))}
    </group>
  )
}

export function DistantNebula() {
  const nebulaRef = useRef<THREE.Group>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(state => {
    if (nebulaRef.current) {
      // Slow parallax movement
      nebulaRef.current.rotation.y = mouseRef.current.x * 0.02
      nebulaRef.current.rotation.x = mouseRef.current.y * 0.01

      // Gentle floating
      nebulaRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.5
    }
  })

  return (
    <group ref={nebulaRef}>
      {/* Distant colorful clouds */}
      <mesh position={[20, 10, -100]}>
        <sphereGeometry args={[15, 16, 16]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.1} />
      </mesh>

      <mesh position={[-25, -5, -120]}>
        <sphereGeometry args={[20, 16, 16]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.08} />
      </mesh>

      <mesh position={[0, -15, -80]}>
        <sphereGeometry args={[12, 16, 16]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.12} />
      </mesh>
    </group>
  )
}
