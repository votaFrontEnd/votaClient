import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function applicantsReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_APPLICANTS_SUCCESS:
      return action.applicants;
    case types.CREATE_APPLICANTS_SUCCESS:
      const newState = Object.assign([], state);
      console.log(newState.length);
      action.applicants.forEach(function(applicant) {
        if (
          newState.filter(existingApplicant => {
            return existingApplicant.ID == applicant.ID;
          }).length == 0
        ) {
          newState.push(applicant);
        }
      });
      console.log(newState.length);
      console.log("---");
      return newState;
  }
  return state;
}
