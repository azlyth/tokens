import { combineReducers } from 'redux';

import categories from './category';
import editing from './editing';
import questions from './questions';

const reducer = combineReducers({
  categories,
  editing,
  questions
})

export default reducer;
