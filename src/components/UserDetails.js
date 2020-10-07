import React from "react";

export default function UserDetails({ image, name, email }) {
  return (
    <div
      className="flex items-center my-2 pb-2"
      style={{ borderBottomWidth: "1px" }}
    >
      <img
        className="rounded-full w-12 h-12 mr-3 border-2 border-white"
        src={image}
        alt={name}
      />
      <div>
        <h2 className="text-lg font-semibold capitalize leading-3">{name}</h2>
        {email && <span>{email}</span>}
      </div>
    </div>
  );
}
