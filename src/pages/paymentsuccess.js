import { CircularProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { paymentProduct } from "../actions/userProductsAction";
import useUserProducts from "../hooks/useUserProducts";
export default function paymentsuccess() {
  const { userProductsDispatch } = useUserProducts();
  const router = useRouter();
  const { sessionId, requestId, userId } = router.query;
  console.log(router.query);
  useEffect(() => {
    if (sessionId) {
      (async () => {
        const result = await paymentProduct(
          sessionId,
          userId,
          requestId,
          userProductsDispatch
        );
        if (result.error) {
          router.push("/?message=paymentfailed", "/");
        } else {
          router.push("/?message=paymentsuccess", "/");
        }
      })();
    }
  }, [sessionId]);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <CircularProgress />
    </div>
  );
}
