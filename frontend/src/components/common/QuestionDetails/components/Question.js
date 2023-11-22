import React from "react";
import { Flex, Typography, Button } from "antd";

import {
  questionOptions,
  optionsSectionStruct,
  optionSectionStruct,
  optionNoStruct,
} from "./struct.js";

const { Text } = Typography;

export const Question = (props) => {
  const question = props.details;

  return (
    <>
      <Text>{question.body}</Text>

      <Flex {...optionsSectionStruct}>
        {question.options.map((option, i) => {
          return (
            <React.Fragment key={i}>
              {option.isAnswer ? (
                <Flex {...optionSectionStruct}>
                  <Button type="primary" {...optionNoStruct}>
                    {questionOptions[i]}
                  </Button>
                  {option.optbody}
                </Flex>
              ) : (
                <Flex {...optionSectionStruct}>
                  <Button {...optionNoStruct}>{questionOptions[i]}</Button>
                  {option.optbody}
                </Flex>
              )}
            </React.Fragment>
          );
        })}
      </Flex>
    </>
  );
};
