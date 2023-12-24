import React from "react";
import { Flex, Button } from "antd";

import Clock from "./components/Clock";
import Questions from "./components/Questions";

import { Post } from "../../../../../../../services/axiosCall";
import apis from "../../../../../../../services/Apis";

const ExamHall = ({ testId, traineeId, handleSubmit }) => {
  const endTest = () => {
    Post({
      url: `${apis.TRAINEE}/submit-answer-sheet`,
      data: {
        testId,
        userId: traineeId,
      },
    }).then((response) => {
      if (response.data.success) handleSubmit();
    });
  };

  return (
    <Flex vertical justify="space-between">
      <Clock />
      <Questions testId={testId} traineeId={traineeId} />
      <Button danger onClick={() => endTest()}>
        End Test
      </Button>
      <div></div>
    </Flex>
  );
};

export default ExamHall;
