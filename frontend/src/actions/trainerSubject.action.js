import apis from "../services/Apis";
import { SecureGet } from "../services/axiosCall";

export const getTrainerSubject = (id) => (dispatch) => {
  dispatch({
    type: "TRAINER_SUBJECT",
    loading: true,
    data: [],
  });
  SecureGet({
    url: `${apis.SECTION}/trainer-subject/${id}`,
  })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: "TRAINER_SUBJECT",
          loading: false,
          data: response.data.data,
        });
      } else {
        dispatch({
          type: "TRAINER_SUBJECT",
          loading: false,
          data: [],
        });
      }
    })
    .catch(() => {
      dispatch({
        type: "TRAINER_SUBJECT",
        loading: false,
        data: [],
      });
    });
};
