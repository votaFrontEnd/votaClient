import * as types from './actionTypes';

export default function setStatusFilter(filter)
{
    return {type: types.SET_STATUS_FILTER, filter};
}
