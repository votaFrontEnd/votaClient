class SessionApi {
  static login(userName, password) {
    const request = new Request(`http://35.153.120.148:5000/user/login`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ userid: userName, pwd: password })
    });

    return fetch(request)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }

  static changePassword(userName, password) {
    const request = new Request(`http://35.153.120.148:5000/user/changepwd`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ userid: userName, pwd: password })
    });
    debugger;
    return fetch(request)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }
}

export default SessionApi;
