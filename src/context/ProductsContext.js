import Axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import { fetchProducts } from "../actions/productsActions";
import productsReducer from "../reducers/productsReducer";
import { useRouter } from "next/router";
export const ProductsContext = createContext();

export default function ProductsProvider({ children }) {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      await fetchProducts(productsDispatch).catch((err) => {
        console.log(err);
        router.reload();
      });
    })();
  }, []);

  const [productsState, productsDispatch] = useReducer(productsReducer, null);
  return (
    <ProductsContext.Provider value={{ productsState, productsDispatch }}>
      {children}
    </ProductsContext.Provider>
  );
}
