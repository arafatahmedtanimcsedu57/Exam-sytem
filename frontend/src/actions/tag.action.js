import apis from "../services/Apis";
import { SecureGet } from "../services/axiosCall";

export const getTags = () => (dispatch) => {
  dispatch({
    type: "TAGS",
    loading: true,
    data: [],
  });
  SecureGet({
    url: `${apis.TAG}`,
  })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: "TAGS",
          loading: false,
          data: response.data.data,
        });
      } else {
        dispatch({
          type: "TAGS",
          loading: false,
          data: [],
        });
      }
    })
    .catch(() => {
      dispatch({
        type: "TAGS",
        loading: false,
        data: [],
      });
    });
};
