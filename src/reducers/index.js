import { combineReducers } from "redux";
import session from "./sessionReducer";
import jobs from "./jobsReducer";
import users from "./usersReducer";
import applicants from "./applicantsReducer";
import roleFilter from "./roleFilterReducer";
import statusFilter from "././statusFilter";

const rootReducer = combineReducers({
  session,
  jobs,
  users,
  applicants,
  statusFilter,
  roleFilter
});

export default rootReducer;
