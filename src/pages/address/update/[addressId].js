import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { fetchAddress, updateAddress } from "../../../actions/addressAction";
import useAuth from "../../../hooks/useAuth";
import AddressForm from "../../../components/AddressForm";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const formSchema = Yup.object().shape({
  addressType: Yup.string().typeError("Please select a address"),
  fullName: Yup.string()
    .min(3, "it seems to be not valid name")
    .required("Please enter your name"),
  addressLineOne: Yup.string().required("Please enter your address"),
  addressLineTwo: Yup.string(),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Please enter your phone number"),
});
export default function update() {
  const { authState, authDispatch } = useAuth();
  const userId = authState.userDetails?._id;
  const router = useRouter();
  const { addressId } = router.query;
  const address = authState.userDetails?.addresses?.find(
    (address) => address._id === addressId
  );
  useEffect(() => {
    if (userId) {
      (async () => {
        fetchAddress(addressId, userId, authDispatch);
      })();
    }
  }, [userId]);
  const initialValues = {
    addressType: address?.addressType,
    fullName: address?.fullName,
    addressLineOne: address?.addressLineOne,
    addressLineTwo: address?.addressLineTwo,
    phoneNumber: address?.phoneNumber,
  };
  const onFormSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    values.userId = userId;
    await updateAddress(userId, address._id, values, authDispatch);
    setSubmitting(false);
    router.push("/address");
  };
  return (
    <div className="w-full h-full mt-12 flex items-center justify-center">
      <div className="bg-gray-200 rounded-lg p-3 border border-black shadow-lg">
        <h1 className="font-semibold text-xl capitalize text-center my-2">
          Update Address
        </h1>
        {address && (
          <AddressForm {...{ initialValues, onFormSubmit, formSchema }} />
        )}
      </div>
    </div>
  );
}
