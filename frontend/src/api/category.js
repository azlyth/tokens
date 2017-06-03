import { Backend } from './utils';

class Category {

  static all() {
    return Backend.get('/api/category');
  }

  static save(data) {
    let url = '/api/category/' + data.id;
    return Backend.put(url, data);
  }

  static delete(data) {
    let url = '/api/category/' + data.id;
    return Backend.delete(url);
  }

}

export default Category;
