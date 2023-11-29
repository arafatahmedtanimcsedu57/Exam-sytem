import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { Skeleton, Alert } from "antd";

import Instruction from "./components/Instruction";
import TestBoard from "./components/TestBoard";

import Answer from "../answersheet/answer";

import {
  fetchTraineedata,
  setTestDetsils,
  fetchTestdata,
} from "../../../actions/traineeAction";

const MainPortal = () => {
  const dispatch = useDispatch();
  const trainee = useSelector((state) => state.trainee);

  let [searchParams, setSearchParams] = useSearchParams();
  const [testId, setTestId] = useState(searchParams.get("testId"));
  const [traineeId, setTraineeId] = useState(searchParams.get("traineeId"));

  useEffect(() => {
    dispatch(fetchTraineedata(traineeId));
    dispatch(fetchTestdata(testId, traineeId)); // calling flags api
    dispatch(setTestDetsils(testId, traineeId));
  }, []);

  if (trainee.initialloading2 || trainee.initialloading1)
    return <Skeleton active />;
  else {
    if (trainee.invalidUrl) return (window.location.href = ``);
    else {
      if (trainee.completed) return <Answer />;
      else {
        if (trainee.testConducted)
          return (
            <Alert
              message="The Test is Over! You are late."
              type="danger"
              showIcon
            />
          );
        else {
          if (!trainee.testBegins)
            return (
              <Alert
                message="The test has not started yet. Wait for the trainer's instruction then refresh the page."
                showIcon
              />
            );
          else {
            if (trainee.startedWriting) return <TestBoard />;
            else return <Instruction />;
          }
        }
      }
    }
  }
};

export default MainPortal;
