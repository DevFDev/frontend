export type CommunityCategory = 'SKILL' | 'CAREER' | 'OTHER'
export type CommunityLabelCategory = '기술' | '커리어' | '기타'

type CommunityBaseBody = {
  communityCategory: CommunityCategory
  communityTitle: string
  communityContent: string
}

type CommunityTop5Member = {
  member: MemberInfo
  totalLikes: number
}

interface CommunityListType extends PostBaseBody, CommunityBaseBody {}

interface CommunityDetail extends CommunityListDetail {
  isComment: boolean
}
/*
path: '/v1/community'
GET: 커뮤니티 글 전체 조회
*/
export type GetCommunityListResponse = CommunityListType
/* POST: 커뮤니티 글 등록 */
export interface CommunityCreateRequest extends CommunityBaseBody {
  isComment?: boolean // 답변 동의 여부
}
export interface CommunityCreateResponse extends CommunityBaseBody, TimeStamps {
  id: Id
  member: Id // 작성자 Id
  isComment: boolean
}

/*
path: '/v1/community/{id}'
GET: 커뮤니티 글 상세 조회
*/
export type GetCommunityDetailResponse = CommunityDetail
/* PATHCH: 커뮤니티 글 수정 */
export type CommunityUpdateRequest = CommunityBaseBody
export type CommunityUpdateResponse = CommunityCreateResponse
/* DELETE: 커뮤니티 글 삭제 
반환 값:
{
  "isSuccess": true,
  "code": "COMMON200",
  "message": "팀 모집글이 성공적으로 삭제되었습니다."
}
*/

/*
path: '/v1/community/top5'
GET: 인기 커뮤니티 Top5 유저 조회 (좋아요 순))
*/
export type GetCommunityTop5Response = CommunityTop5Member[]
