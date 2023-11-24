import { Flex } from "antd";
import { BasicInfo } from "./components/BasicInfo";
import { Question } from "../../../../common/QuestionDetails/components/Question";
import { TestProfile } from "../../../../common/TestProfile";

export const getTabStruct = (trainer, testdetails, questions, mainlink, id) => [
  {
    label: "Details",
    key: "1",
    children: (
      <BasicInfo testdetails={testdetails} mainlink={mainlink} id={id} />
    ),
  },
  {
    label: "Questions",
    key: "2",
    children: (
      <Flex vertical gap="middle">
        {questions.map((question) => (
          <Question details={question} showMeta={false} />
        ))}
      </Flex>
    ),
  },
];

export const getStaticColumns = (getActions) => [
  {
    title: "Test Information",
    dataIndex: "_id",
    key: "_id",
    width: "100%",
    fixed: "left",
    render: (id, data) => <TestProfile details={data} extra={getActions(id)} />,
  },
];

export const tableStruct = {
  rowKey: "_id",
  pagination: { pageSize: 5 },
  scroll: { x: 700 },
};
