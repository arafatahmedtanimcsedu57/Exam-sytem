import apis from "../services/Apis";
import { SecurePost } from "../services/axiosCall";

export const handleStep = (currentStep) => (dispatch) => {
  dispatch({
    type: "CHANGE_ACTIVE_STEP",
    currentStep,
  });
};

export const handleBasicNewTestDetails = (newTestBasicData) => (dispatch) => {
  dispatch({
    type: "CHANGE_BASIC_NEW_TEST_DETAILS",
    newTestBasicData,
  });
};

export const pushQuestionToQueue = (question) => (dispatch) => {
  dispatch({
    type: "ADD_QUESTION_TO_QUESTION_QUEUE",
    question,
  });
};

export const removeQuestionFromMainQueue = (question) => (dispatch) => {
  dispatch({
    type: "REMOVE_QUESTION_FROM_MAIN_QUEUE",
    question,
  });
};

//mode = auto or menual
export const changeMode = (mode) => (dispatch) => {
  dispatch({
    type: "CHANGE_MODE_QUESTION_SELECT",
    mode,
  });
};
