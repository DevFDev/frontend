import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

type ChipProps = {
  label: string
  className?: string
}

const baseStyle =
  'flex h-28 items-center justify-center rounded-4 px-6 text-body3 font-medium'

const styleByLabel: Record<string, string> = {
  '모집 중': 'bg-blue-100 text-blue-500',
  '모집 완료': 'bg-gray-200 text-gray-600',
  스터디: 'bg-green-100 text-green-500',
  프로젝트: 'bg-purple-100 text-purple-500',
  멘토링: 'bg-red-100 text-red-500',
  기술: 'bg-blue-100 text-blue-500',
  커리어: 'bg-pink-100 text-pink-500',
  기타: 'bg-orange-100 text-orange-500',
}

export const Chip = ({
  label,
  className = 'bg-gray-200 text-gray-500',
}: ChipProps): JSX.Element => {
  const labelStyle = styleByLabel[label] || ''
  const chipStyle = clsx(baseStyle, labelStyle, className)
  return <span className={chipStyle}>{label}</span>
}
