import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Space } from "antd";

import SingleQuestion from "./question";
import { Question } from "./components/Question";

import {
  fetchTraineeTestQuestions,
  fetchTraineeTestAnswerSheet,
} from "../../../../../actions/trainee.action";

import { Post } from "../../../../../services/axiosCall";
import apis from "../../../../../services/Apis";

const Questions = ({ testId, traineeId }) => {
  const dispatch = useDispatch();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const trainee = useSelector((state) => state.trainee);
  const {
    examState: { data },
  } = trainee;

  const saveToCloud = () => {
    Post({
      url: `${apis.UPDATE_ANSWERS}`,
      data: {
        testId: testId,
        userId: traineeId,
        questionId: data.questions[currentQuestionIndex],
        newAnswer: selectedOptions,
      },
    })
      .then((response) => {
        if (response.data.success) {
          console.log("option slected");
        } else {
          console.log("option is not slected");
        }
      })
      .catch(() => console.log("option is not slected"));
  };
  const handleCurrentQuestionIndex = (mode) => {
    if (mode === "NEXT_SAVE") {
      setCurrentQuestionIndex((prev) => prev + 1);
      if (selectedOptions.length > 0) saveToCloud();
    } else if (mode === "SAVE") {
      if (selectedOptions.length > 0) saveToCloud();
    } else if (mode === "PREV") {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const processSelectedOption = (options, id) => {
    const index = options.indexOf(id);

    if (index !== -1) options.splice(index, 1);
    else options.push(id);

    return options;
  };

  const handleOptionSelection = (id) =>
    setSelectedOptions((prev) => [...processSelectedOption(prev, id)]);

  const initialOptionSelection = (options) => setSelectedOptions(options);
  const resetOptionSelection = () => setSelectedOptions([]);

  return (
    <>
      {data && data.questions && data.questions.length > 0 ? (
        <>
          <Question
            id={data.questions[currentQuestionIndex]}
            userId={traineeId}
            handleOptionSelection={handleOptionSelection}
            selectedOptions={selectedOptions}
            resetOptionSelection={resetOptionSelection}
            initialOptionSelection={initialOptionSelection}
          />
          <Space>
            <Button.Group>
              {!currentQuestionIndex <= 0 && (
                <Button onClick={() => handleCurrentQuestionIndex("PREV")}>
                  Previous
                </Button>
              )}
              {currentQuestionIndex < data.questions.length - 1 && (
                <Button onClick={() => handleCurrentQuestionIndex("NEXT_SAVE")}>
                  Save & Next
                </Button>
              )}
              {currentQuestionIndex >= data.questions.length - 1 && (
                <Button onClick={() => handleCurrentQuestionIndex("SAVE")}>
                  Save
                </Button>
              )}
            </Button.Group>
          </Space>
        </>
      ) : null}
    </>
  );
};

export default Questions;
