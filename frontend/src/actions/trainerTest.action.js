import apis from "../services/Apis";
import { SecurePost } from "../services/axiosCall";

export const setTestAction = (state, mode) => (dispatch) => {
  dispatch({
    type: "TEST_MODIFY_ACTION",
    state,
    mode,
  });
};
