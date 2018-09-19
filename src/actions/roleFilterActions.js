import * as types from './actionTypes';

export default function setRoleFilter(filter)
{
    return {type: types.SET_ROLE_FILTER, filter};
}
