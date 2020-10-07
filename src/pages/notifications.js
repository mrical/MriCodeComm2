import { Button } from "@material-ui/core";
import { signIn } from "next-auth/client";
import Head from "next/head";
import React, { useEffect } from "react";
import DivideHeading from "../components/DivideHeading";
import LogInBtn from "../components/LogInBtn";
import RequestCard from "../components/RequestCard";
import useAuth from "../hooks/useAuth";
import useUserProducts from "../hooks/useUserProducts";

export default function notifications() {
  const {
    userProductsState: { requested },
  } = useUserProducts();
  const isSignedIn = useAuth().authState.isSignedIn;
  return (
    <>
      <Head>
        <title>Notification|MriCodecomm</title>
      </Head>
      <DivideHeading title="Notifications" />
      {isSignedIn ? (
        <div className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-3">
            {requested?.map((r) => (
              <RequestCard {...r} key={r?._id} forUser />
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-lg shadow-lg p-2 md:p-4 mb-4 text-center">
          <LogInBtn />
        </div>
      )}
    </>
  );
}
