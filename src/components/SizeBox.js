import React from "react";

export default function SizeBox({ size, bottomLine }) {
  return (
    <div
      className="my-2 pb-2"
      style={{ borderBottomWidth: `${bottomLine ? "1px" : ""}` }}
    >
      <div className="flex justify-around p-2 rounded-lg bg-gray-200">
        <span className="capitalize">size</span>
        <span className="uppercase">{size}</span>
      </div>
    </div>
  );
}
