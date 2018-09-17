import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function jobsReducer(state = [], action){
    switch(action.type){
        case types.LOAD_JOBS_SUCCESS:
            return action.jobs;
        case types.CREATE_JOB_SUCCESS:
            return [
                ...state.filter(job => job.id !== action.job.id),
                Object.assign({}, action.job)
            ]
        case types.UPDATE_JOBS_SUCCESS:
            debugger;
            return [
                ...state.filter(job => job.id !== action.job.id),
                Object.assign({}, action.job)
          ]
    } 
    return state;
}    