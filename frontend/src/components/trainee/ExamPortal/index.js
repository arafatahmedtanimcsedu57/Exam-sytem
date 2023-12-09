import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import {
  Skeleton,
  Layout,
  Menu,
  Button,
  message,
  Divider,
  Typography,
} from "antd";

import Instruction from "./components/Instruction";
import TestBoard from "./components/TestBoard";
import Trainee from "./components/User";
import ExamCenter from "./components/ExamCenter";

import Answer from "../answersheet/answer";

import {
  fetchTrainee,
  setTestDetsils,
  fetchTestdata,
} from "../../../actions/trainee.action";

import {
  contentStruct,
  layoutStruct,
  siderStruct,
  signOutButtonStruct,
  siderMenuStruct,
} from "./struct";

const { Header, Sider, Content } = Layout;

const MainPortal = () => {
  const dispatch = useDispatch();
  const trainee = useSelector((state) => state.trainee);

  let [searchParams, setSearchParams] = useSearchParams();
  const [testId, setTestId] = useState(searchParams.get("testId"));
  const [traineeId, setTraineeId] = useState(searchParams.get("traineeId"));

  useEffect(() => {
    // dispatch(fetchTrainee(traineeId));
    // dispatch(fetchTestdata(testId, traineeId)); // calling flags api
    // dispatch(setTestDetsils(testId, traineeId));
  }, []);

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
        <Header>
          {/* <Button
            {...signOutButtonStruct}
            icon={<AntdIcons.PoweroffOutlined />}
            onClick={() => endTest()}
          >
            End Test
          </Button> */}
        </Header>

        <Content {...contentStruct}>
          <ExamCenter testId={testId} traineeId={traineeId} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainPortal;
