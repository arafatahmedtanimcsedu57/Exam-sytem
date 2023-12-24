import apis from "../services/Apis";
import { SecureGet, SecurePost } from "../services/axiosCall";

export const setSectionModifyAction = (sectionId, state, mode) => (
  dispatch
) => {
  dispatch({
    type: "SECTION_MODIFY_ACTION",
    state,
    sectionId,
    mode,
  });
};

export const getSection = (id) => (dispatch) => {
  SecureGet({
    url: `${apis.SECTION}/${id}`,
  })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: "SECTION",
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

export const getSections = () => (dispatch) => {
  dispatch({
    type: "SECTIONS",
    loading: true,
    data: [],
  });
  SecureGet({
    url: `${apis.SECTION}`,
  })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: "SECTIONS",
          loading: false,
          data: response.data.data,
        });
      } else {
        dispatch({
          type: "SECTIONS",
          loading: false,
          data: [],
        });
      }
    })
    .catch(() => {
      dispatch({
        type: "SECTIONS",
        loading: false,
        data: [],
      });
    });
};

export const getSectionBySubject = (subjectIds) => (dispatch) => {
  dispatch({
    type: "SECTIONS_BY_SUBJECT",
    loading: true,
    data: [],
  });
  SecurePost({
    url: `${apis.SECTION}/subject`,
    data: {
      subjectIds,
    },
  })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: "SECTIONS_BY_SUBJECT",
          loading: false,
          data: response.data.data,
        });
      } else {
        dispatch({
          type: "SECTIONS_BY_SUBJECT",
          loading: false,
          data: [],
        });
      }
    })
    .catch(() => {
      dispatch({
        type: "SECTIONS_BY_SUBJECT",
        loading: false,
        data: [],
      });
    });
};
