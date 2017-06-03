import { Backend } from './utils';

class Question {

  static all() {
    return Backend.get('/api/question');
  }

  static save(data) {
    let url = '/api/question/' + data.id;
    return Backend.put(url, data);
  }

  static delete(data) {
    let url = '/api/question/' + data.id;
    return Backend.delete(url);
  }

  static answer(question_id, answer) {
    let url = '/api/question/' + question_id + '/answer';
    return Backend.post(url, { answer });
  }

}

export default Question;
