'use client'

import { useEffect, useState } from 'react'

export function PerformanceMonitor() {
  const [fps, setFps] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) {
        setFps(frameCount)
        frameCount = 0
        lastTime = currentTime
      }
      
      animationId = requestAnimationFrame(measureFPS)
    }

    // Show monitor only in development
    if (process.env.NODE_ENV === 'development') {
      setVisible(true)
      measureFPS()
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-2 rounded text-sm font-mono z-50">
      FPS: {fps}
    </div>
  )
}