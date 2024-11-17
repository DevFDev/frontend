export type TeamType = 'STUDY' | 'PROJECT' | 'MENTORING'
export type TeamLabelType = '스터디' | '프로젝트' | '멘토링'
export type TeamRecruitmentLabelType = '모집 중' | '모집 완료'
export type TeamPosition = string

export interface TeamCreateRequest {
  teamTitle?: Title
  teamContent?: Content
  teamType?: TeamType
  teamPosition?: TeamPosition
  teamRecruitmentNum?: number
  teamTechStack?: TechStack[]
  teamTags?: Tag[]
}

export interface TeamAddMemberRequest {
  memberId?: Id
}
