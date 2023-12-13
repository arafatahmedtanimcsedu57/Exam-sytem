import apis from "../services/Apis";
import { SecureGet, SecurePost } from "../services/axiosCall";

export const setSubjectModifyAction = (subjectId, state, mode) => (
  dispatch
) => {
  dispatch({
    type: "SUBJECT_MODIFY_ACTION",
    state,
    subjectId,
    mode,
  });
};

export const getSubject = (id) => (dispatch) => {
  SecureGet({
    url: `${apis.SUBJECT}/${id}`,
  })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: "SUBJECT",
          details: response.data.data[0],
        });
      } else return "Server Error";
    })
    .catch((err) => {
      return "Server Error";
    });
};

export const getSubjects = () => (dispatch) => {
  dispatch({
    type: "SUBJECTS",
    loading: true,
    data: [],
  });
  SecureGet({
    url: `${apis.SUBJECT}`,
  })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: "SUBJECTS",
          loading: false,
          data: response.data.data,
        });
      } else {
        dispatch({
          type: "SUBJECTS",
          loading: false,
          data: [],
        });
      }
    })
    .catch(() => {
      dispatch({
        type: "SUBJECTS",
        loading: false,
        data: [],
      });
    });
};
