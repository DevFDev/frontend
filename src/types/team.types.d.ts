export type TeamType = 'STUDY' | 'PROJECT' | 'MENTORING'
export type TeamLabelType = '스터디' | '프로젝트' | '멘토링'
export type TeamRecruitmentLabelType = '모집 중' | '모집 완료'
export type TeamPosition = string

type TeamBaseBody = {
  teamTitle: string
  teamContent: string
  teamType: TeamType
  teamPosition: TeamPosition
  teamRecruitmentNum: number
  teamTechStack?: TechStack[]
  teamTags?: Tag[]
}

export interface TeamListType extends PostBaseBody, TeamBaseBody {
  teamIsActive: boolean
}

/*
path: '/v1/team'

GET: 팀 모집급 전체 조회
*/
export type GetTeamListResponse = TeamListType[]

/* POST: 팀 모집글 등록 */
export type TeamCreateRequest = TeamBaseBody
export interface TeamCreateResponse extends TimeStamps, TeamBaseBody {
  id: Id
}

/* 
path: '/v1/team/{teamId}'
GET: 팀 모집글 상세 조회
*/
export type GetTeamDetailResponse = TeamListType

/* DELETE: 팀 모집글 삭제 

반환 값:
{
  "isSuccess": true,
  "code": "COMMON200",
  "message": "팀 모집글이 성공적으로 삭제되었습니다."
}
*/

/* 
path: '/v1/team/{teamId}/add'

POST: 팀 멤버 추가
*/
export interface TeamAddMemberRequest {
  memberId: Id
}
export interface TeamAddMemberResponse {
  id: Id
  teamId: Id
  memberId: Id
}

/* 
path: '/v1/team/{teamId}/close'
PATCH: 팀 모집 마감

반환 값:
{
  "isSuccess": true,
  "code": "COMMON200",
  "message": "모집 상태가 마감되었습니다."
}
*/

/* 
path: '/v1/team/{teamId}/search-members'
GET: 멤버 리스트 검색
*/
export type SearchMembersResponse = MemberInfo[]

/* 
path: '/v1/team/{teamId}/members'
GET: 팀 멤버 전체 조회
*/
export type GetTeamMembersResponse = {
  teamId: Id
  members: MemberInfo[]
}
