// AuthContext.tsx
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../utils/interfaces";
import type { AuthContextType } from "../utils/interfaces";
import type { AuthContextProviderProps } from "../utils/interfaces";

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [userData, setUserData] = useState<User | null>(null);

  const saveUserData = () => {
    const encodedToken = localStorage.getItem("token");
    if (encodedToken) {
      try {
        const decodedToken = jwtDecode<User>(encodedToken); // decode JWT
        setUserData(decodedToken);
      } catch (error) {
        console.error("Token decoding failed:", error);
        logout();
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
  };

  useEffect(() => {
    saveUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userData,
        saveUserData,
        logout,
        isAuthenticated: !!userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}