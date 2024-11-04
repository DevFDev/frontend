export type TeamType = 'STUDY' | 'PROJECT' | 'MENTORING'
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
