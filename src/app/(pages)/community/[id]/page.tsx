'use client'

import { useParams } from 'next/navigation'

import {
  IcBin,
  IcComment,
  IcEdit,
  IcEyeOpen,
  IcHeart,
  IcShare,
} from '@/assets/IconList'
import {
  CommunityDetail,
  GetCommunityDetailResponse,
} from '@/types/api/Community.types'

import { Avatar } from '@/components/common/avatar'
import { Button, Clickable } from '@/components/common/button'
import { Chip } from '@/components/common/chip'
import { Container } from '@/components/common/containers'
import { Divider } from '@/components/common/divider'
import { Text } from '@/components/common/text'
import { ContentViewer } from '@/components/shared/contentViewer'

import { useCommunity } from '@/queries/community'

import useModalStore from '@/stores/useModalStore'

export default function CommunityDetailPage(): JSX.Element {
  const params = useParams<{ id: string }>()
  const communityId = Number(params.id)

  const {
    data: communityDetail,
    isLoading,
    isError,
  } = useCommunity(communityId)

  const isOwnPost = !!(communityId % 2)
  const { openModal } = useModalStore()

  // const { mutate: deleteTeamRecruitment } = useDeleteTeamRecruitment(teamId)
  // const { mutate: closeTeamRecruitment } = useCloseTeamRecruitment(teamId)

  if (isLoading) return <div>d</div>
  if (isError) return <div>d</div>

  const {
    communityTitle,
    communityContent,
    communityCategory,
    writer,
    views,
    answers,
    likes,
    createdAt,
    isComment,
  } = communityDetail as GetCommunityDetailResponse

  const categoryMap = {
    SKILL: '기술',
    CAREER: '커리어',
    OTHER: '기타',
  }

  return (
    <Container className='mx-auto my-80 flex flex-col gap-20'>
      <section className='flex w-full flex-col gap-12'>
        <div className='mb-20 flex gap-8'>
          <Avatar image={writer.imageUrl} size={60} />
          <div className='flex flex-col gap-4'>
            <Text.Title variant='title2' weight='700'>
              {writer.nickname}
            </Text.Title>
            <div className='flex gap-10'>
              <Text.Body variant='body2' color='gray500'>
                {createdAt}
              </Text.Body>
              <div className='flex items-center gap-4'>
                <IcEyeOpen width={16} height={16} />
                <Text.Caption variant='caption1' color='gray500'>
                  {views}
                </Text.Caption>
              </div>
              <div className='flex items-center gap-4'>
                <IcHeart width={16} height={16} />
                <Text.Caption variant='caption1' color='gray500'>
                  {likes}
                </Text.Caption>
              </div>
            </div>
          </div>
        </div>
        <div className='mb-12'>
          <Chip label={categoryMap[communityCategory]} />
        </div>
        <div className='mb-20'>
          <Text.Heading variant='heading3' as='h3' weight='700'>
            {communityTitle}
          </Text.Heading>
        </div>
        <ContentViewer content={communityContent} />
        <div className='flex items-center gap-8'>
          {isComment && (
            <Clickable
              variant='outlined'
              size='lg'
              borderColor='gray'
              className='mr-auto'
            >
              <IcComment width={24} height={24} />
              <div className='flex w-30 items-center justify-center'>
                {answers}
              </div>
            </Clickable>
          )}
          <Button
            variant='outlined'
            size='lg'
            borderColor='gray'
            textColor='gray800'
          >
            <IcHeart width={24} height={24} />
            <div className='flex w-30 items-center justify-center'>{likes}</div>
          </Button>
          <Button
            variant='outlined'
            size='lg'
            borderColor='gray'
            textColor='gray800'
          >
            <IcShare width={24} height={24} />
            공유
          </Button>
          <Button
            variant='outlined'
            size='lg'
            borderColor='gray'
            textColor='gray800'
          >
            <IcEdit width={24} height={24} />
            수정
          </Button>
          <Button
            variant='outlined'
            size='lg'
            borderColor='gray'
            textColor='gray800'
          >
            <IcBin width={24} height={24} />
            삭제
          </Button>
        </div>
      </section>
      <Divider isVertical={false} />
    </Container>
  )
}
