import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authlogo from '../../../../assets/images/authlogo.svg';

export default function AuthLayout() {
  let { pathname } = useLocation();

  return (
    <div className="auth-layout">
      <div className="authLogo text-center mb-2">
        <img src={authlogo} alt="Auth Logo" />
      </div>

      <div
        className={`frame px-5 py-3 ${
          pathname === "/register" ? "col-10 col-lg-6" : "col-10 col-lg-5"
        }`}
        style={{ backgroundColor: "rgba(49, 74, 89, 0.9)" }}
      >
        <Outlet />
      </div>

      {/* ✅ Toast configuration */}
      <ToastContainer
        position="top-right"
        autoClose={4000}  
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
