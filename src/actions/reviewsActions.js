import Axios from "axios";
import {
  CREATE_REVIEW,
  DELETE_REVIEW,
  FETCH_REVIEWS,
  UPDATE_REVIEW,
} from "../types/reviewsTypes";
export const createReview = async (
  userId,
  productId,
  reviewDetails,
  reviewsDispatch
) => {
  const { data } = await Axios.post(`/api/product/${productId}/reviews`, {
    reviewDetails: { ...reviewDetails, userId, productId: productId },
  });
  reviewsDispatch({ type: CREATE_REVIEW, payload: data });
};
export const fetchReviews = async (productId, reviewsDispatch) => {
  const { data } = await Axios.get(`/api/product/${productId}/reviews`);
  reviewsDispatch({ type: FETCH_REVIEWS, payload: data });
};
export const deleteReview = async (reviewId, productId, reviewsDispatch) => {
  await Axios.delete(`/api/product/${productId}/reviews/${reviewId}`);
  reviewsDispatch({
    type: DELETE_REVIEW,
    payload: { reviewId, productId },
  });
};
export const updateReview = async () => {};
