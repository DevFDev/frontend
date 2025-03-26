import { useId } from 'react'

import { IcCheck, IcCheckboxCheck } from '@/assets/IconList'
import { cn } from '@/lib/utils'

import { handleKeyDown } from '@/utils/handleKeyDown'
import { toggleCheckbox } from '@/utils/toggleCheckbox'

export interface CheckboxInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode
  variant?: 'checkbox' | 'check'
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
  const id = useId()
  const checkboxId = `checkbox-${id}`

  const getCheckboxIcon = (checked: boolean) => {
    const checkBoxClass = cn(
      'flex h-20 w-20 items-center justify-center rounded-3 border-[1.4px] border-solid border-gray-300 bg-common-white',
      { 'border-0 bg-primary-normal': checked }
    )
    const checkClass = 'text-common-white'
    return (
      <div className={checkBoxClass}>
        <IcCheckboxCheck className={checkClass} alt='체크된 체크박스' />
      </div>
    )
  }

  const getCheckIcon = (checked: boolean) => {
    const checkClass = cn('text-gray-300', { 'text-primary-normal': checked })
    return (
      <IcCheck
        width={24}
        height={24}
        className={checkClass}
        alt='체크 아이콘'
      />
    )
  }

  const getIconForState = (variant: string, checked: boolean) =>
    variant === 'checkbox' ? getCheckboxIcon(checked) : getCheckIcon(checked)

  const handleToggle = () => {
    if (!disabled) {
      toggleCheckbox(checked, onChange, props.value)
    }
  }

  return (
    <div className='flex items-center gap-4'>
      <input
        id={checkboxId}
        type='checkbox'
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...props}
        className='hidden'
      />
      <span
        role='checkbox'
        tabIndex={0}
        aria-checked={checked}
        aria-labelledby={checkboxId}
        aria-disabled={disabled}
        onKeyDown={e => handleKeyDown(e, handleToggle, disabled)}
        onClick={!disabled ? handleToggle : undefined}
        className='cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-normal'
      >
        {getIconForState(variant, checked)}
      </span>
      <label
        htmlFor={checkboxId}
        className='cursor-pointer text-body3 text-gray-800'
      >
        {label}
      </label>
    </div>
  )
}
