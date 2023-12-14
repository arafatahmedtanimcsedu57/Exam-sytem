import apis from "../services/Apis";
import { SecureGet } from "../services/axiosCall";

export const setSemesterModifyAction = (semesterId, state, mode) => (
  dispatch
) => {
  dispatch({
    type: "SEMESTER_MODIFY_ACTION",
    state,
    semesterId,
    mode,
  });
};

export const getSemester = (id) => (dispatch) => {
  SecureGet({
    url: `${apis.SEMESTER}/${id}`,
  })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: "SEMESTER",
          details: response.data.data[0],
        });
      } else return "Server Error";
    })
    .catch(() => {
      return "Server Error";
    });
};

export const getSemesters = () => (dispatch) => {
  dispatch({
    type: "SEMESTERS",
    loading: true,
    data: [],
  });
  SecureGet({
    url: `${apis.SEMESTER}`,
  })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: "SEMESTERS",
          loading: false,
          data: response.data.data,
        });
      } else {
        dispatch({
          type: "SEMESTERS",
          loading: false,
          data: [],
        });
      }
    })
    .catch(() => {
      dispatch({
        type: "SEMESTERS",
        loading: false,
        data: [],
      });
    });
};
