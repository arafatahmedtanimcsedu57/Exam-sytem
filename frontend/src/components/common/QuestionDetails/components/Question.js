import React from "react";
import moment from "moment";
import { Flex, Typography, Button, Tag, Divider } from "antd";

import {
  questionInfoSectionStruct,
  questionSectionStruct,
  questionOptions,
  optionsSectionStruct,
  optionSectionStruct,
  optionNoStruct,
  metaSectionStruct,
} from "./struct.js";

const { Text } = Typography;

export const Question = (props) => {
  const question = props.details;
  const showMeta = !(props.showMeta === undefined || null)
    ? props.showMeta
    : true;
  const extra = props.extra ? props.extra : null;

  return (
    <Flex {...questionInfoSectionStruct}>
      <Flex {...questionSectionStruct}>
        <Text>{question.body}</Text>
        <Text>{question.weightage}</Text>
      </Flex>

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

      {showMeta ? (
        <Flex {...metaSectionStruct}>
          <Text type="secondary">{question.createdBy.name || "..."}</Text>
          <Divider type="vertical" />

          <Text type="secondary">
            {moment(question.createdAt).format("DD/MM/YYYY")}
          </Text>
          <Divider type="vertical" />

          <Tag color="blue">{question.subject.topic || "..."}</Tag>
          {extra && (
            <>
              <Divider type="vertical" />
              {extra}
            </>
          )}
        </Flex>
      ) : (
        <></>
      )}
    </Flex>
  );
};
