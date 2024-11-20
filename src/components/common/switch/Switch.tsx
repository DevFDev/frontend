import clsx from 'clsx'

import { handleKeyDown } from '@/utils/handleKeyDown'

interface SwtichProps {
  isOn: boolean
  disabled?: boolean
  label?: string
  onToggle: () => void
}

const labelClass = 'text-body2 font-medium text-gray-600'
const containerClass = 'flex cursor-pointer items-center gap-x-8'

export const Switch = ({
  isOn,
  disabled = false,
  label,
  onToggle,
}: SwtichProps): JSX.Element => {
  const buttonClass = clsx(
    'relative inline-flex h-30 w-50 items-center rounded-full transition-colors duration-300',
    isOn ? 'bg-primary-normal' : 'bg-gray-300',
    disabled && 'cursor-not-allowed opacity-50'
  )

  const spanClass = clsx(
    'absolute left-2 top-2 h-26 w-26 transform rounded-full bg-common-white transition-transform duration-300',
    isOn ? 'translate-x-20' : 'translate-x-0'
  )

  return (
    <label className={containerClass}>
      <div
        role='button'
        aria-label='toggle button'
        tabIndex={0}
        onClick={!disabled ? onToggle : undefined}
        onKeyDown={e => handleKeyDown(e, onToggle, disabled)}
        className={buttonClass}
      >
        <span className={spanClass} />
      </div>
      {label && <span className={labelClass}>{label}</span>}
    </label>
  )
}
