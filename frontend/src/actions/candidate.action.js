import { SecurePost } from "../services/axiosCall";
import apis from "../services/Apis";

export const getCandidates = (testId) => (dispatch) => {
  dispatch({
    type: "CANDIDATES",
    loading: true,
    data: [],
  });
  SecurePost({
    url: `${apis.TEST}/candidates`,
    data: { id: testId },
  })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: "CANDIDATES",
          loading: false,
          data: response.data.data,
        });
      } else {
        dispatch({
          type: "CANDIDATES",
          loading: false,
          data: [],
        });
      }
    })
    .catch(() => {
      dispatch({
        type: "CANDIDATES",
        loading: false,
        data: [],
      });
    });
};
