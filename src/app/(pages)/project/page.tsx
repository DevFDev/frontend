'use client'

import { useState } from 'react'

import { IcPencil, IcSearch } from '@/assets/IconList'
import { PROJECT_CATEGORY_MAP } from '@/constants/dictionaryLabelMap'
import { cn } from '@/lib/utils'
import type {
  ProjectCategory,
  ProjectListItem,
} from '@/types/api/Project.types'

import { Button, Link } from '@/components/common/button'
import { Box, Container } from '@/components/common/containers'
import { TextInput } from '@/components/common/input'
import { Text } from '@/components/common/text'
import { ProjectCard } from '@/components/project/ProjectCard'
import { Pagination } from '@/components/shared/pagination'

import { usePagination } from '@/hooks/usePagination'

export default function ProjectPage(): JSX.Element {
  const [order, setOrder] = useState<'recent' | 'like' | 'view'>('recent')
  const {
    currentPage,
    pageButtons,
    hasNextPageGroup,
    hasPreviousPageGroup,
    goToPage,
    goToNextPageGroup,
    goToPreviousPageGroup,
  } = usePagination({ totalItems: 20, itemsPerPage: 10, buttonsPerPage: 10 })
  const [projectCategory, setProjectCategory] =
    useState<ProjectCategory | null>(null)

  return (
    <Container className='mx-auto my-80 flex gap-30'>
      <div className='flex w-216 flex-col gap-20'>
        <Box
          variant='contained'
          color='secondary'
          className='h-380 gap-12'
          padding={20}
        >
          <Text.Title
            variant='title1'
            weight='700'
            className='text-common-black'
          >
            AD
          </Text.Title>
        </Box>
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
            프로젝트
          </Text.Heading>
          <div>
            <Link href={'/team/add'} size='lg' className='w-118 font-semibold'>
              <IcPencil width={24} height={24} />
              작성하기
            </Link>
          </div>
        </div>
        <div className='mb-20 flex items-center justify-between'>
          <div className='flex gap-40'>
            <Button
              onClick={() => {
                setProjectCategory(null)
              }}
              variant='text'
              className={cn(
                'h-auto p-0 text-heading5 font-bold text-gray-500',
                {
                  'text-gray-800': projectCategory === null,
                }
              )}
            >
              전체
            </Button>
            <Button
              onClick={() => {
                setProjectCategory('WEB')
              }}
              variant='text'
              className={cn(
                'h-auto p-0 text-heading5 font-bold text-gray-500',
                {
                  'text-gray-800': projectCategory === 'WEB',
                }
              )}
            >
              {PROJECT_CATEGORY_MAP['WEB']}
            </Button>
            <Button
              onClick={() => {
                setProjectCategory('APP')
              }}
              variant='text'
              className={cn(
                'h-auto p-0 text-heading5 font-bold text-gray-500',
                {
                  'text-gray-800': projectCategory === 'APP',
                }
              )}
            >
              {PROJECT_CATEGORY_MAP['APP']}
            </Button>
            <Button
              onClick={() => {
                setProjectCategory('GAME')
              }}
              variant='text'
              className={cn(
                'h-auto p-0 text-heading5 font-bold text-gray-500',
                {
                  'text-gray-800': projectCategory === 'GAME',
                }
              )}
            >
              {PROJECT_CATEGORY_MAP['GAME']}
            </Button>
            <Button
              onClick={() => {
                setProjectCategory('SERVER')
              }}
              variant='text'
              className={cn(
                'h-auto p-0 text-heading5 font-bold text-gray-500',
                {
                  'text-gray-800': projectCategory === 'SERVER',
                }
              )}
            >
              {PROJECT_CATEGORY_MAP['SERVER']}
            </Button>
            <Button
              onClick={() => {
                setProjectCategory('AI')
              }}
              variant='text'
              className={cn(
                'h-auto p-0 text-heading5 font-bold text-gray-500',
                {
                  'text-gray-800': projectCategory === 'AI',
                }
              )}
            >
              {PROJECT_CATEGORY_MAP['AI']}
            </Button>
            <Button
              onClick={() => {
                setProjectCategory('DATA')
              }}
              variant='text'
              className={cn(
                'h-auto p-0 text-heading5 font-bold text-gray-500',
                {
                  'text-gray-800': projectCategory === 'DATA',
                }
              )}
            >
              {PROJECT_CATEGORY_MAP['DATA']}
            </Button>
            <Button
              onClick={() => {
                setProjectCategory('HW')
              }}
              variant='text'
              className={cn(
                'h-auto p-0 text-heading5 font-bold text-gray-500',
                {
                  'text-gray-800': projectCategory === 'HW',
                }
              )}
            >
              {PROJECT_CATEGORY_MAP['HW']}
            </Button>
          </div>
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
            <Button
              onClick={() => {
                setOrder('view')
              }}
              variant='text'
              className={cn('h-auto p-0 text-gray-500', {
                'text-gray-800': order === 'view',
              })}
            >
              조회순
            </Button>
          </div>
        </div>
        <div className='mb-40 flex h-718 flex-col gap-12 overflow-hidden'>
          {MOCK_DATA.map(projectItem => (
            <ProjectCard key={projectItem.id} projectItem={projectItem} />
          ))}
        </div>
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

const MOCK_DATA: ProjectListItem[] = [
  {
    id: 1,
    projectTitle: '스프링부트로 만든 To Do List',
    projectContent: 'string',
    projectCategory: 'WEB',
    tags: ['spring', 'boot', 'vue.js'],
    links: [{ type: 'blog', url: 'https://example.com' }],
    writer: {
      id: 1,
      nickname: 'John Doe',
      imageUrl: 'https://picsum.photos/250/250',
    },
    answers: 5,
    likes: 10,
    createdAt: '2023-12-01T12:00:00Z',
    views: 10,
  },
]
