//Subject
const initialState = {
  trainerTestModalState: false,
  trainerTestModalMode: "COMPLETE",

  trainerTestsLoading: false,
  trainerTests: [],

  trainerTestLoading: false,
  trainerTestDetails: null,

  trainerTestCurrentRegistrationLink: "",
};

const trainerTestAction = (state = initialState, action) => {
  switch (action.type) {
    case "TEST_MODIFY_ACTION":
      return {
        ...state,
        trainerTestModalState: action.state,
        trainerTestModalMode: action.mode,
      };

    case "TESTS":
      return {
        ...state,
        trainerTestsLoading: action.loading,
        trainerTests: action.data,
      };

    case "TEST":
      return {
        ...state,
        trainerTestLoading: action.loading,
        trainerTestDetails: action.data,
      };

    case "SET_TEST_REGISTRATION_LINK":
      return {
        ...state,
        trainerTestCurrentRegistrationLink: action.link,
      };

    default:
      return state;
  }
};

export default trainerTestAction;
