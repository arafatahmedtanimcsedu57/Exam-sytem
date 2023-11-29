const initialState = {
  testRegisterLink: "",
  registeredCandidates: [],
  testDetails: {
    createdBy: null,
    difficulty: null,
    duration: null,
    isRegistrationAvailable: false,
    isResultGenerated: false,
    organisation: "",
    questions: [],
    subjects: [],
    testBegins: false,
    testConducted: false,
    title: "",
    type: "",
  },
};

const conductTestAction = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TEST_REGISTER_LINK":
      return {
        ...state,
        testRegisterLink: action.link,
      };

    case "UPDATE_TEST_BASIC_DETAILS":
      return {
        ...state,
        testDetails: action.details,
      };

    case "CHANGE_TEST_ISREGISTRATION_AVAILABLE":
      return {
        ...state,
        testDetails: {
          ...state.testDetails,
          isRegistrationAvailable: action.isRegistrationAvailable,
        },
      };
    case "CHANGE_BEGIN_TEST_STATUS":
      return {
        ...state,
        testDetails: {
          ...state.testDetails,
          ...action.details,
        },
      };
    case "CHANGE_CANDIDATES_OF_TEST":
      return {
        ...state,
        registeredCandidates: action.candidates,
      };
    case "FETCH_TEST_DETAILS":
      return {
        ...state,
        testDetails: action.details,
      };
    default:
      return state;
  }
};

export default conductTestAction;
