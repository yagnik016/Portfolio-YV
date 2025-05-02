import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { CursorProvider } from '@/contexts/CursorContext'
import { AnimatedCursor } from '@/components/AnimatedCursor'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Yagnik Vadaliya - Portfolio',
  description: 'Full Stack Developer Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-cream-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <ThemeProvider>
          <CursorProvider>
            <AnimatedCursor />
            <div className="min-h-screen">
              {children}
            </div>
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}