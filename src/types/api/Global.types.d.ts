// 기본 타입 정의

/** 
고유 ID
*/
type Id = number
/** 
URL
*/
type URL = string
/** 
JWT 또는 인증 토큰
*/
type Token = string

// 사용자 관련 타입

/** 
사용자 이메일
*/
type Email = string
/** 
사용자 비밀번호
*/
type Password = string
/** 
사용자 이름
*/
type Name = string
/** 
사용자 닉네임
*/
type Nickname = string
/** 
사용자 GitHub 프로필 URL
*/
type GitHub = string

/** 
기술 스택 (예: "React", "Node.js")
*/
type TechStack = string

/** 
타임스탬프 정의 (Format: date-time)
- createdAt: 생성 시간 (ISO 8601)
- updatedAt?: 수정 시간 (선택적, ISO 8601)
*/
type TimeStamps = {
  createdAt: string
  updatedAt?: string
}

/** 
사용자 관련 인터페이스
- id: 사용자 고유 ID
- email: 이메일
- name: 이름
- nickname: 닉네임
- imageUrl: 프로필 이미지 URL
*/
type User = {
  id: Id
  email: Email
  name: Name
  nickname: Nickname
  imageUrl: URL
}

// MemberInfo: 일부 사용자 정보를 제외한 타입
type MemberInfo = Omit<User, 'email' | 'name'>

/** 
- request: T
- file?: Format: binary
*/
interface MultipartFormData<T> {
  request: T
  /** Format: binary */
  file?: File
}
