import apis from "../services/Apis";
import { SecurePost } from "../services/axiosCall";

export const setTestAction = (state, mode) => (dispatch) => {
  dispatch({
    type: "TEST_MODIFY_ACTION",
    state,
    mode,
  });
};

export const getTests = (subjects = []) => (dispatch) => {
  dispatch({
    type: "TESTS",
    loading: true,
    data: [],
  });

  SecurePost({
    url: `${apis.TEST}/trainer-test`,
    data: {
      subjects,
    },
  })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: "TESTS",
          loading: false,
          data: response.data.data,
        });
      } else {
        dispatch({
          type: "TESTS",
          loading: false,
          data: [],
        });
      }
    })
    .catch(() => {
      dispatch({
        type: "TESTS",
        loading: false,
        data: [],
      });
    });
};
