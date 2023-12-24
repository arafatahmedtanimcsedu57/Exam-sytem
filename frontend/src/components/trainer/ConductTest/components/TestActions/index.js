import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Flex, Button, message, Space, Badge, Divider, Typography } from "antd";

import { SecurePost } from "../../../../../services/axiosCall";
import apis from "../../../../../services/Apis";

import { getTest } from "../../../../../actions/trainerTest.action";
import { getSectionBySubject } from "../../../../../actions/section.action";

import { actionSectionStruct, registrationSectionStruct } from "./struct";

const { Title, Text } = Typography;

const TestAction = ({ testId }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  const sections = useSelector((state) => state.section);
  const { sectionsBySubject } = sections;

  const trainerTest = useSelector((state) => state.trainerTest);
  const { trainerTestDetails } = trainerTest;

  const trainerSubject = useSelector((state) => state.trainerSubject);
  const { trainerSubjects } = trainerSubject;

  const subjects = trainerSubjects.map((subject) => subject.subjectId);
  const trainerSubjectIds = subjects.map((subject) => subject._id);

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


  const fetchSectionBySubject = () => {
    if (trainerSubjectIds && trainerSubjectIds.length) {
      dispatch(getSectionBySubject(trainerSubjectIds));
    }
  };

  const bulkRegistration = (sectionId, testId) => {
    SecurePost({
      url: `${apis.TRAINEE}/bulk-registration`,
      data: { sectionId, testId },
    })
      .then((response) => {
        if (response.data.success) {
          messageApi.success(response.data.message);
        } else messageApi.warning(response.data.message);
      })
      .catch(() => messageApi.error("Server Error"));
  };


  useEffect(() => {
    fetchSectionBySubject();
  }, [trainerSubjects]);

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

          <Divider />

          {sectionsBySubject.map((section) => {
            return (
              <Flex gap="middle" wrap="wrap">
                <Text>
                  Send test link to all students ({section.studentIds.length}) of {" "}
                  {section.subjectId.topic} ~ {section.name} of {" "}
                  {section.semesterId.name} ~ {section.semesterId.year}
                </Text>
                <Button
                  disabled={trainerTestDetails.testBegins}
                  type="primary"
                  onClick={() => bulkRegistration(section._id, testId)}
                >
                  Send
                </Button>
              </Flex>
            );
          })}
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
