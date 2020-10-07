import { Snackbar } from "@material-ui/core";
import { useRouter } from "next/router";
import ProductListByCategory from "../components/ProductList/ProductListByCategory";
import categories from "../helpers/categories";
import useProducts from "../hooks/useProducts";
import MuiAlert from "@material-ui/lab/Alert";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import ProductsLoader from "../components/ProductsLoader";
import Head from "next/head";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function Home() {
  const { productsState } = useProducts();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (router.query.message) {
      if (!snackbarOpen) {
        setSnackbarOpen(true);
        setTimeout(() => router.push("/", undefined, { shallow: true }), 6000);
      }
    }
  }, [router]);
  const result = (message) => {
    switch (message) {
      case "requestsuccess":
        return { message: "Order is successfully placed", type: "success" };
        break;
      case "requesterror":
        return { message: "Please try again", type: "error" };
        break;
      case "paymentsuccess":
        return { message: "Payment successfully done", type: "success" };
        break;
      case "paymentfailed":
        return { message: "Payment failed", type: "error" };
        break;
    }
  };
  return (
    <div>
      <Head>
        <title>Home | MriCodecomm</title>
      </Head>
      {productsState?.length > 0 ? (
        categories.map((c, i) => (
          <ProductListByCategory
            key={`category-${i}`}
            category={c}
            allProducts={productsState}
          />
        ))
      ) : productsState?.length === 0 ? (
        <div className="text-lg font-semibold text-center">
          No Products to display
        </div>
      ) : (
        <>
          {[1, 2, 3].map((i) => (
            <div className="w-full py-6" key={i}>
              <div className="my-4 px-4 py-2">
                <Skeleton count={1} />
              </div>
              <div className="mx-auto grid p-1 sm:p-3 sm:w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <ProductsLoader />
              </div>
            </div>
          ))}
        </>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={result(router.query?.message)?.type}
        >
          {result(router.query?.message)?.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
