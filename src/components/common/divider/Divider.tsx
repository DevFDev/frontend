import { twMerge } from 'tailwind-merge'

interface DividerProps {
  isVertical?: boolean
  thickness?: Length
  length?: Length
  color?: string
  className?: string
}

type Length = '1' | '14' | 'full'

const heightMap: Record<Length, string> = {
  '1': 'h-1',
  '14': 'h-14',
  full: 'h-full',
}
const weightMap: Record<Length, string> = {
  '1': 'w-1',
  '14': 'w-14',
  full: 'w-full',
}

export const Divider = ({
  isVertical = true,
  thickness = '1',
  length = 'full',
  color = 'bg-gray-200',
  className = '',
}: DividerProps): JSX.Element => {
  const dividerClass = twMerge(
    'min-h-0 min-w-0',
    color,
    isVertical ? heightMap[length] : heightMap[thickness],
    isVertical ? weightMap[thickness] : weightMap[length],
    className
  )

  return <div className={dividerClass} />
}
