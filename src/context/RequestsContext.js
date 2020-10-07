import { useRouter } from "next/router";
import { fetchRequests } from "../actions/requestsActions";
import useAuth from "../hooks/useAuth";
import requestsReducer from "../reducers/requestsReducer";

const { useReducer, useEffect, createContext } = require("react");

export const RequestsContext = createContext();

export default function RequestsProvider({ children }) {
  const router = useRouter();
  const [requestsState, requestsDispatch] = useReducer(requestsReducer, []);
  const isAdmin = useAuth().authState.isAdmin;
  useEffect(() => {
    if (isAdmin) {
      (async () => {
        await fetchRequests(requestsDispatch).catch((err) => {
          console.log(err);
          router.reload();
        });
      })();
    }
  }, [isAdmin]);
  return (
    <RequestsContext.Provider value={{ requestsState, requestsDispatch }}>
      {children}
    </RequestsContext.Provider>
  );
}
