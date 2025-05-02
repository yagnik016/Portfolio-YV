import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Projects } from '@/components/Projects'
import { Contact } from '@/components/Contact'
import { Navbar } from '@/components/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
