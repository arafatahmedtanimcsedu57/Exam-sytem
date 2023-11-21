import React from "react";
import { Navigate } from "react-router-dom";
import { Flex } from "antd";

import Login from "./Login";

import auth from "../../services/AuthServices";

import { homeSectionStruct } from "./struct";

const Homepage = () => {
  if (auth.retriveToken() && auth.retriveToken() !== "undefined") {
    return <Navigate to="/user/home" />;
  } else {
    return (
      <Flex {...homeSectionStruct}>
        <Login />
      </Flex>
    );
  }
};

export default Homepage;
