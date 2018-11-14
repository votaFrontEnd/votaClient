import * as types from "./actionTypes";
import sessionApi from "../api/SessionApi";
import auth from "../auth/authenticator";

export function loginSuccess(user) {
  return { type: types.LOG_IN_SUCCESS, user };
}

export function loginFailure(error) {
  return { type: types.LOG_IN_FAILTURE, error };
}

export function loginUser(credentials, history) {
  return function(dispatch) {
    return sessionApi
      .login(credentials.user, credentials.password)
      .then(response => {
        if (response.error != null) {
          dispatch(loginFailure(response.error));
        } else {
          auth.login(response.user.userid);
          dispatch(loginSuccess(response.user.userid));
          history.push("/");
        }
      })
      .catch(error => {
        throw error;
      });
  };
}

export function changePassword(credentials, history) {
  return function(dispatch) {
    return sessionApi
      .changePassword(credentials.user, credentials.newPassword)
      .then(response => {
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
