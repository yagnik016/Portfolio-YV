'use client'
import { useCursor } from '@/contexts/CursorContext'
import { motion } from 'framer-motion'

interface HoverableProps {
  children: React.ReactNode
  className?: string
  scale?: number
}

export function Hoverable({ children, className = '', scale = 1.1 }: HoverableProps) {
  const { setIsHovering } = useCursor()

  return (
    <motion.div
      className={className}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ scale }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {children}
    </motion.div>
  )
} 