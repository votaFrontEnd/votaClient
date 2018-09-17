import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function usersReducer(state = [], action){
    switch(action.type){
        case types.LOAD_USERS_SUCCESS:
            return action.users;
    } 
    return state;
}    