import apis from "../services/Apis";
import { SecureGet } from "../services/axiosCall";

export const handleSubjectModalState = (state, id, mode) => (dispatch) => {
  if (mode === "UPDATE") {
    SecureGet({
      url: `${apis.SUBJECT}/${id}`,
    })
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: "CHANGE_SUBJECT_MODAL_STATE",
            state,
            id,
            mode,
            details: response.data.data[0],
          });
        } else return response.data.message;
      })
      .catch(() => "Server Error");
  } else {
    dispatch({
      type: "CHANGE_SUBJECT_MODAL_STATE",
      state,
      id,
      mode,
      details: {
        topic: null,
      },
    });
  }
};

export const handleSubjectTableData = () => (dispatch) => {
  dispatch({
    type: "CHANGE_SUBJECT_TABLE_LOADING_STATUS",
    loading: true,
    data: [],
  });
  SecureGet({
    url: `${apis.SUBJECT}`,
  })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: "CHANGE_SUBJECT_TABLE_LOADING_STATUS",
          loading: false,
          data: response.data.data,
        });
      } else {
        dispatch({
          type: "CHANGE_SUBJECT_TABLE_LOADING_STATUS",
          loading: false,
          data: [],
        });
      }
    })
    .catch(() => {
      dispatch({
        type: "CHANGE_SUBJECT_TABLE_LOADING_STATUS",
        loading: false,
        data: [],
      });
    });
};

export const getTags = () => (dispatch) => {
  dispatch({
    type: "GET_TAGS",
    loading: true,
    data: [],
  });
  SecureGet({
    url: `${apis.GET_TAGS}`,
  })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: "GET_TAGS",
          loading: false,
          data: response.data.data,
        });
      } else {
        dispatch({
          type: "GET_TAGS",
          loading: false,
          data: [],
        });
      }
    })
    .catch(() => {
      dispatch({
        type: "GET_TAGS",
        loading: false,
        data: [],
      });
    });
};

export const handleSemestertModalState = (state, id, mode) => (dispatch) => {
  if (mode === "UPDATE") {
    SecureGet({
      url: `${apis.GET_SINGLE_SUBJECT_DETAILS}/${id}`,
    })
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: "CHANGE_SUBJECT_MODAL_STATE",
            state,
            id,
            mode,
            details: response.data.data[0],
          });
        } else return response.data.message;
      })
      .catch(() => "Server Error");
  } else {
    dispatch({
      type: "CHANGE_SUBJECT_MODAL_STATE",
      state,
      id,
      mode,
      details: {
        topic: null,
      },
    });
  }
};

export const getSemesters = () => (dispatch) => {
  dispatch({
    type: "GET_SEMESTERS",
    loading: true,
    data: [],
  });
  SecureGet({
    url: `${apis.GET_SEMESTERS}`,
  })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: "GET_SEMESTERS",
          loading: false,
          data: response.data.data,
        });
      } else {
        dispatch({
          type: "GET_SEMESTERS",
          loading: false,
          data: [],
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: "GET_SEMESTERS",
        loading: false,
        data: [],
      });
    });
};
