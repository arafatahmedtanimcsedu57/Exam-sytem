import apis from "../services/Apis";
import { SecurePost, SecureGet } from "../services/axiosCall";

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

export const getTest = (testId) => (dispatch) => {
  dispatch({
    type: "TEST",
    loading: true,
    data: null,
  });

  SecureGet({ url: `${apis.TEST}/${testId}` })
    .then((response) => {
      if (response.data.success) {
        const { questions } = response.data.data;

        console.log(response, questions, "BAL");
        dispatch({
          type: "TEST",
          loading: false,
          data: {
            ...response.data.data,
            totalMarks: questions.reduce(
              (prev, curr) => prev + curr.weightAge,
              0
            ),
          },
        });
      } else {
        dispatch({
          type: "TEST",
          loading: false,
          data: null,
        });
      }
    })
    .catch(() => {
      dispatch({
        type: "TEST",
        loading: false,
        data: null,
      });
    });
};

export const setLink = (mainlink, testId) => (dispatch) => {
  const link = mainlink + `trainee/register?testId=${testId}`;

  dispatch({
    type: "SET_TEST_REGISTRATION_LINK",
    link,
  });
};
