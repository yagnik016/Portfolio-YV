'use client'
import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { scrollY } = useScroll()

  // Wait until mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const opacity = useTransform(scrollY, [0, 100], [0, 1])

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    const href = e.currentTarget.href
    const targetId = href.replace(/.*\#/, '')
    const elem = document.getElementById(targetId)
    elem?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      <motion.nav
        style={{ opacity }}
        className="fixed top-0 left-0 right-0 z-50 bg-cream-50/80 dark:bg-gray-900/80 backdrop-blur-md transition-colors duration-300"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.a
              href="#hero"
              className="text-2xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              YV
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={handleScroll}
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-300"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
              ))}

              {/* Theme Toggle Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="relative p-2 rounded-full bg-white/50 dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  initial={false}
                  animate={{
                    rotate: theme === 'dark' ? 360 : 0,
                    scale: theme === 'dark' ? 1 : 0,
                    opacity: theme === 'dark' ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                </motion.div>
                <motion.div
                  initial={false}
                  animate={{
                    rotate: theme === 'light' ? 360 : 0,
                    scale: theme === 'light' ? 1 : 0,
                    opacity: theme === 'light' ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Sun className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                </motion.div>
                <div className="w-5 h-5" /> {/* Spacer */}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              {/* Theme Toggle Button (Mobile) */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full bg-white/50 dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                )}
              </motion.button>

              <motion.button
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        className="md:hidden fixed top-16 left-0 right-0 z-40 bg-cream-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div className="container mx-auto px-4 py-4">
          {navItems.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={handleScroll}
              className="block py-3 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 4 }}
            >
              {item.name}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </>
  )
}