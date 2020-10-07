import React from "react";
import { deleteProduct } from "../actions/productsActions";
import useProducts from "../hooks/useProducts";
import DivideHeading from "./DivideHeading";
import ProductCard from "./ProductCard";
import ProductsLoader from "./ProductsLoader";

export default function AdminProductsList() {
  const { productsState, productsDispatch } = useProducts();
  const firstThreeProducts = productsState?.slice(0, 3);
  const handleDelete = async (productId) => {
    await deleteProduct(productId, productsDispatch);
  };
  return (
    <div>
      <DivideHeading
        title="Products"
        href="/admin/products"
        buttonText="View All"
      />
      <div className="mx-auto grid p-1 sm:p-3 sm:w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {productsState?.length > 0 ? (
          firstThreeProducts.map((p) => (
            <div key={p._id}>
              <ProductCard {...p} admin handleDelete={handleDelete} />
            </div>
          ))
        ) : productsState?.length === 0 ? (
          <div className="text-lg font-semibold text-center">No Products</div>
        ) : (
          <ProductsLoader />
        )}
      </div>
    </div>
  );
}
