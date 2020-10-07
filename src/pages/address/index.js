import { useEffect } from "react";
import { deleteAddress, fetchAddresses } from "../../actions/addressAction";
import useAuth from "../../hooks/useAuth";
import Link from "next/link";
import Address from "../../components/Address";
import DivideHeading from "../../components/DivideHeading";
import LogInBtn from "../../components/LogInBtn";

export default function index() {
  const { authState, authDispatch } = useAuth();
  const addresses = authState.userDetails?.addresses;
  const userId = authState.userDetails?._id;
  useEffect(() => {
    if (userId) {
      (async () => {
        await fetchAddresses(userId, authDispatch);
      })();
    }
  }, [userId]);
  return (
    <>
      {userId ? (
        <div>
          <DivideHeading
            href="/address/create"
            title="Addresses"
            buttonText="Create New"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
            {addresses?.length > 0 &&
              addresses.map((a, i) => (
                <Address {...a} key={`Address-${i}`} full />
              ))}
          </div>
        </div>
      ) : (
        <LogInBtn />
      )}
    </>
  );
}
