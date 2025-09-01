import { useContext} from "react";
import  type {ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext"; 

interface ProtectedRouteProps {
  children?: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used inside AuthContextProvider");
  }

  const { userData } = authContext;

  // If user is not logged in, redirect to /login
  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  // If children are provided, render them, otherwise render Outlet
  return children ? <>{children}</> : <Outlet />;
}