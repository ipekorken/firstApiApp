import {SET_USERTOKEN, SET_USERINFO, SET_USERS} from './types';

const initialState = {
  userToken: null,
  userInfo: null,
  users: [],
};

const reducer = (state = initialState, action) => {
  const {type} = action;

  switch (type) {
    case SET_USERTOKEN:
      return {...state, userToken: action.payload};
      break;
    case SET_USERINFO:
      return {...state, userInfo: action.payload};
      break;
    case SET_USERS:
      return {...state, users: action.payload};
      break;
    default:
      break;
  }

  return state;
};

export default reducer;
