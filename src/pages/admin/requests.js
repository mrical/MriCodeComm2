import Head from "next/head";
import React from "react";
import DivideHeading from "../../components/DivideHeading";
import RequestCard from "../../components/RequestCard";
import isAdmin from "../../helpers/ensureAdmin";
import useRequests from "../../hooks/useRequests";

export default function requests() {
  const { requestsState } = useRequests();
  return (
    <div>
      <Head>
        <title>Admin | MriCodecomm</title>
      </Head>
      <DivideHeading title="Requests" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-3">
        {requestsState &&
          requestsState.map((request) => (
            <RequestCard key={request._id} {...request} />
          ))}
      </div>
    </div>
  );
}
export async function getServerSideProps(ctx) {
  const admin = await isAdmin(ctx);
  if (!admin) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/admin/login" });
    res.end();
  }
  return { props: {} };
}
