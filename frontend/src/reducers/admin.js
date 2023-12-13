const initialState = {
  subjectModalState: false,
  subjectId: null,
  subjectMode: "COMPLETE",
  subjectDetails: {},

  subjectTableLoading: false,
  subjectTableData: [],

  tagsLoading: false,
  tags: [],

  semesterModalState: false,
  semesterModalMode: "COMPLETE",
  semestersLoading: false,
  semesters: [],
};

const adminAction = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_SUBJECT_MODAL_STATE":
      return {
        ...state,
        subjectModalState: action.state,
        subjectId: action.id,
        subjectMode: action.mode,
        subjectDetails: action.details,
      };

    case "CHANGE_SUBJECT_TABLE_LOADING_STATUS":
      return {
        ...state,
        subjectTableLoading: action.loading,
        subjectTableData: action.data,
      };

    case "GET_TAGS":
      return {
        ...state,
        tagsLoading: action.loading,
        tags: action.data,
      };

    case "GET_SEMESTERS": {
      return {
        ...state,
        semestersLoading: action.loading,
        semesters: action.data,
      };
    }
    default:
      return state;
  }
};

export default adminAction;
