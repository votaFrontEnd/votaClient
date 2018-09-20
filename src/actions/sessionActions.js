import * as types from "./actionTypes";
import sessionApi from "../api/SessionApi";
import auth from "../auth/authenticator";

export function loginSuccess(user) {
  return { type: types.LOG_IN_SUCCESS, user };
}

export function loginUser(credentials, history) {
  return function(dispatch) {
    return sessionApi
      .login(credentials.user, credentials.password)
      .then(response => {
        auth.login(credentials.user);
        dispatch(loginSuccess(credentials.user));
        history.push("/");
      })
      .catch(error => {
        throw error;
      });
  };
}

export function logOutUser() {
  auth.logOut();
  return { type: types.LOG_OUT };
}
