import React from "react";

export default function error() {
  return (
    <div className=" pt-8 flex justify-center items-center">
      <div className="flex flex-col text-center">
        <h1 className="text-red-500 text-3xl p-3">404 Error</h1>
        <p className="text-black text-lg p-3 ">This Page Does Not Exist </p>
      </div>
    </div>
  );
}
