import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout, Menu, Divider } from "antd";

import Trainee from "./components/User";
import ExamCenter from "./components/ExamCenter";

import {
  contentStruct,
  layoutStruct,
  siderStruct,
  siderMenuStruct,
} from "./struct";

const { Header, Sider, Content } = Layout;

const MainPortal = () => {
  let [searchParams, _] = useSearchParams();
  const [testId, __] = useState(searchParams.get("testId"));
  const [traineeId, ___] = useState(searchParams.get("traineeId"));

  return (
    <Layout {...layoutStruct}>
      <Sider {...siderStruct}>
        {/* TEMPORARY LOGO */}
        <div
          style={{
            height: "40px",
            margin: "8px 0px 8px 8px ",
            background: "#5a5ab5",
            borderRadius: "6px",
          }}
        />

        <Trainee id={traineeId} />

        <Divider />

        <Menu {...siderMenuStruct}>{/* <Operations /> */}</Menu>
      </Sider>
      <Layout>
        <Header></Header>

        <Content {...contentStruct}>
          <ExamCenter testId={testId} traineeId={traineeId} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainPortal;
