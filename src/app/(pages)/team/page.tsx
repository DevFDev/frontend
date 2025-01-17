'use client'

import { useState } from 'react'

import { IcPencil, IcSearch } from '@/assets/IconList'
import { cn } from '@/lib/utils'
import { TeamRecruitmentListItem, TeamType } from '@/types/api/Team.types'

import { Button, Link } from '@/components/common/button'
import { DeletableChip } from '@/components/common/chip'
import { Container, Grid } from '@/components/common/containers'
import { TextInput } from '@/components/common/input'
import { Switch } from '@/components/common/switch/Switch'
import { Text } from '@/components/common/text'
import { Pagination } from '@/components/shared/pagination'
import { Select } from '@/components/shared/select'
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
  PROJECT: '팀 프로젝트',
}

export default function TeamPage(): JSX.Element {
  const [techStacks, setTechstacks] = useState<string[]>([])
  const [positions, setPositions] = useState<string[]>([])
  const [order, setOrder] = useState<'recent' | 'like'>('recent')
  const { isOpen: onRecruitment, toggle: toggleRecruitment } = useToggle()
  const {
    currentPage,
    pageButtons,
    hasNextPageGroup,
    hasPreviousPageGroup,
    goToPage,
    goToNextPageGroup,
    goToPreviousPageGroup,
  } = usePagination({ totalItems: 20, itemsPerPage: 10, buttonsPerPage: 10 })
  const [teamType, setTeamType] = useState<TeamType>('STUDY')

  const handleTechStackChange = (values: string[]) => {
    setTechstacks(() => values)
  }
  const handlePositionChange = (values: string[]) => {
    setPositions(() => values)
  }

  return (
    <Container className='mx-auto my-80 flex gap-30'>
      <div className='flex flex-col gap-12'>
        <Text.Heading variant='heading3' as='h3'>
          팀원 찾기
        </Text.Heading>
        <div className='w-216'>
          <Button
            fullWidth
            variant='text'
            onClick={() => {
              setTeamType('STUDY')
            }}
            size='lg'
            className={cn('justify-start px-12 hover:bg-gray-100', {
              'text-primary-normal': teamType === 'STUDY',
            })}
          >
            스터디
          </Button>
          <Button
            fullWidth
            variant='text'
            onClick={() => {
              setTeamType('PROJECT')
            }}
            size='lg'
            className={cn('justify-start px-12 hover:bg-gray-100', {
              'text-primary-normal': teamType === 'PROJECT',
            })}
          >
            팀 프로젝트
          </Button>
          <Button
            fullWidth
            variant='text'
            onClick={() => {
              setTeamType('MENTORING')
            }}
            size='lg'
            className={cn('justify-start px-12 hover:bg-gray-100', {
              'text-primary-normal': teamType === 'MENTORING',
            })}
          >
            멘토링
          </Button>
        </div>
      </div>
      <main className='flex-grow'>
        <div className='mb-20 flex justify-between gap-12'>
          <TextInput
            className='h-48'
            placeholder='제목, 내용, 작성자를 검색해보세요!'
            startAdornment={<IcSearch width={24} height={24} />}
          />
          <div className='flex-shrink-0'>
            <Button size='lg' className='font-semibold'>
              검색
            </Button>
          </div>
        </div>
        <div className='mb-20 flex justify-between gap-12'>
          <Text.Heading as='h2' variant='heading2'>
            {teamTypeMap[teamType]}
          </Text.Heading>
          <div>
            <Link href={'/team/new'} size='lg' className='w-118 font-semibold'>
              <IcPencil width={24} height={24} />
              작성하기
            </Link>
          </div>
        </div>
        <div className='mb-20 flex flex-col gap-8'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-12'>
              <Select
                options={stackOptions}
                selectedValues={techStacks}
                isMulti={true}
                isSearchable={true}
                onMultiChange={handleTechStackChange}
              >
                <Select.Trigger placeholder='기술 스택' />
                <Select.Menu className='w-246'>
                  <Select.Search placeholder='스택을 입력해보세요!' />
                </Select.Menu>
              </Select>
              <Select
                options={positionOptions}
                selectedValues={positions}
                isMulti={true}
                isSearchable={false}
                onMultiChange={handlePositionChange}
              >
                <Select.Trigger placeholder='포지션' />
                <Select.Menu className='w-216' />
              </Select>
            </div>
            <div className='flex gap-20'>
              <div className='flex gap-40'>
                <Button
                  onClick={() => {
                    setOrder('recent')
                  }}
                  variant='text'
                  className={cn('h-auto p-0 text-gray-500', {
                    'text-gray-800': order === 'recent',
                  })}
                >
                  최신순
                </Button>
                <Button
                  onClick={() => {
                    setOrder('like')
                  }}
                  variant='text'
                  className={cn('h-auto p-0 text-gray-500', {
                    'text-gray-800': order === 'like',
                  })}
                >
                  좋아요순
                </Button>
              </div>
              <div>
                <Switch
                  isOn={onRecruitment}
                  onToggle={toggleRecruitment}
                  label='모집 중만 보기'
                />
              </div>
            </div>
          </div>
          <div className='flex gap-4'>
            {techStacks.map(stack => (
              <DeletableChip
                key={stack}
                label={stack}
                onDelete={() => {
                  setTechstacks(prev => prev.filter(v => v !== stack))
                }}
              />
            ))}
            {positions.map(position => (
              <DeletableChip
                key={position}
                label={position}
                onDelete={() => {
                  setPositions(prev => prev.filter(v => v !== position))
                }}
              />
            ))}
          </div>
        </div>
        <Grid.Container
          columns={2}
          rowGap={12}
          spacing={20}
          className='mb-40 h-718'
        >
          {MOCK_DATA.map(teamItem => (
            <Grid.Item key={teamItem.id}>
              <TeamRecruitmentCard teamRecruitmentItem={teamItem} />
            </Grid.Item>
          ))}
        </Grid.Container>
        <Pagination
          currentPage={currentPage}
          pageButtons={pageButtons}
          hasNextPageGroup={hasNextPageGroup}
          hasPreviousPageGroup={hasPreviousPageGroup}
          goToPage={goToPage}
          goToNextPageGroup={goToNextPageGroup}
          goToPreviousPageGroup={goToPreviousPageGroup}
        />
      </main>
    </Container>
  )
}

