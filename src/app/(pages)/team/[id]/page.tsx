import { useState } from 'react'

import {
  IcAnswerBlue,
  IcBin,
  IcComment,
  IcEdit,
  IcEyeOpen,
  IcHeart,
  IcPencil,
  IcPeopleMinus,
  IcPeoplePlus,
  IcSearch,
  IcShare,
} from '@/assets/IconList'
import { recruitmentStatusMap } from '@/constants/stateToLabelMaps'
import { cn } from '@/lib/utils'
import { TeamRecruitmentListItem, TeamType } from '@/types/api/Team.types'
import parse from 'html-react-parser'

import { Avatar } from '@/components/common/avatar'
import { Button, Clickable } from '@/components/common/button'
import { Chip } from '@/components/common/chip'
import { Box, Container, Grid } from '@/components/common/containers'
import { Divider } from '@/components/common/divider'
import { TextInput } from '@/components/common/input'
import { Switch } from '@/components/common/switch/Switch'
import { Highlight, Text } from '@/components/common/text'
import { Pagination } from '@/components/shared/pagination'
import { Select } from '@/components/shared/select'
import { CareerSelect } from '@/components/shared/select/CareerSelect'
import { TeamRecruitmentCard } from '@/components/team/TeamRecruitmentCard'

import { usePagination } from '@/hooks/usePagination'
import { useToggle } from '@/hooks/useToggle'

const stackOptions = [
  { label: '자바스크립트', value: 'Javascript' },
  { label: 'Css', value: 'Css' },
  { label: 'HTML', value: 'HTML' },
  { label: '타입스크립트', value: 'Typescript' },
]
const positionOptions = [
  { label: '프론트엔드', value: 'frontend' },
  { label: '백엔드', value: 'backend' },
  { label: '풀스택', value: 'fullstack' },
]

const teamTypeMap: Record<TeamType, string> = {
  STUDY: '스터디',
  MENTORING: '멘토링',
  PROJECT: '프로젝트',
}

interface TeamDetailPageProps {
  params: {
    id: string
  }
}

const dummyTeamRecruitment: TeamRecruitmentListItem = {
  teamIsActive: true,
  id: 1,
  writer: {
    id: 1,
    nickname: '개발왕김코딩',
    imageUrl: 'https://picsum.photos/200',
  },
  views: 128,
  answers: 5,
  likes: 23,
  createdAt: '2024-03-15T09:00:00Z',
  updatedAt: '2024-03-15T10:30:00Z',
  teamTitle: '프론트엔드 개발자와 함께할 사이드 프로젝트 팀원 모집합니다',
  teamContent:
    '<h2>프로젝트 소개</h2><p>실제 서비스를 런칭하는 것을 목표로 하는 프로젝트입니다. 함께 성장하실 열정 있는 분들을 찾고 있습니다.</p><h2>모집 요건</h2><ul><li>React, TypeScript 사용 경험이 있으신 분</li><li>주 2회 이상 온라인 미팅 참여 가능하신 분</li><li>3개월 이상 프로젝트 참여 가능하신 분</li></ul><h2>진행 방식</h2><ul><li>온라인 미팅: 매주 화요일, 금요일 저녁 8시</li><li>사용 스택: React, TypeScript, Next.js, Tailwind CSS</li><li>협업 도구: GitHub, Figma, Notion</li></ul>',
  teamType: 'PROJECT',
  teamPosition: 'frontend',
  teamRecruitmentNum: 3,
  teamTechStack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  teamTags: ['사이드프로젝트', '실무경험', '포트폴리오'],
}
export default async function TeamDetailPage({
  params,
}: TeamDetailPageProps): Promise<JSX.Element> {
  const { id } = await params
  const data = dummyTeamRecruitment
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
    updatedAt,
  } = data

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
          <Chip label={teamTypeMap[teamType]} />
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
        <div className='tiptap mb-20'>{parse(teamContent)}</div>
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
          <Button
            variant='outlined'
            size='lg'
            borderColor='gray'
            textColor='gray800'
          >
            모집마감
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

// ...
