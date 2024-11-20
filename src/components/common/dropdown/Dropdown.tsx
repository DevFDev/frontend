import { createContext, useContext, useState } from 'react'

import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import { Box } from '@/components/common/containers'

type BaseProps = React.HTMLAttributes<HTMLElement>

interface DropdownContextType {
  isOpen: boolean
  toggle: () => void
  close: () => void
}

const DropdownContext = createContext<DropdownContextType | null>(null)

const useDropdownContext = () => {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error('useDropdownContext must be used within a DropdownProvider')
  }
  return context
}

const Dropdown = ({ children, className }: BaseProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)

  const dropdownClass = twMerge('relative', className)

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const relatedTarget = event.relatedTarget as HTMLElement

    if (!relatedTarget || !event.currentTarget.contains(relatedTarget)) {
      close()
    }
  }

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div className={dropdownClass} onBlur={handleBlur}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

const Trigger = ({ children, className }: BaseProps) => {
  const { toggle } = useDropdownContext()

  return (
    <button
      type='button'
      className={className}
      onClick={toggle}
      aria-haspopup='listbox'
      aria-expanded={true}
    >
      {children}
    </button>
  )
}

interface MenuProps extends BaseProps {
  position?: 'dropup' | 'dropdown'
  alignment?: 'left' | 'right'
}

const getMenuStyle = (position: string, alignment: string, className: string) =>
  twMerge(
    'absolute z-10 w-216 flex-col items-start p-8 shadow-level4',
    position === 'dropdown' ? 'mt-4' : 'bottom-full mb-4',
    alignment === 'right' ? 'right-0' : 'left-0',
    className
  )

const Menu = ({
  children,
  className = '',
  position = 'dropdown',
  alignment = 'left',
}: MenuProps): JSX.Element | null => {
  const { isOpen } = useDropdownContext()
  if (!isOpen) return null

  return (
    <Box
      role='listbox'
      variant='contained'
      className={getMenuStyle(position, alignment, className)}
    >
      {children}
    </Box>
  )
}

interface ItemProps extends BaseProps {
  closeOnSelect?: boolean
}

const getItemStyle = (className: string) =>
  clsx(
    'flex h-40 w-full items-center rounded-8 px-12 text-body2 text-gray-800 hover:bg-gray-100',
    className
  )

const Item = ({
  children,
  className = '',
  closeOnSelect = true,
  onClick,
  ...props
}: ItemProps) => {
  const { close } = useDropdownContext()

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (typeof onClick === 'function') {
      onClick(e)
    }
    if (closeOnSelect) {
      close()
    }
  }

  return (
    <button
      className={getItemStyle(className)}
      type='button'
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}

Dropdown.Trigger = Trigger
Dropdown.Menu = Menu
Dropdown.Item = Item

export { Dropdown }
