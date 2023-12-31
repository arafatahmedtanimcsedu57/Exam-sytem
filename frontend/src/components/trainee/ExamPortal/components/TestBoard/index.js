import React from "react";
import { useSelector, useDispatch } from "react-redux";

import * as AntdIcons from "@ant-design/icons";
import { Layout, Card, Divider, Button, message, Menu } from "antd";

import Questions from "../Questions";
import Trainee from "../User";

import apis from "../../../../../services/Apis";
import { Post } from "../../../../../services/axiosCall";

import { fetchTestdata } from "../../../../../actions/trainee.action";

import {
  contentStruct,
  layoutStruct,
  siderStruct,
  signOutButtonStruct,
  siderMenuStruct,
} from "./struct";
import Operations from "../Operations";

const { Content, Sider, Header } = Layout;

const TestBoard = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const trainee = useSelector((state) => state.trainee);
  const dispatch = useDispatch();

  const endTest = () => {
    Post({
      url: `${apis.TRAINEE}/submit-answer-sheet`,
      data: {
        testId: trainee.testId,
        userId: trainee.traineeId,
      },
    })
      .then((response) => {
        if (response.data.success)
          dispatch(fetchTestdata(trainee.testId, trainee.traineeId));
        else return messageApi.error(response.data.message);
      })
      .catch(() => messageApi.error("Error"));
  };
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

        <Trainee />

        <Divider />

        <Menu {...siderMenuStruct}>
          <Operations />
        </Menu>
      </Sider>
      <Layout>
        <Header>
          <Button
            {...signOutButtonStruct}
            icon={<AntdIcons.PoweroffOutlined />}
            onClick={() => endTest()}
          >
            End Test
          </Button>
        </Header>

        <Content {...contentStruct}>
          {contextHolder}

          <Questions />
        </Content>
      </Layout>
    </Layout>
  );
};

export default TestBoard;
