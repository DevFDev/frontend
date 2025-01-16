// 팀 모집글 관련 기본 타입
export type TeamType = 'STUDY' | 'PROJECT' | 'MENTORING' // 팀 모집글 유형
export type TeamLabelType = '스터디' | '프로젝트' | '멘토링' // 팀 모집글 유형 라벨
export type TeamRecruitmentLabelType = '모집 중' | '모집 완료' // 모집 상태 라벨
export type TeamPosition = string // 역할 (예: 프론트엔드, 백엔드 등)

/**
팀 모집글 공통 속성 
*/
type TeamRecruitmentBase = {
  teamTitle: string // 팀 모집글 제목
  teamContent: string // 팀 모집글 내용
  teamType: TeamType // 팀 모집글 유형
  teamPosition: TeamPosition // 모집 역할
  teamRecruitmentNum: number // 모집 인원
  teamTechStack: TechStack[] // 사용 기술 스택
  teamTags: Tag[] // 태그
}

/**
팀 모집글 리스트 아이템
*/
export interface TeamRecruitmentListItem
  extends PostBaseBody,
    TeamRecruitmentBase {
  teamIsActive: boolean // 모집 활성 상태
}

/**
- path: '/v1/team'
- GET: 팀 모집글 모집급 전체 조회
*/
export type GetTeamRecruitmentListResponse = TeamRecruitmentListItem[]

/**
- POST: 팀 모집글 등록 
*/
export type CreateTeamRecruitmentRequest = TeamRecruitmentBase
export interface CreateTeamRecruitmentResponse
  extends TimeStamps,
    TeamRecruitmentBase {
  id: Id // 팀 모집글 ID
}

/**
- path: '/v1/team/{teamId}'
- GET: 팀 모집글 상세 조회
*/
export type GetTeamRecruitmentResponse = TeamRecruitmentListItem

/**
- PATCH: 팀 모집글 업데이트
*/
export type UpdateTeamRecruitmentRequest = TeamRecruitmentBase
export type UpdateTeamRecruitmentResponse = CreateTeamRecruitmentResponse

/**
- DELETE: 팀 모집글 삭제
반환 값: 공통 응답 타입 활용 (ApiResponse)
{
  "isSuccess": true,
  "code": "COMMON200",
  "message": "팀 모집글 모집글이 성공적으로 삭제되었습니다."
}
*/

/**
- path: '/v1/team/{teamId}/add'
- POST: 팀 모집글 멤버 추가
*/
export interface AddTeamMemberRequest {
  memberId: Id // 추가할 멤버 ID
}
export type AddTeamMemberResponse = {
  id: Id // 추가 작업 ID
  teamId: Id // 팀 모집글 ID
  memberId: Id // 멤버 ID
}

/**
- path: '/v1/team/{teamId}/close'
- PATCH: 팀 모집글 모집 마감

반환 값:
{
  "isSuccess": true,
  "code": "COMMON200",
  "message": "모집 상태가 마감되었습니다."
}
*/

/**
- path: '/v1/team/{teamId}/search-members'
- GET: 멤버 리스트 검색
*/
export type SearchMembersResponse = MemberInfo[]

/**
- path: '/v1/team/{teamId}/members'
- GET: 팀 모집글 멤버 전체 조회
*/
export type GetTeamMembersResponse = {
  teamId: Id // 팀 모집글 ID
  members: MemberInfo[] // 팀 모집글 멤버 리스트
}
