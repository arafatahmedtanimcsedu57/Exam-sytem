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
    placeholder: "Select a subject",
    optionFilterProp: "s",
  },
};

export const difficultyStruct = {
  difficultyField: {
    label: "Difficulty",
    name: "difficulty",
    // rules: [
    //   {
    //     message: "Please select any difficulty!",
    //   },
    // ],
  },

  select: {
    showSearch: true,
    placeholder: "Select difficulty",
    optionFilterProp: "s",
  },
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

export const tagFieldStruct = {
  label: "Tags",
  name: "tags",
};

export const optionsStruct = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
    textAlign: "start",
  },
  name: "options",
  label: "Options",
  rules: [
    {
      validator: async (_, options) => {
        if (!options || options.length < 4) {
          return Promise.reject(new Error("At least 4 options"));
        }

        if (
          !options.reduce((acc, curr) => {
            return curr?.isAnswer || acc;
          }, false)
        ) {
          return Promise.reject(new Error("At least 1 correct answer"));
        }
      },
    },
  ],
};

export const optionFieldStruct = {
  rules: [{ required: true, message: "Missing option" }],
};

export const correctAnsStruct = {
  // label: "Is It Right Answer?",
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

export const questionsFieldStruct = {
  label: "Questions",
  name: "questions",
  // noStyle: true,
  rules: [
    {
      required: true,
      message: "Please upload a JSON File with questions!",
    },
  ],
  hasFeedback: true,
};

export const questionsFileUploadStruct = {
  accept: ".json",
  maxCount: 1,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
};
