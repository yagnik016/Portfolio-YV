'use client'
import { motion, useSpring } from 'framer-motion'
import { useEffect } from 'react'
import { useCursor } from '@/contexts/CursorContext'

export function AnimatedCursor() {
  const { isHovering, cursorX, cursorY, setCursorPosition } = useCursor()

  const springConfig = { damping: 25, stiffness: 200 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPosition(e.clientX - 16, e.clientY - 16)
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [setCursorPosition])

  return (
    <motion.div
      className="fixed w-8 h-8 pointer-events-none z-50"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      {/* Main cursor circle */}
      <motion.div
        className="absolute inset-0 rounded-full bg-blue-500/20 backdrop-blur-sm"
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.5,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Sparkling particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          animate={{
            x: [
              Math.cos((i / 8) * Math.PI * 2) * 8,
              Math.cos((i / 8) * Math.PI * 2) * 16,
              Math.cos((i / 8) * Math.PI * 2) * 8,
            ],
            y: [
              Math.sin((i / 8) * Math.PI * 2) * 8,
              Math.sin((i / 8) * Math.PI * 2) * 16,
              Math.sin((i / 8) * Math.PI * 2) * 8,
            ],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}

      {/* Magnification effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-blue-500/50"
        animate={{
          scale: isHovering ? 1.2 : 1,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
} 