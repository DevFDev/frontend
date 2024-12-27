import { IcCheck, IcCheckboxCheck } from '@/assets/IconList'
import { twMergeEx } from '@/lib/twMerge'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import { handleKeyDown } from '@/utils/handleKeyDown'
import { toggleCheckbox } from '@/utils/toggleCheckbox'

export interface CheckboxInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string | React.ReactNode
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
    const checkBoxClass = twMergeEx(
      clsx(
        'flex h-20 w-20 items-center justify-center rounded-3 border-[1.4px] border-solid border-gray-300',
        { 'border-0 bg-primary-normal': checked }
      )
    )
    const checkClass = 'text-common-white'
    return (
      <div className={checkBoxClass}>
        <IcCheckboxCheck className={checkClass} alt='체크된 체크박스' />
      </div>
    )
  }

  const getCheckIcon = (checked: boolean) => {
    const checkClass = clsx('text-gray-300', { 'text-primary-normal': checked })
    const checkAlt = checked ? '체크된 체크' : '체크 안 된 체크'
    return (
      <IcCheck width={24} height={24} className={checkClass} alt={checkAlt} />
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
  const labelTextClass = twMergeEx('ml-10 h-22 text-gray-500', className)

  return (
    <label className={labelClass}>
      <input
        type='checkbox'
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...props}
        className='hidden'
      />
      <button
        role='checkbox'
        type='button'
        tabIndex={0}
        aria-checked={checked}
        aria-label={'checkbox button'}
        onKeyDown={e => handleKeyDown(e, handleToggle, disabled)}
        onClick={handleToggle}
        className={buttonClass}
      >
        {getIconForState(variant, checked)}
      </button>
      <span className={labelTextClass}>{label}</span>
    </label>
  )
}
