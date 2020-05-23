import {
  DO_USER_SIGN_OUT,
  FETCH_USER_PENDING,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
} from "../actions/userActions";

const initialState = {
  pending: false,
  user: null,
  error: null,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case DO_USER_SIGN_OUT:
      return {
        ...state,
        pending: false,
        user: null,
        error: null,
      };
    case FETCH_USER_PENDING:
      return {
        ...state,
        pending: true,
        user: null,
        error: null,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        user: {
          username: action.payload.user.username,
          id: action.payload.user.id,
        },
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export default userReducer;
