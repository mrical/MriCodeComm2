import { useSession } from "next-auth/client";
import { createContext, useEffect, useReducer } from "react";
import { signIn, signOut } from "../actions/authActions";
import authReducer from "../reducers/authReducer";
export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [session, loading] = useSession();
  const [authState, authDispatch] = useReducer(authReducer, {
    isSignedIn: false,
    userDetails: null,
    isAdmin: false,
  });
  useEffect(() => {
    (async () => {
      if (session) {
        await signIn(session.user.email, authDispatch);
      } else {
        if (!loading) {
          await signOut(authDispatch);
        }
      }
    })();
  }, [session, loading]);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
