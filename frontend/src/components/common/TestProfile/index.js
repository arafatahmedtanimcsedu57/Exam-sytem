import React from "react";
import moment from "moment";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { ClockCircleOutlined, CopyOutlined } from "@ant-design/icons";
import { Input, Flex, Typography, Tag, Divider, Collapse, message } from "antd";

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
          <Text>Questions</Text>
          <Tag {...marksStruct}>
            Total Marks:{" "}
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
              <QuestionDetails details={question} />
            ))}
        </>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Flex {...testInfoSectionStruct}>
        <div>
          <Title level={5}>{test.title}</Title>
          <Tag>{test.type}</Tag>
        </div>

        <div>
          <ClockCircleOutlined /> <Text> Time {test.duration} Min</Text>
        </div>

        <Input
          disabled={true}
          value={`${test._id}`}
          addonAfter={
            <CopyToClipboard
              text={`${test._id}`}
              onCopy={() => messageApi.success("ID Copied to clipboard")}
            >
              <CopyOutlined />
            </CopyToClipboard>
          }
        />
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
    </>
  );
};
