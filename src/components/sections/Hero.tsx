'use client'

import { motion } from 'framer-motion'
import { Scene } from '../Scene'
import { Navigation } from '../Navigation'
import { ChatInterface } from '../ChatInterface'
import { MemojiScene } from '../3d/MemojiScene'

export function Hero() {
  return (
    <section className="relative min-h-screen w-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950">
      {/* 3D Scene Background */}
      <Scene className="absolute inset-0 z-0 w-full h-full" />
      
      {/* Content Overlay */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-3 sm:px-4 md:px-6">
        <div className="w-full max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col items-center justify-between min-h-screen py-4 sm:py-6 md:py-8"
          >
            {/* Top Content */}
            <div className="flex flex-col items-center space-y-4 sm:space-y-6 flex-1 justify-center">
              {/* Logo/Brand */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-black rounded-lg flex items-center justify-center">
                  <div className="text-white text-sm sm:text-lg md:text-2xl font-bold">R</div>
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.h1 
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white px-2 sm:px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Hey, I'm Rakesh Roushan 👋
              </motion.h1>

              {/* Subtitle */}
              <motion.h2 
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white px-2 sm:px-4 leading-tight text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Entrepreneur, Product Leader,<br className="hidden sm:block" /> and AI Enthusiast
              </motion.h2>
              
              {/* 3D Memoji Avatar with head tracking */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mx-auto w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
              >
                <MemojiScene className="w-full h-full" />
              </motion.div>
            </div>

            {/* Bottom Content */}
            <div className="flex flex-col items-center space-y-6 relative z-20">
              {/* Interactive Chat Interface */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="w-full px-2 sm:px-4"
              >
                <ChatInterface />
              </motion.div>
              
              {/* Navigation */}
              <Navigation />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}