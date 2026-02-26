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
      <Scene className="absolute inset-0 z-0 h-full w-full" />

      {/* Content Overlay */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-3 sm:px-4 md:px-6">
        <div className="mx-auto w-full max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex min-h-screen flex-col items-center justify-between py-4 sm:py-6 md:py-8"
          >
            {/* Top Content */}
            <div className="flex flex-1 flex-col items-center justify-center space-y-4 sm:space-y-6">
              {/* Logo/Brand */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black sm:h-12 sm:w-12 md:h-16 md:w-16">
                  <div className="text-sm font-bold text-white sm:text-lg md:text-2xl">
                    R
                  </div>
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                className="px-2 text-lg font-bold text-white sm:px-4 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Hey, I&apos;m Rakesh Roushan 👋
              </motion.h1>

              {/* Subtitle */}
              <motion.h2
                className="px-2 text-center text-xl leading-tight font-bold text-white sm:px-4 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Entrepreneur, Product Leader,
                <br className="hidden sm:block" /> and AI Enthusiast
              </motion.h2>

              {/* 3D Memoji Avatar with head tracking */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mx-auto h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56"
              >
                <MemojiScene className="h-full w-full" />
              </motion.div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-20 flex flex-col items-center space-y-6">
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
