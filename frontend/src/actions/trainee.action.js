import apis from "../services/Apis";
import Alert from "../components/common/alert";
import { Post } from "../services/axiosCall";

let parse_time = (d) => {
  var minutesLeft = Math.floor(d / 60);
  var secondsLeft = Number(String(d % 60).slice(0, 2));
  return {
    minutesLeft: minutesLeft,
    secondsLeft: secondsLeft,
  };
};

export const getTrainee = (id) => (dispatch) => {
  dispatch({
    type: "TRAINEE",
    loading: true,
    data: null,
    error: "",
  });

  Post({
    url: `${apis.TRAINEE}/details`,
    data: { _id: id },
  })
    .then((response) => {
      const {
        data: { data, message },
      } = response;

      if (response.data.success) {
        dispatch({
          type: "TRAINEE",
          loading: false,
          data,
          error: "",
        });
      } else {
        dispatch({
          type: "TRAINEE",
          loading: false,
          data: null,
          error: message,
        });
      }
    })
    .catch((err) => {
      const {
        response: {
          data: { message },
        },
      } = err;
      dispatch({
        type: "TRAINEE",
        loading: false,
        data: null,
        error: message,
      });
    });
};

export const fetchExamState = (testId, traineeId) => (dispatch) => {
  dispatch({
    type: "FETCH_EXAM_STATE",
    data: null,
  });

  Post({
    url: apis.FETCH_TRAINEE_TEST_DETAILS, // flags api
    data: {
      testId,
      traineeId,
    },
  })
    .then((response) => {
      const {
        data: { data, message, error },
      } = response;

      if (response.data.success) {
        dispatch({
          type: "FETCH_EXAM_STATE_SUCCESS",
          data,
        });
      } else {
        dispatch({
          type: "FETCH_EXAM_STATE_FAILED",
          error: message || error,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: "FETCH_EXAM_STATE_FAILED",
        error: err,
      });
    });
};

export const fetchAnsweerSheet = (testId, traineeId) => (dispatch) => {
  dispatch({
    type: "GET_ANSWER_SHEET",
    data: null,
  });

  Post({
    url: apis.START_TEST,
    data: {
      testId,
      traineeId,
    },
  })
    .then((response) => {
      const {
        data: { data, message, error },
      } = response;

      if (response.data.success) {
        console.log(response.data);
        dispatch({
          type: "GET_ANSWER_SHEET_SUCCESS",
          data,
        });
      } else {
        dispatch({
          type: "GET_ANSWER_SHEET_FAILED",
          error: message || error,
        });
      }
    })
    .catch((err) => {
      const {
        response: {
          data: { message, error },
        },
      } = err;

      dispatch({
        type: "GET_ANSWER_SHEET_FAILED",
        error: message || error,
      });
    });
};

export const completed = (d) => (dispatch) => {
  dispatch({
    type: "TEST_DONE_LOCAL",
  });
};

export const fetchTestdata = (testId, traineeId) => (dispatch) => {
  Post({
    url: apis.FETCH_TRAINEE_TEST_DETAILS,
    data: { testId, traineeId },
  })
    .then((response) => {
      if (response.data.success) {
        const {
          testBegins,
          startedWriting,
          testConducted,
          completed,
          pending,
        } = response.data.data;

        if (completed || !startedWriting)
          dispatch({
            type: "FETCH_TEST_FLAG",
            testBegins,
            startedWriting,
            testConducted,
            completed,
            minutesLeft: 0,
            secondsLeft: 0,
          });
        else {
          let t = parse_time(pending);
          const { minutesLeft, secondsLeft } = t;

          dispatch({
            type: "FETCH_TEST_FLAG",
            testBegins,
            startedWriting,
            testConducted,
            completed,
            minutesLeft,
            secondsLeft,
          });
        }
      } else dispatch({ type: "invalidUrl" });
    })
    .catch(() => dispatch({ type: "invalidUrl" }));
};

export const ProceedtoTest = (d1, d2, d3) => (dispatch) => {
  console.log(`Hello from ins${d1},${d2}`);
  dispatch({
    type: "PROCEEDING_TO_TEST",
    payload: true,
  });
  Post({
    url: `${apis.PROCEED_TO_TEST}`,
    data: {
      testId: d1,
      userId: d2,
    },
  })
    .then((response) => {
      console.log(response);
      if (!response.data.success) {
        Alert("error", "Error!", response.data.message);
      }
      d3();
      dispatch({
        type: "PROCEEDING_TO_TEST",
        payload: false,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: "PROCEEDING_TO_TEST",
        payload: false,
      });
      Alert("error", "Error!", "Server error");
    });
};

export const fetchTraineeTestQuestions = (tid) => (dispatch) => {
  Post({
    url: `${apis.FETCH_TRAINEE_TEST_QUESTION}`,
    data: {
      id: tid,
    },
  })
    .then((response) => {
      console.log(response.data);
      if (response.data.success) {
        dispatch({
          type: "UPDATE_TRAINEE_TEST_QUESTIONS",
          payload: response.data.data,
        });
      } else {
        Alert("error", "Error!", response.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
      Alert("error", "Error!", "Server error");
    });
};

export const fetchTraineeTestAnswerSheet = (tid, uid) => (dispatch) => {
  Post({
    url: `${apis.FETCH_TRAINEE_TEST_ANSWERSHEET}`,
    data: {
      testId: tid,
      userId: uid,
    },
  })
    .then((response) => {
      if (response.data.success) {
        console.log(response.data.data);
        var d = response.data.data.answers.map((d, i) => {
          if (d.chosenOption.length === 0) {
            return {
              ...d,
              isMarked: false,
              isAnswered: false,
            };
          } else {
            return {
              ...d,
              isMarked: false,
              isAnswered: true,
            };
          }
        });
        dispatch({
          type: "UPDATE_TRAINEE_TEST_ANSWERSHEET",
          payload: d,
        });
      } else {
        Alert("error", "Error!", response.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
      Alert("error", "Error!", "Server error");
    });
};

export const switchQuestion = (d1) => {
  return {
    type: "SWITCH_QUESTION",
    payload: d1,
  };
};

export const updateIsMarked = (d1) => {
  return {
    type: "UPDATE_TRAINEE_TEST_ANSWERSHEET",
    payload: d1,
  };
};

export const FeedbackStatus = (s) => {
  return {
    type: "SET_HAS_GIVEN_FEEDBACK",
    payload: s,
  };
};
