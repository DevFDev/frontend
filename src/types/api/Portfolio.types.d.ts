// 기본 포트폴리오 타입
interface PortfolioBase {
  portTitle: string // 포트폴리오 제목
  portPosition: string // 역할 또는 직무
  tags: string[] // 태그 리스트
  portImageUrl: string // 대표 이미지 URL
}

// 수상 타입 (Award)
type AwardType = 'COMPETITION' | 'CERTIFICATE' | 'LANGUAGE' | 'ACTIVITY'

// 활동 상세 타입
interface ActivityAward {
  activityName?: string // 활동명
  startDate?: string // 활동 시작일 (YYYY-MM-DD)
  endDate?: string // 활동 종료일 (YYYY-MM-DD)
}

// 자격증 상세 타입
interface CertificateAward {
  certificateName?: string // 자격증명
  issuer?: string // 발행처
  passingDate?: string // 합격 년월 (YYYY-MM-DD)
}

// 언어 능력 상세 타입
interface LanguageAward {
  language?: string // 언어 이름
  testName?: string // 시험명
  score?: string // 점수
  obtainedDate?: string // 취득일 (YYYY-MM-DD)
}

// 공모전 상세 타입
interface CompetitionAward {
  competitionName?: string // 공모전명
  hostingInstitution?: string // 주최기관
  competitionDate?: string // 공모일 (YYYY-MM-DD)
}

// 학력 상세 타입
export interface PortfolioEducation {
  level?: string // 학력 구분 (예: 대학, 고등학교)
  institutionName?: string // 학교명
  major?: string // 전공
  admissionDate?: string // 입학일 (YYYY-MM-DD)
  graduationDate?: string // 졸업일 (YYYY-MM-DD)
  graduationStatus?: string // 졸업 여부 (졸업, 재학 등)
  isTransfer?: boolean // 편입 여부
  grade?: number // 학점
  gradeScale?: number // 기준 학점
}

// 경력 상세 타입
interface PortfolioCareer {
  companyName?: string // 회사명
  position?: string // 직무
  startDate?: string // 입사일 (YYYY-MM-DD)
  endDate?: string // 퇴사일 (YYYY-MM-DD)
  isCurrent?: boolean // 재직 여부
  level?: string // 직급
  description?: string // 업무 설명
}

// 상장 요청 타입
interface AwardRequestBase {
  awardType?: AwardType
}
interface ActivityAwardRequest extends AwardRequestBase, ActivityAward {
  awardType: 'ACTIVITY'
}
interface CertificateAwardRequest extends AwardRequestBase, CertificateAward {
  awardType: 'CERTIFICATE'
}
interface CompetitionAwardRequest extends AwardRequestBase, CompetitionAward {
  awardType: 'COMPETITION'
}
interface LanguageAwardRequest extends AwardRequestBase, LanguageAward {
  awardType: 'LANGUAGE'
}

// 포트폴리오 리스트 아이템
export type PortfolioListItem = PortfolioBase & PostBaseBody

// 포트폴리오 상세글
export interface PortfolioDetail extends PortfolioBase {
  portContent: string // 상세 내용
  techStacks: TechStack[] // 사용 기술 스택
  links?: PostLink[] // 외부 링크
  educations?: PortfolioEducation[] // 학력 리스트
  awards?: (
    | ActivityAwardRequest
    | CertificateAwardRequest
    | CompetitionAwardRequest
    | LanguageAwardRequest
  )[] // 수상 내역
  careers?: PortfolioCareer[] // 경력 리스트
}

/**
- path: '/v1/portfolio'
- GET: 포트폴리오 전체 리스트 조회
*/
export type GetPortfolioListResponse = PortfolioListItem[]

/**
- path: '/v1/portfolio'
- POST: 포트폴리오 글 등록
*/
export type CreatePortfolioRequest = MultipartFormData<PortfolioDetail>
export type CreatePortfolioResponse = CreatePortfolioRequest & PostBaseBody
