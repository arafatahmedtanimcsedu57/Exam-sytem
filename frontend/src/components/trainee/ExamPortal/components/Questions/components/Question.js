import React, { useState, useEffect } from "react";
import { Table, Button, Typography, Modal, Flex, Card, Space } from "antd";

import { Post } from "../../../../../../services/axiosCall";

import apis from "../../../../../../services/Apis";

import {
  questionInfoSectionStruct,
  questionSectionStruct,
  questionOptions,
  optionsSectionStruct,
  optionSectionStruct,
  optionNoStruct,
  metaSectionStruct,
} from "./struct.js";

const { Title, Text } = Typography;

const Question = ({
  id,
  userId,
  selectedOptions,
  handleOptionSelection,
  resetOptionSelection,
  initialOptionSelection,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    if (id) {
      Post({
        url: `${apis.FETCH_SINGLE_QUESTION_BY_TRAINEE}`,
        data: {
          questionId: id,
          userId,
        },
      }).then((response) => {
        const {
          data: { success, data, message },
        } = response;
        if (success) {
          resetOptionSelection();
          setCurrentQuestion(data);
          console.log(data);
          initialOptionSelection(data.chosenOption);
        }
      });
    }
  }, [id]);

  return (
    <Card>
      {currentQuestion ? (
        <Flex {...questionInfoSectionStruct}>
          <Flex {...questionSectionStruct}>
            <Text>{currentQuestion.body}</Text>
            <Text>{currentQuestion.weightAge}</Text>
          </Flex>

          <Flex {...optionsSectionStruct}>
            {currentQuestion.options.map((option, i) => {
              return (
                <React.Fragment key={i}>
                  {selectedOptions.includes(option._id) ? (
                    <Flex {...optionSectionStruct}>
                      <Button
                        onClick={() => handleOptionSelection(option._id)}
                        type="primary"
                        {...optionNoStruct}
                      >
                        {questionOptions[i]}
                      </Button>
                      {option.optBody}
                    </Flex>
                  ) : (
                    <Flex {...optionSectionStruct}>
                      <Button
                        onClick={() => handleOptionSelection(option._id)}
                        {...optionNoStruct}
                      >
                        {questionOptions[i]}
                      </Button>
                      {option.optBody}
                    </Flex>
                  )}
                </React.Fragment>
              );
            })}
          </Flex>
        </Flex>
      ) : (
        <></>
      )}
    </Card>
  );
};

export { Question };
