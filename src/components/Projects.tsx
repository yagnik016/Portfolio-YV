'use client'
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { Github, ExternalLink, Sparkles } from 'lucide-react'
import { Hoverable } from './Hoverable'

export function Projects() {
  const [isPaused, setIsPaused] = useState(false)
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const [currentX, setCurrentX] = useState(0)

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])
  
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with real-time updates and payment integration",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop",
      tech: ["Next.js", "Node.js", "MongoDB"],
      link: "#",
      github: "#",
      color: "blue"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management tool with real-time updates",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop",
      tech: ["React", "Firebase", "Tailwind"],
      link: "#",
      github: "#",
      color: "indigo"
    },
    {
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media management",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
      tech: ["Vue.js", "Express", "PostgreSQL"],
      link: "#",
      github: "#",
      color: "purple"
    },
    {
      title: "AI Chat Application",
      description: "Real-time chat application with AI-powered responses and language translation",
      image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=1000&auto=format&fit=crop",
      tech: ["React", "OpenAI API", "WebSocket"],
      link: "#",
      github: "#",
      color: "green"
    },
    {
      title: "Portfolio Generator",
      description: "Dynamic portfolio website generator with customizable themes",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
      link: "#",
      github: "#",
      color: "cyan"
    },
    {
      title: "Fitness Tracker",
      description: "Comprehensive fitness tracking app with workout plans and progress analytics",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1000&auto=format&fit=crop",
      tech: ["React Native", "GraphQL", "TypeScript"],
      link: "#",
      github: "#",
      color: "emerald"
    }
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

  useEffect(() => {
    const cardWidth = 400
    const gap = 32
    const totalWidth = projects.length * (cardWidth + gap)
    let startTime = Date.now()
    let pausedTime = 0
    let animationFrameId: number

    const animate = () => {
      if (!isPaused) {
        const currentTime = Date.now()
        const elapsedTime = currentTime - startTime + pausedTime
        const duration = 30000 // 30 seconds for one complete cycle
        const progress = (elapsedTime % duration) / duration
        const x = -progress * totalWidth

        setCurrentX(x)
        controls.set({ x })
      } else {
        pausedTime = Date.now() - startTime
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isPaused, controls, projects.length])

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
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30 dark:from-blue-900/10 dark:to-indigo-900/10"
        style={{ y, opacity }}
      />
      
      {/* Floating particles */}
      <FloatingParticles />

      <div className="container px-4 mx-auto overflow-hidden">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <Hoverable>
            <motion.h2 
              className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text relative"
              variants={itemVariants}
            >
              Featured Projects
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
          
          <div className="relative overflow-hidden">
            <Hoverable>
              <motion.div
                className="flex gap-8"
                style={{ x: currentX }}
                onHoverStart={() => setIsPaused(true)}
                onHoverEnd={() => setIsPaused(false)}
              >
                {/* First set of projects */}
                {projects.map((project, index) => (
                  <motion.div
                    key={`first-${project.title}`}
                    className="w-[400px] flex-shrink-0 bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg group relative"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <div className="absolute bottom-4 right-4 flex gap-2">
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Github className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                          </motion.a>
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ExternalLink className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                          </motion.a>
                        </div>
                      </motion.div>
                    </div>
                    <motion.div className="p-6">
                      <motion.h3 
                        className={`text-xl font-bold mb-2 text-${project.color}-600 dark:text-${project.color}-400`}
                        variants={itemVariants}
                      >
                        {project.title}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-600 dark:text-gray-300 mb-4"
                        variants={itemVariants}
                      >
                        {project.description}
                      </motion.p>
                      <motion.div 
                        className="flex flex-wrap gap-2 mb-4"
                        variants={containerVariants}
                      >
                        {project.tech.map(tech => (
                          <motion.span
                            key={tech}
                            className={`px-3 py-1 bg-${project.color}-100 dark:bg-${project.color}-900/30 text-${project.color}-600 dark:text-${project.color}-400 rounded-full text-sm`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            variants={itemVariants}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
                
                {/* Duplicate set of projects for seamless loop */}
                {projects.map((project, index) => (
                  <motion.div
                    key={`second-${project.title}`}
                    className="w-[400px] flex-shrink-0 bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg group relative"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <div className="absolute bottom-4 right-4 flex gap-2">
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Github className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                          </motion.a>
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ExternalLink className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                          </motion.a>
                        </div>
                      </motion.div>
                    </div>
                    <motion.div className="p-6">
                      <motion.h3 
                        className={`text-xl font-bold mb-2 text-${project.color}-600 dark:text-${project.color}-400`}
                        variants={itemVariants}
                      >
                        {project.title}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-600 dark:text-gray-300 mb-4"
                        variants={itemVariants}
                      >
                        {project.description}
                      </motion.p>
                      <motion.div 
                        className="flex flex-wrap gap-2 mb-4"
                        variants={containerVariants}
                      >
                        {project.tech.map(tech => (
                          <motion.span
                            key={tech}
                            className={`px-3 py-1 bg-${project.color}-100 dark:bg-${project.color}-900/30 text-${project.color}-600 dark:text-${project.color}-400 rounded-full text-sm`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            variants={itemVariants}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </Hoverable>
          </div>
        </motion.div>
      </div>
    </section>
  )
}