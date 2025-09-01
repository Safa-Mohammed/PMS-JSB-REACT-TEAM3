// AuthContext.tsx
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

// ✅ Interface يمثل البيانات اللي راجعة من الـ JWT
interface User {
  userId: number;         
  roles: string[];         
  userName: string;        
  userEmail: string;       
  userGroup: string;      
  iat: number;             
  exp: number; 
}

interface AuthContextType {
  userData: User | null;              
  isAuthenticated: boolean;           
  saveUserData: () => void;           
  logout: () => void;                 
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
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
    <AuthContext.Provider value={{ 
      userData, 
      saveUserData,
      logout,
      isAuthenticated: !!userData
    }}>
      {children}
    </AuthContext.Provider>
  );
}
