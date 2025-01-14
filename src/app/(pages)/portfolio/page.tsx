'use client'

import { useState } from 'react'

import { IcPencil, IcSearch } from '@/assets/IconList'
import { cn } from '@/lib/utils'
import { PortfolioListItem } from '@/types/api/Portfolio.types'
import clsx from 'clsx'

import { Button, Link } from '@/components/common/button'
import { DeletableChip } from '@/components/common/chip'
import { Box, Container } from '@/components/common/containers'
import { TextInput } from '@/components/common/input'
import { Text } from '@/components/common/text'
import { PortfolioCard } from '@/components/portfolio/PortfolioCard'
import { Pagination } from '@/components/shared/pagination'
import { Select } from '@/components/shared/select'

import { usePagination } from '@/hooks/usePagination'

const MOCK_DATA: PortfolioListItem[] = [
  {
    id: 1,
    portTitle: 'Frontend Developer 모집1',
    portPosition: '프론트엔드',
    portImageUrl: 'https://picsum.photos/250/250',
    tags: ['React', 'TypeScript', 'Tailwind'],
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

const positionsOptions = [
  { label: '프론트엔드', value: 'frontend' },
  { label: '백엔드', value: 'backend' },
  { label: '풀스택', value: 'fullstack' },
]

export default function PortfolioPage(): JSX.Element {
  const [positions, setPositions] = useState<string[]>([])
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

  const handlepositionsChange = (values: string[]) => {
    setPositions(() => values)
  }

  return (
    <Container className='mx-auto my-80 flex gap-30'>
      <div className='flex w-216 flex-col gap-20'>
        <Box className='h-194 items-start justify-start p-16 text-center'>
          <div className='mb-10'>
            <Text.Title variant='title2' color='gray700' weight='700'>
              다른 사람들의
              <br />
              포트폴리오를 구경해보세요
            </Text.Title>
          </div>
          <div className='mb-20'>
            <Text.Body variant='body3' color='gray600'>
              본인의 포트폴리오를 등록하고
              <br />
              조회가 가능합니다.
            </Text.Body>
          </div>
          <Link href='mypage' fullWidth size='sm'>
            포트폴리오 등록 및 관리
          </Link>
        </Box>
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
            포트폴리오
          </Text.Heading>
          <div>
            <Link href={'/team/add'} size='lg' className='w-118 font-semibold'>
              <IcPencil width={24} height={24} />
              작성하기
            </Link>
          </div>
        </div>
        <div className='mb-20 flex flex-col gap-8'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-12'>
              <Select
                options={positionsOptions}
                selectedValues={positions}
                isMulti={true}
                isSearchable={false}
                onMultiChange={handlepositionsChange}
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
                  className={clsx('h-auto p-0 text-gray-500', {
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
                  className={clsx('h-auto p-0 text-gray-500', {
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
          </div>
          <div className='flex gap-4'>
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
        <div className='mb-40 flex h-718 flex-col gap-12 overflow-hidden'>
          {MOCK_DATA.map(portfolioItem => (
            <PortfolioCard
              key={portfolioItem.id}
              portfolioItem={portfolioItem}
            />
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
