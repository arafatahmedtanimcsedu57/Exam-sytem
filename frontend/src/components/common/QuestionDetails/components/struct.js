import { Badge } from "antd";
import moment from "moment";

export const questionOptions = ["A", "B", "C", "D", "E"];

export const questionInfoSectionStruct = {
  vertical: true,
  gap: "middle",
};

export const questionSectionStruct = {
  gap: "middle",
  justify: "space-between",
};

export const optionsSectionStruct = {
  vertical: true,
  gap: "middle",
};

export const optionSectionStruct = {
  align: "center",
  gap: "middle",
};

export const optionNoStruct = {
  size: "small",
  shape: "circle",
};

export const metaSectionStruct = {
  gap: "middle",
  align: "center",
  justify: "flex-end",
};

export const basicInfoStruct = {
  bordered: true,
  title: "",
  column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
};

export const getDescirptionStruct = (props) => [
  {
    key: "1",
    label: "Subject",
    children: <Badge status="processing" text={props.details.subject.topic} />,
  },
  {
    key: "2",
    label: "Difficulty",
    children: `${props.details.difficulty}`,
  },
  {
    key: "3",
    label: "No of Right Answers",
    children: `${props.details.anscount}`,
  },
  {
    key: "4",
    label: "Weightage",
    children: `${props.details.weightage}`,
  },
  {
    key: "5",
    label: "Created By",
    children: `${props.details.createdBy.name}`,
  },
  {
    key: "6",
    label: "Created On",
    children: `${moment(props.details.createdAt).format(
      "DD/MM/YYYY , hh:mm:ss"
    )}`,
  },
];
