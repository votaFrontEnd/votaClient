class Auth {
  static loggedIn() {
    return (
      sessionStorage.getItem("user") != null &&
      sessionStorage.getItem("user").length > 0
    );
  }

  static getUser() {
    return sessionStorage.getItem("user");
  }

  static login(username) {
    sessionStorage.setItem("user", username);
  }

  static logOut() {
    sessionStorage.removeItem("user");
  }
}

export default Auth;
