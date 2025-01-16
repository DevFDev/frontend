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
- POST: 프로젝트 글 등록
*/
export type CreateProjectRequest = MultipartFormData<ProjectBase>
export interface CreateProjectResponse extends ProjectBase, TimeStamps {
  id: Id
  writer: MemberInfo
  projectImageUrl?: ImageURL
}
