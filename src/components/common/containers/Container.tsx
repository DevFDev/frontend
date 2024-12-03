import { twMergeEx } from '@/lib/twMerge'

type ContainerProps<T extends React.ElementType> = {
  as?: T
  children: React.ReactNode
  className?: string
} & React.ComponentPropsWithoutRef<T>

export const Container = <T extends React.ElementType = 'div'>({
  as,
  children,
  className,
  ...props
}: ContainerProps<T>): JSX.Element => {
  const Component = as || 'div'

  const baseStyle = 'max-w-1200'
  const containerStyle = twMergeEx(baseStyle, className)

  return (
    <Component className={containerStyle} {...props}>
      {children}
    </Component>
  )
}
