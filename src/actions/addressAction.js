import Axios from "axios";
import {
  CREATE_ADDRESS,
  DELETE_ADDRESS,
  FETCH_ADDRESS,
  FETCH_ADDRESSES,
  UPDATE_ADDRESS,
} from "../types/addressTypes";

export const createAddress = async (userId, addressDetails, authDispatch) => {
  const { data } = await Axios.post(`/api/users/${userId}/addresses`, {
    addressDetails,
  });
  authDispatch({ type: CREATE_ADDRESS, payload: data });
};
export const deleteAddress = async (userId, addressId, authDispatch) => {
  const { data } = await Axios.delete(
    `/api/users/${userId}/addresses/${addressId}`
  );
  authDispatch({ type: DELETE_ADDRESS, payload: data });
};
export const updateAddress = async (
  userId,
  addressId,
  addressDetails,
  authDispatch
) => {
  const {
    data,
  } = await Axios.put(`/api/users/${userId}/addresses/${addressId}`, {
    addressDetails,
  });
  authDispatch({ type: UPDATE_ADDRESS, payload: data });
};
export const fetchAddresses = async (userId, authDispatch) => {
  const { data } = await Axios.get(`/api/users/${userId}/addresses`);
  authDispatch({ type: FETCH_ADDRESSES, payload: data });
};
export const fetchAddress = async (addressId, userId, authDispatch) => {
  const { data } = await Axios.get(
    `/api/users/${userId}/addresses/${addressId}`
  );
  authDispatch({ type: FETCH_ADDRESS, payload: data });
};
