import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    return token ? { token, role } : null;
  });

  useEffect(() => {
    if (authData) {
      localStorage.setItem("token", authData.token);
      localStorage.setItem("role", authData.role);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  }, [authData]);

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};
