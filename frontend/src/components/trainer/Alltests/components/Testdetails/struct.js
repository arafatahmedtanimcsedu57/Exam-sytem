import { Flex } from "antd";
import { BasicInfo } from "./components/BasicInfo";
import { Question } from "../../../../common/QuestionDetails/components/Question";

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
