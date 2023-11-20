import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

import Login from "../Login";
import HomepageHeader from "../header/header";
import auth from "../../../services/AuthServices";

import "./homepage.css";

function Homepage(props) {
  if (auth.retriveToken() && auth.retriveToken() !== "undefined") {
    return <Navigate to="/user/home" />;
  } else {
    return (
      <div>
        <div className="wrapper--login">
          <HomepageHeader />
          <Login />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {})(Homepage);
