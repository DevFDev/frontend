import { PROJECT_CATEGORY_MAP } from '@/constants/dictionaryLabelMap'
import { ProjectListItem } from '@/types/api/Project.types'

import { Chip } from '@/components/common/chip'
import { Card } from '@/components/shared/card'

import { joinWithHash } from '@/utils/convertArrayToHashString'

interface ProjectCardProps {
  projectItem: ProjectListItem
}

export const ProjectCard = ({ projectItem }: ProjectCardProps): JSX.Element => {
  const {
    projectTitle,
    projectCategory,
    tags,
    writer,
    answers,
    likes,
    views,
    createdAt,
  } = projectItem
  const { nickname, imageUrl } = writer
  const tagsLabel = joinWithHash(tags ?? [])

  return (
    <Card className='flex gap-12 pb-12'>
      <div className='overflow-hidden'>
        <div className='mb-4'>
          <Chip label={PROJECT_CATEGORY_MAP[projectCategory]} type='position' />
        </div>
        <div className='mb-4'>
          <Card.Title>{projectTitle}</Card.Title>
        </div>
        <div className='mb-12'>
          <Card.Content className='overflow-hidden overflow-ellipsis whitespace-nowrap'>
            {tagsLabel}
          </Card.Content>
        </div>
        <div className='flex items-center gap-8'>
          <Card.Writer nickname={nickname} imageUrl={imageUrl} />
          <div className='flex flex-grow items-center gap-10'>
            <Card.TimeStamp createdAt={createdAt} />
            <Card.Count type='comment' counts={answers} />
            <Card.Count type='like' counts={likes} />
            <Card.Count type='view' counts={views} />
          </div>
        </div>
      </div>
    </Card>
  )
}
