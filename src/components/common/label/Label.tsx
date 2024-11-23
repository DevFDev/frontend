import clsx from 'clsx'

import { Highlight } from '@/components/common/text'

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  labelText?: string
  layout?: 'col' | 'row'
}

export const Label = ({
  required = false,
  labelText,
  layout = 'col',
  htmlFor,
  children,
  className = '',
}: LabelProps): JSX.Element => {
  const labelClass = clsx(
    'flex text-body3 font-medium',
    layout === 'col' ? 'flex-col' : 'flex-row',
    className
  )
  const labelTextClass = clsx(
    'flex items-center',
    layout === 'col' ? 'mb-4' : ''
  )

  return (
    <label htmlFor={htmlFor} className={labelClass}>
      <div className={labelTextClass}>
        <span className='font-medium text-gray-600'>{labelText}</span>
        {required && <Highlight>*</Highlight>}
      </div>
      {children}
    </label>
  )
}
