import clsx from 'clsx'

import { Highlight } from '../text'

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
  const labelClass = clsx('flex flex-col text-body3 font-medium', className)

  return (
    <label htmlFor={htmlFor} className={labelClass}>
      <div className='mb-4 flex items-center'>
        <span className='font-medium text-gray-600'>{labelText}</span>
        {required && <Highlight>*</Highlight>}
      </div>
      {children}
    </label>
  )
}
