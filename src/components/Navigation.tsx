'use client'

import { motion } from 'framer-motion'
import { User, Briefcase, BookOpen, Mail, Code } from 'lucide-react'

const navItems = [
  { id: 'about', label: 'Me', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: Code },
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
      className="flex max-w-full flex-wrap justify-center gap-2 px-2 sm:gap-3 sm:px-4 md:gap-4 lg:gap-6"
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
          className="group flex min-w-[60px] flex-col items-center rounded-xl border border-white/20 bg-white/10 p-2 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 sm:min-w-[70px] sm:rounded-2xl sm:p-3 md:min-w-[80px] md:p-4"
        >
          <item.icon className="mb-1 h-4 w-4 text-white transition-colors group-hover:text-blue-200 sm:h-5 sm:w-5 md:mb-2 md:h-6 md:w-6" />
          <span className="text-xs font-medium text-white/90 transition-colors group-hover:text-white sm:text-xs md:text-sm">
            {item.label}
          </span>
        </motion.button>
      ))}
    </motion.nav>
  )
}
