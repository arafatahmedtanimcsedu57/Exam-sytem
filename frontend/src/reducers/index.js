import { combineReducers } from "redux";

import adminAction from "./admin";

import subject from "./subject";
import trainee from "./trainee";
import semester from "./semester";
import section from "./section";

import question from "./question";
import tag from "./tag";

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
  semester: semester,
  section: section,

  question: question,
  tag: tag,
});
