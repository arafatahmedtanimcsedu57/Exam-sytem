import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Flex, Button, message, Space, Badge } from "antd";

import { SecurePost } from "../../../../../services/axiosCall";
import apis from "../../../../../services/Apis";

import {
  handleTestRegisterStatus,
  handleTestStatus,
} from "../../../../../actions/conductTest.action";

import { getTest } from "../../../../../actions/trainerTest.action";

import { actionSectionStruct, registrationSectionStruct } from "./struct";

const TestAction = ({ testId }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  const conduct = useSelector((state) => state.conduct);
  const { testDetails } = conduct;

  const trainerTest = useSelector((state) => state.trainerTest);
  const { trainerTestDetails } = trainerTest;

  const changeRegistrationStatus = (isRegistrationAvailable) => {
    SecurePost({
      url: `${apis.TEST}/update-registration-status`,
      data: {
        id: testId,
        status: isRegistrationAvailable,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(getTest(testId));
          messageApi.success("Registration status changed");
        } else messageApi.error(response.data.message);
      })
      .catch(() => messageApi.error("Server Error"));
  };

  const startTest = () => {
    SecurePost({
      url: `${apis.TEST}/begin`,
      data: { id: testId },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(getTest(testId));
          messageApi.success("Test has begin");
        } else messageApi.error(response.data.message);
      })
      .catch(() => messageApi.error("Server Error"));
  };

  const endTestByTrainee = () => {
    SecurePost({
      url: `${apis.TEST}/end`,
      data: { id: testId },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(getTest(testId));
          messageApi.success("Test has ended");
        } else {
          messageApi.error(response.data.message);
        }
      })
      .catch(() => messageApi.error("Server Error"));
  };

  return trainerTestDetails ? (
    <>
      {contextHolder}
      <Flex {...actionSectionStruct}>
        <Flex {...registrationSectionStruct}>
          <Badge
            status={
              trainerTestDetails.isRegistrationAvailable
                ? "processing"
                : "default"
            }
            text={
              trainerTestDetails.isRegistrationAvailable
                ? "Registration Ongoing"
                : "Registration Stoped"
            }
          />
          <Button
            disabled={trainerTestDetails.testBegins}
            onClick={() => {
              changeRegistrationStatus(
                !trainerTestDetails.isRegistrationAvailable
              );
            }}
            type={"primary"}
            danger={trainerTestDetails.isRegistrationAvailable}
          >
            {trainerTestDetails.isRegistrationAvailable
              ? "Stop Registration"
              : "Open Registration"}
          </Button>
        </Flex>

        <Space>
          <Button
            disabled={trainerTestDetails.testBegins}
            onClick={() => {
              startTest();
            }}
          >
            Start Test
          </Button>
          <Button
            disabled={
              !trainerTestDetails.testBegins || trainerTestDetails.testConducted
            }
            onClick={() => {
              endTestByTrainee();
            }}
          >
            End Test
          </Button>
        </Space>
      </Flex>
    </>
  ) : (
    <></>
  );
};

export default TestAction;
