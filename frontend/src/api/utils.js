import Cookies from 'js-cookie';


const BASE_URL = 'http://localhost:5000';
const TOKEN_HEADER = 'X-Session-Token';


class Backend {

  static _call(path, method, data, noJSON) {
    return new Promise((resolve, reject) => {
      // Configure the request
      let headers = new Headers();
      headers.append('Content-Type', 'application/json')

      // Add the session token if we have one
      let token = Cookies.get(TOKEN_HEADER)
      if (token !== undefined) {
        headers.append(TOKEN_HEADER, token)
      }

      // Make the call
      let options = { headers, method, body: JSON.stringify(data) };
      fetch(BASE_URL + path, options).then(response => {
        // Make sure the request went through
        if (!response.ok) {
          reject('Something went wrong with the request');
        }

        // Convert to JSON if requested
        if (noJSON) {
          resolve(response);
        } else {
          response.json().then(resolve, reject);
        }
      })
    });
  }

  static get(path) {
    return this._call(path, 'GET');
  }

  static post(path, data) {
    return this._call(path, 'POST', data);
  }

  static put(path, data) {
    return this._call(path, 'PUT', data);
  }

  static delete(path) {
    return this._call(path, 'DELETE', null, true);
  }

}

export { Backend, TOKEN_HEADER };
