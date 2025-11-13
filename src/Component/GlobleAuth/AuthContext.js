import React, { createContext, useContext, useState } from "react";

const STORAGE_KEY_ID = "uniqueId";
const STORAGE_KEY_TYPE = "userType";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [uniqueId, setUniqueId] = useState(() => sessionStorage.getItem(STORAGE_KEY_ID) ?? null);
  const [userType, setUserType] = useState(() => sessionStorage.getItem(STORAGE_KEY_TYPE) ?? null);

  const setAuth = (id, type) => {
    setUniqueId(id);
    setUserType(type);

    if (id) sessionStorage.setItem(STORAGE_KEY_ID, id);
    if (type) sessionStorage.setItem(STORAGE_KEY_TYPE, type);
  };

  const clearAuth = () => {
    setUniqueId(null);
    setUserType(null);
    sessionStorage.removeItem(STORAGE_KEY_ID);
    sessionStorage.removeItem(STORAGE_KEY_TYPE);
  };

  return (
    <AuthContext.Provider value={{ uniqueId, userType, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
