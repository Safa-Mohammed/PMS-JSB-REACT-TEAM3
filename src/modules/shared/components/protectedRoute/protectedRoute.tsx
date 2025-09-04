import { useContext} from "react";
<<<<<<< HEAD
import type {ProtectedRouteProps} from '../../../../utils/interfaces'
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext"; 


=======
import  type {ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext"; 

interface ProtectedRouteProps {
  children?: ReactNode;
}
>>>>>>> 039291319b97fc4b7be0529824d760e572ada27f

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