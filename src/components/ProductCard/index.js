import { useEffect, useRef, useState } from "react";
import useUserProducts from "../../hooks/useUserProducts";
import { saveProduct, unsaveProduct } from "../../actions/userProductsAction";
import useAuth from "../../hooks/useAuth";
import SaveBtn from "./SaveBtn";
import ImageCourasel from "./ImageCourasel";
import PriceBox from "../PriceBox";
import RequestLink from "./RequestLink";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Snackbar, SnackbarContent } from "@material-ui/core";
import { signIn } from "next-auth/client";

export default function ProductCard({
  title,
  imageUrls,
  _id,
  discountedPrice,
  price,
  admin,
  handleDelete,
  sizes,
}) {
  const userId = useAuth().authState?.userDetails?._id;
  const router = useRouter();
  const [isSaved, setIsSaved] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const {
    userProductsState: { saved },
    userProductsDispatch,
  } = useUserProducts();
  useEffect(() => {
    setIsSaved(saved?.includes(_id));
  }, [saved]);
  const card = useRef();
  const [cardWidth, setCardWidth] = useState(card.current?.offsetWidth);
  const widthSetter = () => {
    setCardWidth(card.current?.offsetWidth);
  };
  useEffect(() => {
    setCardWidth(card.current?.offsetWidth);
    window.addEventListener("resize", widthSetter);
    return () => {
      window.removeEventListener("resize", widthSetter);
    };
  }, [card.current?.offsetWidth]);
  const toggleSave = async () => {
    if (userId) {
      setIsToggling(true);
      if (isSaved) {
        await unsaveProduct(userId, _id, userProductsDispatch);
      } else {
        await saveProduct(userId, _id, userProductsDispatch);
      }
      setIsToggling(false);
    } else {
      setSnackbarOpen(true);
    }
  };
  const action = (
    <Button
      className="focus:outline-none"
      color="primary"
      variant="contained"
      size="medium"
      onClick={() => signIn("google")}
    >
      LogIn
    </Button>
  );
  return (
    <div
      ref={card}
      className="w-full relative overflow-hidden bg-green-300 rounded-lg shadow-xl grid grid-cols-4 sm:flex sm:flex-col justify-between"
      style={{ alignSelf: "start" }}
    >
      <ImageCourasel imageUrls={imageUrls} cardWidth={cardWidth} />
      <div className="col-span-2 flex flex-col justify-end sm:py-0">
        <div
          className=" flex-col p-1 pt-3 sm:pt-1 sm:flex-row flex-grow sm:flex-grow-0 items-end justify-between flex pr-1 sm:px-2 pb-1 sm:items-center cursor-pointer"
          onClick={() => {
            admin
              ? router
                  .push(`/admin/product/${_id}`)
                  .then(() => window.scrollTo(0, 0))
              : router
                  .push(`/product/${_id}`)
                  .then(() => window.scrollTo(0, 90));
          }}
        >
          <h1 className="self-start font-semibold tracking-tight sm:p-1">
            {title}
          </h1>

          <PriceBox price={price} discountedPrice={discountedPrice} />
        </div>
        {!admin ? (
          <RequestLink productId={_id} />
        ) : (
          <div className="w-full">
            <button
              className="bg-red-500 hover:bg-red-400 w-1/2 p-2 text-center text-xl text-white focus:outline-none"
              onClick={() => handleDelete(_id)}
            >
              Delete
            </button>
            <Link href={`/admin/updateproduct/${_id}`} passHref>
              <button className="bg-green-500 hover:bg-green-400 w-1/2 rounded-br-lg p-2 text-center text-xl text-white focus:outline-none">
                <a>Update</a>
              </button>
            </Link>
          </div>
        )}
      </div>
      {!admin && (
        <SaveBtn
          isToggling={isToggling}
          toggleSave={toggleSave}
          isSaved={isSaved}
        />
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <SnackbarContent message="Login To Continue" action={action} />
      </Snackbar>
    </div>
  );
}
