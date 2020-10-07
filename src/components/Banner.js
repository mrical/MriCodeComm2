import Link from "next/link";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { Image } from "cloudinary-react";
import { CLOUDINARY_REGEX } from "../helpers/cloudinaryRegex";

export default function Banner({ bannerUrl }) {
  return (
    <Link href="/offers">
      {bannerUrl ? (
        <a className="flex overflow-hidden justify-center items-center sm:p-1 border rounded-lg border-opacity-75 border-black my-2">
          <Image
            cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
            className="w-full rounded-lg"
            dpr="auto"
            responsive
            width="auto"
            crop="scale"
            publicId={CLOUDINARY_REGEX.exec(bannerUrl)[4]}
          ></Image>
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
