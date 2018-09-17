
import {combineReducers} from '../../../../../.cache/typescript/2.9/node_modules/redux';
import session from './sessionReducer';
import jobs from './jobsReducer';
import users from './usersReducer';
import applicants from './applicantsReducer';

const rootReducer = combineReducers({
  session,
  jobs,
  users,
  applicants
})

export default rootReducer;