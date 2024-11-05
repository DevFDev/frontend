import clsx from 'clsx'
import { ReactNode } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  register?: ReturnType<UseFormRegister<FieldValues>>
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  fullWidth?: boolean
}

const baseStyles =
  'h-52 p-14 focus:border-primary-normal rounded-lg border-1 border-gray-200 text-body2 leading-body2 font-medium placeholder:text-gray-500'
const errorStyles = 'border-semantic-negative focus:border-semantic-negative'

export const TextInput = ({
  type = 'text',
  error = false,
  register,
  startAdornment = '',
  endAdornment = '',
  className = '',
  fullWidth = false,
  ...props
}: TextInputProps): JSX.Element => {
  const textInputStyle = twMerge(
    baseStyles,
    clsx(
      {
        [errorStyles]: error,
        'w-full': fullWidth,
        'pl-48': startAdornment,
        'pr-48': endAdornment,
      },
      className
    )
  )

  return (
    <div className='relative'>
      {startAdornment && (
        <span className='absolute left-14 top-10'>{startAdornment}</span>
      )}
      <input {...register} type={type} className={textInputStyle} {...props} />
      {endAdornment && (
        <span className='absolute right-14 top-14'>{endAdornment}</span>
      )}
    </div>
  )
}
