import apis from "../services/Apis";
import { SecurePost } from "../services/axiosCall";

//state = Is modal open or close?
export const handleQuestionModalState = (state) => (dispatch) => {
  dispatch({
    type: "CHANGE_QUESTION_MODAL_STATE",
    state,
  });
};

export const handleQuestionTableData = (selectedSubjects) => (dispatch) => {
  dispatch({
    type: "CHANGE_QUESTION_TABLE_LOADING_STATUS",
    loading: true,
    data: [],
  });
  SecurePost({
    url: `${apis.GET_ALL_QUESTIONS}`,
    data: {
      subject: selectedSubjects,
    },
  })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: "CHANGE_QUESTION_TABLE_LOADING_STATUS",
          loading: false,
          data: response.data.data,
        });
      } else {
        dispatch({
          type: "CHANGE_QUESTION_TABLE_LOADING_STATUS",
          loading: false,
          data: [],
        });
      }
    })
    .catch(() => {
      dispatch({
        type: "CHANGE_QUESTION_TABLE_LOADING_STATUS",
        loading: false,
        data: [],
      });
    });
};

export const handleSelectedSubjects = (selectedSubjects) => (dispatch) => {
  dispatch({
    type: "CHANGE_SELECTED_SUBJECT",
    selectedSubjects,
  });
};

// state = Is modal open or close ?
//id = test ID
export const handleTestDetailsModal = (state, id) => (dispatch) => {
  dispatch({
    type: "CHANGE_TEST_DETAILS_MODAL_STATE",
    state,
    id,
  });
};

export const handleTestTableData = () => (dispatch) => {
  dispatch({
    type: "CHANGE_TEST_TABLE_LOADING_STATUS",
    loading: true,
    data: [],
  });
  SecurePost({
    url: `${apis.GET_ALL_TESTS}`,
  })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: "CHANGE_TEST_TABLE_LOADING_STATUS",
          loading: false,
          data: response.data.data,
        });
      } else {
        dispatch({
          type: "CHANGE_TEST_TABLE_LOADING_STATUS",
          loading: false,
          data: [],
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: "CHANGE_TEST_TABLE_LOADING_STATUS",
        loading: false,
        data: [],
      });
    });
};

export const updateQuestiosnActiveTest = (d) => {
  return {
    type: "CHANGE_CURRENT_ACTIVE_TEST_QUESTION",
    payload: d,
  };
};
