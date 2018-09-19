import * as types from './actionTypes';
import jobsApi from '../api/JobsApi';
import auth from '../auth/authenticator';

export function loadJobsSuccess(jobs)
{
    return {type: types.LOAD_JOBS_SUCCESS, jobs};
}

export function loadUsersSuccess(users)
{
    return {type: types.LOAD_USERS_SUCCESS, users};
}

export function loadApplicantsSuccess(applicants)
{
    return {type: types.LOAD_APPLICANTS_SUCCESS, applicants};
}

export function createJobSuccess(job){
    return {type: types.CREATE_JOB_SUCCESS, job};
}

export function loadJobsUpdatedSuccess(job)
{
    return {type: types.UPDATE_JOBS_SUCCESS, job};
}

export function loadApplicantsUpdatedSuccess(applicants)
{
    return {type: types.UPDATE_APPLICANTS_SUCCESS, applicants};
}

export function loadJobs(){
    return function(dispatch){
        return jobsApi.getAllJobs().then(jobs=>{
            dispatch(loadJobsSuccess(jobs));
        }).catch(error=>{
            throw (error);
        });
    };
}

function shouldLoadJobs(state){
    if (state.jobs == null || state.jobs.length == 0)
    {
        return true;
    }
    else{
        return false;
    }
}

export function createJob(job) {
    return function (dispatch) {
      return jobsApi.creatJob(job).then(responseJob => {
        dispatch(createJobSuccess( (responseJob != null && responseJob.job != null) ? responseJob.job : null));
        return responseJob;
      }).catch(error => {
        throw(error);
      });
    };
}

export function editJob(jobId, job){
    return function (dispatch) {
        return jobsApi.editJob(jobId, job).then(data => {
          dispatch(loadJobsUpdatedSuccess(data.job));   
        }).catch(error => {
          throw(error);
        });
      };
}

export function closeJob(jobId){
    return function (dispatch) {
        return jobsApi.closeJob(jobId).then(data => {
          dispatch(loadJobsUpdatedSuccess(data.job));   
        }).catch(error => {
          throw(error);
        });
      };
}

export function publishJob(jobId){
    return function (dispatch) {
        return jobsApi.publishJob(jobId).then(data => {
          dispatch(loadJobsUpdatedSuccess(data.job));   
        }).catch(error => {
          throw(error);
        });
      };
}

export function addApplicant(jobId, applicantName){
    return function (dispatch) {
        return jobsApi.addApplicant(jobId, applicantName).then(data => {
          dispatch(loadApplicantsUpdatedSuccess(data.applicants));
          dispatch(loadJobsUpdatedSuccess(data.job));          
        }).catch(error => {
          throw(error);
        });
      };
}

export function addInterviewers(jobId, interviewers){
    return function (dispatch) {
        return jobsApi.addInterviewers(jobId, interviewers).then(data => {
          dispatch(loadJobsUpdatedSuccess(data.job));   
        }).catch(error => {
          throw(error);
        });
      };
} 

export function addRating(jobId, rating){
    return function (dispatch) {
        return jobsApi.addRating(jobId, rating).then(data => {
          dispatch(loadJobsUpdatedSuccess(data.jobs));   
        }).catch(error => {
          throw(error);
        });
      };
} 

export function loadJobsIfNeeded(){
    return (dispatch, getState) => {
        if (shouldLoadJobs(getState()))
        {
            return dispatch(loadJobs())
        }
    }
}

export function loadData(){
    return function(dispatch){
        return jobsApi.getData(auth.getUser()).then(data=>{
            dispatch(loadJobsSuccess(data.jobs));
            dispatch(loadApplicantsSuccess(data.applicants));
            dispatch(loadUsersSuccess(data.users));
        }).catch(error=>{
            throw (error);
        });
    };
}

function shouldLoadData(state){
    if (state.jobs == null || (Array.isArray(state.jobs) == false || state.jobs.length == 0))
    {
        return true;
    }
    else{
        return false;
    }
}

export default function loadDataIfNeeded(){
    return (dispatch, getState) => {
        if (shouldLoadData(getState()))
        {
            return dispatch(loadData())
        }
    }
}