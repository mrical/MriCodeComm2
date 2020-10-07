import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href="/">
      <a>
        <img
          src="https://res.cloudinary.com/dkis5gxl8/image/upload/v1601357288/Group_3_nfeftj.png"
          alt="Logo"
          style={{ height: "45px" }}
        />
      </a>
    </Link>
  );
}
