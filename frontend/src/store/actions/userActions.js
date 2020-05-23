export const DO_USER_SIGN_OUT = "DO_USER_SIGN_OUT";
export const FETCH_USER_PENDING = "FETCH_USER_PENDING";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_ERROR = "FETCH_USER_ERROR";

export const doUserSignOut = () => {
  return {
    type: FETCH_USER_PENDING,
    payload: {},
  };
};

export const fetchUserPending = () => {
  return {
    type: FETCH_USER_PENDING,
    payload: {},
  };
};

export const fetchUserSuccess = (user) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: { user: user },
  };
};

export const fetchUserError = (error) => {
  return {
    type: FETCH_USER_ERROR,
    payload: { error: error },
  };
};
