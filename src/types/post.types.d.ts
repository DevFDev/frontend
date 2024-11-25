// 게시글 관련 타입
type PostType = 'COMMUNITY' | 'TEAM' | 'PORTFOLIO' | 'PROJECT'

// 게시글 기본 구조
interface PostBaseBody extends TimeStamps {
  id: Id
  member: MemberInfo // 게시글 작성자
  views: number
  answers: number
  likes: number
}

interface LikeRequest {
  likeId: Id
  likeType: PostType
}
