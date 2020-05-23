export const FETCH_ORDERS_PENDING = "FETCH_ORDERS_PENDING";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_ERROR = "FETCH_ORDERS_ERROR";

export const fetchOrdersPending = () => {
  return {
    type: FETCH_ORDERS_PENDING,
    payload: {},
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: FETCH_ORDERS_SUCCESS,
    payload: { orders: orders },
  };
};

export const fetchOrdersError = (error) => {
  return {
    type: FETCH_ORDERS_ERROR,
    payload: { error: error },
  };
};
