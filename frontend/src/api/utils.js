let BASE_URL = 'http://localhost:5000';

class Backend {

  static _call(path, method, data, noJSON) {
    return new Promise((resolve, reject) => {
      // Configure the request
      let headers = new Headers();
      headers.append('X-Session-Token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxfQ.dJQCdaC-eSkYPYTekRUQNMINNc9xYuzookDS77znKAM')
      headers.append('Content-Type', 'application/json')
      let options = { headers, method, body: JSON.stringify(data)};

      // Make the call
      fetch(BASE_URL + path, options).then(response => {
        if (noJSON) {
          resolve(response);
        } else {
          response.json().then(data => resolve(data))
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

export { Backend };
