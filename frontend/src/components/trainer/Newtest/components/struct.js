export const basicFormStruct = {
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

export const testTypeFieldStruct = {
  label: "Test Type",
  name: "type",
  rules: [
    {
      required: true,
      message: "Please select a test type",
    },
  ],
  hasFeedback: true,
};

export const testTitleFieldStruct = {
  label: "Test Title",
  name: "title",
  rules: [
    {
      required: true,
      message: "Please give the test title",
    },
    {
      min: 5,
      message: "Title should be atleast 5 character long",
    },
  ],
  hasFeedback: true,
};

export const subjectFieldStruct = {
  label: "Subject",
  name: "subjects",
  rules: [
    {
      required: true,
      message: "Please select any subject!",
    },
  ],
  hasFeedback: true,
};

export const testDurationFieldStruct = {
  label: "Test Duration",
  name: "duration",
  rules: [
    {
      required: true,
      message: "Please give test duration",
    },
  ],
  hasFeedback: true,
};

export const organisationFieldStruct = {
  label: "Organization",
  name: "organisation",
  rules: [
    {
      required: true,
      message: "Please give test duration",
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

export const sectionStruct = {
  vertical: true,
  gap: "middle",
};

export const transferSectionStruct = {
  oneWay: true,
  pagination: true,
  showSearch: true,
  filterOption: (inputValue, item) =>
    item.body.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1,
};

export const transferQuestionSectionStruct = {
  align: "center",
  justify: "space-between",
};
