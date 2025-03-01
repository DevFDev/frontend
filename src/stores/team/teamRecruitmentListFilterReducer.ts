import { GetTeamRecruitmentListQuery } from '@/types/api/Team.types'

type FilterState = GetTeamRecruitmentListQuery

type FilterAction =
  | { type: 'SET_SEARCH_TERM'; payload: FilterState['searchTerm'] }
  | { type: 'SET_POSITIONS'; payload: FilterState['positions'] }
  | { type: 'SET_TECHSTACKS'; payload: FilterState['techStacks'] }
  | { type: 'SET_SORT_BY'; payload: FilterState['sortBy'] }
  | { type: 'SET_TEAM_TYPE'; payload: FilterState['teamType'] }
  | { type: 'TOGGLE_TEAM_ACTIVE' }
  | { type: 'RESET_FILTERS' }

export const teamRecruitmentListFilterInitialState: FilterState = {
  searchTerm: '',
  positions: [],
  techStacks: [],
  sortBy: 'recent',
  teamType: 'STUDY',
  teamIsActive: true,
}

export const teamRecruitmentListFilterReducer = (
  state: FilterState,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload }
    case 'SET_POSITIONS':
      return { ...state, positions: action.payload }
    case 'SET_TECHSTACKS':
      return { ...state, techStacks: action.payload }
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload }
    case 'SET_TEAM_TYPE':
      return { ...state, teamType: action.payload }
    case 'TOGGLE_TEAM_ACTIVE':
      return { ...state, teamIsActive: !state.teamIsActive }
    default:
      return state
  }
}
