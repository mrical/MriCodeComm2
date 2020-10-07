import { createContext, useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import bannerReducer from "../reducers/bannerReducer";
import { fetchBanner } from "../actions/bannerActions";
export const BannerContext = createContext();

export default function BannerProvider({ children }) {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      await fetchBanner(bannerDispatch).catch((err) => {
        console.log(err);
        router.reload();
      });
    })();
  }, []);

  const [bannerState, bannerDispatch] = useReducer(bannerReducer, {
    bannerUrl: null,
  });
  return (
    <BannerContext.Provider value={{ bannerState, bannerDispatch }}>
      {children}
    </BannerContext.Provider>
  );
}
