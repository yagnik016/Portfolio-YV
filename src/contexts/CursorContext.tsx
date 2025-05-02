'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface CursorContextType {
  isHovering: boolean
  setIsHovering: (value: boolean) => void
  cursorX: number
  cursorY: number
  setCursorPosition: (x: number, y: number) => void
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export function CursorProvider({ children }: { children: ReactNode }) {
  const [isHovering, setIsHovering] = useState(false)
  const [cursorX, setCursorX] = useState(-100)
  const [cursorY, setCursorY] = useState(-100)

  const setCursorPosition = (x: number, y: number) => {
    setCursorX(x)
    setCursorY(y)
  }

  return (
    <CursorContext.Provider value={{ isHovering, setIsHovering, cursorX, cursorY, setCursorPosition }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const context = useContext(CursorContext)
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider')
  }
  return context
} 