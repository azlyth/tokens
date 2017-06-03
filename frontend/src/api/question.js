import { Backend } from './utils';

class Question {

  static all() {
    return Backend.get('/api/question');
  }

}

export default Question;
