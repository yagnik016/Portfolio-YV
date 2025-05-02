'use client'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Mail, Send, Phone, MapPin, Sparkles } from 'lucide-react'
import { Hoverable } from './Hoverable'

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Add your form submission logic here
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simulated delay
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "vadaliyayagnik06@gmail.com",
      href: "mailto:vadaliyayagnik06@gmail.com",
      color: "blue"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 9723682172",
      href: "tel:+919723682172",
      color: "green"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Gujarat, India",
      href: "#",
      color: "red"
    }
  ]

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
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
              Get In Touch
            </motion.h2>
          </Hoverable>

          <div className="grid md:grid-cols-2 gap-12">
            <Hoverable>
              <motion.div
                className="space-y-6"
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-2xl font-semibold">Let's Connect</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>
                
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-lg hover:shadow-lg transition-shadow duration-300"
                      initial={{ y: 20, opacity: 0 }}
                      animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    >
                      <motion.div
                        className={`w-12 h-12 bg-gradient-to-br from-${info.color}-100 to-${info.color}-200 dark:from-${info.color}-900/50 dark:to-${info.color}-800/50 rounded-full flex items-center justify-center relative`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <info.icon className={`w-6 h-6 text-${info.color}-600 dark:text-${info.color}-400`} />
                        <motion.div
                          className="absolute -inset-1 rounded-full border-2 border-transparent"
                          animate={{
                            borderColor: [`${info.color}-400`, "transparent"],
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </motion.div>
                      <div>
                        <h4 className="font-medium">{info.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300">{info.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Hoverable>

            <Hoverable>
              <motion.form
                className="space-y-6"
                onSubmit={handleSubmit}
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <label htmlFor="message" className="block mb-2 text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </motion.form>
            </Hoverable>
          </div>
        </motion.div>
      </div>
    </section>
  )
}