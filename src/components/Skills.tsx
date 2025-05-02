'use client'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { 
  Code2, 
  Database, 
  GitBranch, 
  Globe, 
  Layout, 
  Server, 
  Terminal, 
  Type,
  Sparkles
} from 'lucide-react'
import { Hoverable } from './Hoverable'

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isMounted, setIsMounted] = useState(false)

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

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

  const skills = [
    { name: "React", level: 90, icon: Code2, color: "blue" },
    { name: "Next.js", level: 85, icon: Globe, color: "indigo" },
    { name: "TypeScript", level: 85, icon: Type, color: "purple" },
    { name: "Node.js", level: 80, icon: Server, color: "green" },
    { name: "Tailwind CSS", level: 90, icon: Layout, color: "cyan" },
    { name: "MongoDB", level: 75, icon: Database, color: "emerald" },
    { name: "PostgreSQL", level: 70, icon: Database, color: "blue" },
    { name: "Git", level: 85, icon: GitBranch, color: "orange" }
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

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
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
              className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text relative"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Skills & Expertise
              <motion.span
                className="absolute -right-8 -top-8"
                animate={{ 
                  rotate: [0, 20, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </motion.span>
            </motion.h2>
          </Hoverable>

          <Hoverable>
            <motion.div 
              className="grid gap-6"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="bg-white dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group relative overflow-hidden"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />

                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <motion.div
                        className={`w-10 h-10 bg-gradient-to-br from-${skill.color}-100 to-${skill.color}-200 dark:from-${skill.color}-900/50 dark:to-${skill.color}-800/50 rounded-full flex items-center justify-center relative`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <skill.icon className={`w-5 h-5 text-${skill.color}-600 dark:text-${skill.color}-400`} />
                        <motion.div
                          className="absolute -inset-1 rounded-full border-2 border-transparent"
                          animate={{
                            borderColor: [`${skill.color}-400`, "transparent"],
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </motion.div>
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <motion.span 
                      className={`text-${skill.color}-600 dark:text-${skill.color}-400 font-medium`}
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>

                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-full bg-gradient-to-r from-${skill.color}-500 to-${skill.color}-600 relative group-hover:from-${skill.color}-400 group-hover:to-${skill.color}-500`}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Hoverable>
        </motion.div>
      </div>
    </section>
  )
}