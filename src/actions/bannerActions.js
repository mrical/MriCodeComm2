import Axios from "axios";
import { date } from "yup";
import { FETCH_BANNER, UPDATE_BANNER } from "../types/bannerTypes";

export const fetchBanner = async (bannerDispatch) => {
  const { data } = await Axios.get(`/api/banner`);
  bannerDispatch({ type: FETCH_BANNER, payload: data.bannerUrl });
};
export const updateBanner = async (bannerUrl, bannerDispatch) => {
  const { data } = await Axios.put("/api/banner", {
    bannerUrl,
  });
  bannerDispatch({ type: FETCH_BANNER, payload: data.bannerUrl });
};
