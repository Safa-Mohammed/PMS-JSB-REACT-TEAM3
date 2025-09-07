import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import AuthContextProvider from './context/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>,
)
