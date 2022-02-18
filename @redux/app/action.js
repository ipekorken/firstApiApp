import {SET_USERTOKEN, SET_USERINFO, SET_USERS} from './types';

export const setUserToken = userToken => ({
  type: SET_USERTOKEN,
  payload: userToken,
});
export const setUserInfo = userInfo => ({
  type: SET_USERINFO,
  payload: userInfo,
});
export const setUsers = users => ({
  type: SET_USERS,
  payload: users,
});
