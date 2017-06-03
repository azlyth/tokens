const editing = (state = true, action) => {
  switch (action.type) {
    case 'TOGGLE_EDITING':
      return !state;

    default:
      return state;
  }
}

export default editing;
