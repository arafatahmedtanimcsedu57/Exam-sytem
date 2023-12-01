import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, Typography, Flex, Skeleton, Alert } from "antd";

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
  } = trainee;

  useEffect(() => dispatch(fetchExamState(testId, traineeId)), []);

  return (
    <>
      {data && data.testBegins && (
        <>
          <Instruction testId={testId} traineeId={traineeId} />
          <Clock />
          <Questions />
        </>
      )}
    </>
  );
};

export default ExamCenter;
