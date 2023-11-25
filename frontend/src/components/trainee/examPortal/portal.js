import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { Typography, Skeleton, Alert, message } from "antd";

import Instruction from "./Instruction";
import TestBoard from "./testBoard";

import Answer from "../answersheet/answer";

import {
  fetchTraineedata,
  setTestDetsils,
  fetchTestdata,
} from "../../../actions/traineeAction";

import "./portal.css";
const { Title } = Typography;

const MainPortal = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const trainee = useSelector((state) => state.trainee);

  let [searchParams, setSearchParams] = useSearchParams();
  const [testId, setTestId] = useState(searchParams.get("testid"));
  const [traineeId, setTraineeId] = useState(searchParams.get("traineeid"));

  useEffect(() => {
    dispatch(fetchTraineedata(traineeId));
    dispatch(fetchTestdata(testId, traineeId));
    dispatch(setTestDetsils(testId, traineeId));
  }, [])


  if (trainee.initialloading2 || trainee.initialloading1) return <Skeleton active />;
  else {
    if (trainee.invalidUrl) return (window.location.href = ``);
    else {
      if (trainee.LocaltestDone) return <Answer />;
      else {
        if (trainee.testconducted)
          return <Alert
            message="The Test is Over! You are late."
            type="danger"
            showIcon
          />;
        else {
          if (!trainee.testbegins)
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
}


export default MainPortal