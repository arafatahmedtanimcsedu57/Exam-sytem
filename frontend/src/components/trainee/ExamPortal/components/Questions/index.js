import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Space } from "antd";

import SingleQuestion from "./question";

import {
  fetchTraineeTestQuestions,
  fetchTraineeTestAnswerSheet,
} from "../../../../../actions/trainee.action";

const Questions = () => {
  const dispatch = useDispatch();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const trainee = useSelector((state) => state.trainee);
  const {
    examState: { data },
  } = trainee;


  const handleCurrentQuestionIndex = (mode) => {
    mode === "PREV" && setCurrentQuestionIndex(prev => prev - 1);
    mode === "NEXT" && setCurrentQuestionIndex(prev => prev + 1);
  }

  return (
    <>
      {data.questions.length > 0 ? (
        <>
          {JSON.stringify(data.questions)}
          <Space>
            <Button.Group>
              {!currentQuestionIndex <= 0 && <Button onClick={() => handleCurrentQuestionIndex("PREV")}>Previous</Button>}
              {currentQuestionIndex < data.questions.length - 1 && <Button onClick={() => handleCurrentQuestionIndex("NEXT")}>Save & Next</Button>}
              {currentQuestionIndex >= data.questions.length - 1 && <Button>Save</Button>}
            </Button.Group>
          </Space>
        </>
      ) : null}
    </>
  );
};

export default Questions;
