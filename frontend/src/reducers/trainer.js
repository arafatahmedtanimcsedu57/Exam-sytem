//traineer
const initialState = {
  trainerModalState: false,
  trainerModalMode: "COMPLETE",
  trainerId: null,
  trainerDetails: null,
  trainersLoading: false,
  trainers: [],

  questionModalState: false,

  questionTableLoading: false,
  questionTableData: [],

  selectedSubjects: [],

  QuestionsearchText: "",

  testTableLoading: false,
  testTableData: [],

  activeTestDetails: {
    testId: null,
    testquestions: [],
  },
};

const trainerAction = (state = initialState, action) => {
  switch (action.type) {
    case "TRAINER_MODIFY_ACTION":
      return {
        ...state,
        trainerModalState: action.state,
        trainerId: action.trainerId,
        trainerModalMode: action.mode,
        trainerDetails: null,
      };

    case "TRAINER":
      return {
        ...state,
        trainerDetails: action.details,
      };

    case "TRAINERS":
      return {
        ...state,
        trainersLoading: action.loading,
        trainers: action.data,
      };

    case "CHANGE_QUESTION_MODAL_STATE":
      return {
        ...state,
        questionModalState: action.state,
      };

    case "CHANGE_QUESTION_TABLE_LOADING_STATUS":
      return {
        ...state,
        questionTableLoading: action.loading,
        questionTableData: action.data,
      };

    case "CHANGE_SELECTED_SUBJECT":
      return {
        ...state,
        selectedSubjects: action.selectedSubjects,
      };

    case "CHANGE_TEST_DETAILS_MODAL_STATE":
      return {
        ...state,
        testDetailsModalState: action.state,
        activeTestDetails: {
          ...state.activeTestDetails,
          testId: action.id,
        },
      };

    case "CHANGE_TEST_TABLE_LOADING_STATUS":
      return {
        ...state,
        testTableLoading: action.loading,
        testTableData: action.data,
      };
    case "CHANGE_CURRENT_ACTIVE_TEST_QUESTION":
      return {
        ...state,
        activeTestDetails: {
          ...state.activeTestDetails,
          testquestions: action.payload,
        },
      };
    default:
      return state;
  }
};

export default trainerAction;
