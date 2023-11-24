import { SecurePost } from "../services/axiosCall";
import apis from "../services/Apis";

//id = test ID
export const setConductTestId = (id) => (dispatch) => {
  dispatch({
    type: "SET_CONDUCT_TEST_ID",
    id,
  });
};

export const setTestRegisterLink = (link) => (dispatch) => {
  dispatch({
    type: "SET_TEST_REGISTER_LINK",
    link,
  });
};

export const handleTestRegisterStatus = (isRegistrationavailable) => (
  dispatch
) => {
  dispatch({
    type: "CHANGE_TEST_ISREGISTRATION_AVAILABLE",
    isRegistrationavailable,
  });
};

export const handleTestStatus = (details) => (dispatch) => {
  dispatch({
    type: "CHANGE_BEGIN_TEST_STATUS",
    details,
  });
};

export const updateCurrentTestBasicDetails = (id) => (dispatch) => {
  SecurePost({
    url: `${apis.GET_SINGLE_TEST_DETAILS_BASIC}`,
    data: {
      id,
    },
  })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: "UPDATE_TEST_BASIC_DETAILS",
          details: response.data.data,
        });
      } else return response.data.message;
    })
    .catch(() => "Unable to refresh test status");
};

export const updateCandidatesTest = (candidates) => (dispatch) => {
  dispatch({
    type: "CHANGE_CANDIDATES_OF_TEST",
    candidates,
  });
};

export const updateQuestiosnTest = (questions) => {
  return {
    type: "CHANGE_QUESTIONS_OF_TEST",
    questions,
  };
};
