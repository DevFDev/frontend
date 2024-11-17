'use client'

import { useEffect, useState } from 'react'

import clsx from 'clsx'

import { Box } from '@/components/common/containers'

import useModalStore from '@/stores/useModalStore'

import { Portal } from './Portal'

const baseOverlayStyle =
  'fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-common-white bg-opacity-80 transition-opacity duration-300 ease-out'

const baseBoxStyle =
  ' w-440 transform shadow-level4 transition-all duration-300 ease-out'

export const Modal = (): JSX.Element | null => {
  const { isOpen, content, closeModal } = useModalStore()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let openTimer: NodeJS.Timeout | undefined
    let closeTimer: NodeJS.Timeout | undefined

    if (isOpen) {
      openTimer = setTimeout(() => setIsVisible(true), 50)
      document.body.style.overflow = 'hidden'

      const handleEsc = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          closeModal()
        }
      }

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        if (target.getAttribute('aria-label') === 'modal overlay') {
          closeModal()
        }
      }

      window.addEventListener('keydown', handleEsc)
      window.addEventListener('mousedown', handleClickOutside)

      return () => {
        window.removeEventListener('keydown', handleEsc)
        window.removeEventListener('mousedown', handleClickOutside)
      }
    } else {
      document.body.style.overflow = ''
      closeTimer = setTimeout(() => setIsVisible(false), 500)
    }

    return () => {
      if (openTimer) clearTimeout(openTimer)
      if (closeTimer) clearTimeout(closeTimer)
    }
  }, [isOpen, closeModal])

  if (!isVisible) return null

  const overlayStyle = clsx(baseOverlayStyle, {
    'opacity-100': isOpen,
    'opacity-0': !isOpen,
  })

  const boxStyle = clsx(baseBoxStyle, {
    'translate-y-0 scale-100 opacity-100': isOpen,
    '-translate-y-50 scale-95 opacity-0': !isOpen,
  })

  return (
    <Portal>
      <div className={overlayStyle} aria-label={'modal overlay'}>
        <Box
          variant={'contained'}
          padding={32}
          margin={0}
          className={boxStyle}
          aria-label={'modal box'}
          onClick={e => e.stopPropagation()}
        >
          {content}
        </Box>
      </div>
    </Portal>
  )
}
