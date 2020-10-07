import {
  FETCH_USER_PRODUCTS,
  REQUEST_PRODUCT,
  APPROVE_PRODUCT,
  REJECT_PRODUCT,
  SAVE_PRODUCT,
  UNSAVE_PRODUCT,
  EMPTY_USER_PRODUCTS,
  READ_RESPONSE_MESSAGE,
  DELIVER_PRODUCT,
  PAYMENT_PRODUCT,
} from "../types/userProductsTypes";

export default function userProductsReducer(state, action) {
  switch (action.type) {
    case SAVE_PRODUCT:
      return state.saved?.includes(action.payload)
        ? { ...state }
        : { ...state, saved: [action.payload, ...state.saved] };
      break;
    case UNSAVE_PRODUCT:
      const saved = state.saved?.filter((p) => p !== action.payload);
      return { ...state, saved };
      break;
    case FETCH_USER_PRODUCTS:
      return (() => {
        const saved = [...action.payload.saved].sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        const requested = [...action.payload.requested].sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        const approved = [...action.payload.approved].sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        const rejected = [...action.payload.rejected].sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return { ...state, saved, requested, approved, rejected };
      })();

      break;
    case REQUEST_PRODUCT:
      return { ...state, requested: [action.payload, ...state.requested] };
      break;
    case APPROVE_PRODUCT:
      return (() => {
        const requested = state.requested?.map((r) => {
          if (r._id === action.payload.requestId) {
            return { ...r, status: "payment pending" };
          }
          return r;
        });
        return {
          ...state,
          approved: [action.payload, ...state.approved],
          requested,
        };
      })();
      break;
    case REJECT_PRODUCT:
      return (() => {
        const requested = state.requested?.map((r) => {
          if (r._id === action.payload.requestId) {
            return { ...r, status: "rejected" };
          }
          return r;
        });
        return {
          ...state,
          rejected: [action.payload, ...state.rejected],
          requested,
        };
      })();
      break;
    case PAYMENT_PRODUCT:
      return (() => {
        const requested = state.requested?.map((r) => {
          if (r._id === action.payload.requestId) {
            return { ...r, status: "payment done" };
          }
          return r;
        });
        return {
          ...state,
          requested,
        };
      })();
      break;
    case EMPTY_USER_PRODUCTS:
      return { saved: [], requested: [], approved: [], rejected: [] };
      break;
    case READ_RESPONSE_MESSAGE:
      return (() => {
        const approved = state.approved?.find(
          (a) => a.requestId === action.payload
        );
        const rejected = state.rejected?.find(
          (r) => r.requestId === action.payload
        );
        if (approved) {
          const newApproved = [
            { ...approved, userHasRead: true },
            ...state.approved?.filter((a) => a.requestId !== action.payload),
          ];
          return { ...state, approved: newApproved };
        }
        if (rejected) {
          const newRejected = [
            { ...rejected, userHasRead: true },
            ...state.rejected?.filter((r) => r.requestId !== action.payload),
          ];
          return { ...state, rejected: newRejected };
        }
      })();
      break;
    case DELIVER_PRODUCT:
      return (() => {
        const requested = state.requested?.map((r) => {
          if (r._id === action.payload) {
            return { ...r, status: "delivered" };
          }
          return r;
        });
        return {
          ...state,
          requested,
        };
      })();
    default:
      return state;
      break;
  }
}