const MOCK_DATA: TeamRecruitmentListItem[] = [
  {
    teamTags: [],
    id: 1,
    teamIsActive: true,
    teamTitle: 'Frontend Developer 모집1',
    teamPosition: '프론트엔드',
    teamRecruitmentNum: 3,
    teamTechStack: ['React', 'TypeScript', 'Tailwind'],
    writer: {
      id: 1,
      nickname: 'John Doe',
      imageUrl: 'https://picsum.photos/250/250',
    },
    answers: 5,
    likes: 10,
    createdAt: '2023-12-01T12:00:00Z',
    teamContent: '1',
    teamType: 'MENTORING',
    views: 10,
  },
  {
    teamTags: [],
    id: 2,
    teamIsActive: true,
    teamTitle: 'Frontend Developer 모집2',
    teamPosition: '프론트엔드',
    teamRecruitmentNum: 3,
    teamTechStack: ['React', 'TypeScript', 'Tailwind'],
    writer: {
      id: 1,
      nickname: 'John Doe',
      imageUrl: 'https://picsum.photos/250/250',
    },
    answers: 5,
    likes: 10,
    createdAt: '2023-12-01T12:00:00Z',
    teamContent: '1',
    teamType: 'MENTORING',
    views: 10,
  },
  {
    teamTags: [],
    id: 3,
    teamIsActive: true,
    teamTitle: 'Frontend Developer 모집3',
    teamPosition: '프론트엔드',
    teamRecruitmentNum: 3,
    teamTechStack: ['React', 'TypeScript', 'Tailwind'],
    writer: {
      id: 1,
      nickname: 'John Doe',
      imageUrl: 'https://picsum.photos/250/250',
    },
    answers: 5,
    likes: 10,
    createdAt: '2023-12-01T12:00:00Z',
    teamContent: '1',
    teamType: 'MENTORING',
    views: 10,
  },
  {
    teamTags: [],
    id: 4,
    teamIsActive: true,
    teamTitle: 'Frontend Developer 모집4',
    teamPosition: '프론트엔드',
    teamRecruitmentNum: 3,
    teamTechStack: ['React', 'TypeScript', 'Tailwind'],
    writer: {
      id: 1,
      nickname: 'John Doe',
      imageUrl: 'https://picsum.photos/250/250',
    },
    answers: 5,
    likes: 10,
    createdAt: '2023-12-01T12:00:00Z',
    teamContent: '1',
    teamType: 'MENTORING',
    views: 10,
  },
  {
    teamTags: [],
    id: 5,
    teamIsActive: true,
    teamTitle: 'Frontend Developer 모집5',
    teamPosition: '프론트엔드',
    teamRecruitmentNum: 3,
    teamTechStack: ['React', 'TypeScript', 'Tailwind'],
    writer: {
      id: 1,
      nickname: 'John Doe',
      imageUrl: 'https://picsum.photos/250/250',
    },
    answers: 5,
    likes: 10,
    createdAt: '2023-12-01T12:00:00Z',
    teamContent: '1',
    teamType: 'MENTORING',
    views: 10,
  },
  {
    teamTags: [],
    id: 6,
    teamIsActive: true,
    teamTitle: 'Frontend Developer 모집6',
    teamPosition: '프론트엔드',
    teamRecruitmentNum: 3,
    teamTechStack: ['React', 'TypeScript', 'Tailwind'],
    writer: {
      id: 1,
      nickname: 'John Doe',
      imageUrl: 'https://picsum.photos/250/250',
    },
    answers: 5,
    likes: 10,
    createdAt: '2023-12-01T12:00:00Z',
    teamContent: '1',
    teamType: 'MENTORING',
    views: 10,
  },
  {
    teamTags: [],
    id: 7,
    teamIsActive: true,
    teamTitle: 'Frontend Developer 모집7',
    teamPosition: '프론트엔드',
    teamRecruitmentNum: 3,
    teamTechStack: ['React', 'TypeScript', 'Tailwind'],
    writer: {
      id: 1,
      nickname: 'John Doe',
      imageUrl: 'https://picsum.photos/250/250',
    },
    answers: 5,
    likes: 10,
    createdAt: '2023-12-01T12:00:00Z',
    teamContent: '1',
    teamType: 'MENTORING',
    views: 10,
  },
  {
    teamTags: [],
    id: 8,
    teamIsActive: true,
    teamTitle: 'Frontend Developer 모집8',
    teamPosition: '프론트엔드',
    teamRecruitmentNum: 3,
    teamTechStack: ['React', 'TypeScript', 'Tailwind'],
    writer: {
      id: 1,
      nickname: 'John Doe',
      imageUrl: 'https://picsum.photos/250/250',
    },
    answers: 5,
    likes: 10,
    createdAt: '2023-12-01T12:00:00Z',
    teamContent: '1',
    teamType: 'MENTORING',
    views: 10,
  },
  {
    teamTags: [],
    id: 9,
    teamIsActive: false,
    teamTitle: 'Frontend Developer 모집9',
    teamPosition: '프론트엔드',
    teamRecruitmentNum: 3,
    teamTechStack: ['React', 'TypeScript', 'Tailwind'],
    writer: {
      id: 1,
      nickname: 'John Doe',
      imageUrl: 'https://picsum.photos/250/250',
    },
    answers: 5,
    likes: 10,
    createdAt: '2023-12-01T12:00:00Z',
    teamContent: '1',
    teamType: 'MENTORING',
    views: 10,
  },
  {
    teamTags: [],
    id: 10,
    teamIsActive: false,
    teamTitle: 'Frontend Developer 모집10',
    teamPosition: '프론트엔드',
    teamRecruitmentNum: 3,
    teamTechStack: ['React', 'TypeScript', 'Tailwind'],
    writer: {
      id: 1,
      nickname: 'John Doe',
      imageUrl: 'https://picsum.photos/250/250',
    },
    answers: 5,
    likes: 10,
    createdAt: '2023-12-01T12:00:00Z',
    teamContent: '1',
    teamType: 'MENTORING',
    views: 10,
  },
]
