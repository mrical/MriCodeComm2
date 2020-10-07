import Axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import reviewsReducer from "../reducers/reviewsReducer";
export const ReviewsContext = createContext();

export default function ReviewsProvider({ children }) {
  const [reviewsState, reviewsDispatch] = useReducer(reviewsReducer, {});

  return (
    <ReviewsContext.Provider value={{ reviewsState, reviewsDispatch }}>
      {children}
    </ReviewsContext.Provider>
  );
}
