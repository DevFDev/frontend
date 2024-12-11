import Image from 'next/image'

import { PortfolioListItem } from '@/types/api/Portfolio.types'

import { Chip } from '@/components/common/chip'
import { Box } from '@/components/common/containers'
import { Card } from '@/components/shared/card'

import { joinWithHash } from '@/utils/convertArrayToHashString'

interface PortfolioCardProps {
  portfolioItem: PortfolioListItem
}

export const PortfolioCard = ({
  portfolioItem,
}: PortfolioCardProps): JSX.Element => {
  const {
    portImageUrl,
    portPosition,
    portTitle,
    tags,
    writer,
    answers,
    likes,
    views,
    createdAt,
  } = portfolioItem
  const { nickname, imageUrl } = writer
  const tagsLabel = joinWithHash(tags ?? [])

  return (
    <Card className='flex gap-12 pb-12'>
      <Box className='relative w-190 shrink-0 overflow-hidden'>
        <Image fill src={portImageUrl} alt='포트폴리오 썸네일' />
      </Box>
      <div className='overflow-hidden'>
        <div className='mb-4'>
          <Chip label={portPosition} />
        </div>
        <div className='mb-4'>
          <Card.Title>{portTitle}</Card.Title>
        </div>
        <div className='mb-12'>
          <Card.Content className='overflow-hidden overflow-ellipsis whitespace-nowrap'>
            {tagsLabel}
          </Card.Content>
        </div>
        <div className='flex items-center gap-8'>
          <Card.Wrtier nickname={nickname} imageUrl={imageUrl} />
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
