import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Flex, Alert, Button } from "antd";

import Instruction from "../Instruction";
import Clock from "../Clock";
import Questions from "../Questions";

import { fetchExamState } from "../../../../../actions/trainee.action";

import { Post } from "../../../../../services/axiosCall";
import apis from "../../../../../services/Apis";

const ExamCenter = ({ testId, traineeId }) => {
  const [submit, setSubmit] = useState(false);

  const dispatch = useDispatch();

  const trainee = useSelector((state) => state.trainee);
  const {
    testInfo: { data, error: testError },
    examState: { error: examError },
  } = trainee || {};

  const endTest = () => {
    Post({
      url: `${apis.TRAINEE}/submit-answer-sheet`,
      data: {
        testId,
        userId: traineeId,
      },
    }).then((response) => {
      if (response.data.success) setSubmit(true);
    });
  };

  useEffect(() => dispatch(fetchExamState(testId, traineeId)), []);

  return (
    <>
      {data &&
        data.testBegins &&
        (submit ? (
          <div>
            <Alert message="Thank You" type="info" showIcon />
          </div>
        ) : (
          <>
            <Instruction testId={testId} traineeId={traineeId} />

            <Flex vertical justify="space-between">
              <Clock />
              <Questions testId={testId} traineeId={traineeId} />
              <Button danger onClick={() => endTest()}>
                End Test
              </Button>
              <div></div>
            </Flex>
          </>
        ))}

      {testError && (
        <div>
          <Alert message={testError} type="error" showIcon />
        </div>
      )}
      {examError && (
        <div>
          <Alert message={examError} type="error" showIcon />
        </div>
      )}
    </>
  );
};

export default ExamCenter;
