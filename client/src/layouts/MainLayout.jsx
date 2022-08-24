import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import TheNavbar from "../components/TheNavbar";
import Sidebar from "../components/Sidebar";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const MainLayout = () => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/signin" state={{ from: location }} redirect />;
  }
  return (
    <main className="app-main">
      <TheNavbar />
      <Sidebar />
      <div className="app-content">
        <Outlet />
      </div>
    </main>
  );
};

export default MainLayout;
