/**  
게시글 기본 구조
*/
type PostCategory = 'COMMUNITY' | 'TEAM' | 'PORTFOLIO' | 'PROJECT'

/**
링크 타입
- type: 링크 유형 (예: github, blog)
- url: URL
*/
export interface PostLink {
  type?: string // 링크 유형 (예: github, blog)
  url?: string // URL
}

/** 
게시글 기본 구조
- id: 게시글 고유 ID
- writer: 게시글 작성자 정보
- views: 조회수
- answers: 답변 수
- likes: 좋아요 수
*/
interface PostBaseBody extends TimeStamps {
  id: Id
  writer: MemberInfo
  views: number
  answers: number
  likes: number
}

/** 
- path: '/v1/likes'
- POST: 좋아요 요청
- likeId: 좋아요 대상 게시글 ID
- likeType: 대상 유형 (PostCategory)
*/
type LikeRequest = {
  likeId: Id
  likeType: PostCategory
}
