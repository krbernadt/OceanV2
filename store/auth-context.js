import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext({
  id: "",
  isAuthenticated: false,
  authenticate: (id) => {},
  logout: () => {},
});

export default function AuthContextProvider({ children }) {
  const [authId, setAuthId] = useState();

  function authenticate(id) {
    setAuthId(id);
  }

  function logout() {
    setAuthId(null);
  }

  const value = {
    id: authId,
    isAuthenticated: !!authId,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
