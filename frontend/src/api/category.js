import { Backend } from './utils';

class Question {

  static all() {
    return Backend.get('/api/category');
  }

  static save(data) {
    let url = '/api/category/' + data.id;
    return Backend.put(url, data);
  }

}

export default Question;
