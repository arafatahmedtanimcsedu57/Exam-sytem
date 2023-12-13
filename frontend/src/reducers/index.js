import { combineReducers } from "redux";

import adminAction from "./admin";

import subject from "./subject";
import trainee from "./trainee";

import authAction from "./loggedinuser";
import trainerAction from "./trainer";
import testAction from "./test";
import conductTestAction from "./conductTest";

export default combineReducers({
  admin: adminAction,
  user: authAction,
  trainer: trainerAction,
  test: testAction,
  conduct: conductTestAction,

  trainee: trainee,
  subject: subject,
});
