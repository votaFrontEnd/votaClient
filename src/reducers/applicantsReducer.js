import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function applicantsReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_APPLICANTS_SUCCESS:
      return action.applicants;
    case types.CREATE_APPLICANTS_SUCCESS:
      return [
        ...state.filter(applicant => applicant.Id !== action.applicants.Id),
        Object.assign({}, action.applicants)
      ];
  }
  return state;
}
