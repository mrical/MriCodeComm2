import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@material-ui/core";
import Axios from "axios";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Checkout({ userId, productId, addressId, requestId }) {
  const [isSubmitting, setIssubmitting] = useState(false);
  const handleClick = async (event) => {
    setIssubmitting(true);
    const stripe = await stripePromise;

    const { data } = await Axios.post("/api/checkout-session", {
      userId,
      productId,
      addressId,
      requestId,
    });
    setIssubmitting(false);

    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });
    console.log(result);
    if (result.error) {
      console.log(result.error);
    }
  };
  return (
    <Button
      color="primary"
      variant="contained"
      onClick={handleClick}
      role="link"
    >
      {isSubmitting ? (
        <svg
          className="animate-spin text-white w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        "Checkout"
      )}
    </Button>
  );
}
