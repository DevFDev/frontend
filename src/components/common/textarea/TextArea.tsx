import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  fullWidth?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const baseStyles =
  'text-body-1 resize-none rounded-12 border-1 border-gray-200 p-12 font-medium text-gray-800 placeholder:text-gray-500'

export const TextArea = ({
  fullWidth = false,
  size = 'md',
  value,
  placeholder,
  className = '',
  ...props
}: TextAreaProps): JSX.Element => {
  const textAreaClass = twMerge(
    baseStyles,
    clsx(
      {
        'w-full': fullWidth,
        'h-100': size === 'sm',
        'h-104': size === 'md',
        'h-140': size === 'lg',
      },
      className
    )
  )
  return (
    <textarea
      value={value}
      aria-label='textarea'
      className={textAreaClass}
      placeholder={placeholder}
      {...props}
    />
  )
}
