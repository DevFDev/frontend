import { IcClose } from '@/assets/IconList'
import clsx from 'clsx'

type Color = 'blue' | 'gray'

type ChipProps = {
  onDelete: () => void
  color?: Color
  label: string
  className?: string
}

const baseStyle =
  'flex h-36 items-center justify-center gap-4 rounded-4 px-8 text-body2 font-medium'

const styleByColor = {
  blue: 'bg-blue-800 text-common-white',
  gray: 'border-1 border-solid border-gray-200 bg-gray-100 text-gray-700',
}

export const DeletableChip = ({
  onDelete,
  label,
  color = 'blue',
  className = '',
}: ChipProps): JSX.Element => {
  const chipStyle = clsx(baseStyle, styleByColor[color], className)
  const buttonStyle = clsx({ 'text-gray-400': color === 'gray' })
  return (
    <span className={chipStyle}>
      {label}
      <button
        onClick={onDelete}
        className={buttonStyle}
        type='button'
        aria-label={`${label} 삭제`}
      >
        <IcClose />
      </button>
    </span>
  )
}
