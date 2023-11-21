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
  const Optiondata = props.details;

  return (
    <>
      <Text>{Optiondata.body}</Text>

      <Flex {...optionsSectionStruct}>
        {Optiondata.options.map((option, i) => {
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
