//Subject
const initialState = {
  subjectModalState: false,
  subjectModalMode: "COMPLETE",
  subjectId: null,
  subjectDetails: null,
  subjectsLoading: false,
  subjects: [],
};

const subjectAction = (state = initialState, action) => {
  switch (action.type) {
    case "SUBJECT_MODIFY_ACTION":
      return {
        ...state,
        subjectModalState: action.state,
        subjectId: action.subjectId,
        subjectModalMode: action.mode,
        subjectDetails: null,
      };

    case "SUBJECT":
      return {
        ...state,
        subjectDetails: action.details,
      };

    case "SUBJECTS":
      return {
        ...state,
        subjectsLoading: action.loading,
        subjects: action.data,
      };
    default:
      return state;
  }
};

export default subjectAction;
