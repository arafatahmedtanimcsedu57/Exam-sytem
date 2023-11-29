import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Flex, Button, message, Space, Badge } from "antd";

import { SecurePost } from "../../../../../services/axiosCall";
import apis from "../../../../../services/Apis";

import {
  handleTestRegisterStatus,
  handleTestStatus,
} from "../../../../../actions/conductTest.action";

import { actionSectionStruct } from "./struct";

const TestAction = ({ id }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const conduct = useSelector((state) => state.conduct);

  const { testDetails } = conduct;

  const changeRegistrationStatus = (isRegistrationAvailable) => {
    SecurePost({
      url: `${apis.UPDATE_REGISTRATION}`,
      data: {
        id,
        status: isRegistrationAvailable,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(handleTestRegisterStatus(isRegistrationAvailable));
          messageApi.success("Registration status changed");
        } else messageApi.error(response.data.message);
      })
      .catch(() => messageApi.error("Server Error"));
  };

  const startTest = () => {
    SecurePost({
      url: `${apis.START_TEST_BY_TRAINER}`,
      data: { id },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(handleTestStatus(response.data.data));
          messageApi.success("Test has begin");
        } else messageApi.error(response.data.message);
      })
      .catch(() => messageApi.error("Server Error"));
  };

  const endTestByTrainee = () => {
    SecurePost({
      url: `${apis.END_TEST_BY_TRAINER}`,
      data: { id },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(handleTestStatus(response.data.data));
          messageApi.success("Test has ended");
        } else {
          messageApi.error(response.data.message);
        }
      })
      .catch(() => messageApi.error("Server Error"));
  };

  return (
    <>
      {contextHolder}
      <Flex {...actionSectionStruct}>
        <Space>
          <Badge
            status={
              testDetails.isRegistrationAvailable ? "processing" : "default"
            }
            text={
              testDetails.isRegistrationAvailable
                ? "Registration Ongoing"
                : "Registration Stoped"
            }
          />
          <Button
            disabled={testDetails.testBegins}
            onClick={() => {
              changeRegistrationStatus(!testDetails.isRegistrationAvailable);
            }}
            type={"primary"}
            danger={testDetails.isRegistrationAvailable}
          >
            {testDetails.isRegistrationAvailable
              ? "Stop Registration"
              : "Open Registration"}
          </Button>
        </Space>

        <Space>
          <Button
            disabled={testDetails.testBegins}
            onClick={() => {
              startTest();
            }}
          >
            Start Test
          </Button>
          <Button
            disabled={!testDetails.testBegins}
            onClick={() => {
              endTestByTrainee();
            }}
          >
            End Test
          </Button>
        </Space>
      </Flex>
    </>
  );
};

export default TestAction;
