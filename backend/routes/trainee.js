const express = require("express");
const router = express.Router();

const trainee = require("../services/trainee.service");

router.post("/details", trainee.traineeDetails);

router.post("/registration", trainee.registration);
router.post("/bulk-registration", trainee.bulkRegistration);

router.post("/exam-state", trainee.examState);
router.post("/start-exam", trainee.startExam);
router.post("/submit-answer-sheet", trainee.submitAnswerSheet);

router.post("/update-answer", trainee.updateAnswer);

router.post("/feedback", trainee.feedback);
router.post("/feedback/status", trainee.checkFeedback);

router.post("/resend/testlink", trainee.resendmail);

router.post("/correct/answers", trainee.correctAnswers);
router.post("/answersheet", trainee.answersheet);

router.post("/paper/questions", trainee.testquestions);
router.post("/get/question", trainee.getQuestion);
router.post("/chosen/options", trainee.chosenOptions);

module.exports = router;
