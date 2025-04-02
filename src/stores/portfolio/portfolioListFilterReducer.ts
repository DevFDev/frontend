import { GetPortfolioListQuery } from '@/types/api/Portfolio.types'

type FilterState = GetPortfolioListQuery

type FilterAction =
  | { type: 'SET_SEARCH_TERM'; payload: FilterState['searchTerm'] }
  | { type: 'SET_SORT_BY'; payload: FilterState['sortBy'] }
  | { type: 'SET_POSITION'; payload: FilterState['position'] }
  | { type: 'SET_PAGE'; payload: FilterState['page'] }
  | { type: 'RESET_FILTERS' }

export const portfolioListFilterInitialState: FilterState = {
  searchTerm: '',
  sortBy: 'recent',
  position: '',
  page: 1,
  size: 5,
}

export const portfolioListFilterReducer = (
  state: FilterState,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload }
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload }
    case 'SET_POSITION':
      return { ...state, position: action.payload }
    case 'SET_PAGE':
      return { ...state, page: action.payload }
    default:
      return state
  }
}
