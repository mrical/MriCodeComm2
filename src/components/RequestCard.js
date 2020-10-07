import { useState } from "react";
import {
  approveProduct,
  deliverProduct,
  readResponseMessage,
  rejectProduct,
} from "../actions/userProductsAction";
import Address from "./Address";
import MessageBox from "./MessageBox";
import useUserProducts from "../hooks/useUserProducts";
import {
  approveRequest,
  rejectRequest,
  deliverRequest,
} from "../actions/requestsActions";
import useRequests from "../hooks/useRequests";
import PriceBox from "./PriceBox";
import * as Yup from "yup";
import { bgColorFn, statusColorFn } from "../helpers/requestCardColors";
import DateBox from "./DateBox";
import UserDetails from "./UserDetails";
import ResponseForm from "./ResponseForm";
import { Button } from "@material-ui/core";
import useAuth from "../hooks/useAuth";
import SizeBox from "./SizeBox";
import Checkout from "./Checkout";
import { Image } from "cloudinary-react";
import { CLOUDINARY_REGEX } from "../helpers/cloudinaryRegex";

const validationSchema = Yup.object().shape({
  message: Yup.string().required("Please provide a message"),
});

export default function RequestCard({
  userId: { name, email, image, _id: userId },
  product,
  status,
  size,
  _id: requestId,
  address,
  message: requestMessage,
  createdAt: requestTime,
  forUser,
}) {
  const authUserId = useAuth()?.authState?.userDetails?._id;
  const { userProductsState, userProductsDispatch } = useUserProducts();
  const { requestsDispatch } = forUser
    ? { requestsDispatch: null }
    : useRequests();
  const [openDetails, setOpenDetails] = useState(false);
  const [openRequestMessage, setOpenRequestMessage] = useState(!forUser);
  const [openResponseMessage, setOpenResponseMessage] = useState(false);
  const [submitType, setSubmitType] = useState(null);
  const { discountedPrice, price, title, imageUrls, _id: productId } = product;
  const toggleDetails = () => {
    setOpenDetails(!openDetails);
  };

  const responseMessage =
    userProductsState?.approved?.find((a) => a.requestId === requestId)
      ?.message ||
    userProductsState?.rejected?.find((r) => r.requestId === requestId)
      ?.message ||
    null;
  const responseTime =
    userProductsState?.approved?.find((a) => a.requestId === requestId)
      ?.createdAt ||
    userProductsState?.rejected?.find((r) => r.requestId === requestId)
      ?.createdAt ||
    null;
  const userHasRead =
    userProductsState?.approved?.find((a) => a.requestId === requestId)
      ?.userHasRead ||
    userProductsState?.rejected?.find((r) => r.requestId === requestId)
      ?.userHasRead;
  const toggleRequestMessage = () => {
    setOpenRequestMessage(!openRequestMessage);
  };
  const toggleResponseMessage = async () => {
    if (!userHasRead && forUser) {
      await readResponseMessage(requestId, userProductsDispatch);
    }
    setOpenResponseMessage(!openResponseMessage);
  };
  const onResponseSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    switch (submitType) {
      case "approve":
        console.log("approving request");

        await approveProduct(
          authUserId,
          userId,
          requestId,
          {
            ...values,
            productId,
            requestId,
          },
          userProductsDispatch
        );
        approveRequest(requestId, requestsDispatch);
        break;
      case "reject":
        await rejectProduct(
          authUserId,
          userId,
          requestId,
          {
            ...values,
            productId,
            requestId,
          },
          userProductsDispatch
        );
        rejectRequest(requestId, requestsDispatch);
        break;
    }
    setSubmitting(false);
    setOpenDetails(false);
    setOpenMessage(false);
  };
  const initialValues = { message: "" };
  const handleDeliveredClick = async () => {
    await deliverProduct(authUserId, userId, requestId, userProductsDispatch);
    deliverRequest(requestId, requestsDispatch);
    setOpenDetails(false);
    setOpenMessage(false);
  };
  return (
    <>
      <div
        className={`relative flex flex-col ${bgColorFn(
          status
        )} rounded-md md:4`}
        style={{ alignSelf: "start" }}
      >
        {forUser && status !== "pending" && !userHasRead && (
          <span className="flex h-3 w-3 absolute">
            <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
          </span>
        )}

        <div className="flex flex-col p-3">
          <UserDetails {...{ image, name, email }} />
          <div
            className="grid grid-cols-5 gap-2 py-2"
            style={{ borderBottomWidth: `${openDetails ? "1px" : ""}` }}
          >
            <div className="flex flex-col justify-around w-full col-span-3 p-1">
              <h1 className="text-xl">{title}</h1>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span>Status</span>
                  <span
                    className={`text-xl capitalize font-semibold ${statusColorFn(
                      status
                    )}`}
                  >
                    {status}
                  </span>
                </div>
                <PriceBox price={price} discountedPrice={discountedPrice} />
              </div>
            </div>
            <div className="col-span-2">
              <Image
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
                className="w-full overflow-hidden rounded-md"
                dpr="auto"
                responsive
                width="auto"
                crop="scale"
                publicId={CLOUDINARY_REGEX.exec(imageUrls[0])[4]}
              ></Image>
            </div>
          </div>

          {openDetails && (
            <>
              <DateBox dateType="Requested" date={requestTime} />
              {status !== "pending" && (
                <DateBox dateType="Response" date={responseTime} />
              )}
              <div className="py-2" style={{ borderBottomWidth: "1px" }}>
                <Address {...address} viewOnly />
              </div>

              <SizeBox bottomLine={requestMessage !== ""} size={size} />
              {status !== "pending" && forUser && (
                <div className="relative">
                  {!userHasRead && (
                    <span className="flex h-3 w-3 absolute">
                      <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-pink-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                    </span>
                  )}
                  <MessageBox
                    message={responseMessage}
                    openMessage={openResponseMessage}
                    toggleMessage={toggleResponseMessage}
                    bottomLine
                    messageType="Response Message"
                  />
                </div>
              )}
              {requestMessage !== "" && (
                <MessageBox
                  message={requestMessage}
                  openMessage={openRequestMessage}
                  toggleMessage={toggleRequestMessage}
                  bottomLine={!forUser && status === "pending"}
                  messageType="Request Message"
                />
              )}

              {!forUser && status === "pending" && (
                <ResponseForm
                  {...{
                    initialValues,
                    onResponseSubmit,
                    validationSchema,
                    setSubmitType,
                  }}
                />
              )}
              {forUser && status === "payment pending" && (
                <Checkout
                  {...{ userId, addressId: address._id, productId, requestId }}
                />
              )}
              {!forUser &&
                (status === "payment pending" || status === "payment done") && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDeliveredClick}
                  >
                    Delivered
                  </Button>
                )}
            </>
          )}
        </div>

        <button
          className="bg-gray-400 p-3 sm:hover:bg-gray-300 text-xl text-center rounded-b-md focus:outline-none"
          onClick={toggleDetails}
        >
          {openDetails ? "Hide Details" : "View Details"}
        </button>
      </div>
    </>
  );
}
