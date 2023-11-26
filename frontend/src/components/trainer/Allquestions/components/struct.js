import auth from "../../../../services/auth.services";
import apis from "../../../../services/Apis";

export let initialQuestionStruct = {
  questionimage: null,
  options: [
    {
      image: null,
      body: null,
      isAnswer: false,
    },
    {
      image: null,
      body: null,
      isAnswer: false,
    },
    {
      image: null,
      body: null,
      isAnswer: false,
    },
    {
      image: null,
      body: null,
      isAnswer: false,
    },
  ],
};

export const isValid = (value, isEmpty) => {
  let state =
    value !== "undefined" &&
    value !== undefined &&
    value !== "null" &&
    value !== null
      ? true
      : false;
  state = isEmpty ? state : state && value !== "";
  return state;
};

export const newQuestionFormStruct = {
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
  label: "Subject",
  name: "subject",
  rules: [
    {
      required: true,
      message: "Please select any subject!",
    },
  ],
  hasFeedback: true,
};

export const questionFieldStruct = {
  label: "Question",
  name: "questionBody",
  rules: [
    {
      required: true,
      message: "Please type question!",
    },
  ],
  hasFeedback: true,
};

export const explanationFieldStruct = {
  label: "Explanation",
  name: "explanation",
  rules: [
    {
      required: true,
      message: "Please type Explanation for the answers!",
    },
  ],
  hasFeedback: true,
};

export const waitageFieldStruct = {
  label: "Weightage",
  name: "marks",
  rules: [
    {
      required: true,
      message: "Please enter the marks!",
    },
  ],
  hasFeedback: true,
};

export const correctAnsStruct = {
  label: "Is It Right Answer?",
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
