import { Button } from "@material-ui/core";
import { signIn } from "next-auth/client";
import Head from "next/head";
import React from "react";
import DivideHeading from "../components/DivideHeading";
import LogInBtn from "../components/LogInBtn";
import ProductCard from "../components/ProductCard";
import ProductsLoader from "../components/ProductsLoader";
import useAuth from "../hooks/useAuth";
import useProducts from "../hooks/useProducts";
import useUserProducts from "../hooks/useUserProducts";

export default function saved() {
  const { userProductsState, userProductsDispatch } = useUserProducts();
  const { saved } = userProductsState;
  const { productsState } = useProducts();
  const savedProducts = saved?.map((savedProductId) =>
    productsState?.find((p) => p?._id === savedProductId)
  );
  const {
    authState: { isSignedIn },
  } = useAuth();

  return (
    <>
      <Head>
        <title>Saved|MriCodecomm</title>
      </Head>
      <DivideHeading title="Saved" />
      {isSignedIn ? (
        <div className="mx-auto grid p-1 sm:p-3 sm:w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {savedProducts?.length > 0 ? (
            savedProducts?.map((p) => (
              <React.Fragment key={p?._id}>
                <ProductCard {...p} />
              </React.Fragment>
            ))
          ) : savedProducts?.length === 0 ? (
            <div className="text-lg font-semibold text-center">
              No Saved Products
            </div>
          ) : (
            <ProductsLoader />
          )}
        </div>
      ) : (
        <LogInBtn />
      )}
    </>
  );
}
