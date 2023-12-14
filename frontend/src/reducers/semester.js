const initialState = {
  semesterModalState: false,
  semesterModalMode: "COMPLETE",
  smesterId: null,
  semesterDetails: null,
  semestersLoading: false,
  semesters: [],
};

const semesterAction = (state = initialState, action) => {
  switch (action.type) {
    case "SEMESTER_MODIFY_ACTION":
      return {
        ...state,
        semesterModalState: action.state,
        semesterId: action.semesterId,
        semesterModalMode: action.mode,
        semesterDetails: null,
      };

    case "SEMESTER":
      return {
        ...state,
        semesterDetails: action.details,
      };
    case "SEMESTERS":
      return {
        ...state,
        semestersLoading: action.loading,
        semesters: action.data,
      };
    default:
      return state;
  }
};

export default semesterAction;
