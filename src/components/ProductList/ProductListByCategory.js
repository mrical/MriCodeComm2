import React from "react";
import DivideHeading from "../DivideHeading";
import ProductCard from "../ProductCard/index";
import Skeleton from "react-loading-skeleton";
export default function ProductListByCategory({ allProducts, category }) {
  const products = allProducts.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
  const firstThreeProducts = products?.slice(0, 3);
  return (
    <div className={`${products?.length === 0 ? "hidden" : ""}`}>
      <DivideHeading
        title={category}
        href={`/products/${category}`}
        buttonText="More"
      />
      <div className="mx-auto grid p-1 sm:p-3 sm:w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {firstThreeProducts.map((p) => (
          <React.Fragment key={p._id}>
            <ProductCard {...p} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
