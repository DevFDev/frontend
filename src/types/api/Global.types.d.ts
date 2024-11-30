// 기본 타입 정의
type Id = number // 고유 ID
type URL = string // URL
type Token = string // JWT 또는 인증 토큰

// 사용자 관련 타입
type Email = string // 이메일
type Password = string // 비밀번호
type Name = string // 사용자 이름
type Nickname = string // 닉네임
type GitHub = string // GitHub 프로필 URL

// 공통 속성 타입
type TechStack = string // 기술 스택 (예: "React", "Node.js")

// 타임스탬프 정의
type TimeStamps = {
  // Format: date-time
  createdAt: string // 생성 시간 (ISO 8601)
  updatedAt?: string // 수정 시간 (선택적, ISO 8601)
}

// 사용자 관련 인터페이스
interface User {
  id: Id // 사용자 고유 ID
  email: Email // 이메일
  name: Name // 이름
  nickname: Nickname // 닉네임
  imageUrl: URL // 프로필 이미지 URL
}

// MemberInfo: 일부 사용자 정보를 제외한 타입
type MemberInfo = Omit<User, 'email' | 'name'>

interface MultipartFormData<T> {
  request: T
  /** Format: binary */
  file?: File
}
