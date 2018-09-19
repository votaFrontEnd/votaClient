import * as types from '../actions/actionTypes';
import initialState from './initialState';


const visibilityFilter = (state = types.StatusFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case types.SET_STATUS_FILTER:
      return action.filter
    default:
      return state
  }
}

export default visibilityFilter
