import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { Layout, Menu, Button, message, Divider, Typography, Flex } from "antd";
import * as AntdIcons from "@ant-design/icons";

import Welcome from "./Welcome";
import ShortProfile from "./ShortProfile";
import TrainerSubject from "./TrainerSubject";
import AdminInstraction from "./adminInstraction.js";
import TrainerInstraction from "./trainerInstruction.js";

import AllTopics from "../admin/AllTopics";
import AllTrainer from "../admin/AllTrainer";
import AllSemester from "../admin/AllSemester";

import AllSection from "../admin/AllSection/index.js";
import AllQuestions from "../trainer/Allquestions";
import AllTests from "../trainer/Alltests";
import NewTest from "../trainer/Newtest";
import ConductTest from "../trainer/ConductTest";

import { PermissionError } from "../Errors";

import {
  layoutStruct,
  siderStruct,
  siderMenuIcon,
  siderMenuStruct,
  contentStruct,
  signOutButtonStruct,
} from "./struct.js";

import auth from "../../services/auth.services.js";

import { login } from "../../actions/login.action";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const Dashboard = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const subUrl = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [localIsLoggedIn, setLocalIsLoggedIn] = useState(user.isLoggedIn);

  const token = auth.retriveToken();

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
        })
        .catch((error) => {
          messageApi.warning("Server Error.");
          auth.deleteToken();
          window.location.href = "/";
        });
    } else window.location = "/";
  }, []);

  let torender = null;
  if (subUrl.options === "listtrainers") torender = <AllTrainer />;
  else if (subUrl.options === "semesters") torender = <AllSemester />;
  else if (subUrl.options === "sections") torender = <AllSection />;
  else if (subUrl.options === "listsubjects") torender = <AllTopics />;
  else if (subUrl.options === "listquestions") torender = <AllQuestions />;
  else if (subUrl.options === "listtests") torender = <AllTests />;
  else if (subUrl.options === "newtest") torender = <NewTest />;
  else if (subUrl.options === "conducttest") torender = <ConductTest />;
  else if (subUrl.options === "home")
    torender = (
      <Welcome>
        {user.userDetails.type === "TRAINER" && <TrainerInstraction />}
        {user.userDetails.type === "ADMIN" && <AdminInstraction />}
      </Welcome>
    );
  else torender = <PermissionError />;

  return (
    <Layout {...layoutStruct}>
      <Sider {...siderStruct}>
        {/* TEMPORARY LOGO */}

        <div style={{ padding: "12px 12px 12px 12px" }}>
          <div
            style={{
              height: "40px",
              width: "100%",

              background: "#5a5ab5",
              borderRadius: "6px",
            }}
          />
        </div>

        <ShortProfile />

        <Divider />

        <Menu {...siderMenuStruct} defaultSelectedKeys={[user.activeRoute]}>
          {user.userOptions.map((d, i) => {
            const AntdIcon = AntdIcons[siderMenuIcon[d.icon]];
            return (
              <Menu.Item key={i}>
                <AntdIcon />
                <Text>{d.display}</Text>
                <Link to={d.link}></Link>
              </Menu.Item>
            );
          })}
        </Menu>

        {user.userDetails.type === "TRAINER" && (
          <>
            <Divider />
            <TrainerSubject />
          </>
        )}
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
