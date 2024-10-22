import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Protect(props) {
  console.log("render");
  const { children } = props;
  const isLogged = useSelector((state) => {
    console.log(state);
    return state.userInfo?.isLogged;
  });

  console.log("userinfo", isLogged);
  if (isLogged) {
    return children;
  }
  console.log("navigation");
  return <Navigate to="/login" replace />;
}

export default Protect;
