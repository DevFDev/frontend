import { components, operations } from './ApiSchema.types'

export type ProjectCategory =
  | 'WEB'
  | 'APP'
  | 'GAME'
  | 'SERVER'
  | 'AI'
  | 'DATA'
  | 'HW'

type ProjectBase = {
  projectTitle: string
  projectContent: string
  projectCategory: ProjectCategory
  tags?: Tag[]
  links?: PostLink[]
}

export type ProjectListItem = ProjectBase & PostBaseBody

/**
- path: '/v1/project'
- GET: 프로젝트 글 전체 조회
*/
export type GetProjectListQuery = {
  searchTerm: string
  projectCategory: ProjectCategory | ''
  sortBy: Order
  page: number
  size: number
}
export type GetProjectListResponse = NonNullable<
  operations['getProjectList']['responses']['200']['content']['*/*']['result']
>

/**
- path: '/v1/project'
- POST: 프로젝트 글 등록
*/
export type CreateProjectRequest = MultipartFormData<
  components['schemas']['ProjectCreateRequest']
>
export interface CreateProjectResponse extends ProjectBase, TimeStamps {
  id: Id
  writer: MemberInfo
  projectImageUrl?: ImageURL
}

/**
- path: '/v1/project/{projectId}'
- POST: 프로젝트 상세 조회
*/
export type GetProjectDetailResponse =
  components['schemas']['ProjectDetailResponse'] & ProjectListItem
