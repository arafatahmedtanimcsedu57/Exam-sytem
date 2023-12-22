import React from "react";
import moment from "moment";

import { ClockCircleOutlined, CopyOutlined } from "@ant-design/icons";
import {
  Input,
  Flex,
  Typography,
  Tag,
  Divider,
  Collapse,
  message,
  Space,
} from "antd";

import { QuestionDetails } from "../QuestionDetails";

import {
  testInfoSectionStruct,
  questionHeadingStruct,
  marksStruct,
  metaSectionStruct,
} from "./struct.js";

const { Text, Title } = Typography;

export const TestProfile = (props) => {
  const [messageApi, contextHolder] = message.useMessage();

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
          <Space>
            <Text>Questions</Text>
            <Tag>{test.questions.length}</Tag>
          </Space>
          <Tag {...marksStruct}>
            Total Marks:
            {test.questions
              ? test.questions.reduce((prev, curr) => prev + curr.weightAge, 0)
              : 0}
          </Tag>
        </Flex>
      ),
      children: (
        <>
          {test.questions &&
            test.questions.map((question) => (
              <>
                <QuestionDetails details={question} />
                <Divider />
              </>
            ))}
        </>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Flex {...testInfoSectionStruct.testInfoSection}>
        <Flex {...testInfoSectionStruct.testInfo.test}>
          <Title {...testInfoSectionStruct.testInfo.testTitle}>
            {test.title}
          </Title>
          <Tag {...testInfoSectionStruct.testInfo.testTag}>{test.type}</Tag>
          <Space>
            <ClockCircleOutlined />
            <Text {...testInfoSectionStruct.testInfo.testText}>
              {" "}
              {test.duration} Minutes
            </Text>
          </Space>
        </Flex>

        <Text {...testInfoSectionStruct.testId}>{test._id}</Text>

        <Collapse items={items} />
        {/*{showMeta ? (
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
        )} */}
      </Flex>
    </>
  );
};
