import React from "react";
import moment from "moment";
import { Flex, Typography, Tag, Divider, Collapse } from "antd";

import { Question } from "../QuestionDetails/components/Question.js";

import {
  testInfoSectionStruct,
  questionHeadingStruct,
  marksStruct,
  metaSectionStruct,
} from "./struct.js";

const { Text } = Typography;

export const TestProfile = (props) => {
  const test = props.details;
  const showMeta = !(props.showMeta === undefined || null)
    ? props.showMeta
    : true;
  const extra = props.extra ? props.extra : null;

  const items = [
    {
      key: "1",
      label: (
        <Flex {...questionHeadingStruct}>
          <Text>Questions</Text>
          <Tag {...marksStruct}>
            Total Marks:{" "}
            {test.questions
              ? test.questions.reduce((prev, curr) => prev + curr.weightage, 0)
              : 0}
          </Tag>
        </Flex>
      ),
      children: (
        <>
          {test.questions &&
            test.questions.map((question) => <Question details={question} />)}
        </>
      ),
    },
  ];

  return (
    <Flex {...testInfoSectionStruct}>
      <Text>{test.title}</Text>
      <Text>{test.type}</Text>

      <Text>Time {test.duration} Min</Text>
      <Text>{test._id}</Text>
      <Collapse items={items} />
      {showMeta ? (
        <Flex {...metaSectionStruct}>
          <Text type="secondary">{test.createdBy?.name || "..."}</Text>
          <Divider type="vertical" />

          <Text type="secondary">
            {moment(test.createdAt).format("DD/MM/YYYY")}
          </Text>
          <Divider type="vertical" />

          {test.subjects.map((subject) => (
            <Tag color="blue">{subject.topic}</Tag>
          ))}
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
