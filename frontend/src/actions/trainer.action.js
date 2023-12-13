import apis from "../services/Apis";
import { SecurePost, SecureGet } from "../services/axiosCall";

export const setTrainerModifyAction = (trainerId, state, mode) => (
  dispatch
) => {
  dispatch({
    type: "TRAINER_MODIFY_ACTION",
    state,
    trainerId,
    mode,
  });
};

export const getTrainer = (id) => (dispatch) => {
  SecureGet({
    url: `${apis.TRAINER}/${id}`,
  })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: "TRAINER",
          details: {
            ...response.data.data[0],
            contact: response.data.data[0].contact.slice(4),
            prefix: response.data.data[0].contact.slice(0, 4),
          },
        });
      } else return "Server Error";
    })
    .catch((err) => {
      return "Server Error";
    });
};

export const getTrainers = () => (dispatch) => {
  dispatch({
    type: "TRAINERS",
    loading: true,
    data: [],
  });
  SecureGet({
    url: `${apis.TRAINER}`,
  })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: "TRAINERS",
          loading: false,
          data: response.data.data,
        });
      } else {
        dispatch({
          type: "TRAINERS",
          loading: false,
          data: [],
        });
      }
    })
    .catch(() => {
      dispatch({
        type: "TRAINERS",
        loading: false,
        data: [],
      });
    });
};

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
