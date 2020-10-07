import { Field, Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  approveProduct,
  rejectProduct,
} from "../../../actions/userProductsAction";
import Address from "../../../components/Address";
import isAdmin from "../../../helpers/ensureAdmin";
import useRequests from "../../../hooks/useRequests";
import useUserProducts from "../../../hooks/useUserProducts";

export default function request() {
  const router = useRouter();
  const { requestId } = router.query;
  const { requestsState } = useRequests();
  const request = requestsState?.find((r) => r._id === requestId);
  const { userProductsState, userProductsDispatch } = useUserProducts();
  const [openApproveForm, setOpenApproveForm] = useState(false);
  const [openRejectForm, setOpenRejectForm] = useState(false);
  const handleApproveClick = () => {
    setOpenRejectForm(false);
    setOpenApproveForm(true);
  };
  const handleRejectClick = () => {
    setOpenApproveForm(false);
    setOpenRejectForm(true);
  };
  if (request) {
    return (
      <div>
        <Head>
          <title>Admin | MriCodecomm</title>
        </Head>
        <h1>{request.userId.name}</h1>
        <h1>{request.userId.email}</h1>
        <h3>{request.product.title}</h3>
        <div>
          <Address {...request.address} viewOnly />
        </div>
        <button className="focus:outline-none" onClick={handleApproveClick}>
          Approve
        </button>
        <button className="focus:outline-none" onClick={handleRejectClick}>
          Reject
        </button>
        <div>
          {(openApproveForm || openRejectForm) && (
            <Formik
              initialValues={{ message: "" }}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                if (openApproveForm) {
                  await approveProduct(
                    request.userId._id,
                    request._id,
                    {
                      ...values,
                      productId: request.product._id,
                      requestId: request._id,
                    },
                    userProductsDispatch
                  );
                }
                if (openRejectForm) {
                  await rejectProduct(
                    request.userId._id,
                    request._id,
                    {
                      ...values,
                      productId: request.product._id,
                      requestId: request._id,
                    },
                    userProductsDispatch
                  );
                }
                setSubmitting(false);
                resetForm();
                router.push("/admin/dashboard");
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field name="message" type="text" />
                  <button
                    className="focus:outline-none"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Send
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {" "}
        <Head>
          <title>Admin | MriCodecomm</title>
        </Head>{" "}
        Loading
      </div>
    );
  }
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
