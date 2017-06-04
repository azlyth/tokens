import { combineReducers } from 'redux';

import categories from './category';
import editing from './editing';
import loggedIn from './loggedIn';
import questions from './questions';

const reducer = combineReducers({
  categories,
  editing,
  loggedIn,
  questions,
})

export default reducer;
