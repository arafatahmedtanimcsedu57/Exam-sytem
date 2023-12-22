const initialState = {
  traineeInfo: {
    loading: false,
    data: null,
    error: "",
  },

  examState: {
    loading: false,
    data: null,
    error: "",
  },

  testInfo: {
    loading: false,
    data: null,
    error: "",
  },

  proceedingToTest: false,
  invalidUrl: false,
  testId: null,
  traineeId: null,
  initialloading1: true,
  initialloading2: true,
  testBegins: true,
  startedWriting: true,
  testConducted: false,
  completed: true,
  minutesLeft: 0,
  secondsLeft: 0,
  traineeDetails: {
    name: "",
    emailId: "",
    contact: "",
  },
  activeQuestionIndex: 0,
  questions: [],
  answers: [],
  hasGivenFeedBack: false,
};

const trainee = (state = initialState, action) => {
  switch (action.type) {
    case "TRAINEE":
      return {
        ...state,
        traineeInfo: {
          ...state.traineeInfo,
          loading: action.loading,
          data: action.data,
          error: action.error,
        },
      };

    case "FETCH_EXAM_STATE":
      return {
        ...state,
        examState: {
          ...state.examState,
          loading: true,
          data: null,
          error: "",
        },
        testInfo: {
          ...state.testInfo,
          data: null,
        },
      };
    case "FETCH_EXAM_STATE_SUCCESS":
      return {
        ...state,
        examState: {
          ...state.examState,
          loading: false,
          data: { ...action.data.examInfo },
          error: "",
        },
        testInfo: {
          ...state.testInfo,
          data: { ...action.data.testInfo },
        },
      };
    case "FETCH_EXAM_STATE_FAILED":
      return {
        ...state,
        examState: {
          ...state.examState,
          loading: false,
          data: null,
          error: action.error,
        },
        testInfo: {
          ...state.testInfo,
          data: null,
        },
      };

    case "GET_ANSWER_SHEET":
      return {
        ...state,
        examState: {
          ...state.examState,
          loading: true,
        },
      };
    case "GET_ANSWER_SHEET_SUCCESS":
      return {
        ...state,
        examState: {
          ...state.examState,
          loading: false,
          data: {
            ...state.examState.data,
            ...action.data,
          },
        },
      };
    case "GET_ANSWER_SHEET_FAILED":
      return {
        ...state,
        examState: {
          ...state.examState,
          loading: false,
          data: {
            ...state.examState.data,
            remainingTime: null,
          },
          error: action.error,
        },
      };

    case "SET_HAS_GIVEN_FEEDBACK":
      return {
        ...state,
        hasGivenFeedBack: action.payload,
      };
    case "SET_TRAINEE_TEST_DETAILS":
      return {
        ...state,
        testId: action.payload1,
        traineeId: action.payload2,
      };
    case "FETCH_TEST_FLAG":
      return {
        ...state,
        testBegins: action.testBegins,
        startedWriting: action.startedWriting,
        testConducted: action.testConducted,
        completed: action.completed,
        minutesLeft: action.minutesLeft,
        secondsLeft: action.secondsLeft,
        initialloading1: false,
      };
    case "INVALID_TEST_URL":
      return {
        ...state,
        invalidUrl: true,
      };
    case "TEST_DONE_LOCAL":
      return {
        ...state,
        completed: true,
      };
    case "PROCEEDING_TO_TEST":
      return {
        ...state,
        proceedingToTest: action.payload,
      };
    case "SWITCH_QUESTION":
      return {
        ...state,
        activeQuestionIndex: action.payload,
      };
    case "FETCH_LOGGED_IN_TRAINEE":
      return {
        ...state,
        initialloading2: false,
        traineeDetails: action.payload,
      };
    case "UPDATE_TRAINEE_TEST_QUESTIONS":
      return {
        ...state,
        questions: action.payload,
      };
    case "UPDATE_TRAINEE_TEST_ANSWERSHEET":
      return {
        ...state,
        answers: action.payload,
      };

    case "RESET_TO_INITIALSTATE":
      return {
        proceedingToTest: false,
        invalidUrl: false,
        testId: null,
        traineeId: null,
        testBegins: true,
        startedWriting: true,
        testConducted: false,
        completed: true,
        minutesLeft: 0,
        secondsLeft: 0,
        traineeDetails: {
          name: "",
          emailId: "",
          contact: "",
        },
        activeQuestionIndex: 0,
        questions: [],
        answers: [],
        hasGivenFeedBack: false,
      };
    default:
      return state;
  }
};

export default trainee;
