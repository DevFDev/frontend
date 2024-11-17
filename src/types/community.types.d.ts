export type CommunityCategory = 'SKILL' | 'CAREER' | 'OTHER'
export type CommunityLabelCategory = '기술' | '커리어' | '기타'

export interface CommunityCreateRequest {
  communityCategory?: CommunityCategory
  communityTitle?: Title
  communityContent?: Content
  communityAI?: boolean // 아마 삭제 예정
}

export interface CommunityUpdateRequest {
  communityCategory?: CommunityCategory
  communityTitle?: Title
  communityContent?: Content
}
