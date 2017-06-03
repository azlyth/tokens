let BASE_URL = 'http://localhost:5000';

function callBackend(path) {
  return new Promise((resolve, reject) => {
    // Setup the headers
    let headers = new Headers();
    headers.append('X-Session-Token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxfQ.dJQCdaC-eSkYPYTekRUQNMINNc9xYuzookDS77znKAM')

    // Make the call
    fetch(BASE_URL + path).then(x => resolve(x.json()))
  });
}

export {
  callBackend
};
