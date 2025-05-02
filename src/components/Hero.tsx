'use client'
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { ChevronDown, Github, Linkedin, Mail, Phone, Code2 } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation'
import { Hoverable } from './Hoverable'

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  element?.scrollIntoView({ behavior: 'smooth' })
}

// Particle animation component
const Particle = ({ index }: { index: number }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const opacity = useMotionValue(Math.random())

  useEffect(() => {
    const angle = Math.random() * Math.PI * 2
    const radius = Math.random() * 200 + 100
    const duration = Math.random() * 20 + 10

    const animate = () => {
      const time = (Date.now() % (duration * 1000)) / (duration * 1000)
      const tx = Math.cos(angle + time * Math.PI * 2) * radius
      const ty = Math.sin(angle + time * Math.PI * 2) * radius
      x.set(tx)
      y.set(ty)
      opacity.set(Math.abs(Math.sin(time * Math.PI * 2)))
      requestAnimationFrame(animate)
    }

    const animation = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animation)
  }, [x, y, opacity])

  return (
    <motion.div
      style={{
        x,
        y,
        opacity,
        scale: useSpring(1, { stiffness: 200, damping: 10 }),
      }}
      className="absolute w-2 h-2 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-full"
      whileHover={{ scale: 2 }}
    />
  )
}

// Floating code snippets component
const CodeSnippet = ({ delay }: { delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 0.7, y: 0 }}
      transition={{ delay, duration: 1 }}
      className="absolute hidden md:block"
      style={{
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 80 + 10}%`,
      }}
    >
      <div className="bg-white/5 dark:bg-gray-800/5 backdrop-blur-sm rounded-lg p-3 font-mono text-sm">
        <Code2 className="inline-block w-4 h-4 mr-2 text-blue-500" />
        {['const portfolio = {};', 'await skills.upgrade();', 'while(true) { learn(); }'][Math.floor(Math.random() * 3)]}
      </div>
    </motion.div>
  )
}

export function Hero() {
  const ref = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const { scrollY } = useScroll()
  const isInView = useInView(ref, { once: true })

  const y = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const springConfig = { damping: 25, stiffness: 200 }
  const moveX = useSpring(mouseX, springConfig)
  const moveY = useSpring(mouseY, springConfig)

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          left: moveX,
          top: moveY,
        }}
      />
      <motion.div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
          y,
          opacity
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
          animate={{
            x: [
              Math.random() * 1000 - 500,
              Math.random() * 1000 - 500,
            ],
            y: [
              Math.random() * 1000 - 500,
              Math.random() * 1000 - 500,
            ],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <div className="relative z-10 text-center px-4">
        <motion.div
          className="mb-6 text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2 }}
        >
          Welcome to my portfolio
        </motion.div>

        <Hoverable>
          <motion.h1 
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TypeAnimation
              sequence={[
                'Hi, I\'m Yagnik Vadaliya',
                1000,
                'I\'m a Full Stack Developer',
                1000,
                'I Build Web Applications',
                1000,
              ]}
              wrapper="div"
              cursor={true}
              repeat={Infinity}
              style={{ display: 'inline-block' }}
            />
          </motion.h1>
        </Hoverable>

        <Hoverable>
          <motion.h2
            className="text-2xl md:text-3xl font-semibold mb-8 text-gray-600 dark:text-gray-300"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Full Stack Developer
          </motion.h2>
        </Hoverable>

        <Hoverable>
          <motion.p
            className="text-lg md:text-xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Building modern web applications with React, Next.js, and TypeScript. 
            Passionate about creating seamless user experiences and robust backend solutions.
          </motion.p>
        </Hoverable>

        <Hoverable>
          <motion.div
            className="flex justify-center gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <a
              href="#contact"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors"
            >
              Contact Me
            </a>
            <a
              href="#projects"
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              View Projects
            </a>
          </motion.div>
        </Hoverable>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6 }}
          className="flex gap-6 mt-12 justify-center"
        >
          {[
            { icon: Github, href: "https://github.com/yagnik016", delay: 0 },
            { icon: Linkedin, href: "https://linkedin.com/in/", delay: 0.1 },
            { icon: Mail, href: "mailto:vadaliyayagnik06@gmail.com", delay: 0.2 },
            { icon: Phone, href: "tel:+919723682172", delay: 0.3 }
          ].map((social, index) => (
            <motion.a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass rounded-full hover:shadow-lg transition-shadow duration-300 relative group"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7 + social.delay }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 group-hover:opacity-100 opacity-0 transition-opacity"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <social.icon className="w-6 h-6 text-gray-800 dark:text-gray-200 relative z-10" />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection('about')}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}