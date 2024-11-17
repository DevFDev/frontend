import {
  IcCheckOff,
  IcCheckOn,
  IcCheckboxOff,
  IcCheckboxOn,
} from '@/assets/IconList'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import { handleKeyDown } from '@/utils/handleKeyDown'
import { toggleCheckbox } from '@/utils/toggleCheckbox'

export interface CheckboxInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  variant: 'checkbox' | 'check'
}

export const CheckboxInput = ({
  label,
  variant = 'checkbox',
  className = '',
  checked = false,
  disabled,
  onChange,
  ...props
}: CheckboxInputProps): JSX.Element => {
  const getCheckboxIcon = (checked: boolean) => {
    return checked ? (
      <IcCheckboxOn width={24} height={24} alt='체크된 체크박스' />
    ) : (
      <IcCheckboxOff width={24} height={24} alt='체크 안 된 체크박스' />
    )
  }

  const getCheckIcon = (checked: boolean) => {
    return checked ? (
      <IcCheckOn width={24} height={24} alt='체크된 체크' />
    ) : (
      <IcCheckOff width={24} height={24} alt='체크 안 된 체크' />
    )
  }

  const getIconForState = (variant: string, checked: boolean) => {
    if (variant === 'checkbox') {
      return getCheckboxIcon(checked)
    }
    return getCheckIcon(checked)
  }

  const handleToggle = () => {
    if (!disabled) {
      toggleCheckbox(checked, onChange, props.value)
    }
  }

  const labelClass = clsx('flex items-center', disabled && 'opacity-50')
  const buttonClass = twMerge(
    'focus:outline-none focus:ring-1 focus:ring-primary-normal',
    disabled && 'cursor-not-allowed opacity-50'
  )

  return (
    <label className={labelClass}>
      <input
        type='checkbox'
        checked={checked}
        disabled={disabled}
        {...props}
        className='hidden'
      />
      <button
        role='checkbox'
        tabIndex={0}
        aria-checked={checked}
        aria-label={'checkbox button'}
        onKeyDown={e => handleKeyDown(e, handleToggle, disabled)}
        onClick={handleToggle}
        className={buttonClass}
      >
        {getIconForState(variant, checked)}
      </button>
      <span className={twMerge('ml-10 h-22', className)}>{label}</span>
    </label>
  )
}
