//Subject
const initialState = {
  trainerTestModalState: false,
  trainerTestModalMode: "COMPLETE",

  trainerTestsLoading: false,
  trainerTests: [],
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

    default:
      return state;
  }
};

export default trainerTestAction;
