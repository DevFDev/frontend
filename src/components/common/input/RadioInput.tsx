import clsx from 'clsx'

import { handleKeyDown } from '@/utils/handleKeyDown'

export interface RadioInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const RadioInput = ({
  label,
  className = '',
  checked,
  disabled,
  onChange,
  ...props
}: RadioInputProps): JSX.Element => {
  const labelClass = clsx(
    'flex cursor-pointer items-center',
    disabled && 'cursor-not-allowed opacity-50',
    className
  )

  return (
    <label className={labelClass}>
      <input
        type='radio'
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      <span
        role='radio'
        tabIndex={0}
        aria-checked={checked}
        aria-label={'radio input'}
        onKeyDown={e =>
          handleKeyDown(
            e,
            () =>
              onChange?.({
                target: { checked: true, value: props.value },
              } as React.ChangeEvent<HTMLInputElement>),
            disabled
          )
        }
        className='custom-radio'
      />
      <span className='text-body-2 ml-4 h-22 font-normal text-gray-800'>
        {label}
      </span>
    </label>
  )
}
