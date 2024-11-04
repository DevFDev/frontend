import clsx from 'clsx'
import { ReactNode } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  register?: ReturnType<UseFormRegister<FieldValues>>
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  className?: string
  fullWidth?: boolean
}

const baseStyles =
  'h-52 p-14 focus:border-primary-normal rounded-lg border-1 border-gray-200 placeholder:text-body2 placeholder:font-medium placeholder:text-gray-500'
const errorStyles = 'border-semantic-negative'

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
  return (
    <div className='relative'>
      {startAdornment && (
        <span className='absolute left-14 top-10'>{startAdornment}</span>
      )}
      <input
        {...register}
        type={type}
        className={clsx(
          baseStyles,
          error ? errorStyles : 'border-gray-200',
          fullWidth && 'w-full',
          className
        )}
        {...props}
      />
      {endAdornment && (
        <span className='absolute right-14 top-14'>{endAdornment}</span>
      )}
    </div>
  )
}
