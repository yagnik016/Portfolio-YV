'use client'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { 
  Code2, 
  Briefcase, 
  Rocket, 
  Users, 
  Award, 
  Clock, 
  Coffee,
  Sparkles
} from 'lucide-react'
import { Hoverable } from './Hoverable'

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isMounted, setIsMounted] = useState(false)

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

  const stats = [
    { label: "Years Experience", value: "3+", icon: Clock },
    { label: "Projects", value: "50+", icon: Code2 },
    { label: "Clients", value: "20+", icon: Users },
    { label: "Awards", value: "5+", icon: Award }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    handleResize()
    setIsMounted(true)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const FloatingParticles = () => {
    if (!isMounted) return null

    return Array.from({ length: 15 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
        animate={{
          x: [
            Math.random() * windowSize.width,
            Math.random() * windowSize.width,
          ],
          y: [
            Math.random() * 500,
            Math.random() * 500,
          ],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: Math.random() * 5 + 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    ))
  }

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30 dark:from-blue-900/10 dark:to-indigo-900/10"
        style={{ y, opacity }}
      />
      
      {/* Floating particles */}
      <FloatingParticles />

      <div className="container px-4 mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Hoverable>
            <motion.h2 
              className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              About Me
            </motion.h2>
          </Hoverable>

          <Hoverable>
            <motion.div
              className="space-y-6 text-lg text-gray-600 dark:text-gray-300"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="leading-relaxed">
                I am a passionate Full Stack Developer with expertise in building modern web applications. 
                With a keen eye for design and a love for clean code, I create seamless user experiences.
              </p>
              
              <p className="leading-relaxed">
                My journey in web development started with a curiosity to create meaningful digital experiences, 
                and it has evolved into a professional pursuit of excellence in both frontend and backend development.
              </p>
            </motion.div>
          </Hoverable>

          <Hoverable>
            <motion.div
              className="grid grid-cols-2 gap-4 mt-12"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {[
                { label: "Years Experience", value: "3+" },
                { label: "Projects", value: "50+" },
                { label: "Clients", value: "20+" },
                { label: "Awards", value: "5+" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="p-6 bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-lg text-center hover:shadow-lg transition-shadow duration-300"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </Hoverable>
        </motion.div>
      </div>
    </section>
  )
}