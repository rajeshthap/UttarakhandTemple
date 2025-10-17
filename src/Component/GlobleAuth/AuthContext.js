import React, { createContext, useContext, useState } from "react";

const STORAGE_KEY = "uniqueId";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [uniqueId, setUniqueId] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEY) ?? null;
  });

  const setAuth = (id) => {
    setUniqueId(id);
    if (id) sessionStorage.setItem(STORAGE_KEY, id);
  };

  const clearAuth = () => {
    setUniqueId(null);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ uniqueId, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}