import { useContext } from "react";
import type { ProtectedRouteProps } from '../../../../utils/interfaces'
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext"; 

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used inside AuthContextProvider");
  }

  const { userData } = authContext;
  const token = localStorage.getItem("token");  

  // If user is logged in (has userData OR token), render the content
  if (token || userData) {
    return children ? <>{children}</> : <Outlet />;
  } else {
    return <Navigate to="/login" replace />; // user is not logged in
  }
}