import { BasicInfo } from "./components/BasicInfo";
import { Question } from "./components/Question";

export const questionDetailSection = {
  // defaultActiveKey: "1",
  column: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 },
  bordered: true
};

export const getTabStruct = (details) => [
  {
    // label: "Basic Info",
    key: "1",
    children: <BasicInfo details={details} />,
  },
  {
    // label: "Question",
    key: "2",
    children: <Question details={details} />,
  },
];
