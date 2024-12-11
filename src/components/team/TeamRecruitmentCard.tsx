import { recruitmentStatusMap } from '@/contants/stateToLabelMaps'
import { TeamRecruitmentListItem } from '@/types/api/Team.types'
import clsx from 'clsx'

import { Chip } from '@/components/common/chip'
import { Divider } from '@/components/common/divider'
import { Text } from '@/components/common/text'
import { Card } from '@/components/shared/card'

import { joinWithHash } from '@/utils/convertArrayToHashString'

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
  const activeRecruitmentLabel = recruitmentStatusMap[`${teamIsActive}`]
  const recruitmentNumLabel = `모집인원 : ${1}/${teamRecruitmentNum}`
  const teckStackLabel = joinWithHash(teamTechStack ?? [])

  return (
    <Card>
      <div className='mb-4'>
        <Chip label={activeRecruitmentLabel} />
      </div>
      <div className='mb-4'>
        <Card.Title>{teamTitle}</Card.Title>
      </div>
      <div className='flex items-center gap-10'>
        <ItemWithDivider label={teamPosition} />
        <ItemWithDivider label={recruitmentNumLabel} />
        <ItemWithDivider label={teckStackLabel} isLast />
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

interface ItemWithDividerProps {
  label: string
  isLast?: boolean
}

const ItemWithDivider = ({
  label,
  isLast,
}: ItemWithDividerProps): JSX.Element => (
  <>
    <Text.Body
      variant='body1'
      color='gray700'
      className={clsx(
        { 'shrink-0': !isLast },
        {
          'shrink overflow-x-hidden overflow-ellipsis': isLast,
        }
      )}
    >
      {label}
    </Text.Body>
    {!isLast && <Divider />}
  </>
)
