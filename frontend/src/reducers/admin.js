const initialState = {
  trainerModalState: false,
  trainerId: null,
  trainerMode: "COMPLETE",
  trainerdetails: {},

  trainerTableLoading: false,
  trainerTableData: [],

  subjectModalState: false,
  subjectId: null,
  subjectMode: "COMPLETE",
  subjectDetails: {},

  subjectTableLoading: false,
  subjectTableData: [],

  tagsLoading: false,
  tags: [],
};

const adminAction = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_TRAINER_MODAL_STATE":
      return {
        ...state,
        trainerModalState: action.state,
        trainerId: action.id,
        trainerMode: action.mode,
        trainerDetails: action.details,
      };

    case "CHANGE_TRAINER_TABLE_LOADING_STATUS":
      return {
        ...state,
        trainerTableLoading: action.loading,
        trainerTableData: action.data,
      };

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

    default:
      return state;
  }
};

export default adminAction;
