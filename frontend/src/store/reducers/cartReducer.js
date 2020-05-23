const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  let cart = state.cart;

  switch (action.type) {
    case "ADD_TO_CART":
      cart.push(action.payload);

      return {
        ...state,
        cart: cart,
      };
    case "UPDATE_CART_QUANTITY":
      let item = cart.find(
        (item) => item.product.id === action.payload.productId
      );

      let newCart = cart.filter(
        (item) => item.product.id !== action.payload.productId
      );

      item.quantity = action.payload.quantity;

      newCart.push(item);

      return {
        ...state,
        cart: newCart,
      };

    case "REMOVE_FROM_CART":
      let newCartWithItemRemoved = cart.filter(
        (item) => item.product.id !== action.payload.productId
      );
      return {
        ...state,
        cart: newCartWithItemRemoved,
      };

    case "CLEAR_CART_CONTENTS":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
