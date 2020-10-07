import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { fetchProduct } from "../actions/productsActions";
import { deleteReview, fetchReviews } from "../actions/reviewsActions";
import useAuth from "../hooks/useAuth";
import useProducts from "../hooks/useProducts";
import useReviews from "../hooks/useReviews";
import Rating from "./Header/Rating";

function DeleteButton({ handleReviewDelete, reviewId, productId }) {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <Button
      variant="contained"
      color="secondary"
      size="small"
      onClick={async () => {
        setIsDeleting(true);
        await handleReviewDelete(reviewId, productId);
      }}
      className="focus:outline-none"
      disabled={isDeleting}
    >
      Delete
    </Button>
  );
}

export default function ProductReviews({ productId, admin }) {
  const userId = useAuth().authState?.userDetails?._id;
  const { reviewsState, reviewsDispatch } = useReviews();
  const { productsDispatch } = useProducts();

  const handleReviewDelete = async (reviewId, productId) => {
    await deleteReview(reviewId, productId, reviewsDispatch);
    fetchProduct(productId, productsDispatch);
  };
  useEffect(() => {
    (async () => {
      await fetchReviews(productId, reviewsDispatch);
    })();
  }, []);
  return (
    <div className="w-full">
      {reviewsState?.[productId]?.length > 0 ? (
        reviewsState?.[productId]?.map(
          ({
            _id: reviewId,
            userId: { _id: reviewUserId, name, image },
            productId,
            text,
            rating,
          }) => (
            <div
              key={reviewId}
              className="flex m-2 p-3 bg-gray-200 justify-between items-center"
            >
              <div className="flex items-center">
                <img
                  className="rounded-full w-12 h-12 mr-2 border-2 border-white"
                  src={image}
                  alt={name}
                />
                <div>
                  <div
                    className=" font-medium md:font-semibold"
                    style={{ borderBottomWidth: "1px" }}
                  >
                    {name}
                  </div>
                  <div className="text-base tracking-tight leading-5">
                    {text}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="md:mr-3">
                  <Rating stars={rating} off />
                </div>
                {(reviewUserId === userId || admin) && (
                  <DeleteButton
                    {...{ handleReviewDelete, reviewId, productId }}
                  />
                )}
              </div>
            </div>
          )
        )
      ) : (
        <div className="text-lg text-center">No Reviews Yet!</div>
      )}
    </div>
  );
}
