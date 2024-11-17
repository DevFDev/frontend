import clsx from 'clsx'

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  labelText?: string
}

export const Label = ({
  required = false,
  labelText,
  htmlFor,
  children,
  className = '',
}: LabelProps) => {
  const labelClass = clsx('flex flex-col', className)
  const requiredClass = 'text-body3 font-medium text-primary-normal'

  return (
    <label htmlFor={htmlFor} className={labelClass}>
      <div className='mb-4 flex items-center'>
        <span className='font-medium text-gray-600'>{labelText}</span>
        {required && <span className={requiredClass}>*</span>}
      </div>
      {children}
    </label>
  )
}
