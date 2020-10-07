import React from "react";

export default function MessageBox({
  message,
  openMessage,
  toggleMessage,
  bottomLine,
  messageType,
}) {
  return (
    <div
      className="my-2 pb-2"
      style={{ borderBottomWidth: `${bottomLine ? "1px" : ""}` }}
    >
      <div className="p-2 bg-gray-200 rounded-md">
        <div className={`flex justify-between ${openMessage && "pb-2"}`}>
          <span>{messageType}</span>
          <div
            className="px-2 rounded-md cursor-pointer"
            onClick={toggleMessage}
          >
            <svg
              className={`w-6 h-6 transition duration-100 ease-in-out ${
                openMessage && "transform rotate-180"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 490.688 490.688"
            >
              <path
                d="M472.328 120.529L245.213 347.665 18.098 120.529c-4.237-4.093-10.99-3.975-15.083.262-3.992 4.134-3.992 10.687 0 14.82l234.667 234.667c4.165 4.164 10.917 4.164 15.083 0l234.667-234.667c4.237-4.093 4.354-10.845.262-15.083-4.093-4.237-10.845-4.354-15.083-.262-.089.086-.176.173-.262.262l-.021.001z"
                fill="#ffc107"
              />
              <path d="M245.213 373.415a10.663 10.663 0 01-7.552-3.115L2.994 135.633c-4.093-4.237-3.975-10.99.262-15.083 4.134-3.992 10.687-3.992 14.82 0l227.136 227.115 227.115-227.136c4.093-4.237 10.845-4.354 15.083-.262 4.237 4.093 4.354 10.845.262 15.083-.086.089-.173.176-.262.262L252.744 370.279a10.672 10.672 0 01-7.531 3.136z" />
            </svg>
          </div>
        </div>
        {openMessage && (
          <div className="p-2 bg-gray-400 border-black border flex justify-between">
            <h1 className="">{message}</h1>
          </div>
        )}
      </div>
    </div>
  );
}
