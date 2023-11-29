import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SingleQuestion from "./question";

import {
  fetchTraineeTestQuestions,
  fetchTraineeTestAnswerSheet,
} from "../../../../../actions/traineeAction";

const Questions = ({ mode, triggerSidebar }) => {
  const dispatch = useDispatch();

  const trainee = useSelector((state) => state.trainee);

  useEffect(() => {
    dispatch(fetchTraineeTestQuestions(trainee.testId));
    dispatch(fetchTraineeTestAnswerSheet(trainee.testId, trainee.traineeId));
  }, []);

  return (
    <>
      {trainee.answers.length > 0 && trainee.questions.length > 0 ? (
        <SingleQuestion
          mode={mode}
          triggerSidebar={triggerSidebar}
          key={trainee.activeQuestionIndex}
        />
      ) : null}
    </>
  );
};

export default Questions;
