import { DELIVER_REQUEST } from "../types/requestsTypes";

const { default: Axios } = require("axios");
const {
  SAVE_PRODUCT,
  UNSAVE_PRODUCT,
  FETCH_USER_PRODUCTS,
  REQUEST_PRODUCT,
  APPROVE_PRODUCT,
  REJECT_PRODUCT,
  READ_RESPONSE_MESSAGE,
  EMPTY_USER_PRODUCTS,
  DELIVER_PRODUCT,
  PAYMENT_PRODUCT,
} = require("../types/userProductsTypes");

export const saveProduct = async (userId, productId, userProductsDispatch) => {
  const { data } = await Axios.post(`/api/users/${userId}/save/${productId}`);
  userProductsDispatch({ type: SAVE_PRODUCT, payload: data });
};
export const unsaveProduct = async (
  userId,
  productId,
  userProductsDispatch
) => {
  const { data } = await Axios.delete(`/api/users/${userId}/save/${productId}`);
  userProductsDispatch({ type: UNSAVE_PRODUCT, payload: data });
};
export const fetchUserProducts = async (userId, userProductsDispatch) => {
  const { data } = await Axios.get(`/api/users/${userId}/products`);
  userProductsDispatch({ type: FETCH_USER_PRODUCTS, payload: data });
};
export const requestProduct = async (
  userId,
  productId,
  addressId,
  requestDetails,
  userProductsDispatch
) => {
  const { data } = await Axios.post(
    `/api/users/${userId}/request/${productId}`,
    { requestDetails, addressId }
  );
  userProductsDispatch({ type: REQUEST_PRODUCT, payload: data });
};
export const approveProduct = async (
  authUserId,
  userId,
  requestId,
  approveDetails,
  userProductsDispatch
) => {
  const { data } = await Axios.post(
    `/api/users/${userId}/approve/${requestId}`,
    { approveDetails }
  );
  if (authUserId === userId) {
    userProductsDispatch({
      type: APPROVE_PRODUCT,
      payload: data,
    });
  }
};
export const rejectProduct = async (
  authUserId,
  userId,
  requestId,
  rejectDetails,
  userProductsDispatch
) => {
  const { data } = await Axios.post(
    `/api/users/${userId}/reject/${requestId}`,
    { rejectDetails }
  );
  if (authUserId === userId) {
    userProductsDispatch({
      type: REJECT_PRODUCT,
      payload: data,
    });
  }
};
export const emptyUserProducts = (userProductsDispatch) => {
  userProductsDispatch({ type: EMPTY_USER_PRODUCTS });
};
export const readResponseMessage = async (requestId, userProductsDispatch) => {
  await Axios.put(`/api/requests`, {
    requestId,
  });
  userProductsDispatch({ type: READ_RESPONSE_MESSAGE, payload: requestId });
};
export const deliverProduct = async (
  authUserId,
  userId,
  requestId,
  userProductsDispatch
) => {
  const { data } = await Axios.post(
    `/api/users/${userId}/deliver/${requestId}`,
    {
      requestId,
    }
  );
  if (authUserId === userId) {
    userProductsDispatch({ type: DELIVER_PRODUCT, payload: requestId });
  }
};
export const paymentProduct = async (
  sessionId,
  userId,
  requestId,
  userProductsDispatch
) => {
  const { data } = await Axios.post(
    `/api/users/${userId}/payment/${requestId}`,
    {
      sessionId,
    }
  );
  userProductsDispatch({ type: PAYMENT_PRODUCT, payload: requestId });
  return data;
};
