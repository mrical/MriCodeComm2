import _ from "lodash";
import {
  CREATE_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW,
  FETCH_REVIEWS,
} from "../types/reviewsTypes";

export default function reviewsReducer(state, action) {
  switch (action.type) {
    case CREATE_REVIEW:
      return (() => {
        const { productId } = action.payload;
        if (state[productId]) {
          return {
            ...state,
            [productId]: [action.payload, ...state[productId]],
          };
        } else {
          return { ...state, [productId]: [action.payload] };
        }
      })();
      break;
    case UPDATE_REVIEW:
      return (() => {
        const { productId } = action.payload;
        const newReviewsList = state[productId].filter((r) => {
          if (r._id === action.payload._id) {
            return action.payload;
          }
          return r;
        });
        return { ...state, [productId]: newReviewsList };
      })();

      break;
    case FETCH_REVIEWS:
      const newState = {};
      action.payload.forEach((p) => {
        if (newState[p.productId]) {
          newState[p.productId].push(p);
        } else {
          newState[p.productId] = [p];
        }
      });
      return newState;
      break;
    case DELETE_REVIEW:
      return (() => {
        const { reviewId, productId } = action.payload;
        const newState = state[productId].filter((r) => r._id !== reviewId);
        return { ...state, [productId]: newState };
      })();
      break;
    default:
      return state;
      break;
  }
}
