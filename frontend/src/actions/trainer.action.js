import apis from "../services/Apis";
import { SecurePost, SecureGet } from "../services/axiosCall";

export const setTrainerModifyAction = (trainerId, state, mode) => (
  dispatch
) => {
  dispatch({
    type: "TRAINER_MODIFY_ACTION",
    state,
    trainerId,
    mode,
  });
};

export const getTrainer = (id) => (dispatch) => {
  SecureGet({
    url: `${apis.TRAINER}/${id}`,
  })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: "TRAINER",
          details: {
            ...response.data.data[0],
            contact: response.data.data[0].contact.slice(4),
            prefix: response.data.data[0].contact.slice(0, 4),
          },
        });
      } else return "Server Error";
    })
    .catch((err) => {
      return "Server Error";
    });
};

export const getTrainers = () => (dispatch) => {
  dispatch({
    type: "TRAINERS",
    loading: true,
    data: [],
  });
  SecureGet({
    url: `${apis.TRAINER}`,
  })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: "TRAINERS",
          loading: false,
          data: response.data.data,
        });
      } else {
        dispatch({
          type: "TRAINERS",
          loading: false,
          data: [],
        });
      }
    })
    .catch(() => {
      dispatch({
        type: "TRAINERS",
        loading: false,
        data: [],
      });
    });
};
