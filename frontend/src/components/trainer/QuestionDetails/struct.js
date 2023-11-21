import { BasicInfo } from "./components/BasicInfo";
import { Question } from "./components/Question";

export const questionDetailSection = {
  defaultActiveKey: "1",
};

export const getTabStruct = (details) => [
  {
    label: "Basic Info",
    key: "1",
    children: <BasicInfo details={details} />,
  },
  {
    label: "Question",
    key: "2",
    children: <Question details={details} />,
  },
];
