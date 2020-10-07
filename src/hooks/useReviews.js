import { useContext } from "react";
import { ReviewsContext } from "../context/ReviewsContext";

export default function useReviews() {
  return useContext(ReviewsContext);
}
