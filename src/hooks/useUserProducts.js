import { useContext } from "react";
import { UserProductsContext } from "../context/UserProductsContext";
export default function useUserProducts() {
  return useContext(UserProductsContext);
}
