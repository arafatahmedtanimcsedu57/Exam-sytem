import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Alert, Button } from "antd";

import Instruction from "./components/Instruction";
import ExamHall from "./components/ExamHall";

import { getExamState } from "../../../../../actions/trainee.action";

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

  const handleSubmit = () => setSubmit(true);

  useEffect(() => dispatch(getExamState(testId, traineeId)), []);

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

            <ExamHall
              testId={testId}
              traineeId={traineeId}
              handleSubmit={handleSubmit}
            />
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
