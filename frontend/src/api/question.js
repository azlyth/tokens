import { callBackend } from './utils';

class Question {

  static all() {
    return new Promise((resolve, reject) => {
      callBackend('/api/question').then(response => resolve(response))
    });
  }

}

export default Question;
