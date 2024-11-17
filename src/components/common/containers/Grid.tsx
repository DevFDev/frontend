import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

type Column = 1 | 2 | 3 | 4 | 6 | 12
type Spacing = 0 | 4 | 8 | 12 | 16 | 20

interface GridProps {
  children: React.ReactNode
  className?: string
}

interface GridContainerProps extends GridProps {
  columns?: Column // 열 개수
  spacing?: Spacing // 아이템 간의 간격
  rowGap?: Spacing // 행 간 간격
}

interface GridItemProps extends GridProps {
  colSpan?: Column // 아이템이 차지할 열의 개수
}

const baseStyle = 'grid'

const styleByColumns: Record<Column, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
}

const styleBySpacing: Record<Spacing, string> = {
  0: 'gap-0',
  4: 'gap-4',
  8: 'gap-8',
  12: 'gap-12',
  16: 'gap-16',
  20: 'gap-20',
}

const styleByRowGap: Record<Spacing, string> = {
  0: 'gap-y-0',
  4: 'gap-y-4',
  8: 'gap-y-8',
  12: 'gap-y-12',
  16: 'gap-y-16',
  20: 'gap-y-20',
}

const styleByColSpan: Record<Column, string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  6: 'col-span-6',
  12: 'col-span-12',
}

const GridContainer = ({
  children,
  className = '',
  columns = 12,
  spacing = 0,
  rowGap = 0,
}: GridContainerProps): JSX.Element => {
  const columnClass = styleByColumns[columns] || ''
  const spacingClass = styleBySpacing[spacing] || ''
  const rowGapClass = styleByRowGap[rowGap] || ''

  const containerStyle = twMerge(
    baseStyle,
    columnClass,
    spacingClass,
    rowGapClass,
    className
  )

  return <div className={containerStyle}>{children}</div>
}

const GridItem = ({
  children,
  className = '',
  colSpan = 1,
}: GridItemProps): JSX.Element => {
  const colSpanClass = styleByColSpan[colSpan] || ''
  const itemStyle = clsx(colSpanClass, className)

  return <div className={itemStyle}>{children}</div>
}

interface GridCompoundComponent extends React.Component<GridProps> {
  Container: typeof GridContainer
  Item: typeof GridItem
}

const Grid = {} as GridCompoundComponent

Grid.Container = GridContainer
Grid.Item = GridItem

export { Grid }
