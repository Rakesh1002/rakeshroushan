'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
//
import * as THREE from 'three'
import { Sphere, useTexture } from '@react-three/drei'

// Method 1: 3D Sphere with Memoji Texture
export function Memoji3DSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Load memoji texture
  const texture = useTexture('https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_34.png')

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    if (meshRef.current) {
      // Rotate based on mouse position
      const targetRotationX = mousePosition.y * 0.5
      const targetRotationY = mousePosition.x * 0.5
      
      // Smooth interpolation
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x, 
        targetRotationX, 
        0.1
      )
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y, 
        targetRotationY, 
        0.1
      )

      // Add gentle floating animation
      meshRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, 0]}>
      <meshPhongMaterial 
        map={texture}
        transparent
        alphaTest={0.1}
      />
    </Sphere>
  )
}

// Method 2: Advanced 3D Head with Face Tracking
export function Advanced3DMemoji() {
  const groupRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Mesh>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0, z: 0 })

  const texture = useTexture('https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_34.png')

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const rect = document.body.getBoundingClientRect()
      const x = ((event.clientX - rect.width / 2) / rect.width) * 2
      const y = ((event.clientY - rect.height / 2) / rect.height) * 2

      setMousePosition({ x, y })
      
      // Calculate head rotation based on mouse position
      const maxRotation = Math.PI / 4 // 45 degrees max
      setTargetRotation({
        x: -y * maxRotation * 0.5, // Look up/down
        y: x * maxRotation, // Look left/right
        z: x * maxRotation * 0.2 // Slight head tilt
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (groupRef.current && headRef.current) {
      // Smooth head rotation
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetRotation.x,
        0.1
      )
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetRotation.y,
        0.1
      )
      headRef.current.rotation.z = THREE.MathUtils.lerp(
        headRef.current.rotation.z,
        targetRotation.z,
        0.1
      )

      // Gentle breathing animation
      const breathe = Math.sin(state.clock.elapsedTime * 2) * 0.02 + 1
      groupRef.current.scale.setScalar(breathe)

      // Subtle floating
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main Head */}
      <mesh ref={headRef} position={[0, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshPhongMaterial 
          map={texture}
          transparent
          alphaTest={0.1}
          shininess={30}
        />
      </mesh>

      {/* Eyes that follow mouse */}
      <group position={[0, 0.2, 0.8]}>
        <mesh position={[-0.3, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshPhongMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.3, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshPhongMaterial color="#ffffff" />
        </mesh>
        
        {/* Pupils that track mouse */}
        <mesh position={[-0.3 + mousePosition.x * 0.05, mousePosition.y * 0.05, 0.1]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshPhongMaterial color="#333333" />
        </mesh>
        <mesh position={[0.3 + mousePosition.x * 0.05, mousePosition.y * 0.05, 0.1]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshPhongMaterial color="#333333" />
        </mesh>
      </group>

      {/* Glasses (if memoji has them) */}
      <group position={[0, 0.1, 0.9]}>
        <mesh position={[-0.35, 0, 0]}>
          <torusGeometry args={[0.25, 0.03, 8, 16]} />
          <meshPhongMaterial color="#ff4444" transparent opacity={0.7} />
        </mesh>
        <mesh position={[0.35, 0, 0]}>
          <torusGeometry args={[0.25, 0.03, 8, 16]} />
          <meshPhongMaterial color="#ff4444" transparent opacity={0.7} />
        </mesh>
        {/* Bridge */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
          <meshPhongMaterial color="#ff4444" />
        </mesh>
      </group>
    </group>
  )
}

// Method 3: Layered 2D Planes for Face Parts
export function LayeredFaceMemoji() {
  const groupRef = useRef<THREE.Group>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { gl } = useThree()

  // Base face texture (front-facing)
  const faceTexture = useTexture('https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_34.png')

  // Improve texture quality and color
  useEffect(() => {
    if (faceTexture) {
      faceTexture.colorSpace = THREE.SRGBColorSpace
      faceTexture.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy?.() ?? 8)
      faceTexture.generateMipmaps = true
      faceTexture.minFilter = THREE.LinearMipmapLinearFilter
      faceTexture.magFilter = THREE.LinearFilter
      faceTexture.needsUpdate = true
    }
  }, [faceTexture, gl])

  // Maintain correct aspect ratio of the PNG
  const aspect = useMemo<number>(() => {
    const tex = faceTexture as unknown as { image?: { width?: number; height?: number } }
    const img = tex?.image
    if (!img || !img.width || !img.height) return 1
    return img.height / img.width
  }, [faceTexture])

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
    if (!groupRef.current) return
    // Subtle, front-facing tilt only
    const targetX = mousePosition.y * 0.05
    const targetY = mousePosition.x * 0.05
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.1)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.1)
    // Gentle float
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05
  })

  const width = 2
  const height = 2 * aspect

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={faceTexture} transparent alphaTest={0.05} />
      </mesh>
    </group>
  )
}