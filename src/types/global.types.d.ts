// 기본 타입 정의
type Id = number
type URL = string
type Token = string

// 사용자 관련 타입
type Email = string
type Password = string
type Name = string
type Nickname = string
type GitHub = string

// 공통 속성 타입
type TechStack = string

// 타임스탬프 정의
type TimeStamps = {
  // Format: date-time
  createdAt: string
  updatedAt?: string // 있을 수도 있고 없을 수도 있음
}

// 사용자 관련 인터페이스
interface User {
  id: Id
  email: Email
  name: Name
  nickname: Nickname
  imageUrl: URL
}

type MemberInfo = Omit<User, 'email' | 'name'>
