import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useUserProducts from "../../../hooks/useUserProducts";
import { fetchAddresses } from "../../../actions/addressAction";
import { requestProduct } from "../../../actions/userProductsAction";
import useProducts from "../../../hooks/useProducts";
import RequestForm from "../../../components/RequestForm";
import * as Yup from "yup";
import { Button } from "@material-ui/core";
import Link from "next/link";
import PriceBox from "../../../components/PriceBox";
import LogInBtn from "../../../components/LogInBtn";
import { fetchRequests } from "../../../actions/requestsActions";
import useRequests from "../../../hooks/useRequests";

const validationSchema = Yup.object().shape({
  addressId: Yup.string()
    .typeError("Please select a Address")
    .required("Please choose a address for delivery"),
  size: Yup.string().required("Please Select a size"),
});
export default function request() {
  const { authState, authDispatch } = useAuth();
  const addresses = authState?.userDetails?.addresses;
  const { userProductsDispatch } = useUserProducts();
  const { requestsDispatch } = useRequests();
  const userId = authState?.userDetails?._id;
  const router = useRouter();
  const { productId } = router.query;
  const { productsState } = useProducts();
  const product = productsState?.find((p) => p._id === productId);
  useEffect(() => {
    if (userId) {
      (async () => {
        await fetchAddresses(userId, authDispatch);
      })();
    }
  }, [userId]);
  const onFormSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const { addressId, message, size } = values;
    const requestDetails = { message, userId, size };
    try {
      await requestProduct(
        userId,
        productId,
        addressId,
        requestDetails,
        userProductsDispatch
      );
      if (authState.isAdmin) {
        fetchRequests(requestsDispatch);
      }
      router.push("/?message=requestsuccess", "/");
    } catch (error) {
      router.push("/?message=requesterror", "/");
    }

    setSubmitting(false);
  };
  const initialValues = { message: "", addressId: null, size: "" };
  return (
    <div>
      {product && (
        <div className="flex rounded-lg shadow-lg p-2 md:p-4 justify-between items-center">
          <h1 className="text-2xl sm:text-xl md:text-2xl font-semibold">
            {product.title}
          </h1>
          <PriceBox
            price={product.price}
            discountedPrice={product.discountedPrice}
          />
        </div>
      )}
      <div
        className={`rounded-lg shadow-lg p-2 md:p-4 mb-4 text-center ${
          !(addresses?.length > 0) && "mt-10"
        }`}
      >
        {userId ? (
          addresses?.length > 0 ? (
            <RequestForm
              {...{
                onFormSubmit,
                initialValues,
                addresses,
                validationSchema,
                sizes: product?.sizes,
              }}
            />
          ) : (
            <Link href="/address/create">
              <a>
                <Button variant="contained" color="primary">
                  Create Address
                </Button>
              </a>
            </Link>
          )
        ) : (
          <LogInBtn />
        )}
      </div>
    </div>
  );
}
