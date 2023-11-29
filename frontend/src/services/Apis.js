const envoirnment = process.env.NODE_ENV;

const apis = {
  BASE_LOCAL_URL: envoirnment === "development" ? "http://localhost:3000" : "",
  BASE: envoirnment === "development" ? "http://localhost:5000" : "",

  LOGIN: "/api/v1/login/",
  GETDETAILSUSER: "/api/v1/user/details",

  // TRAINER
  CREATE_TRAINER: "/api/v1/trainer/create",
  GET_ALL_TRAINER: "/api/v1/trainer",
  GET_SINGLE_TRAINER_DETAILS: "/api/v1/trainer",
  DELETE_TRAINER: "/api/v1/trainer/delete",

  // SUBJECT
  GET_ALL_SUBJECTS: "/api/v1/subject",
  GET_SINGLE_SUBJECT_DETAILS: "/api/v1/subject",
  CREATE_SUBJECT: "/api/v1/subject/create",

  //QUESTION
  CREATE_QUESTIONS: "/api/v1/question/create",
  FETCH_SINGLE_QUESTION: "/api/v1/question",
  GET_ALL_QUESTIONS: "/api/v1/question",
  DELETE_QUESTION: "/api/v1/question/delete",

  GET_EXCEL: "/api/v1/trainer/result/download",
  GET_FEEDBACKS: "/api/v1/trainer/get/feedbacks",

  FILE_UPLOAD: "/api/v1/upload",

  //TEST
  CREATE_TEST: "/api/v1/test/create",
  GET_ALL_TESTS: "/api/v1/test",
  GET_SINGLE_TEST: "/api/v1/test/trainer",

  START_TEST_BY_TRAINER: "/api/v1/test/begin",
  END_TEST_BY_TRAINER: "/api/v1/test/end",

  GET_TEST_CANDIDATES: "/api/v1/test/candidates",
  GET_STATS: "/api/v1/test/candidates_results",

  //TRAINEE
  REGISTER_TRAINEE_FOR_TEST: "/api/v1/trainee/registration",
  RESEND_TRAINER_REGISTRATION_LINK: "/api/v1/trainee/resend/testlink",
  UPDATE_REGISTRATION: "/api/v1/trainer/registration/update-status",

  FETCH_TRAINEE_DETAILS: "/api/v1/trainee/details",
  FETCH_TRAINEE_TEST_DETAILS: "/api/v1/trainee/flags",

  FETCH_SINGLE_QUESTION_BY_TRAINEE: "/api/v1/trainee/get/question",
  FETCH_TRAINEE_TEST_QUESTION: "/api/v1/trainee/paper/questions",
  FETCH_TRAINEE_TEST_ANSWERSHEET: "/api/v1/trainee/chosen/options",

  PROCEED_TO_TEST: "/api/v1/trainee/answersheet",
  UPDATE_ANSWERS: "/api/v1/trainee/update/answer",

  END_TEST: "/api/v1/trainee/end/test",
  FEEDBACK_STATUS_CHECK: "/api/v1/trainee/feedback/status",
  GIVE_FEEDBACK: "/api/v1/trainee/feedback",

  FETCH_OWN_RESULT: "/api/v1/final/results",
};

export default apis;
