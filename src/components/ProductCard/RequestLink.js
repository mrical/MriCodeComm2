import Link from "next/link";
import React from "react";

export default function RequestLink({ productId, detail }) {
  return (
    <Link href={`/product/${productId}/request`} scroll>
      <a
        className={`bg-teal-600 block hover:bg-teal-400 ${
          detail ? "rounded-b-lg" : "rounded-br-lg"
        } sm:rounded-b-lg p-2 text-center text-2xl text-white`}
      >
        Request
      </a>
    </Link>
  );
}
