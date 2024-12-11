type ProjectCategory = 'WEB' | 'APP' | 'GAME' | 'SERVER' | 'AI' | 'DATA' | 'HW'

type ProjectBase = {
  projectTitle: string
  projectContent: string
  projectCategory: ProjectCategory
  tags?: Tag[]
  links?: PostLink[]
}

/**
- path: '/v1/project'
- POST: 프로젝트 글 등록
*/
export type CreateProjectRequest = ProjectBase
export interface CreateProjectResponse extends ProjectBase, TimeStamps {
  id: Id
  writer: MemberInfo
  projectImageUrl?: ImageURL
}
