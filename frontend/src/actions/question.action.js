import apis from "../services/Apis";
import { SecureGet } from "../services/axiosCall";

export const setQuestionModifyAction = (questionId, state, mode) => (
  dispatch
) => {
  dispatch({
    type: "QUESTION_MODIFY_ACTION",
    state,
    questionId,
    mode,
  });
};

export const setQuestionUploadAction = (state, mode) => (dispatch) => {
  dispatch({
    type: "QUESTION_UPLOAD_ACTION",
    state,
    mode,
  });
};

export const getQuestion = (id) => (dispatch) => {
  SecureGet({
    url: `${apis.QUESTION}/${id}`,
  })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: "QUESTION",
          details: {
            ...response.data.data[0],
          },
        });
      } else return "Server Error";
    })
    .catch((err) => {
      return "Server Error";
    });
};

export const getQuestions = (subjects = [], tags = []) => (dispatch) => {
  console.log(subjects);
  dispatch({
    type: "QUESTIONS",
    loading: true,
    data: [],
  });
  SecureGet({
    url: `${apis.QUESTION}`,
    params: {
      subjects,
      tags,
    },
  })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: "QUESTIONS",
          loading: false,
          data: response.data.data,
        });
      } else {
        dispatch({
          type: "QUESTIONS",
          loading: false,
          data: [],
        });
      }
    })
    .catch(() => {
      dispatch({
        type: "QUESTIONS",
        loading: false,
        data: [],
      });
    });
};
