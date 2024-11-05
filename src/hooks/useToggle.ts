import { useState } from 'react'

export const useToggle = (
  initialState = false
): { isOpen: boolean; toggle: () => void } => {
  const [isOpen, setIsOpen] = useState(initialState)
  const toggle = () => setIsOpen(prev => !prev)
  return { isOpen, toggle }
}
