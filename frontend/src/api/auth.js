import Cookies from 'js-cookie';

import store from '../store';
import { Backend, TOKEN_HEADER } from './utils';


class Auth {

  static checkIfLoggedIn() {
    return Backend.get('/api/auth');
  }

  static login(username, password) {
    return new Promise((resolve, reject) => {
      Backend.post('/api/auth', {email: username, password}).then(response => {
        // Save the token as a cookie
        Cookies.set(TOKEN_HEADER, response.data.token);

        // Let our component friends know we've logged in
        store.dispatch({type: 'LOGIN'})

        resolve(response);
      });
    })
  }
  
  static logout() {
    Backend.delete('/api/auth');
    Cookies.remove(TOKEN_HEADER);
    store.dispatch({type: 'DISABLE_EDITING'});
    store.dispatch({type: 'LOGOUT'});
  }

  static rehydrate() {
    this.checkIfLoggedIn().then(
      () => store.dispatch({type: 'LOGIN'}),
      () => Cookies.remove(TOKEN_HEADER),
    )
  }
}

export default Auth;
