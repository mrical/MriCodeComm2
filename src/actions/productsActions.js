import Axios from "axios";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  FETCH_PRODUCTS,
  UPDATE_PRODUCT,
  FETCH_PRODUCT,
} from "../types/productsTypes";
export const createProduct = async (productDetails, productsDispatch) => {
  const { data } = await Axios.post(`/api/products`, {
    productDetails,
  });

  productsDispatch({ type: CREATE_PRODUCT, payload: data });
};
export const fetchProducts = async (productsDispatch) => {
  const { data } = await Axios.get(`/api/products`);
  productsDispatch({ type: FETCH_PRODUCTS, payload: data });
};
export const deleteProduct = async (productId, productsDispatch) => {
  const { data } = await Axios.delete(`/api/product/${productId}`);
  productsDispatch({ type: DELETE_PRODUCT, payload: data });
};
export const updateProduct = async (
  productDetails,
  productId,
  productsDispatch
) => {
  const { data } = await Axios.put(`/api/product/${productId}`, {
    productDetails,
  });
  productsDispatch({ type: UPDATE_PRODUCT, payload: data });
};
export const fetchProduct = async (productId, productsDispatch) => {
  const { data } = await Axios.get(`/api/product/${productId}`);
  productsDispatch({ type: FETCH_PRODUCT, payload: data });
};
