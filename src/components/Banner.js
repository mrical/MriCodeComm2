import Link from "next/link";
import React from "react";
import Skeleton from "react-loading-skeleton";
export default function Banner({ bannerUrl }) {
  return (
    <Link href="/offers">
      {bannerUrl ? (
        <a className="flex overflow-hidden justify-center items-center sm:p-1 border rounded-lg border-opacity-75 border-black my-2">
          <img
            className="w-full rounded-lg"
            src={bannerUrl}
            alt="Offer Banner"
          />
        </a>
      ) : (
        <div className="mb-4">
          <div className="sm:hidden">
            <Skeleton height={10} count={3} />
          </div>
          <div className="hidden sm:block">
            <Skeleton height={20} count={4} />
          </div>
        </div>
      )}
    </Link>
  );
}
