export const setTestRegisterLink = (link) => (dispatch) => {
  dispatch({
    type: "SET_TEST_REGISTER_LINK",
    link,
  });
};

export const handleTestRegisterStatus = (isRegistrationAvailable) => (
  dispatch
) => {
  dispatch({
    type: "CHANGE_TEST_ISREGISTRATION_AVAILABLE",
    isRegistrationAvailable,
  });
};

export const handleTestStatus = (details) => (dispatch) => {
  dispatch({
    type: "CHANGE_BEGIN_TEST_STATUS",
    details,
  });
};

export const updateCandidatesTest = (candidates) => (dispatch) => {
  dispatch({
    type: "CHANGE_CANDIDATES_OF_TEST",
    candidates,
  });
};
