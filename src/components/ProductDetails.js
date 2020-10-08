import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Thumbs } from "swiper";
import PriceBox from "./PriceBox";
import Link from "next/link";
import useUserProducts from "../hooks/useUserProducts";
import useAuth from "../hooks/useAuth";
import { saveProduct, unsaveProduct } from "../actions/userProductsAction";
import RequestLink from "./ProductCard/RequestLink";
import Rating from "./Header/Rating";
import { Button, Snackbar, SnackbarContent } from "@material-ui/core";
import { signIn } from "next-auth/client";
import { allSizes } from "../helpers/sizes";
import { Image } from "cloudinary-react";
SwiperCore.use([Pagination, Navigation, Thumbs]);
import { CLOUDINARY_REGEX } from "../helpers/cloudinaryRegex";
import Axios from "axios";
export default function ProductDetails({
  imageUrls,
  title,
  description,
  discountedPrice,
  avgRating,
  nRatings,
  price,
  category,
  _id,
  noRequest,
  admin,
  handleDelete,
  sizes,
}) {
  const [newimageUrls, setNewImageUrls] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await Axios.get(`/api/product/${_id}`);
      setNewImageUrls(data.imageUrls);
    })();
  }, [imageUrls, _id]);
  const userId = useAuth().authState?.userDetails?._id;
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
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="mb-4">
      <div className="flex flex-col sm:grid sm:grid-cols-4 sm:grid-rows-3 sm:gap-1 md:gap-2">
        <div className="sm:col-span-2 sm:row-span-2 sm:row-start-1">
          <Swiper
            tag="section"
            id="main"
            pagination={{ clickable: true }}
            navigation
            wrapperTag="ul"
            spaceBetween={50}
            slidesPerView={1}
            thumbs={{ swiper: thumbsSwiper }}
            className="rounded-lg border-2 border-transparent shadow-lg"
          >
            {newimageUrls.map((url, i) => (
              <SwiperSlide tag="li" key={`Slide-${i}`}>
                <div>
                  <Image
                    cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
                    className="h-auto"
                    dpr="auto"
                    responsive
                    width="auto"
                    crop="scale"
                    publicId={CLOUDINARY_REGEX.exec(url)[4]}
                  ></Image>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="mt-3 sm:mt-0 sm:col-span-2 sm:row-span-1 sm:row-start-3">
          <Swiper
            onSwiper={setThumbsSwiper}
            id="thumbs"
            slidesPerView={3}
            spaceBetween={3}
          >
            {newimageUrls.map((url, i) => (
              <SwiperSlide tag="li" key={`Slide-${i}`}>
                <Image
                  cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
                  className="rounded-lg border-gray-400 border shadow-lg object-cover"
                  dpr="auto"
                  responsive
                  width="auto"
                  crop="scale"
                  publicId={CLOUDINARY_REGEX.exec(url)[4]}
                ></Image>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="mt-3 sm:mt-0 sm:col-span-2 sm:row-start-1 sm:col-start-3 sm:row-end-3 sm:self-end sm:justify-self-stretch rounded-lg border-2 border-transparent shadow-lg">
          <div className="flex justify-between items-center mx-1 md:mx-3">
            <h2
              className="text-2xl sm:text-xl md:text-2xl font-semibold"
              style={{ borderBottomWidth: "1px" }}
            >
              {title}
            </h2>

            <PriceBox {...{ price, discountedPrice }} />
          </div>
          <div className="flex justify-between items-center py-5 mx-1 md:mx-3">
            <Link href={`/products/${category}`} passHref>
              <span className="flex flex-col cursor-pointer">
                <span className="tracking-tighter leading-3">Category</span>
                <a className="text-xl sm:text-base md:text-xl uppercase font-semibold">
                  {category}{" "}
                </a>
              </span>
            </Link>
            {!admin && (
              <button
                className={`flex px-3 py-1 justify-center items-center text-lg sm:text-base md:text-lg font-semibold bg-gray-300 sm:hover:bg-gray-200 border border-opacity-25 rounded-md border-black focus:outline-none ${
                  isToggling ? "cursor-wait" : "cursor-pointer"
                }`}
                onClick={toggleSave}
                disabled={isToggling}
              >
                <div className="relative w-6 h-6 md:w-8 md:h-8 mr-2">
                  {isToggling ? (
                    <svg
                      className="animate-spin text-red-500"
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
                  ) : isSaved ? (
                    <svg
                      className="text-red-500"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 477.534 477.534"
                    >
                      <path d="M438.482 58.61a130.815 130.815 0 00-95.573-41.711 130.968 130.968 0 00-95.676 41.694l-8.431 8.909-8.431-8.909C181.284 5.762 98.663 2.728 45.832 51.815a130.901 130.901 0 00-6.778 6.778c-52.072 56.166-52.072 142.968 0 199.134l187.358 197.581c6.482 6.843 17.284 7.136 24.127.654.224-.212.442-.43.654-.654l187.29-197.581c52.068-56.16 52.068-142.957-.001-199.117z" />
                    </svg>
                  ) : (
                    <svg
                      className="text-black bg-gray-300"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M378.667 21.333c-56.792 0-103.698 52.75-122.667 77.646-18.969-24.896-65.875-77.646-122.667-77.646C59.813 21.333 0 88.927 0 172c0 45.323 17.99 87.562 49.479 116.469a10.54 10.54 0 001.677 2.177l197.313 196.906c2.083 2.073 4.802 3.115 7.531 3.115s5.458-1.042 7.542-3.125L467.417 283.74l2.104-2.042c1.667-1.573 3.313-3.167 5.156-5.208a10.372 10.372 0 001.896-2.542C499.438 245.948 512 209.833 512 172c0-83.073-59.812-150.667-133.333-150.667zm80.156 240.615a9.929 9.929 0 00-.802 1.083c-1 1.146-2.094 2.156-3.177 3.188L255.99 464.927 68.667 277.979a10.706 10.706 0 00-2.479-3.177C37.677 249.906 21.333 212.437 21.333 172c0-71.313 50.24-129.333 112-129.333 61.063 0 113.177 79.646 113.698 80.448 3.938 6.083 14 6.083 17.938 0 .521-.802 52.635-80.448 113.698-80.448 61.76 0 112 58.021 112 129.333 0 33.604-11.313 65.552-31.844 89.948z" />
                    </svg>
                  )}
                </div>

                <span>Wishlist</span>
              </button>
            )}
          </div>

          {admin ? (
            <div className="w-full">
              <button
                className="bg-red-500 hover:bg-red-400 w-1/2 rounded-bl-lg p-2 text-center text-xl text-white focus:outline-none"
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
          ) : (
            <RequestLink productId={_id} detail />
          )}
        </div>
        {nRatings > 0 && (
          <div className="mt-3 sm:mt-0 w-full sm:col-span-2 sm:col-start-3 sm:row-span-1 sm:row-start-3 rounded-lg border-2 border-transparent shadow-lg self-start p-2 text-center ">
            <h1 className="text-lg font-medium">Rated</h1>
            <div className="flex justify-center items-center">
              <div className="mr-2 text-2xl">{avgRating.toFixed(1)}</div>
              <Rating off stars={Math.round(avgRating)} />
            </div>
            <p className="capitalize leading-3 tracking-tighter">
              by {nRatings} Happy {`Customer${nRatings === 1 ? "" : "s"}`}
            </p>
          </div>
        )}
      </div>
      <div className="w-full rounded-lg shadow-lg p-3 grid grid-cols-5 grid-rows-2 gap-2">
        <h1
          className="text-xl uppercase font-semibold self-center p-3 row-span-1 col-span-5 md:col-span-3 md:col-start-2"
          style={{ borderBottomWidth: "1px" }}
        >
          Sizes
        </h1>
        <div className="flex p-2 col-span-5 row-span-1 md:col-span-3 md:col-start-2 md:row-start-2 justify-center">
          {allSizes.map((s) => (
            <div
              className={`bg-white rounded-full w-8 md:w-10 h-8 md:h-10 mx-1 border border-black flex justify-center shadow-md items-center ${
                sizes.includes(s.name) ? "" : "line-through bg-gray-400"
              }`}
            >
              <span className=" text-base md:text-lg">{s.initials}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full rounded-lg shadow-lg p-3 grid grid-cols-5 grid-rows-3 gap-2">
        <h2
          className="text-xl uppercase font-semibold self-center p-3 row-span-1 col-span-5 md:col-span-3 md:col-start-2"
          style={{ borderBottomWidth: "1px" }}
        >
          Details
        </h2>
        <div className="p-2 col-span-5 row-span-2 md:col-span-3 md:col-start-2 md:row-start-2 ">
          {description.split("\n").map((m, i) => (
            <div key={`line-${i}`}>{m.slice(0, -2)}</div>
          ))}
        </div>
      </div>
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
