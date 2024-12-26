'use client'

import { useState } from 'react'

export const useToggle = (
  initialState = false
): { isOpen: boolean; toggle: () => void; close: () => void } => {
  const [isOpen, setIsOpen] = useState(initialState)
  const toggle = () => setIsOpen(prev => !prev)
  const close = () => setIsOpen(false)
  return { isOpen, toggle, close }
}
