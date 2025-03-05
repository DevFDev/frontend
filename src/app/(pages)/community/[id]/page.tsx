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
import { communityCategoryToLabelMap } from '@/constants/stateToLabelMaps'
import { GetCommunityDetailResponse } from '@/types/api/Community.types'

import { Comment, CommentList } from '@/components/comment'
import { Avatar } from '@/components/common/avatar'
import { Button, Clickable, Link } from '@/components/common/button'
import { Chip } from '@/components/common/chip'
import { Container } from '@/components/common/containers'
import { Divider } from '@/components/common/divider'
import { Text } from '@/components/common/text'
import { ContentViewer } from '@/components/shared/contentViewer'
import { PostDeleteAlertModalContent } from '@/components/shared/modalContent'

import { useCommunity, useDeleteCommunity } from '@/queries/community'

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

  const { mutate: deleteCommunity } = useDeleteCommunity(communityId)

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
          <Chip label={communityCategoryToLabelMap[communityCategory]} />
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
          {isOwnPost && (
            <>
              <Link
                href={`/community/${communityId}/edit`}
                variant='outlined'
                size='lg'
                borderColor='gray'
                textColor='gray800'
              >
                <IcEdit width={24} height={24} />
                수정
              </Link>
              <Button
                variant='outlined'
                size='lg'
                borderColor='gray'
                textColor='gray800'
                onClick={() =>
                  openModal(
                    <PostDeleteAlertModalContent
                      onDelete={() => deleteCommunity(communityId)}
                    />
                  )
                }
              >
                <IcBin width={24} height={24} />
                삭제
              </Button>
            </>
          )}
        </div>
      </section>
      <Divider isVertical={false} />
      <section className='flex flex-col gap-20'>
        <div className='flex gap-8'>
          <Avatar size={48} />
          <div className='flex-grow'>
            <Comment variant='comment' />
          </div>
        </div>
        <div>
          <CommentList
            writer={{
              id: 1,
              imageUrl: 'https://picsum.photos/200',
              nickname: '망곰쓰 귀여워..',
            }}
            content='오 같이 참여하고 싶습니다! 신청은 어디서 하면 될까요?'
            createdAt='2024. 09. 26 10:28'
          />
        </div>
      </section>
    </Container>
  )
}
