const initialState = {
  id: null,
  testRegisterLink: "",
  basicTestDetails: {
    isRegistrationavailable: false,
    testbegins: false,
    testconducted: false,
    isResultgenerated: false,
  },
  resultTestId: null,
  registeredCandidates: [],
  questionsOfTest: [],
};
const conductTestAction = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CONDUCT_TEST_ID":
      return {
        ...state,
        id: action.id,
      };

    case "SET_CONDUCT_RESULT_TEST_ID":
      return {
        ...state,
        resultTestId: action.id,
      };

    case "SET_TEST_REGISTER_LINK":
      return {
        ...state,
        testRegisterLink: action.link,
      };

    case "UPDATE_TEST_BASIC_DETAILS":
      return {
        ...state,
        basicTestDetails: action.details,
      };

    case "CHANGE_TEST_ISREGISTRATION_AVAILABLE":
      return {
        ...state,
        basicTestDetails: {
          ...state.basicTestDetails,
          isRegistrationavailable: action.isRegistrationavailable,
        },
      };
    case "CHANGE_BEGIN_TEST_STATUS":
      return {
        ...state,
        basicTestDetails: action.details,
      };
    case "CHANGE_CANDIDATES_OF_TEST":
      return {
        ...state,
        registeredCandidates: action.candidates,
      };
    case "CHANGE_QUESTIONS_OF_TEST":
      return {
        ...state,
        questionsOfTest: action.questions,
      };
    default:
      return state;
  }
};

export default conductTestAction;
