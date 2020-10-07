import Link from "next/link";
import React from "react";

export default function DivideHeading({ title, href, buttonText }) {
  return (
    <div
      style={{ borderBottomWidth: "1px", borderTopWidth: "1px" }}
      className="flex justify-between items-center my-2 px-4 py-2"
    >
      <h1 className=" text-xl font-semibold uppercase">{title}</h1>
      {href && (
        <Link href={href}>
          <a className="inline-block bg-blue-600 hover:bg-blue-400 capitalize text-xl text-white py-1 px-2 rounded-md focus:outline-none">
            {buttonText}
          </a>
        </Link>
      )}
    </div>
  );
}
