import { Backend } from './utils';

class Question {

  static all() {
    return Backend.get('/api/question');
  }

  static answer(question_id, answer) {
    let url = '/api/question/' + question_id + '/answer';
    return Backend.post(url, { answer });
  }

}

export default Question;
