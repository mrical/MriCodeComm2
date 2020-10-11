import { useState } from "react";
import useUserProducts from "../hooks/useUserProducts";

export default function PageLinksIcons({ name, children,active }) {
  const { userProductsState, userProductsDispatch } = useUserProducts();
  const userHasNotRead =
    userProductsState?.approved?.find((a) => a.userHasRead === false) ||
    userProductsState?.rejected?.find((r) => r.userHasRead === false);
  return (
    <div>
      <div className="flex flex-col justify-center items-center ">
        <div
          className={`flex items-center justify-center rounded-full w-16 h-16 shadow-xl cursor-pointer sm:hover:bg-indigo-400 focus:outline-none relative ${active && "bg-yellow-400"}`}
        >
          {name.toLowerCase() === "notifications" && userHasNotRead && (
            <span className="flex h-3 w-3 absolute right-0 top-0">
              <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
          )}
          {children}
        </div>
        <span className="mt-1 hidden sm:inline-block">{name}</span>
      </div>
    </div>
  );
}
