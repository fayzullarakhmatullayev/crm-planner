import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const EmptyLayout = () => {
  const auth = useAuth();
  const location = useLocation();

  if (auth) {
    return <Navigate to="/" state={{ from: location }} redirect />;
  }
  return <Outlet />;
};

export default EmptyLayout;
