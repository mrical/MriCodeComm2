import * as Yup from "yup";
import { createAddress } from "../../actions/addressAction";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";
import AddressForm from "../../components/AddressForm";
import { signIn } from "next-auth/client";
import { Button } from "@material-ui/core";
import LogInBtn from "../../components/LogInBtn";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const formSchema = Yup.object().shape({
  addressType: Yup.string().typeError("Please select a address"),
  fullName: Yup.string()
    .min(3, "it seems to be not valid name")
    .required("Please enter your name"),
  addressLineOne: Yup.string().required("Please enter your address"),
  addressLineTwo: Yup.string().required("Please enter your address"),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Please enter your phone number"),
});
export default function address() {
  const { authState, authDispatch } = useAuth();
  const userId = authState?.userDetails?._id;
  const router = useRouter();
  const onFormSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    values.userId = userId;
    await createAddress(userId, values, authDispatch);
    setSubmitting(false);
    router.back();
  };
  const initialValues = {
    addressType: "Home",
    fullName: "",
    addressLineOne: "",
    addressLineTwo: "",
    phoneNumber: "",
  };
  return (
    <div className="w-full h-full mt-12 flex items-center justify-center">
      {userId ? (
        <div className="bg-gray-200 rounded-lg p-3 border border-black">
          <h1 className="font-semibold text-xl capitalize text-center my-2">
            Address Details
          </h1>
          <AddressForm {...{ initialValues, onFormSubmit, formSchema }} />
        </div>
      ) : (
        <LogInBtn />
      )}
    </div>
  );
}
