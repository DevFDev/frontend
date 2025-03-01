'use client'

import { useParams } from 'next/navigation'

import {
  IcBin,
  IcComment,
  IcEdit,
  IcEyeOpen,
  IcHeart,
  IcPeopleMinus,
  IcPeoplePlus,
  IcShare,
} from '@/assets/IconList'
import {
  recruitmentStatusMap,
  teamTypeToLabelMap,
} from '@/constants/stateToLabelMaps'
import { GetTeamRecruitmentResponse } from '@/types/api/Team.types'

import { Comment, CommentList } from '@/components/comment'
import { Avatar } from '@/components/common/avatar'
import { Button, Clickable, Link } from '@/components/common/button'
import { Chip } from '@/components/common/chip'
import { Box, Container } from '@/components/common/containers'
import { Divider } from '@/components/common/divider'
import { Highlight, Text } from '@/components/common/text'
import { ContentViewer } from '@/components/shared/contentViewer'
import { CloseTeamRecruitmentModalContent } from '@/components/shared/modalContent/CloseTeamRecruitmentModalContent'
import { PostDeleteAlertModalContent } from '@/components/shared/modalContent/PostDeleteAlertModalContent'

import {
  useCloseTeamRecruitment,
  useDeleteTeamRecruitment,
  useTeamRecruitment,
} from '@/queries/team'

import useModalStore from '@/stores/useModalStore'

export default function TeamDetailPage(): JSX.Element {
  const params = useParams<{ id: string }>()
  const teamId = Number(params.id)
  const { data: teamDetail, isLoading, isError } = useTeamRecruitment(teamId)
  const isOwnPost = !!(teamId % 2)
  const { openModal } = useModalStore()

  const { mutate: deleteTeamRecruitment } = useDeleteTeamRecruitment(teamId)
  const { mutate: closeTeamRecruitment } = useCloseTeamRecruitment(teamId)

  if (isLoading) return <div>d</div>
  if (isError) return <div>d</div>

  const {
    teamIsActive,
    teamTitle,
    teamContent,
    teamType,
    teamPosition,
    teamRecruitmentNum,
    teamTechStack,
    teamTags,
    writer,
    views,
    answers,
    likes,
    createdAt,
  } = teamDetail as GetTeamRecruitmentResponse

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
        <div className='mb-12 flex gap-10'>
          <Chip label={recruitmentStatusMap[`${teamIsActive}`]} />
          <Chip label={teamTypeToLabelMap[teamType]} />
        </div>
        <div className='mb-20'>
          <Text.Heading variant='heading3' as='h3' weight='700'>
            {teamTitle}
          </Text.Heading>
        </div>
        <div className='mb-20 flex flex-col gap-4'>
          <Text.Title variant='title1' weight='700'>
            {'모집인원: '}
            <Highlight className='font-medium text-gray-800'>
              {teamRecruitmentNum}
            </Highlight>
          </Text.Title>
          <Text.Title variant='title1' weight='700'>
            {'포지션 : '}
            <Highlight className='font-medium text-gray-800'>
              {teamPosition}
            </Highlight>
          </Text.Title>
          <Text.Title variant='title1' weight='700'>
            {'기술스택: '}
            <Highlight className='font-medium text-gray-800'>
              {teamTechStack.join(', ')}
            </Highlight>
          </Text.Title>
        </div>
        <ContentViewer content={teamContent} />
        <div className='mb-12 flex gap-10'>
          {teamTags.map((tag: string) => (
            <Chip key={tag} label={`#${tag}`} />
          ))}
        </div>
        <div className='flex items-center gap-8'>
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
              <Button
                variant='outlined'
                size='lg'
                borderColor='gray'
                textColor='gray800'
                onClick={() =>
                  openModal(
                    <CloseTeamRecruitmentModalContent
                      onClose={() => closeTeamRecruitment(teamId)}
                    />
                  )
                }
              >
                모집마감
              </Button>
              <Link
                href={`/team/${teamId}/edit`}
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
                      onDelete={() => deleteTeamRecruitment(teamId)}
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
      <Divider isVertical={false} />
      <section className='flex w-full flex-col gap-12'>
        <Text.Title variant='title1' weight='700'>
          멤버
        </Text.Title>
        <Box padding={16} className='flex-row justify-start gap-20'>
          <Avatar image={writer.imageUrl} size={60} />
          <Avatar image={writer.imageUrl} size={60} />
          <Avatar image={writer.imageUrl} size={60} />
        </Box>
        <div className='ml-auto flex gap-10'>
          <Button
            size='sm'
            variant='outlined'
            borderColor='gray'
            textColor='gray800'
            className='rounded-4'
          >
            <IcPeoplePlus width={24} height={24} />
            멤버 등록
          </Button>
          <Button
            size='sm'
            variant='outlined'
            borderColor='gray'
            textColor='gray800'
            className='rounded-4'
          >
            <IcPeopleMinus width={24} height={24} />
            멤버 삭제
          </Button>
        </div>
      </section>
    </Container>
  )
}
