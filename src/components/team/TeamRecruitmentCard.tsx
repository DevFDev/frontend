import { TeamRecruitmentListItem } from '@/types/api/Team.types'

import { Chip } from '@/components/common/chip'
import { Divider } from '@/components/common/divider'
import { Text } from '@/components/common/text'
import { Card } from '@/components/shared/card'

interface TeamRecruitmentCardProps {
  teamRecruitmentItem: TeamRecruitmentListItem
}

export const TeamRecruitmentCard = ({
  teamRecruitmentItem,
}: TeamRecruitmentCardProps): JSX.Element => {
  const {
    teamIsActive,
    teamTitle,
    teamPosition,
    teamRecruitmentNum,
    teamTechStack,
    writer,
    answers,
    likes,
    createdAt,
  } = teamRecruitmentItem
  const { nickname, imageUrl } = writer
  const activeRecruitmentLabel = teamIsActive ? '모집 중' : '모집 완료'
  const recruitmentNumLabel = `모집인원 : ${1}/${teamRecruitmentNum}`
  const teckStackLabel = (teamTechStack ?? [])
    .map(stack => `#${stack}`)
    .join('')

  return (
    <Card>
      <div className='mb-4'>
        <Chip label={activeRecruitmentLabel} />
      </div>
      <div className='mb-4'>
        <Card.Title>{teamTitle}</Card.Title>
      </div>
      <div className='flex items-center gap-10'>
        <Text.Body variant='body1' color='gray700' className='shrink-0'>
          {teamPosition}
        </Text.Body>
        <Divider />
        <Text.Body variant='body1' color='gray700' className='shrink-0'>
          {recruitmentNumLabel}
        </Text.Body>
        <Divider />
        <Text.Body
          variant='body1'
          color='gray700'
          className='shrink overflow-x-hidden overflow-ellipsis'
        >
          {teckStackLabel}
        </Text.Body>
      </div>
      <div className='my-12 flex items-center gap-8'>
        <Card.Wrtier nickname={nickname} imageUrl={imageUrl} />
        <div className='flex items-center gap-10'>
          <Card.TimeStamp createdAt={createdAt} />
          <Card.Count type='comment' counts={answers} />
          <Card.Count type='like' counts={likes} />
        </div>
      </div>
    </Card>
  )
}
