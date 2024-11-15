'use client'

import { ReactNode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

interface PortalProps {
  children: ReactNode
}

export const Portal = ({ children }: PortalProps): JSX.Element | null => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const portalRoot = document.getElementById('portal-root')
    if (portalRoot) setMounted(true)
  }, [])

  const portalRoot = document.getElementById('portal-root')
  if (!mounted || !portalRoot) return null

  return ReactDOM.createPortal(children, portalRoot)
}
