let BASE_URL = 'http://localhost:5000';

class Backend {

  static _call(path, method, body) {
    return new Promise((resolve, reject) => {
      // Configure the request
      let headers = new Headers();
      headers.append('X-Session-Token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxfQ.dJQCdaC-eSkYPYTekRUQNMINNc9xYuzookDS77znKAM')
      let options = { headers, method, body };

      // Make the call
      fetch(BASE_URL + path, options).then(x => x.json().then(data => resolve(data)))
    });
  }

  static get(path) {
    return this._call(path, 'GET');
  }

  static post(path, data) {
    return this._call(path, 'POST', data);
  }

}

export { Backend };
