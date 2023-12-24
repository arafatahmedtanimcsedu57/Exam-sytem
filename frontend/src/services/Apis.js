const envoirnment = process.env.NODE_ENV;

const apis = {
  BASE_LOCAL_URL: envoirnment === "development" ? "http://localhost:3000" : "",
  BASE: envoirnment === "development" ? "http://localhost:5000" : "",

  LOGIN: "/api/v1/login/",
  GETDETAILSUSER: "/api/v1/user/details",

  //TRAINER
  TRAINER: "/api/v1/trainer",

  //TRAINEE
  TRAINEE: "/api/v1/trainee",

  //SUBJECT
  SUBJECT: "/api/v1/subject",

  //SEMESTER
  SEMESTER: "/api/v1/semester",

  //SECTION
  SECTION: "/api/v1/section",

  //QUESTION
  QUESTION: "/api/v1/question",

  //TAG
  TAG: "/api/v1/tag",

  //TEST
  TEST: "/api/v1/test",

  GET_EXCEL: "/api/v1/trainer/result/download",
  GET_FEEDBACKS: "/api/v1/trainer/get/feedbacks",

  FILE_UPLOAD: "/api/v1/upload",

  // TEST_RESULT
  GET_RESULTS: "/api/v1/results",
  PUBLISH_RESULTS: "/api/v1/results/publish",

  //TRAINEE
  REGISTER_TRAINEE_FOR_TEST: "/api/v1/trainee/registration",
  RESEND_TRAINER_REGISTRATION_LINK: "/api/v1/trainee/resend/testlink",
  UPDATE_REGISTRATION: "/api/v1/trainer/registration/update-status",

  FETCH_SINGLE_QUESTION_BY_TRAINEE: "/api/v1/trainee/get/question",
  FETCH_TRAINEE_TEST_QUESTION: "/api/v1/trainee/paper/questions",
  FETCH_TRAINEE_TEST_ANSWERSHEET: "/api/v1/trainee/chosen/options",

  PROCEED_TO_TEST: "/api/v1/trainee/answersheet",

  FEEDBACK_STATUS_CHECK: "/api/v1/trainee/feedback/status",
  GIVE_FEEDBACK: "/api/v1/trainee/feedback",

  FETCH_OWN_RESULT: "/api/v1/final/results",
};

export default apis;
