export const testFormStruct = {
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
  testTypeField: {
    label: "Test Type",
    name: "type",
    rules: [
      {
        required: true,
        message: "Please select a test type",
      },
    ],
    hasFeedback: true,
  },

  select: {
    showSearch: true,
    placeholder: "Select a test type",
    optionFilterProp: "s",
  },
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
  subjectField: {
    label: "Subject",
    name: "subject",
    rules: [
      {
        required: true,
        message: "Please select any subject!",
      },
    ],
    hasFeedback: true,
  },
  select: {
    showSearch: true,
    placeholder: "Select a subject ",
    optionFilterProp: "s",
  },
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
