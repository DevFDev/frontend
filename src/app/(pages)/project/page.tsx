'use client'

import NextLink from 'next/link'

import { useEffect, useReducer, useRef } from 'react'

import { IcPencil, IcSearch } from '@/assets/IconList'
import { PROJECT_CATEGORY_MAP } from '@/constants/dictionaryLabelMap'
import {
  postOrderOptions,
  projectCategoryOptions,
} from '@/constants/selectOptions'
import { cn } from '@/lib/utils'
import type {
  GetProjectListResponse,
  ProjectCategory,
  ProjectListItem,
} from '@/types/api/Project.types'

import { Button, Link } from '@/components/common/button'
import { Box, Container } from '@/components/common/containers'
import { TextInput } from '@/components/common/input'
import { Text } from '@/components/common/text'
import { ProjectCard } from '@/components/project/ProjectCard'
import { Pagination } from '@/components/shared/pagination'

import { useProjectList } from '@/queries/project'

import { usePagination } from '@/hooks/usePagination'

import {
  projectListFilterInitialState,
  projectListFilterReducer,
} from '@/stores/project/projectListFilterReducer'

export default function ProjectPage(): JSX.Element {
  const [state, dispatch] = useReducer(
    projectListFilterReducer,
    projectListFilterInitialState
  )
  const page = state.page

  const searchInputRef = useRef<HTMLInputElement>(null)

  const {
    data: projectListData,
    isLoading: isProjectListLoading,
    isError: isProjectListError,
  } = useProjectList(state)

  const projectListResult =
    (projectListData?.result as GetProjectListResponse) || []

  const {
    currentPage,
    pageButtons,
    hasNextPageGroup,
    hasPreviousPageGroup,
    goToPage,
    goToNextPageGroup,
    goToPreviousPageGroup,
  } = usePagination({
    totalItems: projectListResult.totalElements as number,
    itemsPerPage: 10,
    buttonsPerPage: 10,
  })

  useEffect(() => {
    if (page !== currentPage) {
      dispatch({
        type: 'SET_PAGE',
        payload: currentPage,
      })
    }
  }, [currentPage, dispatch, page])

  if (isProjectListLoading) return <div>d</div>
  if (isProjectListError) return <div>d</div>

  const projectList = projectListResult.content as ProjectListItem[]

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
            프로젝트
          </Text.Heading>
          <div>
            <Link
              href={'/project/new'}
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
            {[{ value: '', label: '전체' }, ...projectCategoryOptions].map(
              option => (
                <Button
                  key={option.value}
                  onClick={() => {
                    dispatch({
                      type: 'SET_CATEGORY',
                      payload: option.value as ProjectCategory,
                    })
                    goToPage(1)
                  }}
                  variant='text'
                  className={cn(
                    'h-auto p-0 text-heading5 font-bold text-gray-500',
                    {
                      'text-gray-800': state.projectCategory === option.value,
                    }
                  )}
                >
                  {option.label}
                </Button>
              )
            )}
          </div>
          <div className='flex gap-40'>
            {postOrderOptions.map(option => (
              <Button
                key={option.value}
                onClick={() => {
                  dispatch({
                    type: 'SET_SORT_BY',
                    payload: option.value as Order,
                  })
                }}
                variant='text'
                className={cn('h-auto p-0 text-gray-500', {
                  'text-gray-800': state.sortBy === option.value,
                })}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        <div className='mb-40 flex h-718 flex-col gap-12 overflow-hidden'>
          {projectList.map(projectItem => (
            <NextLink href={`/project/${projectItem.id}`} key={projectItem.id}>
              <ProjectCard projectItem={projectItem} />
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
