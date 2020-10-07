import { useState } from "react";
import MenuButton from "./MenuButton";
import NavButton from "./NavButton";
import NavLink from "./NavLink";
import useAuth from "../../hooks/useAuth";
import Logo from "./Logo";
import { signIn, signOut } from "next-auth/client";
import {
  adminSignOut,
  signOut as signOutState,
} from "../../actions/authActions";
import { emptyUserProducts } from "../../actions/userProductsAction";
import useUserProducts from "../../hooks/useUserProducts";
import { useRouter } from "next/router";
export default function Navbar() {
  const router = useRouter();
  const pathName = router.pathname.toLowerCase();
  const {
    authState: { userDetails, isSignedIn, isAdmin },
    authDispatch,
  } = useAuth();
  const { userProductsDispatch } = useUserProducts();

  const [Open, setOpen] = useState(false);
  return (
    <>
      <div className="fixed w-full z-50">
        <div className="px-3 py-1 bg-orange-500 border-b-1 border-gray-600 ">
          <div className="flex items-center justify-between mx-auto sm:w-4/5 lg:w-3/5">
            <div className="hidden sm:flex">
              <Logo />
            </div>
            {isSignedIn ? (
              <button
                onClick={async () => {
                  await signOut();
                  emptyUserProducts(userProductsDispatch);
                }}
                className="rounded-md text-center text-2xl text-white cursor-pointer hover:text-black hidden sm:flex flex-row items-center justify-center focus:outline-none"
              >
                <span className="uppercase mr-2">Logout</span>
                <span className="w-8 h-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="text-orange-400"
                    fill="currentColor"
                  >
                    <path d="M255.15 468.625H63.787c-11.737 0-21.262-9.526-21.262-21.262V64.638c0-11.737 9.526-21.262 21.262-21.262H255.15c11.758 0 21.262-9.504 21.262-21.262S266.908.85 255.15.85H63.787C28.619.85 0 29.47 0 64.638v382.724c0 35.168 28.619 63.787 63.787 63.787H255.15c11.758 0 21.262-9.504 21.262-21.262 0-11.758-9.504-21.262-21.262-21.262z" />
                    <path d="M505.664 240.861L376.388 113.286c-8.335-8.25-21.815-8.143-30.065.213s-8.165 21.815.213 30.065l92.385 91.173H191.362c-11.758 0-21.262 9.504-21.262 21.262 0 11.758 9.504 21.263 21.262 21.263h247.559l-92.385 91.173c-8.377 8.25-8.441 21.709-.213 30.065a21.255 21.255 0 0015.139 6.336c5.401 0 10.801-2.041 14.926-6.124l129.276-127.575A21.303 21.303 0 00512 255.998c0-5.696-2.275-11.118-6.336-15.137z" />
                  </svg>
                </span>
              </button>
            ) : (
              <button
                onClick={() =>
                  signIn("google", { callbackUrl: "/?message=signinsuccess" })
                }
                className="rounded-md text-center text-2xl text-white cursor-pointer hover:text-black hidden sm:flex flex-row items-center justify-center focus:outline-none"
              >
                <span className="uppercase mr-2">Login</span>
                <span className="w-8 h-8">
                  <svg
                    className="text-orange-400"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m218.667969 240h-202.667969c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h202.667969c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
                    <path d="m138.667969 320c-4.097657 0-8.191407-1.558594-11.308594-4.691406-6.25-6.253906-6.25-16.386719 0-22.636719l68.695313-68.691406-68.695313-68.671875c-6.25-6.253906-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l80 80c6.25 6.25 6.25 16.382813 0 22.636719l-80 80c-3.136719 3.132812-7.234375 4.691406-11.328125 4.691406zm0 0" />
                    <path d="m341.332031 512c-23.53125 0-42.664062-19.136719-42.664062-42.667969v-384c0-18.238281 11.605469-34.515625 28.882812-40.511719l128.171875-42.730468c28.671875-8.789063 56.277344 12.480468 56.277344 40.578125v384c0 18.21875-11.605469 34.472656-28.863281 40.488281l-128.214844 42.753906c-4.671875 1.449219-9 2.089844-13.589844 2.089844zm128-480c-1.386719 0-2.558593.171875-3.816406.554688l-127.636719 42.558593c-4.183594 1.453125-7.210937 5.675781-7.210937 10.21875v384c0 7.277344 7.890625 12.183594 14.484375 10.113281l127.636718-42.558593c4.160157-1.453125 7.210938-5.675781 7.210938-10.21875v-384c0-5.867188-4.777344-10.667969-10.667969-10.667969zm0 0" />
                    <path d="m186.667969 106.667969c-8.832031 0-16-7.167969-16-16v-32c0-32.363281 26.300781-58.667969 58.664062-58.667969h240c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16h-240c-14.699219 0-26.664062 11.96875-26.664062 26.667969v32c0 8.832031-7.167969 16-16 16zm0 0" />
                    <path d="m314.667969 448h-85.335938c-32.363281 0-58.664062-26.304688-58.664062-58.667969v-32c0-8.832031 7.167969-16 16-16s16 7.167969 16 16v32c0 14.699219 11.964843 26.667969 26.664062 26.667969h85.335938c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
                  </svg>
                </span>
              </button>
            )}
            <div className="sm:hidden">
              <Logo />
            </div>
            <MenuButton open={Open} handleClick={() => setOpen(!Open)} />
          </div>
        </div>
        <div className="sm:hiden">
          {Open && (
            <div
              className="top-auto w-full bg-gray-700 bg-opacity-75 pt-5"
              style={{ height: "calc(100vh - 50px)" }}
            >
              {isSignedIn ? (
                <div className="flex flex-col items-center">
                  <img
                    className="rounded-full w-20 h-20 my-2 border-gray-300 border-2"
                    src={userDetails.image}
                    alt={userDetails.name}
                  />
                  <span className="text-2xl text-white">
                    {userDetails.name}
                  </span>
                  <button
                    onClick={async () => {
                      await signOut();
                      emptyUserProducts(userProductsDispatch);
                    }}
                    className=" bg-red-500 my-2 px-2 py-1 border-b-2 rounded-md border-black border-opacity-50 text-center text-2xl text-white mx-auto cursor-pointer hover:shadow-md flex flex-row items-center justify-center focus:outline-none"
                  >
                    <span className="uppercase mr-2">Logout</span>
                    <span className="w-8 h-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="text-orange-400"
                        fill="currentColor"
                      >
                        <path d="M255.15 468.625H63.787c-11.737 0-21.262-9.526-21.262-21.262V64.638c0-11.737 9.526-21.262 21.262-21.262H255.15c11.758 0 21.262-9.504 21.262-21.262S266.908.85 255.15.85H63.787C28.619.85 0 29.47 0 64.638v382.724c0 35.168 28.619 63.787 63.787 63.787H255.15c11.758 0 21.262-9.504 21.262-21.262 0-11.758-9.504-21.262-21.262-21.262z" />
                        <path d="M505.664 240.861L376.388 113.286c-8.335-8.25-21.815-8.143-30.065.213s-8.165 21.815.213 30.065l92.385 91.173H191.362c-11.758 0-21.262 9.504-21.262 21.262 0 11.758 9.504 21.263 21.262 21.263h247.559l-92.385 91.173c-8.377 8.25-8.441 21.709-.213 30.065a21.255 21.255 0 0015.139 6.336c5.401 0 10.801-2.041 14.926-6.124l129.276-127.575A21.303 21.303 0 00512 255.998c0-5.696-2.275-11.118-6.336-15.137z" />
                      </svg>
                    </span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() =>
                    signIn("google", { callbackUrl: "/?message=signinsuccess" })
                  }
                  className=" bg-red-500 mb-2 px-2 py-1 border-b-2 rounded-md border-black border-opacity-50 text-center text-2xl text-white mx-auto cursor-pointer hover:shadow-md flex flex-row items-center justify-center focus:outline-none"
                >
                  <span className="uppercase mr-2">Login</span>
                  <span className="w-8 h-8">
                    <svg
                      className="text-orange-400"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m218.667969 240h-202.667969c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h202.667969c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
                      <path d="m138.667969 320c-4.097657 0-8.191407-1.558594-11.308594-4.691406-6.25-6.253906-6.25-16.386719 0-22.636719l68.695313-68.691406-68.695313-68.671875c-6.25-6.253906-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l80 80c6.25 6.25 6.25 16.382813 0 22.636719l-80 80c-3.136719 3.132812-7.234375 4.691406-11.328125 4.691406zm0 0" />
                      <path d="m341.332031 512c-23.53125 0-42.664062-19.136719-42.664062-42.667969v-384c0-18.238281 11.605469-34.515625 28.882812-40.511719l128.171875-42.730468c28.671875-8.789063 56.277344 12.480468 56.277344 40.578125v384c0 18.21875-11.605469 34.472656-28.863281 40.488281l-128.214844 42.753906c-4.671875 1.449219-9 2.089844-13.589844 2.089844zm128-480c-1.386719 0-2.558593.171875-3.816406.554688l-127.636719 42.558593c-4.183594 1.453125-7.210937 5.675781-7.210937 10.21875v384c0 7.277344 7.890625 12.183594 14.484375 10.113281l127.636718-42.558593c4.160157-1.453125 7.210938-5.675781 7.210938-10.21875v-384c0-5.867188-4.777344-10.667969-10.667969-10.667969zm0 0" />
                      <path d="m186.667969 106.667969c-8.832031 0-16-7.167969-16-16v-32c0-32.363281 26.300781-58.667969 58.664062-58.667969h240c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16h-240c-14.699219 0-26.664062 11.96875-26.664062 26.667969v32c0 8.832031-7.167969 16-16 16zm0 0" />
                      <path d="m314.667969 448h-85.335938c-32.363281 0-58.664062-26.304688-58.664062-58.667969v-32c0-8.832031 7.167969-16 16-16s16 7.167969 16 16v32c0 14.699219 11.964843 26.667969 26.664062 26.667969h85.335938c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
                    </svg>
                  </span>
                </button>
              )}

              <ul className="w-full flex items-stretch flex-col">
                {pathName.includes("/admin") && pathName !== "/admin/login" ? (
                  <>
                    <li
                      className="bg-blue-600 hover:bg-blue-500 my-5 p-2 border-b-2 rounded-b-md border-black border-opacity-50 text-center text-2xl text-white w-3/5 mx-auto cursor-pointer hover:shadow-md"
                      onClick={async () => {
                        await adminSignOut(authDispatch);
                        setOpen(!Open);
                        router.push("/");
                      }}
                    >
                      <a>Admin Logout</a>
                    </li>
                    {[
                      { url: "/admin/requests", name: "Orders" },
                      { url: "/about", name: "About" },
                      { url: "/contact", name: "Contact" },
                    ].map((props, i) => (
                      <NavLink
                        key={`link-${i}`}
                        {...props}
                        handleClick={() => setOpen(!Open)}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    {[
                      { url: "/address", name: "Address" },
                      { url: "/admin/login", name: "Admin" },
                      { url: "/about", name: "About" },
                      { url: "/contact", name: "Contact" },
                    ].map((props, i) => (
                      <NavLink
                        key={`link-${i}`}
                        {...props}
                        handleClick={() => setOpen(!Open)}
                      />
                    ))}
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
