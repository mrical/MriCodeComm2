import Link from "next/link";
import { useState } from "react";
import { deleteAddress } from "../actions/addressAction";
import useAuth from "../hooks/useAuth";

export default function Address({
  _id,
  fullName,
  addressLineOne,
  addressLineTwo,
  phoneNumber,
  addressType,
  viewOnly,
  full,
}) {
  const [open, setOpen] = useState(false);
  const { authState, authDispatch } = useAuth();
  const userId = authState.userDetails?._id;
  const handleDelete = async (addressId) => {
    await deleteAddress(userId, addressId, authDispatch);
  };
  return (
    <div className="bg-gray-200 rounded-lg w-full ">
      <div className="p-2">
        <div
          className="grid grid-cols-1 content-center gap-3 px-2 py-3"
          style={{ borderBottomWidth: "1px" }}
        >
          <span className="font-semibold text-xl capitalize place-self-center">
            {addressType}
          </span>
        </div>
        <div
          className="grid grid-cols-2 gap-3 px-2 py-5"
          style={{ borderBottomWidth: "1px" }}
        >
          <span className="font-semibold capitalize">Name</span>
          <h1>{fullName}</h1>
        </div>
        <div
          className="grid grid-cols-2 gap-3 px-2 py-5"
          style={{ borderBottomWidth: "1px" }}
        >
          <span className="font-semibold capitalize">Address Line One</span>
          <p>{addressLineOne}</p>
        </div>
        {(full || open) && (
          <>
            <div
              className="grid grid-cols-2 gap-3 px-2 py-5"
              style={{ borderBottomWidth: "1px" }}
            >
              <span className="font-semibold capitalize">Address Line Two</span>
              <p>{addressLineTwo}</p>
            </div>
            <div
              className="grid grid-cols-2 gap-3 px-2 py-5"
              style={{ borderBottomWidth: "1px" }}
            >
              <span className="font-semibold capitalize">Phone Number</span>
              <p>{phoneNumber}</p>
            </div>
            {!viewOnly && (
              <div className="flex justify-between uppercase">
                <button
                  className="bg-red-600 hover:bg-red-500 uppercase rounded-md px-3 py-1 flex flex-col justify-center items-center m-2 focus:outline-none"
                  onClick={() => handleDelete(_id)}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="-40 0 427 427.00131"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                    <path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                    <path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0" />
                    <path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                  </svg>
                  Delete
                </button>
                <Link href={`/address/update/${_id}`}>
                  <a className="bg-green-600 hover:bg-green-500 uppercase rounded-md px-3 py-1 flex flex-col justify-center items-center m-2">
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 477.867 477.867"
                    >
                      <path d="M409.6 0c-9.426 0-17.067 7.641-17.067 17.067v62.344C304.667-5.656 164.478-3.386 79.411 84.479a221.44 221.44 0 00-62.344 154.454c0 9.426 7.641 17.067 17.067 17.067S51.2 248.359 51.2 238.933c.021-103.682 84.088-187.717 187.771-187.696a187.734 187.734 0 01138.442 60.976l-75.605 25.207c-8.954 2.979-13.799 12.652-10.82 21.606s12.652 13.799 21.606 10.82l102.4-34.133a17.069 17.069 0 0011.674-16.247v-102.4C426.667 7.641 419.026 0 409.6 0zM443.733 221.867c-9.426 0-17.067 7.641-17.067 17.067-.021 103.682-84.088 187.717-187.771 187.696a187.734 187.734 0 01-138.442-60.976l75.605-25.207c8.954-2.979 13.799-12.652 10.82-21.606-2.979-8.954-12.652-13.799-21.606-10.82l-102.4 34.133a17.069 17.069 0 00-11.674 16.247v102.4c0 9.426 7.641 17.067 17.067 17.067s17.067-7.641 17.067-17.067v-62.345c87.866 85.067 228.056 82.798 313.122-5.068a221.44 221.44 0 0062.344-154.454c.002-9.426-7.639-17.067-17.065-17.067z" />
                    </svg>
                    Update
                  </a>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
      {!full && (
        <div
          className="bg-gray-500 text-lg px-3 py-2 rounded-b-lg text-center sm:hover:bg-gray-300 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? "Hide Details" : "See Details"}
        </div>
      )}
    </div>
  );
}
