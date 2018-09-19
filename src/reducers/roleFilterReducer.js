import * as types from '../actions/actionTypes';
import initialState from './initialState';


const visibilityFilter = (state = types.RoleFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case types.SET_ROLE_FILTER:
      return action.filter
    default:
      return state
  }
}

export default visibilityFilter
