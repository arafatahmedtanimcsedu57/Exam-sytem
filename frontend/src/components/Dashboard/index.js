import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import queryString from "query-string";
import { Layout, Menu, Button, message, } from "antd";
import * as AntdIcons from "@ant-design/icons";
import {
  layoutStruct,
  siderStruct,
  siderMenuIcon,
  siderMenuStruct,
  contentStruct,
  signOutButtonStruct,
} from "./struct.js";


import Welcome from "./Welcome";
import ShortProfile from "./ShortProfile";
import AdminInstraction from "./adminInstraction.js";
import TrainerInstraction from "./trainerInstruction.js";

import AllTrainer from "../admin/AllTrainer";
import AllTopics from "../admin/AllTopics";

import AllQuestions from "../trainer/Allquestions/index.js";
// import AllTests from "../trainer/alltests/alltest";
// import ConductTest from "../trainer/conducttest/conducttest";
// import NewTest from "../trainer/newtest/newtest";
import { PermissionError } from "../Errors";

import { login, logout } from "../../actions/loginAction.js";
import { changeActiveRoute } from "../../actions/useraction.js";

import auth from "../../services/AuthServices.js";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const subUrl = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const token = auth.retriveToken();

  const [localIsLoggedIn, setLocalIsLoggedIn] = useState(user.isLoggedIn);

  const logOut = () => {
    auth.deleteToken();
    window.location.href = "/";
  };

  useEffect(() => {
    if (localIsLoggedIn) {
    } else if (token) {
      auth
        .FetchAuth(token)
        .then((response) => {
          dispatch(login(response.data.user));
          setLocalIsLoggedIn(true);

          var hasRoute = user.userOptions.find((o, i) => {
            if (o.link === `/user/${subUrl.options}`) {
              return o;
            }
          });

          var routeIndex = user.userOptions.indexOf(hasRoute);

          if (routeIndex === -1) {
            // window.location.href = `${user.userOptions[0].link}`;
          } else {
            changeActiveRoute(String(routeIndex));
          }
        })
        .catch((error) => {
          messageApi.warning("Server Error.");
          auth.deleteToken();
          window.location.href = "/";
        });
    } else {
      window.location = "/";
    }
  }, [user]);

  console.log(user, "Arafat");

  let torender = null;
  if (subUrl.options === "listtrainers") torender = <AllTrainer />;
  else if (subUrl.options === "listsubjects") torender = <AllTopics />;
  else if (subUrl.options === "listquestions")
    torender = <AllQuestions />;
  // } else if (this.props.match.params.options === "listtests") {
  //   torender = <AllTests />;
  // } else
  else if (subUrl.options === "home") {
    torender = (
      <Welcome>
        {user.userDetails.type === "TRAINER" && <TrainerInstraction />}
        {user.userDetails.type === "ADMIN" && <AdminInstraction />}
      </Welcome>
    );
  }
  //   else if (this.props.match.params.options === "newtest") {
  //   torender = <NewTest />;
  // } else if (this.props.match.params.options === "conducttest") {
  //   let params = queryString.parse(this.props.location.search);
  //   torender = <ConductTest {...params} />;
  // }
  else torender = <PermissionError />;

  return (
    <Layout {...layoutStruct}>
      <Sider {...siderStruct}>
        <div
          style={{
            height: "24px",
            margin: "8px 0px 16px 8px ",
            background: "#5a5ab5",
            borderRadius: "6px",
          }}
        />


        <ShortProfile />
        <Menu {...siderMenuStruct} defaultSelectedKeys={[user.activeRoute]}>
          {user.userOptions.map((d, i) => {
            const AntdIcon = AntdIcons[siderMenuIcon[d.icon]];
            return (
              <Menu.Item key={i}>
                <AntdIcon />
                <span>{d.display}</span>
                <Link to={d.link}></Link>
              </Menu.Item>
            );
          })}
        </Menu>


      </Sider>
      <Layout>
        <Header>
          <Button
            {...signOutButtonStruct}
            icon={<AntdIcons.PoweroffOutlined />}
            onClick={() => logOut()}
          >
            Sign Out
          </Button>
        </Header>
        <Content {...contentStruct}>
          {contextHolder}
          {torender}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
