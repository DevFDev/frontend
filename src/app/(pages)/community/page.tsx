'use client'

import NextLink from 'next/link'

import { useReducer, useRef } from 'react'

import { IcPencil, IcSearch } from '@/assets/IconList'
import { cn } from '@/lib/utils'

import { Avatar } from '@/components/common/avatar'
import { Button, Link } from '@/components/common/button'
import { Box, Container } from '@/components/common/containers'
import { TextInput } from '@/components/common/input'
import { Text } from '@/components/common/text'
import { CommunityCard } from '@/components/community/CommunityCard'
import { Pagination } from '@/components/shared/pagination'

import { useCommunityList, useCommunityTop5 } from '@/queries/community'

import { usePagination } from '@/hooks/usePagination'

import {
  communityListFilterInitialState,
  communityListFilterReducer,
} from '@/stores/community/communityListFilterReducer'

export default function CommunityPage(): JSX.Element {
  const [state, dispatch] = useReducer(
    communityListFilterReducer,
    communityListFilterInitialState
  )

  const searchInputRef = useRef<HTMLInputElement>(null)

  const {
    data: communityListData,
    isLoading: isCommunityListLoading,
    isError: isCommunityListError,
  } = useCommunityList(state)
  const {
    data: communityTop5Data,
    isLoading: isCommunityTop5Loading,
    isError: isCommunityTop5Error,
  } = useCommunityTop5()

  const communityTotalList = communityListData?.result || []
  const communityTop5 = communityTop5Data?.result || []

  const {
    currentPage,
    pageButtons,
    hasNextPageGroup,
    hasPreviousPageGroup,
    goToPage,
    goToNextPageGroup,
    goToPreviousPageGroup,
  } = usePagination({
    totalItems: communityTotalList.length || 1,
    itemsPerPage: 5,
    buttonsPerPage: 10,
  })

  if (isCommunityListLoading) return <div>d</div>
  if (isCommunityListError) return <div>d</div>

  const startIndex = (currentPage - 1) * 5
  const endIndex = startIndex + 5
  const communityList = communityTotalList.slice(startIndex, endIndex)

  return (
    <Container className='mx-auto my-80 flex gap-30'>
      <div className='flex w-216 flex-col gap-20'>
        <Box className='items-start justify-start gap-12' padding={20}>
          <Text.Title variant='title1' weight='700'>
            인기 유저 Top5!
          </Text.Title>
          {communityTop5.map(topUser => (
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
        <div className='mb-20'>
          <form
            onSubmit={e => {
              e.preventDefault()
              dispatch({
                type: 'SET_SEARCH_TERM',
                payload: searchInputRef.current?.value || '',
              })
            }}
            className='flex justify-between gap-12'
          >
            <TextInput
              ref={searchInputRef}
              className='h-48'
              placeholder='제목, 내용, 작성자를 검색해보세요!'
              startAdornment={<IcSearch width={24} height={24} />}
            />
            <div className='flex-shrink-0'>
              <Button type='submit' size='lg' className='font-semibold'>
                검색
              </Button>
            </div>
          </form>
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
                dispatch({ type: 'SET_CATEGORY', payload: '' })
                goToPage(1)
              }}
              variant='text'
              className={cn(
                'h-auto p-0 text-heading5 font-bold text-gray-500',
                {
                  'text-gray-800': state.category === '',
                }
              )}
            >
              전체
            </Button>
            <Button
              onClick={() => {
                dispatch({ type: 'SET_CATEGORY', payload: 'SKILL' })
                goToPage(1)
              }}
              variant='text'
              className={cn(
                'h-auto p-0 text-heading5 font-bold text-gray-500',
                {
                  'text-gray-800': state.category === 'SKILL',
                }
              )}
            >
              기술
            </Button>
            <Button
              onClick={() => {
                dispatch({ type: 'SET_CATEGORY', payload: 'CAREER' })
                goToPage(1)
              }}
              variant='text'
              className={cn(
                'h-auto p-0 text-heading5 font-bold text-gray-500',
                {
                  'text-gray-800': state.category === 'CAREER',
                }
              )}
            >
              커리어
            </Button>
            <Button
              onClick={() => {
                dispatch({ type: 'SET_CATEGORY', payload: 'OTHER' })
                goToPage(1)
              }}
              variant='text'
              className={cn(
                'h-auto p-0 text-heading5 font-bold text-gray-500',
                {
                  'text-gray-800': state.category === 'OTHER',
                }
              )}
            >
              기타
            </Button>
          </div>
          <div className='flex gap-40'>
            <Button
              onClick={() => {
                dispatch({ type: 'SET_SORT_BY', payload: 'recent' })
              }}
              variant='text'
              className={cn('h-auto p-0 text-gray-500', {
                'text-gray-800': state.sortBy === 'recent',
              })}
            >
              최신순
            </Button>
            <Button
              onClick={() => {
                dispatch({ type: 'SET_SORT_BY', payload: 'likes' })
              }}
              variant='text'
              className={cn('h-auto p-0 text-gray-500', {
                'text-gray-800': state.sortBy === 'likes',
              })}
            >
              좋아요순
            </Button>
            <Button
              onClick={() => {
                dispatch({ type: 'SET_SORT_BY', payload: 'views' })
              }}
              variant='text'
              className={cn('h-auto p-0 text-gray-500', {
                'text-gray-800': state.sortBy === 'views',
              })}
            >
              조회순
            </Button>
          </div>
        </div>
        <div className='mb-40 flex h-718 flex-col gap-12 overflow-hidden'>
          {communityList.map(communityItem => (
            <NextLink
              href={`/community/${communityItem.id}`}
              key={communityItem.id}
            >
              <CommunityCard communityItem={communityItem} />
            </NextLink>
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
