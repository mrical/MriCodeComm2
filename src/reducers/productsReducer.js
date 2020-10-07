import {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
} from "../types/productsTypes";

export default function productsReducer(state, action) {
  switch (action.type) {
    case CREATE_PRODUCT:
      return [action.payload, ...state];
      break;
    case UPDATE_PRODUCT:
      const products = state.map((p) => {
        if (p._id === action.payload._id) {
          return action.payload;
        }
        return p;
      });
      return products;
      break;
    case DELETE_PRODUCT:
      const newProducts = state.filter((p) => p._id !== action.payload);
      return newProducts;
      break;
    case FETCH_PRODUCTS:
      return action.payload;
      break;
    case FETCH_PRODUCT:
      return (() => {
        const products = state.map((p) => {
          if (p._id === action.payload._id) {
            return action.payload;
          }
          return p;
        });
        return products;
      })();
      break;
    default:
      return state;
      break;
  }
}
