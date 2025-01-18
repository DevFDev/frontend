'use client'

import { useState } from 'react'

import { IcPencil, IcSearch } from '@/assets/IconList'
import { cn } from '@/lib/utils'
import type {
  CommunityCategory,
  CommunityListItem,
  CommunityTop5Member,
} from '@/types/api/Community.types'

import { Avatar } from '@/components/common/avatar'
import { Button, Link } from '@/components/common/button'
import { Box, Container } from '@/components/common/containers'
import { TextInput } from '@/components/common/input'
import { Text } from '@/components/common/text'
import { CommunityCard } from '@/components/community/CommunityCard'
import { Pagination } from '@/components/shared/pagination'

import { usePagination } from '@/hooks/usePagination'

export default function CommunityPage(): JSX.Element {
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
  const [communityCategory, setCommunityCategory] =
    useState<CommunityCategory | null>(null)

  return (
    <Container className='mx-auto my-80 flex gap-30'>
      <div className='flex w-216 flex-col gap-20'>
        <Box className='h-386 items-start justify-start gap-12' padding={20}>
          <Text.Title variant='title1' weight='700'>
            인기 유저 Top5!
          </Text.Title>
          {MOCK_FAV_USERS.map(topUser => (
            <div key={topUser.member.id} className='flex flex-col gap-6'>
              <div className='flex items-center gap-10'>
                <Avatar
                  image={topUser.member.imageUrl}
                  size={24}
                  alt={topUser.member.nickname}
                />
                <Text.Title variant='title2' weight='700'>
                  {topUser.member.nickname}
                </Text.Title>
              </div>
              <div className='flex gap-4'>
                <Text.Body variant='body3' color='gray500'>
                  좋아요
                </Text.Body>
                <Text.Body variant='body3' color='gray500'>
                  {topUser.totalLikes}
                </Text.Body>
              </div>
            </div>
          ))}
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
            커뮤니티
          </Text.Heading>
          <div>
            <Link
              href={'/community/new'}
              size='lg'
              className='w-118 font-semibold'
            >
              <IcPencil width={24} height={24} />
              작성하기
            </Link>
          </div>
        </div>
        <div className='mb-20 flex items-center justify-between'>
          <div className='flex gap-40'>
            <Button
              onClick={() => {
                setCommunityCategory(null)
              }}
              variant='text'
              className={cn(
                'h-auto p-0 text-heading5 font-bold text-gray-500',
                {
                  'text-gray-800': communityCategory === null,
                }
              )}
            >
              전체
            </Button>
            <Button
              onClick={() => {
                setCommunityCategory('SKILL')
              }}
              variant='text'
              className={cn(
                'h-auto p-0 text-heading5 font-bold text-gray-500',
                {
                  'text-gray-800': communityCategory === 'SKILL',
                }
              )}
            >
              기술
            </Button>
            <Button
              onClick={() => {
                setCommunityCategory('CAREER')
              }}
              variant='text'
              className={cn(
                'h-auto p-0 text-heading5 font-bold text-gray-500',
                {
                  'text-gray-800': communityCategory === 'CAREER',
                }
              )}
            >
              커리어
            </Button>
            <Button
              onClick={() => {
                setCommunityCategory('OTHER')
              }}
              variant='text'
              className={cn(
                'h-auto p-0 text-heading5 font-bold text-gray-500',
                {
                  'text-gray-800': communityCategory === 'OTHER',
                }
              )}
            >
              기타
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
          {MOCK_DATA.map(communityItem => (
            <CommunityCard
              key={communityItem.id}
              communityItem={communityItem}
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

const MOCK_DATA: CommunityListItem[] = [
  {
    id: 1,
    communityCategory: 'SKILL',
    communityTitle: '이럴 땐 어떻게 해결해야하나요?',
    communityContent:
      '어떻게 해야할지 모르겠어요. 여러분의 도움이 필요합니다. 제발 도와주세요...',
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
  {
    id: 2,
    communityCategory: 'CAREER',
    communityTitle: '백엔드 5년차 이직 고민',
    communityContent:
      'DFD에 커뮤니티 기능이 있어서 글 써봅니다. 현재 중소기업에서 5년차 백엔드 개발자로 일하고 있습니다. 어느 순간부터 이 직군과 맞지 않는다고 생각 중인..',
    writer: {
      id: 1,
      nickname: 'John Doe',
      imageUrl: 'https://picsum.photos/250/250',
    },
    answers: 1,
    likes: 3,
    createdAt: '2023-12-01T12:00:00Z',
    views: 4,
  },
  {
    id: 3,
    communityCategory: 'OTHER',
    communityTitle: '아니 이거 맞는지 확인좀 해주세요;;',
    communityContent:
      '개발 PM 일정 세운 건데 한번 확인좀 해주세요;;; 납득할 수 있는 있게끔 정해야하는데;;; 이게 맞는지 모르겠거든요?',
    writer: {
      id: 1,
      nickname: 'John Doe',
      imageUrl: 'https://picsum.photos/250/250',
    },
    answers: 0,
    likes: 0,
    createdAt: '2023-12-01T12:00:00Z',
    views: 1,
  },
  {
    id: 4,
    communityCategory: 'SKILL',
    communityTitle: '이럴 땐 어떻게 해결해야하나요?',
    communityContent:
      '어떻게 해야할지 모르겠어요. 여러분의 도움이 필요합니다. 제발 도와주세요...',
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
  {
    id: 5,
    communityCategory: 'CAREER',
    communityTitle: '백엔드 5년차 이직 고민',
    communityContent:
      'DFD에 커뮤니티 기능이 있어서 글 써봅니다. 현재 중소기업에서 5년차 백엔드 개발자로 일하고 있습니다. 어느 순간부터 이 직군과 맞지 않는다고 생각 중인..',
    writer: {
      id: 1,
      nickname: 'John Doe',
      imageUrl: 'https://picsum.photos/250/250',
    },
    answers: 1,
    likes: 3,
    createdAt: '2023-12-01T12:00:00Z',
    views: 4,
  },
  {
    id: 6,
    communityCategory: 'OTHER',
    communityTitle: '아니 이거 맞는지 확인좀 해주세요;;',
    communityContent:
      '개발 PM 일정 세운 건데 한번 확인좀 해주세요;;; 납득할 수 있는 있게끔 정해야하는데;;; 이게 맞는지 모르겠거든요?',
    writer: {
      id: 1,
      nickname: 'John Doe',
      imageUrl: 'https://picsum.photos/250/250',
    },
    answers: 0,
    likes: 0,
    createdAt: '2023-12-01T12:00:00Z',
    views: 1,
  },
]

const MOCK_FAV_USERS: CommunityTop5Member[] = [
  {
    member: {
      id: 1,
      nickname: '닉네임1',
      imageUrl: 'https://picsum.photos/250/250',
    },
    totalLikes: 12345,
  },
  {
    member: {
      id: 2,
      nickname: '닉네임2',
      imageUrl: 'https://picsum.photos/250/250',
    },
    totalLikes: 12234,
  },
  {
    member: {
      id: 3,
      nickname: '닉네임3',
      imageUrl: 'https://picsum.photos/250/250',
    },
    totalLikes: 12233,
  },
  {
    member: {
      id: 4,
      nickname: '닉네임4',
      imageUrl: 'https://picsum.photos/250/250',
    },
    totalLikes: 12232,
  },
  {
    member: {
      id: 5,
      nickname: '닉네임5',
      imageUrl: 'https://picsum.photos/250/250',
    },
    totalLikes: 12231,
  },
]
