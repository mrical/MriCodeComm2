import React from "react";
import Skeleton from "react-loading-skeleton";
export default function ProductsLoader() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <div key={i} className="rounded-lg shadow-xl w-full">
          <div className="sm:hidden">
            <Skeleton height={192} />
          </div>
          <div className="hidden sm:block">
            <Skeleton height={350} />
          </div>
        </div>
      ))}
    </>
  );
}
