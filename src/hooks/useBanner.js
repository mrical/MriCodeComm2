import { useContext } from "react";
import { BannerContext } from "../context/BannerContext";
export default function useBanner() {
  return useContext(BannerContext);
}
