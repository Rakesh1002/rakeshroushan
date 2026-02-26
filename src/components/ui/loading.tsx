'use client'

import { motion } from 'framer-motion'

export function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="text-center">
        <motion.div
          className="mx-auto mb-4 h-16 w-16 rounded-full border-4 border-purple-200 border-t-purple-600"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-white"
        >
          Loading amazing experiences...
        </motion.p>
      </div>
    </div>
  )
}
