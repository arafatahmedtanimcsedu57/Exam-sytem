//Subject
const initialState = {
  trainerTestModalState: false,
  trainerTestModalMode: "COMPLETE",
  // trainerTestId: null,
  // trainerTestDetails: null,
  // trainerTestsLoading: false,
  // trainerTests: [],
};

const trainerTestAction = (state = initialState, action) => {
  switch (action.type) {
    case "TEST_MODIFY_ACTION":
      return {
        ...state,
        trainerTestModalState: action.state,
        trainerTestModalMode: action.mode,
      };

    // case "SUBJECT":
    //   return {
    //     ...state,
    //     subjectDetails: action.details,
    //   };

    // case "SUBJECTS":
    //   return {
    //     ...state,
    //     subjectsLoading: action.loading,
    //     subjects: action.data,
    //   };
    default:
      return state;
  }
};

export default trainerTestAction;
