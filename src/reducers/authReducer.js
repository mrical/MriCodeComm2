import {
  CREATE_ADDRESS,
  DELETE_ADDRESS,
  FETCH_ADDRESS,
  FETCH_ADDRESSES,
  UPDATE_ADDRESS,
} from "../types/addressTypes";
import {
  ADMIN_SIGN_IN,
  ADMIN_SIGN_OUT,
  SIGN_IN,
  SIGN_OUT,
} from "../types/authTypes";

export default function authReducer(state, action) {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userDetails: action.payload };
      break;
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userDetails: null };
      break;
    case ADMIN_SIGN_IN:
      return { ...state, isAdmin: true };
      break;
    case ADMIN_SIGN_OUT:
      return { ...state, isAdmin: false };
      break;
    case CREATE_ADDRESS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          addresses: [...state.userDetails.addresses, action.payload],
        },
      };
      break;
    case DELETE_ADDRESS:
      const addresses = state.userDetails.addresses.filter(
        (a) => a._id !== action.payload
      );
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          addresses,
        },
      };
      break;
    case FETCH_ADDRESSES:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          addresses: action.payload,
        },
      };
      break;
    case UPDATE_ADDRESS:
      return (() => {
        const { _id: addressId } = action.payload;
        const addresses = state.userDetails.addresses.map((a) => {
          if (a._id === addresses) {
            return action.payload;
          }
          return a;
        });
        return {
          ...state,
          userDetails: {
            ...state.userDetails,
            addresses,
          },
        };
      })();
      break;
    case FETCH_ADDRESS:
      return (() => {
        const { _id: addressId } = action.payload;
        const addresses = state.userDetails.addresses.map((a) => {
          if (a._id === addresses) {
            return action.payload;
          }
          return a;
        });
        return {
          ...state,
          userDetails: {
            ...state.userDetails,
            addresses,
          },
        };
      })();
      break;
    default:
      return state;
      break;
  }
}
