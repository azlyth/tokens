const categories = (state = [], action) => {
  switch (action.type) {
    case 'REFRESH_CATEGORIES':
      return [ ...action.categories ];

    default:
      return state
  }
}

export default categories;
