import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, Typography, Flex, Skeleton, Alert, Space } from "antd";

import { fetchExamState } from "../../../../../actions/trainee.action";

import Instruction from "../Instruction";
import Clock from "../Clock";
import Questions from "../Questions";

// import { profileStruct, profileSectionStruct,  } from "./struct";

const { Text } = Typography;

const ExamCenter = ({ testId, traineeId }) => {
  const dispatch = useDispatch();

  const trainee = useSelector((state) => state.trainee);
  const {
    testInfo: { data },
  } = trainee || {};

  console.log(data, trainee);

  useEffect(() => dispatch(fetchExamState(testId, traineeId)), []);

  return (
    <>
      {data && data.testBegins && (
        <Space>
          <Instruction testId={testId} traineeId={traineeId} />
          <Flex vertical>
            <Clock />
            <Questions testId={testId} traineeId={traineeId} />
          </Flex>
        </Space>
      )}
    </>
  );
};

export default ExamCenter;
