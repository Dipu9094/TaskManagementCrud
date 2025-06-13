// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Create the AuthContext
const AuthContext = createContext();

// 2. Custom hook for easier usage
export const useAuth = () => useContext(AuthContext);

// 3. Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // current user
  const [loading, setLoading] = useState(true); // ✅ loading state

  // Simulate auth check on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // ✅ end loading after checking
  }, []);

  const login = ({ email, password }) => {
    const dummyUser = { email, name: "John Doe" };
    setUser(dummyUser);
    localStorage.setItem("authUser", JSON.stringify(dummyUser));
    return true;
  };

  const signup = ({ name, email, password }) => {
    const dummyUser = { name, email };
    setUser(dummyUser);
    localStorage.setItem("authUser", JSON.stringify(dummyUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  const value = {
    user,
    loading, // ✅ expose loading
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
