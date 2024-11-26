// 게시글 유형
type PostCategory = 'COMMUNITY' | 'TEAM' | 'PORTFOLIO' | 'PROJECT'

// 게시글 기본 구조
interface PostBaseBody extends TimeStamps {
  id: Id // 게시글 고유 ID
  member: MemberInfo // 게시글 작성자 정보
  views: number // 조회수
  answers: number // 답변 수
  likes: number // 좋아요 수
}

// 좋아요 요청 타입
interface LikeRequest {
  likeId: Id // 좋아요 대상 ID
  likeType: PostCategory // 대상 유형 (PostCategory)
}
