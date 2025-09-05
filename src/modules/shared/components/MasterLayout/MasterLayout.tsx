// src/modules/shared/components/MasterLayout/MasterLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../../../shared/components/sideBar/sideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MasterLayout() {
  return (
    <div className="d-flex flex-column vh-100 w-100">
      {/* Header full width */}
      <Navbar className="bg-success shadow-sm" />

      {/* Main area: Sidebar + Content */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar on left */}
        <Sidebar className="bg-light border-end" />

        {/* Page content on right */}
        <main className="flex-grow-1 p-3 bg-light-subtle">
          <Outlet />
        </main>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
