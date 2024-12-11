import { twMergeEx } from '@/lib/twMerge'

type ChipProps = {
  label: string
  className?: string
}

const baseStyle =
  'flex h-28 w-max items-center justify-center rounded-4 bg-gray-200 px-6 text-body3 font-medium text-gray-500'

const styleByLabel: Record<string, string> = {
  '모집 중': 'bg-green-100 text-green-500',
  '모집 완료': 'bg-gray-200 text-gray-600',
  스터디: 'bg-purple-100 text-purple-500',
  프로젝트: 'bg-purple-100 text-purple-500',
  멘토링: 'bg-pink-100 text-pink-500',
  기술: 'bg-red-100 text-red-500',
  커리어: 'bg-yellow-100 text-yellow-500',
  기타: 'bg-cyan-100 text-cyan-500',
}

export const Chip = ({ label, className = '' }: ChipProps): JSX.Element => {
  const labelStyle = styleByLabel[label] || ''
  const chipStyle = twMergeEx(baseStyle, labelStyle, className)
  return <span className={chipStyle}>{label}</span>
}
