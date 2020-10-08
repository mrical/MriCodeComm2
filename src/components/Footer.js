import React from "react";
import Link from "next/link";
import categories from "../helpers/categories";
export default function Footer() {
  return (
    <div className="w-full bg-purple-600 mt-5">
      <div className="w-11/12 mx-auto sm:w-5/6 lg:w-3/5 pt-4 pb-4 sm:pt-6 sm:pb-4 flex flex-col">
        <div className="flex justify-between mb-3">
          <div className="px-6">
            <h1
              style={{ borderBottomWidth: "1px" }}
              className="mb-3 leading-10 tracking-wider text-yellow-500 text-xl sm:text-2xl font-semibold sm:pl-1"
            >
              Categories
            </h1>
            <div className="grid grid-cols-2 gap-x-3 sm:gap-x-6 gap-y-1">
              {categories.map((c) => (
                <Link href={`/${c}`}>
                  <a className="text-sm sm:text-lg hover:text-white sm:m-1 font-medium sm:font-semibold tracking-tight sm:tracking-normal">
                    {c}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className="px-6">
            <h1
              style={{ borderBottomWidth: "1px" }}
              className="mb-3 leading-10 tracking-wider text-yellow-500 text-xl sm:text-2xl font-semibold sm:pl-1"
            >
              Pages
            </h1>
            <div className="grid gap-1">
              <Link href="/">
                <a className="text-sm sm:text-lg hover:text-white sm:m-1 font-medium sm:font-semibold tracking-tight sm:tracking-normal">
                  Home
                </a>
              </Link>
              <Link href="/contact">
                <a className="text-sm sm:text-lg hover:text-white sm:m-1 font-medium sm:font-semibold tracking-tight sm:tracking-normal">
                  Contact Us
                </a>
              </Link>
              <Link href="/about">
                <a className="text-sm sm:text-lg hover:text-white sm:m-1 font-medium sm:font-semibold tracking-tight sm:tracking-normal">
                  About Us
                </a>
              </Link>
              <Link href="/products">
                <a className="text-sm sm:text-lg hover:text-white sm:m-1 font-medium sm:font-semibold tracking-tight sm:tracking-normal">
                  All Products
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <a href="https://mricode.vercel.app" target="_blank">
            <div className="text-center inline text-white text-xl py-2 border-t border-b hover:border-gray-600 hover:text-yellow-500 cursor-pointer">
              Made with <span className="text-2xl">💜</span> By MriCode
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
