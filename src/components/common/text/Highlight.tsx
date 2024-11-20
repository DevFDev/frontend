import { twMerge } from 'tailwind-merge'

interface HighlightProps extends React.PropsWithChildren {
  className?: string
}

export const Highlight = ({
  children,
  className = '',
}: HighlightProps): JSX.Element => {
  const highlightClass = twMerge('text-primary-normal', className)
  return <span className={highlightClass}>{children}</span>
}
