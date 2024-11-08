import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

type ChipProps = {
  label: string
  className?: string
}

const baseStyle =
  'h-28 rounded-4 bg-gray-200 px-6 text-body3 font-medium text-gray-500'

const styleByLabel: Record<string, string> = {
  '모집 중': 'bg-blue-100 text-blue-500',
  '모집 완료': 'bg-gray-200 text-gray-600',
  스터디: 'bg-green-100 text-green-500',
  프로젝트: 'bg-purple-100 text-purple-500',
  멘토링: 'bg-red-100 text-red-500',
  기술: 'bg-blue-100 text-blue-500',
  커리어: 'bg-pink-200 text-pink-600',
  기타: 'bg-orange-200 text-orange-600',
}

export const Chip = ({ label, className = '' }: ChipProps): JSX.Element => {
  const labelStyle = styleByLabel[label] || ''
  const chipStyle = twMerge(baseStyle, clsx(labelStyle), className)
  return <span className={chipStyle}>{label}</span>
}
