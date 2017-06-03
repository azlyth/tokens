import { Backend } from './utils';

class Question {

  static all() {
    return Backend.get('/api/category');
  }

  static get_by_id(id) {
    return Backend.get('/api/category/' + id);
  }

  static set_by_id(id, data) {
    return Backend.post('/api/category/' + id, data);
  }

}

export default Question;
