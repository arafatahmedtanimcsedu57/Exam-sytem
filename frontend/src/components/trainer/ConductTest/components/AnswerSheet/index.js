import React from "react";
import { Table, Button, Typography, message, Modal, Flex, Divider } from "antd";

const { Text } = Typography;

const AnswerSheet = ({ answerSheet }) => {
  const {
    test: { questions },
  } = answerSheet;

  console.log(questions);

  return (
    <Flex vertical>
      {questions.map((question, index) => (
        <>
          <Flex vertical>
            <Text>{`${index + 1}). ${question.body}}`}</Text>
            <Text>{`Given Answer:: ${
              question.chosenOption ? question.chosenOption.optBody : "N/A"
            }`}</Text>
            {question.options.map((option) =>
              option.isAnswer ? (
                <Text>{`Correct Answer:: ${option.optBody}`}</Text>
              ) : (
                <></>
              )
            )}
          </Flex>
          <Divider />
        </>
      ))}
    </Flex>
  );
};

export default AnswerSheet;
