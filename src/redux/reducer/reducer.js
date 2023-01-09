const initialState = {
  usersList: {},
  loggedIn: false,
};

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, usersList: action.payload, loggedIn: true }
    case 'LOG_OUT':
      return { ...state, usersList: {}, loggedIn: false }
    default:
      return state;
  }
};
export default usersReducer;