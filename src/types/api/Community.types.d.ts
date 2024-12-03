// 커뮤니티 카테고리
export type CommunityCategory = 'SKILL' | 'CAREER' | 'OTHER'
export type CommunityLabelCategory = '기술' | '커리어' | '기타'

type CommunityBase = {
  communityCategory: CommunityCategory // 커뮤니티 글 카테고리
  communityTitle: string // 커뮤니티 글 제목
  communityContent: string // 커뮤니티 글 내용
}

// 인기 멤버 구조
type CommunityTop5Member = {
  member: MemberInfo // 멤버 정보
  totalLikes: number // 총 좋아요 수
}

// 커뮤니티 리스트 타입
interface CommunityListItem extends PostBaseBody, CommunityBase {}

// 커뮤니티 상세 타입
interface CommunityDetail extends CommunityListItem {
  isComment: boolean // 댓글 허용 여부
}

/**
path: '/v1/community'
GET: 커뮤니티 글 전체 조회
*/
export type GetCommunityListResponse = CommunityListItem[]
/**
POST: 커뮤니티 글 등록
*/
export interface CreateCommunityRequest extends CommunityBase {
  isComment?: boolean // 댓글 허용 여부
}
export interface CreateCommunityResponse extends CommunityBase, TimeStamps {
  id: Id // 생성된 커뮤니티 글 ID
  member: Id // 작성자 Id
  isComment: boolean // 댓글 허용 여부
}

/**
path: '/v1/community/{id}'
GET: 커뮤니티 글 상세 조회
*/
export type GetCommunityDetailResponse = CommunityDetail

/**
PATCH: 커뮤니티 글 수정
*/
export type UpdateCommunityRequest = CommunityBase
export type UpdateCommunityResponse = CreateCommunityResponse

/**
DELETE: 커뮤니티 글 삭제
반환 값: 기본 ApiResponse 구조 사용
{
  "isSuccess": true,
  "code": "COMMON200",
  "message": "팀 모집글이 성공적으로 삭제되었습니다."
}
*/

/**
path: '/v1/community/top5'
GET: 좋아요 순으로 인기 커뮤니티 Top 5 유저 조회
*/
export type GetCommunityTop5Response = CommunityTopMember[]
