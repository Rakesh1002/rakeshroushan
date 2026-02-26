'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = (scrolled / scrollHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', updateScrollProgress)
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-50 h-1 origin-left bg-gradient-to-r from-purple-600 to-pink-600"
      style={{ scaleX: scrollProgress / 100 }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollProgress / 100 }}
      transition={{ duration: 0.1 }}
    />
  )
}
