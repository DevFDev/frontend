import { IcComment, IcEyeOpen, IcHeart } from '@/assets/IconList'
import { twMergeEx } from '@/lib/twMerge'

import { Avatar } from '@/components/common/avatar'
import { Container } from '@/components/common/containers'
import { Text } from '@/components/common/text'

import { formatDate } from '@/utils/formatData'

type BaseProps = React.HTMLAttributes<HTMLElement>

const baseCardContainerStyle =
  'h-134 w-full border-b-1 border-solid border-gray-200'

export const Card = ({ children, className }: BaseProps): JSX.Element => {
  const cardContainerClass = twMergeEx(baseCardContainerStyle, className)
  return <Container className={cardContainerClass}>{children}</Container>
}

const CardTitle = ({ children, className }: BaseProps): JSX.Element => (
  <Text.Title variant='title1' weight='600' className={className}>
    {children}
  </Text.Title>
)

const CardContent = ({ children, className }: BaseProps): JSX.Element => (
  <Text.Body variant='body1' weight='500' color='gray600' className={className}>
    {children}
  </Text.Body>
)

interface CardWriterProps extends BaseProps {
  nickname: Nickname
  imageUrl: ImageURL
}

const CardWriter = ({
  nickname,
  imageUrl,
  className,
}: CardWriterProps): JSX.Element => (
  <div className={twMergeEx('flex items-center gap-8', className)}>
    <Avatar image={imageUrl} size={24} />
    <Text.Body variant='body1'>{nickname}</Text.Body>
  </div>
)

interface CardTimeStampProps extends TimeStamps {
  className?: string
}

const CardTimestamp = ({
  createdAt,
  className,
}: CardTimeStampProps): JSX.Element => {
  const date = formatDate(createdAt)

  return (
    <Text.Body variant='body3' color='gray400' className={className}>
      {date}
    </Text.Body>
  )
}

type CountType = 'comment' | 'like' | 'view'
const countIcons: Record<CountType, React.ReactElement> = {
  comment: <IcComment />,
  like: <IcHeart />,
  view: <IcEyeOpen />,
}

interface CardCountProps extends BaseProps {
  type: CountType
  counts: number
}

const CardCount = ({
  type,
  counts,
  className,
}: CardCountProps): JSX.Element => (
  <Text.Caption
    variant='caption1'
    color='gray400'
    className={twMergeEx('flex items-center gap-4', className)}
  >
    {countIcons[type]}
    {counts}
  </Text.Caption>
)

Card.Title = CardTitle
Card.Content = CardContent
Card.Wrtier = CardWriter
Card.TimeStamp = CardTimestamp
Card.Count = CardCount
