'use client'

import { motion } from 'framer-motion'
import { User, Briefcase, BookOpen, Mail } from 'lucide-react'

const navItems = [
  { id: 'me', label: 'Me', icon: User },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'blog', label: 'Blog', icon: BookOpen },
  { id: 'contact', label: 'Contact', icon: Mail },
]

export function Navigation() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
      className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 px-2 sm:px-4 max-w-full"
    >
      {navItems.map((item, index) => (
        <motion.button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.2 + index * 0.1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center p-2 sm:p-3 md:p-4 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 min-w-[60px] sm:min-w-[70px] md:min-w-[80px] group"
        >
          <item.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white mb-1 md:mb-2 group-hover:text-blue-200 transition-colors" />
          <span className="text-xs sm:text-xs md:text-sm text-white/90 group-hover:text-white transition-colors font-medium">
            {item.label}
          </span>
        </motion.button>
      ))}
    </motion.nav>
  )
}