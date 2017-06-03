import { Backend } from './utils';

class QuestionWeight {
  
  static save(data) {
    let url = '/api/question_weight/' + data.id;
    return Backend.put(url, data);
  }

}

export default QuestionWeight;
