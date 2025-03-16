import { GetProjectListQuery } from '@/types/api/Project.types'

type FilterState = GetProjectListQuery

type FilterAction =
  | { type: 'SET_SEARCH_TERM'; payload: FilterState['searchTerm'] }
  | { type: 'SET_SORT_BY'; payload: FilterState['sortBy'] }
  | { type: 'SET_CATEGORY'; payload: FilterState['projectCategory'] }
  | { type: 'SET_PAGE'; payload: FilterState['page'] }
  | { type: 'RESET_FILTERS' }

export const projectListFilterInitialState: FilterState = {
  searchTerm: '',
  sortBy: 'recent',
  projectCategory: '',
  page: 1,
  size: 10,
}

export const projectListFilterReducer = (
  state: FilterState,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload }
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload }
    case 'SET_CATEGORY':
      return { ...state, projectCategory: action.payload }
    case 'SET_PAGE':
      return { ...state, page: action.payload }
    default:
      return state
  }
}
