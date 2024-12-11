import { IcAnswerBlue } from '@/assets/IconList'
import { communityCategoryToLabelMap } from '@/contants/stateToLabelMaps'
import { CommunityListItem } from '@/types/api/Community.types'

import { Chip } from '@/components/common/chip'
import { Text } from '@/components/common/text'
import { Card } from '@/components/shared/card'

interface CommunityCardProps {
  communityItem: CommunityListItem
}
const RESPONSE_NUM = 0

export const CommunityCard = ({
  communityItem,
}: CommunityCardProps): JSX.Element => {
  const {
    communityCategory,
    communityTitle,
    communityContent,
    writer,
    answers,
    likes,
    views,
    createdAt,
  } = communityItem
  const { nickname, imageUrl } = writer

  return (
    <Card>
      <div className='mb-4'>
        <Chip label={communityCategoryToLabelMap[communityCategory]} />
      </div>
      <div className='mb-4'>
        <Card.Title>{communityTitle}</Card.Title>
      </div>
      <div className='mb-4'>
        <Card.Content className='overflow-x-hidden overflow-ellipsis whitespace-nowrap'>
          {communityContent}
        </Card.Content>
      </div>
      <div className='my-12 flex items-center gap-8'>
        <Card.Writer nickname={nickname} imageUrl={imageUrl} />
        <div className='flex flex-grow items-center gap-10'>
          <Card.TimeStamp createdAt={createdAt} />
          <Card.Count type='comment' counts={answers} />
          <Card.Count type='like' counts={likes} />
          <Card.Count type='view' counts={views} />
          <div className='flex flex-grow justify-end'>
            <Text.Body
              variant='body1'
              color='gray700'
              className='flex items-center gap-10'
            >
              <IcAnswerBlue />
              {`${RESPONSE_NUM}명이 답변했어요!`}
            </Text.Body>
          </div>
        </div>
      </div>
    </Card>
  )
}
