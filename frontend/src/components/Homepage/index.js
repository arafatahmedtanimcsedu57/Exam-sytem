import React from "react";
import { Navigate } from "react-router-dom";

import { Flex } from "antd";

import { Login } from "./components/Login";

import auth from "../../services/auth.services";

import { homeSectionStruct } from "./struct";

const Homepage = () => {
  if (auth.retriveToken() && auth.retriveToken() !== "undefined") {
    return <Navigate to="/user/home" />;
  } else {
    return (
      <>
        <Flex {...homeSectionStruct}>
          <Login />
        </Flex>
      </>
    );
  }
};

export default Homepage;
