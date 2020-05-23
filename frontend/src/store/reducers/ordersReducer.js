import {
  FETCH_ORDERS_PENDING,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_ERROR,
} from "../actions/ordersActions";

const initialState = {
  pending: false,
  orders: [],
  error: null,
};

export function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORDERS_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        pending: false,
        orders: action.payload.orders,
      };
    case FETCH_ORDERS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export default ordersReducer;
