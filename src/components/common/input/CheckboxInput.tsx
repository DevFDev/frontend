import clsx from 'clsx'

interface CheckboxInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const CheckboxInput = ({
  label,
  className = '',
  checked,
  disabled,
  onChange,
  ...props
}: CheckboxInputProps): JSX.Element => {
  return (
    <label>
      <input
        type='checkbox'
        checked={checked}
        disabled={disabled}
        {...props}
      />
      <span
        role='checkbox'
        tabIndex={0}
        aria-checked={checked}
        aria-label={'checkbox button'}
        className='custom-checkbox'
      />
      {label}
    </label>
  )
}
