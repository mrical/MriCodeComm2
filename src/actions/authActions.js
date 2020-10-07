import Axios from "axios";
import {
  SIGN_IN,
  SIGN_OUT,
  ADMIN_SIGN_IN,
  ADMIN_SIGN_OUT,
} from "../types/authTypes";

export const signIn = async (email, authDispatch) => {
  try {
    const { data } = await Axios.post(`/api/users`, {
      userDetails: { email },
    });
    authDispatch({ type: SIGN_IN, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const signOut = async (authDispatch) => {
  authDispatch({ type: SIGN_OUT });
};
export const adminSignIn = async (authDispatch) => {
  authDispatch({ type: ADMIN_SIGN_IN });
};
export const adminSignOut = async (authDispatch) => {
  await Axios.delete("/api/adminAuth");
  authDispatch({ type: ADMIN_SIGN_OUT });
};
