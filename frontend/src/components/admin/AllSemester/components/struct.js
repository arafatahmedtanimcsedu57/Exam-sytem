export const newTopicsFormStruct = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },

  autoComplete: "on",
  labelAlign: "left",
};

export const semesterNameFieldStruct = {
  label: "Semester Name",
  name: "name",
  rules: [
    {
      required: true,
      message: "Please input semester name!",
      whitespace: true,
    },
  ],
  hasFeedback: true,
};

export const yearFieldStruct = {
  label: "Year",
  name: "year",
  rules: [
    {
      required: true,
      message: "Please input year!",
      whitespace: true,
    },
  ],
  hasFeedback: true,
};

export const buttonSectionStruct = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
    textAlign: "start",
  },
};

export const buttonStruct = {
  type: "primary",
  htmlType: "submit",
  block: true,
};
