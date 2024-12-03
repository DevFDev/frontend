// 프로필 관련 타입
export type AffiliationType = 'COMPANY_SCHOOL' | 'FREELANCER' | 'OTHER' // 소속 타입

// 공통 프로필 필드
export interface ProfileBase {
  nickname?: Nickname // 회원 닉네임
  imageUrl?: string // 프로필 사진 URL
  introduction?: string // 소개문구
  gitHub?: GitHub // GitHub 링크
  position?: string[] // 포지션 리스트
  techStacks?: TechStack[] // 기술 스택 리스트
  affiliation?: AffiliationType // 소속
}

/**
- path: '/v1/my-page/profile'
- GET: 마이페이지 프로필 조회
*/
export interface GetProfileResponse extends ProfileBase, User {
  completionRate: number // 포트폴리오 완성률 (%)
}

/**
- PATCH:  마이페이지 프로필 저장
*/
export type UpdateProfileRequest = MultipartFormData<ProfileBase>

export interface UpdateProfileResponse extends ProfileBase {
  completionRate?: number // 포트폴리오 완성률 (%)
}

/**
- path: '/v1/my-page/check-nickname'
- POST: 닉네임 중복 체크
*/
export interface CheckNicknameRequest {
  nickname: Nickname // 닉네임 중복 검사 대상
}

export type CheckNicknameResponse = boolean

/**
- UpdatePasswordResponse
{
  "isSuccess": true,
  "code": "COMMON200",
  "message": "비밀번호 수정이 완료되었습니다."
}
*/

/**
- path: '/v1/my-page/password'
- PATCH: 마이 페이지 비밀번호 수정
*/
export interface UpdatePasswordRequest {
  password: Password // 새 비밀번호
}

/**
- UpdatePasswordResponse
{
  "isSuccess": true,
  "code": "COMMON200",
  "message": "비밀번호 수정이 완료되었습니다."
}
*/
