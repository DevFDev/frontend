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

interface CheckboxInputProps
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
  const toggleIconState = () => {
    if (variant === 'checkbox') {
      return checked ? (
        <IcCheckboxOn width={24} height={24} alt='체크된 체크박스' />
      ) : (
        <IcCheckboxOff width={24} height={24} alt='체크 안 된 체크박스' />
      )
    }
    return checked ? (
      <IcCheckOn width={24} height={24} alt='체크된 체크' />
    ) : (
      <IcCheckOff width={24} height={24} alt='체크 안 된 체크' />
    )
  }
  const labelClass = clsx(
    'flex items-center',
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
      <span
        role='checkbox'
        tabIndex={0}
        aria-checked={checked}
        aria-label={'checkbox button'}
        className='cursor-pointer'
        onKeyDown={e =>
          handleKeyDown(
            e,
            () => toggleCheckbox(checked, onChange, props.value),
            disabled
          )
        }
        onClick={() => toggleCheckbox(checked, onChange, props.value)}
      >
        {toggleIconState()}
      </span>
      <span className={twMerge('ml-10 h-22', className)}>{label}</span>
    </label>
  )
}
