'use client'

import NextLink from 'next/link'

import { useReducer, useRef } from 'react'

import { IcPencil, IcSearch } from '@/assets/IconList'
import { positionOptions } from '@/constants/selectOptions'
import { cn } from '@/lib/utils'
import {
  GetportfolioListResponse,
  PortfolioListItem,
} from '@/types/api/Portfolio.types'
import clsx from 'clsx'

import { Button, Link } from '@/components/common/button'
import { Box, Container } from '@/components/common/containers'
import { TextInput } from '@/components/common/input'
import { Text } from '@/components/common/text'
import { PortfolioCard } from '@/components/portfolio/PortfolioCard'
import { Pagination } from '@/components/shared/pagination'
import { Select } from '@/components/shared/select'

import { usePortfolioList } from '@/queries/portfolio'

import { usePagination } from '@/hooks/usePagination'

import {
  portfolioListFilterInitialState,
  portfolioListFilterReducer,
} from '@/stores/portfolio/portfolioListFilterReducer'

export default function PortfolioPage(): JSX.Element {
  const [state, dispatch] = useReducer(
    portfolioListFilterReducer,
    portfolioListFilterInitialState
  )

  const searchInputRef = useRef<HTMLInputElement>(null)

  const {
    data: portfolioListData,
    isLoading: isPortfolioListLoading,
    isError: isPortfolioListError,
  } = usePortfolioList(state)

  const portfolioListResult =
    (portfolioListData?.result as GetportfolioListResponse) || {
      totalPages: 1,
      totalElements: 0,
      pageNumber: 1,
      pageSize: 1,
      first: true,
      last: true,
      content: [],
    }

  const {
    currentPage,
    pageButtons,
    hasNextPageGroup,
    hasPreviousPageGroup,
    nextGroupFirstPage,
    prevGroupLastPage,
  } = usePagination({
    totalItems: portfolioListResult.totalElements as number,
    itemsPerPage: state.size,
    buttonsPerPage: 10,
    currentPage: state.page,
  })

  if (isPortfolioListLoading) return <div>Loading...</div>
  if (isPortfolioListError) return <div>Error loading portfolios.</div>

  const portfolioList = portfolioListResult.content as PortfolioListItem[]

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
            포트폴리오
          </Text.Heading>
          <div>
            <Link
              href={'/portfolio/new'}
              size='lg'
              className='w-118 font-semibold'
            >
              <IcPencil width={24} height={24} />
              작성하기
            </Link>
          </div>
        </div>
        <div className='mb-20 flex flex-col gap-8'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-12'>
              <Select
                options={positionOptions}
                selectedValue={state.position}
                isMulti={false}
                isSearchable={false}
                onSingleChange={(value: string) =>
                  dispatch({ type: 'SET_POSITION', payload: value })
                }
              >
                <Select.Trigger placeholder='포지션' />
                <Select.Menu className='w-216'>
                  <Select.Options />
                </Select.Menu>
              </Select>
            </div>
            <div className='flex gap-20'>
              <div className='flex gap-40'>
                <Button
                  onClick={() => {
                    dispatch({ type: 'SET_SORT_BY', payload: 'recent' })
                  }}
                  variant='text'
                  className={clsx('h-auto p-0 text-gray-500', {
                    'text-gray-800': state.sortBy === 'recent',
                  })}
                >
                  최신순
                </Button>
                <Button
                  onClick={() => {
                    dispatch({ type: 'SET_SORT_BY', payload: 'likeCount' })
                  }}
                  variant='text'
                  className={clsx('h-auto p-0 text-gray-500', {
                    'text-gray-800': state.sortBy === 'likeCount',
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
          </div>
        </div>
        <div className='mb-40 flex h-718 flex-col gap-12 overflow-hidden'>
          {portfolioList &&
            portfolioList.map(portfolioItem => (
              <NextLink
                href={`/team/${portfolioItem.id}`}
                key={portfolioItem.id}
              >
                <PortfolioCard portfolioItem={portfolioItem} />
              </NextLink>
            ))}
        </div>
        <Pagination
          currentPage={currentPage}
          pageButtons={pageButtons}
          hasNextPageGroup={hasNextPageGroup}
          hasPreviousPageGroup={hasPreviousPageGroup}
          nextGroupFirstPage={nextGroupFirstPage}
          prevGroupLastPage={prevGroupLastPage}
          onPageChange={(page: number) =>
            dispatch({
              type: 'SET_PAGE',
              payload: page,
            })
          }
        />
      </main>
    </Container>
  )
}
