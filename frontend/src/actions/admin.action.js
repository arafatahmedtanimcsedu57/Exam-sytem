import apis from "../services/Apis";
import { SecureGet } from "../services/axiosCall";

// TRAINER //

// state = modal open or close
// id = Trainer ID
// mode = UPDATE, CREATE, COMPLETE
export const handleTrainerModalState = (state, id, mode) => (dispatch) => {
  if (mode === "UPDATE") {
    SecureGet({
      url: `${apis.GET_SINGLE_TRAINER_DETAILS}/${id}`,
    })
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: "CHANGE_TRAINER_MODAL_STATE",
            state,
            id,
            mode,
            details: {
              ...response.data.data[0],
              contact: response.data.data[0].contact.slice(4),
              prefix: response.data.data[0].contact.slice(0, 4),
            },
          });
        } else return response.data.message;
      })
      .catch(() => "Server Error");
  } else {
    dispatch({
      type: "CHANGE_TRAINER_MODAL_STATE",
      state,
      id,
      mode,
      details: {
        name: null,
        emailId: null,
        contact: null,
        prefix: null,
        password: null,
        confirmpassword: null,
      },
    });
  }
};

export const handleTrainerTableData = () => (dispatch) => {
  dispatch({
    type: "CHANGE_TRAINER_TABLE_LOADING_STATUS",
    loading: true,
    data: [],
  });
  SecureGet({
    url: `${apis.GET_ALL_TRAINER}`,
  })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: "CHANGE_TRAINER_TABLE_LOADING_STATUS",
          loading: false,
          data: response.data.data,
        });
      } else {
        dispatch({
          type: "CHANGE_TRAINER_TABLE_LOADING_STATUS",
          loading: false,
          data: [],
        });
      }
    })
    .catch(() => {
      dispatch({
        type: "CHANGE_TRAINER_TABLE_LOADING_STATUS",
        loading: false,
        data: [],
      });
    });
};
// TRAINER //

// ===================================================================================================================== //

// SUBJECT //

//state = modal open or close
//id = Subject ID
// mode = UPDATE, CREATE, COMPLETE
export const handleSubjectModalState = (state, id, mode) => (dispatch) => {
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

export const handleSubjectTableData = () => (dispatch) => {
  dispatch({
    type: "CHANGE_SUBJECT_TABLE_LOADING_STATUS",
    loading: true,
    data: [],
  });
  SecureGet({
    url: `${apis.GET_ALL_SUBJECTS}`,
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
        type: "CHANGE_SUBJECT_TABLE_LOADING_STATUS",
        loading: false,
        data: [],
      });
    });
};
