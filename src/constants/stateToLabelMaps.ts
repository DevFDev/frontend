import {
  CommunityCategory,
  CommunityLabelCategory,
} from '@/types/api/Community.types'
import { TeamLabelType, TeamType } from '@/types/api/Team.types'

import {
  awardTypeOptions,
  linkOptions,
  positionOptions,
  techStackOptions,
} from './selectOptions'

export const teamTypeToLabelMap: Record<TeamType, TeamLabelType> = {
  STUDY: '스터디',
  PROJECT: '프로젝트',
  MENTORING: '멘토링',
}
export const communityCategoryToLabelMap: Record<
  CommunityCategory,
  CommunityLabelCategory
> = {
  SKILL: '기술',
  CAREER: '커리어',
  OTHER: '기타',
}

export const recruitmentStatusMap: Record<'true' | 'false', string> = {
  true: '모집 중',
  false: '모집 완료',
}

export const linkValueToLabelMap = linkOptions.reduce(
  (acc, { value, label }) => ({
    ...acc,
    [value]: label,
  }),
  {} as Record<string, string>
)

export const positionValueToLabelMap = positionOptions.reduce(
  (acc, { value, label }) => ({
    ...acc,
    [value]: label,
  }),
  {} as Record<string, string>
)

export const techStackValueToLabelMap = techStackOptions.reduce(
  (acc, { value, label }) => ({
    ...acc,
    [value]: label,
  }),
  {} as Record<string, string>
)

export const awardTypeToLabelMap = awardTypeOptions.reduce(
  (acc, { value, label }) => ({
    ...acc,
    [value]: label,
  }),
  {} as Record<string, string>
)
