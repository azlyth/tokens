const questions = (state = [], action) => {
  switch (action.type) {
    case 'REFRESH_QUESTIONS':
      return [ ...action.questions ];

    default:
      return state
  }
}

export default questions;
