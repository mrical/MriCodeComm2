import React from "react";

export default function PriceBox({ price, discountedPrice }) {
  return (
    <div
      className="bg-yellow-500 text-sm sm:text-base p-1 rounded-md flex flex-col justify-center items-center"
      style={{ minWidth: "68px" }}
    >
      {discountedPrice > 0 && (
        <span className="inline-block mr-1 text-black">
          Rs {discountedPrice}
        </span>
      )}
      <span
        className={`${
          discountedPrice > 0 && " inline line-through text-xs text-red-600"
        }`}
      >
        {!(discountedPrice > 0) ? `Rs ${price}` : `${price}`}
      </span>
    </div>
  );
}
