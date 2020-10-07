import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

export default function useProducts() {
  return useContext(ProductsContext);
}
