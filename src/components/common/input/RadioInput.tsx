import clsx from 'clsx'

interface RadioInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const RadioInput = ({
  label,
  className = '',
  checked,
  disabled,
  ...props
}: RadioInputProps): JSX.Element => {
  return (
    <label
      className={clsx(
        'flex cursor-pointer items-center',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      <input type='radio' checked={checked} disabled={disabled} {...props} />
      <span className='custom-radio'></span>
      <span className='text-body-2 ml-4 h-22 font-normal leading-body2 text-gray-800'>
        {label}
      </span>
    </label>
  )
}
