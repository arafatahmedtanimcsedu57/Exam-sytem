import React from "react";
import { Navigate } from "react-router-dom";

import Login from "./Login";

import auth from "../../services/AuthServices";

function Homepage(props) {
  if (auth.retriveToken() && auth.retriveToken() !== "undefined") {
    return <Navigate to="/user/home" />;
  } else {
    return (
      <>
        <Login />
      </>
    );
  }
}

export default Homepage;
