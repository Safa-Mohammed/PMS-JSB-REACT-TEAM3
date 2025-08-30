// src/App.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Layouts
import AuthLayout from "./modules/shared/components/AuthLayout/AuthLayout";
import MasterLayout from "./modules/shared/components/MasterLayout/MasterLayout";

// Auth Pages
import Login from "./modules/authentication/components/login/login";
import Register from "./modules/authentication/components/register/register";
import ForgetPassword from "./modules/authentication/components/forgetPassword/forgetPassword";
import ResetPassword from "./modules/authentication/components/resetPassword/resetPassword";
import ChangePassword from "./modules/authentication/components/changePassword/changePassword";
import VerifyAccount from "./modules/authentication/components/verifyAccount/verifyAccount";

// Shared & Dashboard

import Notfound from "./modules/shared/components/Notfound/Notfound";
import Dashboard from "./modules/dashboard/components/dashboard/dashboard";
import UsersList from "./modules/dashboard/components/users/components/usersList/usersList";
import UsersView from "./modules/dashboard/components/users/components/usersView/usersView";
import ProjectData from "./modules/dashboard/components/project/ProjectsData/projectsData";
import ProjectView from "./modules/dashboard/components/project/projectView/projectView";
import ProjectList from "./modules/dashboard/components/project/projectList/projectList";
import TaskData from "./modules/dashboard/components/tasks/components/taskData/taskData";
import TaskList from "./modules/dashboard/components/tasks/components/taskList/taskList";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "change-password", element: <ChangePassword /> },
        { path: "verify-account", element: <VerifyAccount /> },
      ],
    },
    {
      path: "/dashboard",
      element: <MasterLayout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "users-list", element: <UsersList /> },
        { path: "user-view", element: <UsersView /> },
        { path: "projects-data", element: <ProjectData /> },
        { path: "projects-view", element: <ProjectView /> },
        { path: "projects-list", element: <ProjectList /> },
        { path: "tasks-data", element: <TaskData /> },
        { path: "tasks-list", element: <TaskList /> },
      ],
    },
    {
      path: "*",
      element: <Notfound />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default App;
