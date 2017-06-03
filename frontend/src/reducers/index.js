import { combineReducers } from 'redux';

import categories from './category';
import questions from './questions';

const reducer = combineReducers({
  categories,
  questions
})

export default reducer;
