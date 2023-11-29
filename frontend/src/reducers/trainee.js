const initialState = {
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

export default (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
