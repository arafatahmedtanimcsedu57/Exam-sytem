import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Flex, Alert, Space } from "antd";

import Instruction from "../Instruction";
import Clock from "../Clock";
import Questions from "../Questions";

import { fetchExamState } from "../../../../../actions/trainee.action";

const ExamCenter = ({ testId, traineeId }) => {
  const dispatch = useDispatch();

  const trainee = useSelector((state) => state.trainee);
  const {
    testInfo: { data, error: testError },
    examState: { error: examError },
  } = trainee || {};

  useEffect(() => dispatch(fetchExamState(testId, traineeId)), []);

  return (
    <>
      {data && data.testBegins && (
        <>
          <Instruction testId={testId} traineeId={traineeId} />

          <Flex vertical>
            <Clock />
            <Questions testId={testId} traineeId={traineeId} />
          </Flex>
        </>
      )}

      {testError && (
        <div>
          <Alert
            message="Error"
            description={testError}
            type="error"
            showIcon
          />
        </div>
      )}
      {examError && (
        <div>
          <Alert
            message="Error"
            description={examError}
            type="error"
            showIcon
          />
        </div>
      )}
    </>
  );
};

export default ExamCenter;
