import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function ProtectAdmin(props) {
  const { children } = props;
  const { isLogged } = useSelector((state) => state.adminInfo);
  const { pathname } = useLocation();
  console.log("value", isLogged, pathname);
  if (isLogged === true) {
    return children;
  } else if (isLogged === false) {
    return <Navigate to="/admin/login" replace />;
  }
}

export default ProtectAdmin;
