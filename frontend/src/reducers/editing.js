const editing = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_EDITING':
      return !state;

    case 'DISABLE_EDITING':
      return false;

    default:
      return state;
  }
}

export default editing;
