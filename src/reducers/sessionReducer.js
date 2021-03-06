import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function sessionReducer(state = initialState.session, action) {
  switch (action.type) {
    case types.LOG_IN_SUCCESS:
      return action.user;
    case types.LOG_IN_FAILTURE:
      return action.error;
    case types.LOG_OUT:
      return !!sessionStorage.user;
    default:
      return state;
  }
}
