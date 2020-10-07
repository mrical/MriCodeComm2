import {
  APPROVE_REQUEST,
  CREATE_REQUEST,
  DELIVER_REQUEST,
  FETCH_REQUESTS,
  REJECT_REQUEST,
} from "../types/requestsTypes";

export default function requestsReducer(state, action) {
  switch (action.type) {
    case FETCH_REQUESTS:
      return [...action.payload];
      break;
    case APPROVE_REQUEST:
      return (() => {
        const updatedState = state.map((r) => {
          if (r._id === action.payload) {
            return { ...r, status: "payment pending" };
          }
          return r;
        });
        return updatedState;
      })();
      break;
    case REJECT_REQUEST:
      return (() => {
        const updatedState = state.map((r) => {
          if (r._id === action.payload) {
            return { ...r, status: "rejected" };
          }
          return r;
        });
        return updatedState;
      })();
      break;
    case DELIVER_REQUEST:
      return (() => {
        const updatedState = state.map((r) => {
          if (r._id === action.payload) {
            return { ...r, status: "delivered" };
          }
          return r;
        });
        return updatedState;
      })();
      break;
    default:
      return state;
      break;
  }
}
