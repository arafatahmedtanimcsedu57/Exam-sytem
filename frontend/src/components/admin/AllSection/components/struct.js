export const newSectionFormStruct = {
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

export const subjectFieldStruct = {
  subjectField: {
    label: "Subject",
    name: "subjectId",
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
    placeholder: "Select a subject",
    optionFilterProp: "s",
  },
};

export const nameFieldStruct = {
  label: "Name",
  name: "name",
  rules: [
    {
      required: true,
      message: "Please input your name!",
      whitespace: true,
    },
  ],
  hasFeedback: true,
};

export const semesterFieldStruct = {
  semesterField: {
    label: "Semester",
    name: "semesterId",
    rules: [
      {
        required: true,
        message: "Please select semester!",
      },
    ],
    hasFeedback: true,
  },

  selectStruct: {
    select: {
      showSearch: true,
      placeholder: "Select semester",
      optionFilterProp: "s",
    },

    text: {
      type: "secondary",
    },
  },
};

export const trainerFieldStruct = {
  trainerField: {
    label: "Trainer",
    name: "trainerId",
    rules: [
      {
        required: true,
        message: "Please select trainer!",
      },
    ],
    hasFeedback: true,
  },

  selectStruct: {
    select: {
      showSearch: true,
      placeholder: "Select trainer",
      optionFilterProp: "s",
    },

    text: {
      type: "secondary",
    },
  },
};

export const studentFieldStruct = {
  label: "Students",
  name: "students",
  // noStyle: true,
  rules: [
    {
      required: true,
      message: "Please upload a CSV File!",
    },
  ],
  hasFeedback: true,
};

export const studentFileUploadStruct = {
  accept: ".json",
  maxCount: 1,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
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
