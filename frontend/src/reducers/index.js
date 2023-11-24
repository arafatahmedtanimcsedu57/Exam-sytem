import { combineReducers } from "redux";

import adminAction from "./admin";
import authAction from "./loggedinuser";
import trainerAction from "./trainer";
import testAction from "./test";
import conductTestAction from "./conductTest";
import trainee from "./trainee";

export default combineReducers({
  admin: adminAction,
  user: authAction,
  trainer: trainerAction,
  test: testAction,
  conduct: conductTestAction,
  trainee: trainee,
});
