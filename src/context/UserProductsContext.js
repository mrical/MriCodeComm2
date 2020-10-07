import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { fetchUserProducts } from "../actions/userProductsAction";
import useAuth from "../hooks/useAuth";
import userProductsReducer from "../reducers/userProductsReducer";

const { createContext, useReducer, useEffect } = require("react");

export const UserProductsContext = createContext();

export default function UserProductsProvider({ children }) {
  const userId = useAuth().authState?.userDetails?._id;
  const router = useRouter();
  const [session, loading] = useSession();
  const [userProductsState, userProductsDispatch] = useReducer(
    userProductsReducer,
    {
      saved: null,
      requested: null,
      approved: null,
      rejected: null,
      delivered: null,
    }
  );
  useEffect(() => {
    if (userId) {
      (async () => {
        await fetchUserProducts(userId, userProductsDispatch).catch((err) => {
          console.log(err);
          router.reload();
        });
      })();
    }
  }, [userId, session]);

  return (
    <UserProductsContext.Provider
      value={{ userProductsState, userProductsDispatch }}
    >
      {children}
    </UserProductsContext.Provider>
  );
}
