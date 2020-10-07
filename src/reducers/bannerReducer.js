import { FETCH_BANNER, UPDATE_BANNER } from "../types/bannerTypes";

export default function bannerReducer(state, action) {
  switch (action.type) {
    case FETCH_BANNER:
      return { bannerUrl: action.payload };
      break;
    case UPDATE_BANNER:
      return { bannerUrl: action.payload };
      break;
    default:
      return state;
      break;
  }
}
