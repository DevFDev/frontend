'use client'

import NextLink from 'next/link'

import { useReducer, useRef } from 'react'

import { IcPencil, IcSearch } from '@/assets/IconList'
import { positionOptions, techStackOptions } from '@/constants/selectOptions'
import { teamTypeToLabelMap } from '@/constants/stateToLabelMaps'
import { cn } from '@/lib/utils'
import {
  GetTeamRecruitmentListResponse,
  TeamRecruitmentListItem,
} from '@/types/api/Team.types'

import { Button, Link } from '@/components/common/button'
import { DeletableChip } from '@/components/common/chip'
import { Container } from '@/components/common/containers'
import { TextInput } from '@/components/common/input'
import { Switch } from '@/components/common/switch/Switch'
import { Text } from '@/components/common/text'
import { Pagination } from '@/components/shared/pagination'
import { Select } from '@/components/shared/select'
import { TeamRecruitmentCard } from '@/components/team/TeamRecruitmentCard'

import { useTeamRecruitmentList } from '@/queries/team'

import { usePagination } from '@/hooks/usePagination'

import {
  teamRecruitmentListFilterInitialState,
  teamRecruitmentListFilterReducer,
} from '@/stores/team/teamRecruitmentListFilterReducer'

export default function TeamPage(): JSX.Element {
  const [state, dispatch] = useReducer(
    teamRecruitmentListFilterReducer,
    teamRecruitmentListFilterInitialState
  )
  const searchInputRef = useRef<HTMLInputElement>(null)

  const { data, isLoading, isError } = useTeamRecruitmentList(state)

  const teamRecruitmentListResult =
    (data?.result as GetTeamRecruitmentListResponse) || {
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
    totalItems: teamRecruitmentListResult.totalElements as number,
    itemsPerPage: 10,
    buttonsPerPage: 10,
    currentPage: state.page,
  })

  if (isLoading) return <div>d</div>
  if (isError) return <div>d</div>

  const teamRecruitmentList =
    teamRecruitmentListResult.content as TeamRecruitmentListItem[]

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
              dispatch({ type: 'SET_TEAM_TYPE', payload: 'STUDY' })
              dispatch({ type: 'SET_PAGE', payload: 1 })
            }}
            size='lg'
            className={cn('justify-start px-12 hover:bg-gray-100', {
              'text-primary-normal': state.teamType === 'STUDY',
            })}
          >
            스터디
          </Button>
          <Button
            fullWidth
            variant='text'
            onClick={() => {
              dispatch({ type: 'SET_TEAM_TYPE', payload: 'PROJECT' })
              dispatch({ type: 'SET_PAGE', payload: 1 })
            }}
            size='lg'
            className={cn('justify-start px-12 hover:bg-gray-100', {
              'text-primary-normal': state.teamType === 'PROJECT',
            })}
          >
            팀 프로젝트
          </Button>
          <Button
            fullWidth
            variant='text'
            onClick={() => {
              dispatch({ type: 'SET_TEAM_TYPE', payload: 'MENTORING' })
              dispatch({ type: 'SET_PAGE', payload: 1 })
            }}
            size='lg'
            className={cn('justify-start px-12 hover:bg-gray-100', {
              'text-primary-normal': state.teamType === 'MENTORING',
            })}
          >
            멘토링
          </Button>
        </div>
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
            {teamTypeToLabelMap[state.teamType]}
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
                options={techStackOptions}
                selectedValues={state.techStacks}
                isMulti={true}
                isSearchable={true}
                onMultiChange={(values: string[]) =>
                  dispatch({ type: 'SET_TECHSTACKS', payload: values })
                }
              >
                <Select.Trigger placeholder='기술 스택' />
                <Select.Menu className='w-246'>
                  <Select.Search placeholder='스택을 입력해보세요!' />
                  <Select.Options />
                </Select.Menu>
              </Select>
              <Select
                options={positionOptions}
                selectedValues={state.positions}
                isMulti={true}
                isSearchable={false}
                onMultiChange={(values: string[]) =>
                  dispatch({ type: 'SET_POSITIONS', payload: values })
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
                  className={cn('h-auto p-0 text-gray-500', {
                    'text-gray-800': state.sortBy === 'recent',
                  })}
                >
                  최신순
                </Button>
                <Button
                  onClick={() =>
                    dispatch({ type: 'SET_SORT_BY', payload: 'likeCount' })
                  }
                  variant='text'
                  className={cn('h-auto p-0 text-gray-500', {
                    'text-gray-800': state.sortBy === 'likeCount',
                  })}
                >
                  좋아요순
                </Button>
              </div>
              <div>
                <Switch
                  isOn={state.teamIsActive}
                  onToggle={() => dispatch({ type: 'TOGGLE_TEAM_ACTIVE' })}
                  label='모집 중만 보기'
                />
              </div>
            </div>
          </div>
          <div className='flex gap-4'>
            {state.techStacks.map(stack => (
              <DeletableChip
                key={stack}
                label={stack}
                onDelete={() => {
                  dispatch({
                    type: 'SET_TECHSTACKS',
                    payload: state.techStacks.filter(v => v !== stack),
                  })
                }}
              />
            ))}
            {state.positions.map(position => (
              <DeletableChip
                key={position}
                label={position}
                onDelete={() =>
                  dispatch({
                    type: 'SET_POSITIONS',
                    payload: state.positions.filter(v => v !== position),
                  })
                }
              />
            ))}
          </div>
        </div>
        <div className='mb-40 grid h-718 grid-cols-2 grid-rows-5 flex-wrap gap-20 gap-y-12'>
          {teamRecruitmentList &&
            teamRecruitmentList.map(teamItem => (
              <NextLink href={`/team/${teamItem.id}`} key={teamItem.id}>
                <TeamRecruitmentCard teamRecruitmentItem={teamItem} />
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
